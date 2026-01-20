import { describe, it, expect, beforeEach } from 'vitest';
import { useScraperStore } from '../store/scraperStore';

describe('ScraperStore', () => {
    beforeEach(() => {
        useScraperStore.getState().clearData();
    });

    it('should add a single item', () => {
        const item = { tagName: 'DIV', className: 'test', innerText: 'Hello', selector: '#1' };
        useScraperStore.getState().addItem(item);

        const state = useScraperStore.getState();
        expect(state.scrapedData).toHaveLength(1);
        expect(state.scrapedCount).toBe(1);
        expect(state.scrapedData[0]).toEqual(item);
    });

    it('should add multiple items', () => {
        const items = [
            { tagName: 'P', className: 'a', innerText: '1', selector: '#a' },
            { tagName: 'P', className: 'b', innerText: '2', selector: '#b' }
        ];
        useScraperStore.getState().addItems(items);

        const state = useScraperStore.getState();
        expect(state.scrapedData).toHaveLength(2);
        expect(state.scrapedCount).toBe(2);
    });

    it('should delete an item by index', () => {
        useScraperStore.getState().addItems([
            { tagName: 'A', className: '', innerText: '1', selector: '1' },
            { tagName: 'B', className: '', innerText: '2', selector: '2' },
            { tagName: 'C', className: '', innerText: '3', selector: '3' }
        ]);

        useScraperStore.getState().deleteItem(1); // Delete '2'

        const state = useScraperStore.getState();
        expect(state.scrapedData).toHaveLength(2);
        expect(state.scrapedData[1].innerText).toBe('3');
        expect(state.scrapedCount).toBe(2);
    });

    it('should clear all data', () => {
        useScraperStore.getState().addItem({ tagName: 'X', className: '', innerText: 'X', selector: 'X' });
        useScraperStore.getState().clearData();

        const state = useScraperStore.getState();
        expect(state.scrapedData).toHaveLength(0);
        expect(state.scrapedCount).toBe(0);
    });
});
