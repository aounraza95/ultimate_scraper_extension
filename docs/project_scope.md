This is the "Master Blueprint" for your Chrome Extension. It bridges the gap between complex engineering and a simple user experience. We will use a **React-based Side Panel** and a **Vanilla JS Content Script** to ensure maximum performance.

---

## Phase 1: The "Command Center" (Side Panel & Bridge)

**Objective:** Establish the persistent UI and the communication channel.

### The Screens

* **Empty State Screen:** A "Welcome" screen with a "New Scraper" button and a list of previously saved "recipes."
* **Active Session Screen:** A table view that populates in real-time as data is clicked.

### Technical Details

* **Manifest V3:** Use `side_panel` and `declarativeNetRequest` (to handle headers if needed).
* **Message Bus:** A standardized JSON protocol for messages: `{ action: "ELEMENT_HOVERED", payload: { selector: "...", text: "..." } }`.

### Workflow & User Journey

1. **Entry:** User opens the Chrome Side Panel manually or clicks the extension icon.
2. **Initialization:** The Side Panel detects the current tab URL and checks if a "Saved Recipe" exists for this domain.
3. **Action:** User clicks **"Start Selecting."** The Side Panel sends a message to the Content Script to "Wake Up."

---

## Phase 2: The "Magic" Selector (Visual Interaction)

**Objective:** Allow users to pick data without knowing what "HTML" is.

### The Screens

* **In-Page Overlay:** An invisible canvas over the webpage.
* **Selection HUD:** A small floating tooltip next to the mouse cursor showing what is about to be selected (e.g., "Text" or "Link").

### Technical Details

* **Dom Traversal:** When a user clicks, we use `event.target`. We calculate a "Short Path" (e.g., `#product-list > .item:nth-child(1) > .price`).
* **Similarity Logic:** If the user clicks a price, we look for elements with the same **class depth** and **parent structure**.
* **Layering:** Use `pointer-events: none` on the highlighter so it doesn't block the actual click.

### Workflow & User Journey

1. **Hover:** User moves the mouse over the webpage. Elements glow with a light blue border.
2. **First Click:** User clicks a product name. The extension highlights **all** similar product names automatically (Pattern Recognition).
3. **Confirmation:** A popup in the Side Panel asks: *"I found 24 similar items. Keep them?"*
4. **Column Naming:** User types "Product Name" in the Side Panel to label the column.

---

## Phase 3: The "Infinite" Scraper (Automation & Logic)

**Objective:** Handle complex sites that load more data as you go.

### The Screens

* **Configuration Tab:** A settings view in the Side Panel for "Scroll to Load" and "Pagination."
* **Interaction Wizard:** A button that says "Select Next Button" which lets the user click the "Next Page" arrow on the site.

### Technical Details

* **MutationObserver:** To detect when new items are added to the page (for infinite scroll).
* **Auto-Scroll Script:** A function that executes `window.scrollTo(0, document.body.scrollHeight)` at intervals.
* **Pagination Loop:** A recursive function: `Scrape Current Data` -> `Click Next Button` -> `Wait for Load` -> `Repeat`.

### Workflow & User Journey

1. **Setup:** User toggles "Infinite Scroll" because the site is a social media feed or a modern shop.
2. **Next Page:** User clicks **"Set Pagination"** and then clicks the "Next" button on the actual website.
3. **Execution:** User clicks **"Run Scraper."** The side panel starts counting: *"Collected 50 items... 100 items... 150 items..."*

---

## Phase 4: The "Data Desk" (Management & Cleanup)

**Objective:** Ensure the data is clean before it leaves the browser.

### The Screens

* **Preview Table:** A full-width grid inside the Side Panel (like a mini-Excel).
* **Column Options:** Dropdown menus on each column for "Clean Text," "Extract URL," or "Delete."

### Technical Details

* **Regex Engine:** Pre-built snippets to "Extract Numbers Only" or "Remove Whitespace."
* **Storage Management:** Use `indexedDB` if the dataset exceeds 5MB (Chrome Storage limits).

### Workflow & User Journey

1. **Review:** User looks at the table. They notice the price column has extra text like "VAT included."
2. **Clean:** User selects "Extract Numbers" from the column header. The data instantly updates to show only digits.
3. **Delete:** User clicks the "X" on a row that contains an empty advertisement.

---

## Phase 5: The "Export" (Final Output)

**Objective:** Get the data out in the user's preferred format.

### The Screens

* **Export Modal:** A simple popup with three big icons: **CSV**, **Excel**, **JSON**.

### Technical Details

* **SheetJS (XLSX Library):** Converts the internal JSON array into a Blob.
* **Download Trigger:** Uses `chrome.downloads.download` to save the file to the user's computer.

### Workflow & User Journey

1. **Finish:** User is happy with the data. They click **"Export."**
2. **Format Selection:** They choose "Excel."
3. **Success:** The file downloads immediately. The Side Panel shows a "Success" message and asks if they want to save this "Recipe" for next time.

---

## Summary of Technical Flow

| Step | Location | Technical Action |
| --- | --- | --- |
| **Pick** | Content Script | `document.querySelectorAll` + Pattern Matching |
| **Store** | Background Script | Centralizes data and keeps it if the tab reloads |
| **View** | Side Panel | React State updates to show the live table |
| **Clean** | Side Panel | JS `.map()` and `.replace()` functions on the data |
| **Save** | Local Storage | `chrome.storage.local.set({ recipeName: { selectors } })` |

