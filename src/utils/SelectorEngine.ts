export class SelectorEngine {
    /**
     * Generates a unique CSS selector for a given element.
     * Tries to be short but specific.
     */
    static generate(element: HTMLElement): string {
        if (!element) return '';

        // 1. Try ID
        if (element.id && this.isSafeId(element.id)) {
            return `#${element.id}`;
        }

        // 2. Try unique class path (limited depth)
        const classPath = this.getClassPath(element);
        if (classPath && this.isUnique(classPath)) {
            return classPath;
        }

        // 3. Fallback to Structural Path (Tag + nth-child)
        return this.getStructuralPath(element);
    }

    static getStructuralPath(element: HTMLElement): string {
        const path: string[] = [];
        let current: HTMLElement | null = element;

        while (current && current.tagName !== 'BODY' && current.tagName !== 'HTML') {
            let selector = current.tagName.toLowerCase();

            const parent = current.parentElement;
            if (parent) {
                const children = Array.from(parent.children).filter(child => child.tagName === current?.tagName);
                if (children.length > 1) {
                    const index = children.indexOf(current) + 1;
                    selector += `:nth-of-type(${index})`;
                }
            }

            path.unshift(selector);
            current = current.parentElement;
        }

        // Add body to make it a full path if needed, or just return check
        // Optimization: We don't need 'body >' usually if the path is long enough
        return path.join(' > ');
    }

    private static getClassPath(element: HTMLElement): string | null {
        // Simple implementation: Current tag.class + Parent tag.class
        const currentClass = this.getSafeClass(element);
        if (!currentClass) return null;

        const selector = `${element.tagName.toLowerCase()}.${currentClass}`;

        // Check if unique immediately
        if (this.isUnique(selector)) return selector;

        // Try adding parent
        const parent = element.parentElement;
        if (parent) {
            const parentClass = this.getSafeClass(parent);
            if (parentClass) {
                const parentSelector = `${parent.tagName.toLowerCase()}.${parentClass}`;
                return `${parentSelector} > ${selector}`;
            }
        }

        return null;
    }

    private static getSafeClass(element: HTMLElement): string | null {
        if (!element.className || typeof element.className !== 'string') return null;

        const classes = element.className.split(' ').filter(c => {
            // Filter out utility classes or messy dynamic classes
            // This is a heuristic. 
            // Avoid: tailwind-like (w-1/2), dyanmic (css-1xd2), state (is-active)
            if (c.includes(':')) return false; // Tailwind hover:
            if (c.length < 3) return false;
            if (/^[0-9]/.test(c)) return false; // Starts with number
            return true;
        });

        if (classes.length === 0) return null;
        return classes[0]; // Pick the first "safe" class
    }

    private static isSafeId(id: string): boolean {
        // Check for dynamic IDs like ember123, react-456
        if (/[0-9]{3,}/.test(id)) return false;
        return true;
    }

    private static isUnique(selector: string): boolean {
        try {
            return document.querySelectorAll(selector).length === 1;
        } catch {
            return false;
        }
    }
}
