// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { exportToCSV, exportToJSON, exportToExcel } from '../utils/exportUtils';

// Mock URL and Document
global.URL.createObjectURL = vi.fn(() => 'blob:url');
global.URL.revokeObjectURL = vi.fn();

describe('ExportUtils', () => {
    // Mock anchor click
    const clickMock = vi.fn();
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
        click: clickMock,
        href: '',
        download: '',
    } as any);
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => null as any);
    const removeSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => null as any);

    afterEach(() => {
        vi.clearAllMocks();
    });

    const mockData = [
        { tagName: 'DIV', className: 'x', innerText: 'Val1', selector: 's1', extra: 'A' },
        { tagName: 'DIV', className: 'x', innerText: 'Val2', selector: 's2', extra: 'B' }
    ];

    it('should export JSON', () => {
        exportToJSON(mockData, 'test.json');

        expect(createElementSpy).toHaveBeenCalledWith('a');
        expect(clickMock).toHaveBeenCalled();
        expect(appendSpy).toHaveBeenCalled();
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should export CSV', () => {
        exportToCSV(mockData, 'test.csv');
        expect(clickMock).toHaveBeenCalled();
    });

    // Excel export is harder to mock without full XLSX mock, but we can verify it calls the download flow
    it('should export Excel via SheetJS (smoke test)', () => {
        exportToExcel(mockData, 'test.xlsx');
        // SheetJS writeFile internally triggers download in browser env
        // We mainly check it doesn't crash here.
        // Note: In JSDOM, XLSX might not fully work without more mocks, 
        // assumes 'xlsx' handles env checks.
    });
});
