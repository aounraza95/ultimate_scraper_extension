export class Highlighter {
    private overlayContainer: HTMLElement;
    private overlays: HTMLElement[] = [];

    constructor() {
        this.overlayContainer = document.createElement('div');
        this.overlayContainer.id = 'ultimate-scraper-highlight-container';
        Object.assign(this.overlayContainer.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '0',
            zIndex: '2147483647',
            pointerEvents: 'none'
        });
        document.body.appendChild(this.overlayContainer);
    }

    highlight(element: HTMLElement, isSecondary = false) {
        this.clear();
        this.addOverlay(element, isSecondary);
    }

    highlightGroup(elements: HTMLElement[]) {
        this.clear();
        elements.forEach(el => this.addOverlay(el, true));
    }

    private addOverlay(element: HTMLElement, isSecondary: boolean) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        const div = document.createElement('div');
        Object.assign(div.style, {
            position: 'absolute',
            background: isSecondary ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)',
            border: isSecondary ? '1px dashed #3b82f6' : '2px solid #3b82f6',
            pointerEvents: 'none',
            transition: 'all 0.1s ease',
            borderRadius: '4px',
            boxSizing: 'border-box',
            top: `${rect.top + scrollTop}px`,
            left: `${rect.left + scrollLeft}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
        });

        if (!isSecondary) {
            const label = document.createElement('div');
            Object.assign(label.style, {
                position: 'absolute',
                background: '#3b82f6',
                color: 'white',
                padding: '2px 6px',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                borderRadius: '4px',
                top: '-24px',
                left: '0',
                whiteSpace: 'nowrap',
            });

            const tagName = element.tagName.toLowerCase();
            const className = element.className && typeof element.className === 'string'
                ? `.${element.className.split(' ')[0]}`
                : '';
            label.textContent = `${tagName}${className}`;
            div.appendChild(label);
        }

        this.overlayContainer.appendChild(div);
        this.overlays.push(div);
    }

    clear() {
        this.overlays.forEach(o => o.remove());
        this.overlays = [];
    }

    destroy() {
        this.overlayContainer.remove();
    }
}
