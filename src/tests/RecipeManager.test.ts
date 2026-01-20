import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecipeManager } from '../utils/recipeManager';

// Mock chrome.storage.local
const mockStorage = {
    get: vi.fn(),
    set: vi.fn()
};

global.chrome = {
    storage: {
        local: mockStorage
    }
} as any;

global.crypto = {
    randomUUID: () => '123-456'
} as any;

describe('RecipeManager', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        // Default empty storage
        mockStorage.get.mockResolvedValue({});
    });

    it('should save a recipe', async () => {
        const recipeData = { name: 'Test', domain: 'example.com', selector: '.foo' };

        await RecipeManager.saveRecipe(recipeData);

        expect(mockStorage.get).toHaveBeenCalledWith('recipes');
        expect(mockStorage.set).toHaveBeenCalledWith(expect.objectContaining({
            recipes: expect.arrayContaining([
                expect.objectContaining({ name: 'Test', domain: 'example.com' })
            ])
        }));
    });

    it('should get recipes for domain', async () => {
        const recipes = [
            { id: '1', name: 'R1', domain: 'example.com', selector: '.a', createdAt: 0 },
            { id: '2', name: 'R2', domain: 'other.com', selector: '.b', createdAt: 0 }
        ];
        mockStorage.get.mockResolvedValue({ recipes });

        const result = await RecipeManager.getRecipesForDomain('example.com');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('R1');
    });

    it('should delete a recipe', async () => {
        const recipes = [
            { id: '1', name: 'R1', domain: 'example.com', selector: '.a', createdAt: 0 }
        ];
        mockStorage.get.mockResolvedValue({ recipes });

        await RecipeManager.deleteRecipe('1');

        expect(mockStorage.set).toHaveBeenCalledWith({ recipes: [] });
    });
});
