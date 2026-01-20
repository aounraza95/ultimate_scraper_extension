import { sendMessage } from "/src/utils/messaging.ts.js";
export class PaginationManager {
  isRunning = false;
  nextButtonSelector = "";
  itemSelector = "";
  totalCollected = 0;
  constructor() {
  }
  setSelectors(nextBtn, item) {
    this.nextButtonSelector = nextBtn;
    this.itemSelector = item;
  }
  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.totalCollected = 0;
    console.log("PaginationManager: Started");
    while (this.isRunning) {
      this.scrapeCurrentPage();
      const clicked = await this.attemptNext();
      if (!clicked) {
        console.log("PaginationManager: Next button not found. Stopping.");
        this.stop();
        break;
      }
      await this.wait(3e3);
    }
  }
  // Public for testing and separation of concerns
  async attemptNext() {
    const nextBtn = document.querySelector(this.nextButtonSelector);
    if (nextBtn) {
      console.log("PaginationManager: Clicking Next");
      nextBtn.click();
      return true;
    }
    return false;
  }
  stop() {
    this.isRunning = false;
    console.log("PaginationManager: Stopped");
    sendMessage({ action: "PAGINATION_STOPPED", payload: { total: this.totalCollected } });
  }
  scrapeCurrentPage() {
    const relaxedSelector = this.itemSelector.replace(/:nth-child\(\d+\)/g, "").replace(/:nth-of-type\(\d+\)/g, "");
    const nodes = document.querySelectorAll(relaxedSelector);
    const items = [];
    nodes.forEach((node) => {
      const el = node;
      items.push({
        tagName: el.tagName,
        className: el.className,
        innerText: el.innerText
      });
    });
    if (items.length > 0) {
      this.totalCollected += items.length;
      sendMessage({ action: "DATA_SCRAPED", payload: { items, total: this.totalCollected } });
    }
  }
  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
