import { SelectorEngine } from './utils/SelectorEngine';
import { Highlighter } from './utils/Highlighter';
import { SimilarityEngine } from './utils/SimilarityEngine';
import { AutoScroller } from './utils/AutoScroller';
import { PaginationManager } from './utils/PaginationManager';
import { sendMessage } from './utils/messaging';

console.log('Ultimate Scraper Content Script Loaded');

let highlighter: Highlighter | null = null;
let autoScroller: AutoScroller = new AutoScroller();
let paginationManager: PaginationManager = new PaginationManager();
let isSelecting = false;
let selectionType: 'data' | 'pagination' = 'data';
let currentElement: HTMLElement | null = null;

// Listen for messages from Side Panel
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.action === 'PING') {
        console.log('Content Script Pinged');
    }

    if (message.action === 'START_SELECTION') {
        selectionType = 'data';
        startSelectionMode();
    }

    if (message.action === 'STOP_SELECTION') {
        stopSelectionMode();
    }

    if (message.action === 'START_AUTO_SCROLL') {
        const { selector } = message.payload || {};
        if (selector) {
            autoScroller.start(document.body, selector);
        }
    }

    if (message.action === 'STOP_AUTO_SCROLL') {
        autoScroller.stop();
    }

    if (message.action === 'START_PAGINATION_SELECTION') {
        selectionType = 'pagination';
        startSelectionMode();
    }

    if (message.action === 'START_PAGINATION') {
        const { nextBtnSelector, itemSelector } = message.payload || {};
        if (nextBtnSelector && itemSelector) {
            paginationManager.setSelectors(nextBtnSelector, itemSelector);
            paginationManager.start();
        }
    }

    if (message.action === 'STOP_PAGINATION') {
        paginationManager.stop();
    }
});

function startSelectionMode() {
    if (isSelecting) return;
    isSelecting = true;
    document.body.style.cursor = 'crosshair';

    highlighter = new Highlighter();

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
}

function stopSelectionMode() {
    isSelecting = false;
    document.body.style.cursor = 'default';

    if (highlighter) {
        highlighter.clear();
        highlighter = null;
    }

    document.removeEventListener('mouseover', handleHover);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
}

function handleHover(event: MouseEvent) {
    if (!isSelecting || !highlighter) return;
    const target = event.target as HTMLElement;
    currentElement = target;
    highlighter.highlight(target);
}

function handleMouseOut(_event: MouseEvent) {
    if (!isSelecting || !highlighter) return;
    // Optional: Clear highlight? 
    // highlighter.clear();
}

// Drill-down Logic with Arrow Keys
function handleKeyDown(event: KeyboardEvent) {
    if (!isSelecting || !currentElement || !highlighter) return;

    let newTarget: HTMLElement | null = null;

    if (event.key === 'ArrowUp') {
        newTarget = currentElement.parentElement;
    } else if (event.key === 'ArrowDown') {
        newTarget = currentElement.firstElementChild as HTMLElement;
    } else if (event.key === 'ArrowLeft') {
        newTarget = currentElement.previousElementSibling as HTMLElement;
    } else if (event.key === 'ArrowRight') {
        newTarget = currentElement.nextElementSibling as HTMLElement;
    }

    if (newTarget && newTarget !== currentElement) {
        event.preventDefault();
        currentElement = newTarget;
        highlighter.highlight(currentElement);
        // Maybe scroll into view if needed?
        // currentElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}

function handleClick(event: MouseEvent) {
    if (!isSelecting) return;

    event.preventDefault();
    event.stopPropagation();

    const target = currentElement || (event.target as HTMLElement);
    const selector = SelectorEngine.generate(target);

    if (selectionType === 'pagination') {
        // Handle Pagination Selection
        console.log('Next Button Selected:', target);
        sendMessage({
            action: 'NEXT_BUTTON_SELECTED',
            payload: { selector: selector, innerText: target.innerText }
        });
        stopSelectionMode(); // Auto-stop after selecting button
        return;
    }

    // Normal Data Selection
    const similarElements = SimilarityEngine.findSimilar(target, selector);
    const count = similarElements.length;

    console.log('Selected:', target);
    console.log(`Found ${count} similar elements`);

    if (highlighter) {
        highlighter.highlightGroup(similarElements);
    }

    sendMessage({
        action: 'ELEMENT_SELECTED',
        payload: {
            tagName: target.tagName,
            className: target.className,
            innerText: target.innerText?.substring(0, 50),
            selector: selector,
            similarCount: count
        }
    });
}
