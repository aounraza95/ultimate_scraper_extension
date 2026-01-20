import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe, RecipeManager } from '../utils/recipeManager';
import { Play, Trash2 } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const loadRecipes = async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.url) {
                const url = new URL(tab.url);
                const domainRecipes = await RecipeManager.getRecipesForDomain(url.hostname);
                setRecipes(domainRecipes);
            }
        } catch (e) {
            console.error("Failed to load recipes", e);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleStart = () => {
        navigate('/session');
    };

    const loadRecipe = (recipe: Recipe) => {
        navigate('/session', { state: { recipe } });
    };

    const deleteRecipe = async (id: string) => {
        if (confirm('Are you sure you want to delete this recipe?')) {
            await RecipeManager.deleteRecipe(id);
            loadRecipes(); // Reload list
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <header>
                <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>Ultimate Scraper</h1>
                <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)' }}>Extract data with ease.</p>
            </header>

            <div className="actions">
                <button
                    onClick={handleStart}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'var(--color-accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    + New Scraper
                </button>
            </div>

            <section className="recent-recipes">
                <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Saved Recipes</h3>
                {recipes.length === 0 ? (
                    <div style={{ padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: '8px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        No recipes found for this site.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {recipes.map(recipe => (
                            <div key={recipe.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>{recipe.name}</h4>
                                    <code style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '2px 4px', borderRadius: '4px' }}>{recipe.selector}</code>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => deleteRecipe(recipe.id)}
                                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Delete Recipe"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => loadRecipe(recipe)}
                                        style={{ background: '#ecfdf5', color: '#047857', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Load Recipe"
                                    >
                                        <Play size={16} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default WelcomeScreen;
