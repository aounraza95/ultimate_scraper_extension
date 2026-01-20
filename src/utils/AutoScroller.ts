import { sendMessage } from './messaging';

export class AutoScroller {
    private intervalId: any = null;
    private isScrollActive = false;
    private seenItems = new Set<string>();
    private rootSelector: string = '';

    // Stats
    private totalCollected = 0;

    constructor() { }

    start(_rootElement: HTMLElement, rootSelector: string) {
        if (this.isScrollActive) return;
        this.isScrollActive = true;
        this.rootSelector = rootSelector;
        this.seenItems.clear(); // Reset or keep? Let's reset for new run.
        this.totalCollected = 0;

        console.log('AutoScroller: Started');

        // Initial scrape
        this.scrapeVisible();

        this.intervalId = setInterval(() => {
            if (!this.isScrollActive) {
                this.stop();
                return;
            }

            // 1. Scroll down
            window.scrollBy({ top: 500, behavior: 'smooth' });

            // 2. Wait a bit for render (handled by interval timing)
            // 3. Scrape visible items
            this.scrapeVisible();

            // Check if bottom reached? 
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                console.log('AutoScroller: Bottom reached');
                // stop? or keep waiting for infinite load? 
                // For now, let user stop it manually or maybe wait 3 ticks and stop.
            }

        }, 1500); // Scroll every 1.5 seconds
    }

    stop() {
        this.isScrollActive = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        console.log('AutoScroller: Stopped');
        sendMessage({ action: 'SCROLL_STOPPED', payload: { total: this.totalCollected } });
    }

    private scrapeVisible() {
        // Logic: Use SimilarityEngine to find items based on the initial selector
        // We need a reference element? No, we have the selector.

        // Problem: SimilarityEngine.findSimilar usually takes an element + selector.
        // But here we might not have the original element anymore if it scrolled out of view.
        // So we need a "Query by Selector" mode or just use document.querySelectorAll(selector)?
        // BUT `SelectorEngine` generated a specific path for ONE item.
        // `SimilarityEngine` had logic to "Relax" that selector.

        // Solution: We should rely on the "Relaxed" selector logic.
        // Let's assume we pass the *Relaxed Selector* or simply use the logic inside SimilarityEngine 
        // to find all matches in document.

        // Let's query blindly first using the selector we have. 
        // If it's a specific :nth-child, it won't work for others.
        // We need the "Similarity Selector" that was determined during the Selection Phase.

        // For MVP: Let's assume we can re-run specific logic.
        // Better: In `start`, pass the *list* of currently selected items to deduce the common selector?
        // Or just pass the `selector` string and let us remove `:nth-child` here?

        const relaxedSelector = this.rootSelector.replace(/:nth-child\(\d+\)/g, '')
            .replace(/:nth-of-type\(\d+\)/g, '');

        const nodes = document.querySelectorAll(relaxedSelector);

        if (nodes.length === 0) return;

        const newItems: any[] = [];

        nodes.forEach((node) => {
            const el = node as HTMLElement;
            // Hash it: innerText + classes
            const hash = `${el.tagName}-${el.className}-${el.innerText?.substring(0, 20)}`;

            if (!this.seenItems.has(hash)) {
                this.seenItems.add(hash);
                newItems.push({
                    tagName: el.tagName,
                    className: el.className,
                    innerText: el.innerText,
                    // Add more fields?
                });
                this.totalCollected++;
            }
        });

        if (newItems.length > 0) {
            console.log(`AutoScroller: Found ${newItems.length} new items`);
            sendMessage({ action: 'DATA_SCRAPED', payload: { items: newItems, total: this.totalCollected } });
        }
    }
}
