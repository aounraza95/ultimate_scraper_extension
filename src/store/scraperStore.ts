import { create } from 'zustand';

export interface ScrapedItem {
    tagName: string;
    className: string;
    innerText: string;
    [key: string]: any; // Allow future extensibility
}

interface ScraperStore {
    scrapedData: ScrapedItem[];
    scrapedCount: number;

    // Actions
    addItem: (item: ScrapedItem) => void;
    addItems: (items: ScrapedItem[]) => void;
    clearData: () => void;
    deleteItem: (index: number) => void;
}

export const useScraperStore = create<ScraperStore>((set) => ({
    scrapedData: [],
    scrapedCount: 0,

    addItem: (item) => set((state) => ({
        scrapedData: [...state.scrapedData, item],
        scrapedCount: state.scrapedCount + 1
    })),

    addItems: (items) => set((state) => ({
        scrapedData: [...state.scrapedData, ...items],
        scrapedCount: state.scrapedCount + items.length
    })),

    clearData: () => set({ scrapedData: [], scrapedCount: 0 }),

    deleteItem: (index) => set((state) => {
        const newData = [...state.scrapedData];
        newData.splice(index, 1);
        return { scrapedData: newData, scrapedCount: state.scrapedCount - 1 };
    })
}));
