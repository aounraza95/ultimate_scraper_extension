import { sendMessage } from './messaging';

export class PaginationManager {
    private isRunning = false;
    private nextButtonSelector: string = '';
    private itemSelector: string = '';
    private totalCollected = 0;

    constructor() { }

    setSelectors(nextBtn: string, item: string) {
        this.nextButtonSelector = nextBtn;
        this.itemSelector = item;
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.totalCollected = 0;

        console.log('PaginationManager: Started');

        // Loop
        while (this.isRunning) {
            // 1. Scrape current page
            this.scrapeCurrentPage();

            // 2. Try to click next
            const clicked = await this.attemptNext();
            if (!clicked) {
                console.log('PaginationManager: Next button not found. Stopping.');
                this.stop();
                break;
            }

            // Wait for load
            await this.wait(3000);
        }
    }

    // Public for testing and separation of concerns
    async attemptNext(): Promise<boolean> {
        const nextBtn = document.querySelector(this.nextButtonSelector) as HTMLElement;
        if (nextBtn) {
            console.log('PaginationManager: Clicking Next');
            nextBtn.click();
            return true;
        }
        return false;
    }

    stop() {
        this.isRunning = false;
        console.log('PaginationManager: Stopped');
        sendMessage({ action: 'PAGINATION_STOPPED', payload: { total: this.totalCollected } });
    }

    private scrapeCurrentPage() {
        // Logic similar to AutoScroller, but we just run once per page
        // Relax selector logic? 
        // For now assume itemSelector is good enough or we reuse SimiliarityEngine's relaxed logic 
        // if we abstract it.
        // Let's do simple querySelectorAll for now with some basic relaxation if needed.

        const relaxedSelector = this.itemSelector.replace(/:nth-child\(\d+\)/g, '')
            .replace(/:nth-of-type\(\d+\)/g, '');

        const nodes = document.querySelectorAll(relaxedSelector);
        const items: any[] = [];

        nodes.forEach((node) => {
            const el = node as HTMLElement;
            items.push({
                tagName: el.tagName,
                className: el.className,
                innerText: el.innerText
            });
        });

        if (items.length > 0) {
            this.totalCollected += items.length;
            sendMessage({ action: 'DATA_SCRAPED', payload: { items: items, total: this.totalCollected } });
        }
    }

    private wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
