export class SimilarityEngine {

    /**
     * Finds elements similar to the given element based on its selector.
     * Strategically relaxes the selector to find siblings.
     */
    static findSimilar(element: HTMLElement, fullSelector: string): HTMLElement[] {
        if (!element || !fullSelector) return [];

        let candidates: HTMLElement[] = [];

        // Strategy 1: Relax Nth-Child/Nth-of-type to find list items
        // Regex to remove :nth-child(n) or :nth-of-type(n) indices
        const relaxedSelector = fullSelector.replace(/:nth-child\(\d+\)/g, '')
            .replace(/:nth-of-type\(\d+\)/g, '');

        if (relaxedSelector !== fullSelector) {
            try {
                const nodes = document.querySelectorAll(relaxedSelector);
                candidates = Array.from(nodes) as HTMLElement[];
            } catch (e) {
                console.warn('Invalid relaxed selector:', relaxedSelector);
            }
        }

        // Strategy 2: If no candidates via selector relaxation, try Class-based same-depth search
        if (candidates.length <= 1) { // Only found itself or nothing
            candidates = this.findSiblingsByStructure(element);
        }

        // Filter candidates to ensure high quality similarity
        return candidates.filter(node => {
            // Must be visible
            if (node.offsetParent === null) return false;
            // Must have same tag
            if (node.tagName !== element.tagName) return false;
            // Heuristic: Should likely share some classes if original had classes
            if (element.className && node.className !== element.className) {
                return false;
            }
            return true;
        });
    }

    private static findSiblingsByStructure(element: HTMLElement): HTMLElement[] {
        const parent = element.parentElement;
        if (!parent) return [element];

        // If the user selected a child (like price) inside a card, we want to find 
        // other prices in other cards.
        // 1. Identify "Repeating Parent" (The List Item or Card)
        //    We go up the tree until we find a parent that has many siblings with same tag/class.

        let repeatingAncestor = element.parentElement;
        let depth = 0;
        const MAX_DEPTH = 5;

        while (repeatingAncestor && depth < MAX_DEPTH) {
            const parent = repeatingAncestor.parentElement;
            if (!parent) break;

            const siblings = Array.from(parent.children)
                .filter(child => child.tagName === repeatingAncestor?.tagName) as HTMLElement[];

            if (siblings.length > 2) {
                return this.projectDown(siblings, element, depth + 1);
            }

            repeatingAncestor = parent;
            depth++;
        }

        return [element];
    }

    /**
     * Given a list of container elements (e.g. cards), find the child at the same relative path as 'target'.
     */
    private static projectDown(containers: HTMLElement[], target: HTMLElement, levelsUp: number): HTMLElement[] {
        const path: number[] = [];
        let curr: HTMLElement | null = target;

        for (let i = 0; i < levelsUp; i++) {
            if (!curr || !curr.parentElement) return [];

            const parent: HTMLElement = curr.parentElement; // Explicit type
            const index = Array.from(parent.children).indexOf(curr);
            path.unshift(index);

            curr = parent;
        }

        // Now apply this path to all containers
        const results: HTMLElement[] = [];

        containers.forEach(container => {
            let node = container;
            let valid = true;

            for (const idx of path) {
                if (node.children[idx]) {
                    node = node.children[idx] as HTMLElement;
                } else {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                results.push(node);
            }
        });

        return results;
    }
}
