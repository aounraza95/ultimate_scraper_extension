import * as XLSX from 'xlsx';
import { ScrapedItem } from '../store/scraperStore';

export const exportToJSON = (data: ScrapedItem[], filename = 'data.json') => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, filename);
};

export const exportToCSV = (data: ScrapedItem[], filename = 'data.csv') => {
    if (data.length === 0) return;

    // Helper to escape CSV fields
    const escape = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    // Get all keys
    const allKeys = new Set<string>();
    data.forEach(item => Object.keys(item).forEach(k => allKeys.add(k)));
    const headers = Array.from(allKeys).filter(k => k !== 'selector');

    const csvRows = [];
    csvRows.push(headers.map(escape).join(',')); // Header

    data.forEach(item => {
        const row = headers.map(header => escape(item[header]));
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
};

export const exportToExcel = (data: ScrapedItem[], filename = 'data.xlsx') => {
    if (data.length === 0) return;

    // Prepare data: remove selector if unwanted
    const safeData = data.map(({ selector, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(safeData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Scraped Data');

    XLSX.writeFile(workbook, filename);
};

const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
