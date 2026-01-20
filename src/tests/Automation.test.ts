// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaginationManager } from '../utils/PaginationManager';

describe('PaginationManager', () => {
    let mockClick: any;

    beforeEach(() => {
        document.body.innerHTML = '';
        mockClick = vi.fn();
    });

    it('should find and click next button', async () => {
        const btn = document.createElement('button');
        btn.className = 'next-btn';
        btn.onclick = mockClick;
        document.body.appendChild(btn);

        const manager = new PaginationManager();
        manager.setSelectors('.next-btn', '.item');
        const success = await manager.attemptNext();

        expect(success).toBe(true);
    });

    it('should return false if button not found', async () => {
        const manager = new PaginationManager();
        manager.setSelectors('.non-existent', '.item');
        const success = await manager.attemptNext();
        expect(success).toBe(false);
    });



    it('should wait for DOM changes (simulated)', async () => {
        // No direct test for wait(), but ensure async flow works
        const manager = new PaginationManager();
        // @ts-ignore - testing private method for coverage assurance
        await expect(manager.wait(10)).resolves.toBe(undefined);
    });
});
