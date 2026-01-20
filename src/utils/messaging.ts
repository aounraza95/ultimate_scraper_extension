export type ScraperAction =
    | 'ELEMENT_HOVERED'
    | 'ELEMENT_SELECTED'
    | 'START_SELECTION'
    | 'STOP_SELECTION'
    | 'PING'
    | 'START_AUTO_SCROLL'
    | 'STOP_AUTO_SCROLL'
    | 'SCROLL_STOPPED'
    | 'DATA_SCRAPED'
    | 'START_PAGINATION_SELECTION'
    | 'START_PAGINATION'
    | 'STOP_PAGINATION'
    | 'PAGINATION_STOPPED'
    | 'NEXT_BUTTON_SELECTED';

export interface ScraperMessage<T = any> {
    action: ScraperAction;
    payload?: T;
}

/**
 * Sends a message to the Chrome runtime (Side Panel or Background).
 */
export const sendMessage = (message: ScraperMessage) => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        try {
            chrome.runtime.sendMessage(message);
        } catch (e) {
            console.warn('Failed to send message (Extension context missing?):', e);
        }
    } else {
        console.log('[Dev] Message sent:', message);
    }
};

/**
 * Creates a throttled message sender.
 * Useful for high-frequency events like 'mousemove'.
 */
export const createThrottledSender = (delay: number) => {
    let lastCall = 0;
    let timeout: any = null;

    return (message: ScraperMessage) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            sendMessage(message);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lastCall = Date.now();
                sendMessage(message);
            }, delay - (now - lastCall));
        }
    };
};
