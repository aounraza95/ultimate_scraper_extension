export interface Recipe {
    id: string;
    name: string;
    domain: string;
    selector: string;
    paginationSelector?: string;
    createdAt: number;
}

export class RecipeManager {
    static async saveRecipe(recipe: Omit<Recipe, 'id' | 'createdAt'>): Promise<void> {
        const newRecipe: Recipe = {
            ...recipe,
            id: crypto.randomUUID(),
            createdAt: Date.now()
        };

        const recipes = await this.getAllRecipes();
        recipes.push(newRecipe);

        await chrome.storage.local.set({ recipes });
    }

    static async getRecipesForDomain(domain: string): Promise<Recipe[]> {
        const recipes = await this.getAllRecipes();
        return recipes.filter(r => r.domain === domain);
    }

    static async getAllRecipes(): Promise<Recipe[]> {
        const result = await chrome.storage.local.get('recipes');
        return result.recipes || [];
    }

    static async deleteRecipe(id: string): Promise<void> {
        const recipes = await this.getAllRecipes();
        const filtered = recipes.filter(r => r.id !== id);
        await chrome.storage.local.set({ recipes: filtered });
    }
}
