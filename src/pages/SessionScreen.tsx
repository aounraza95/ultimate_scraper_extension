
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScraperStore } from '../store/scraperStore';
import { RecipeManager, Recipe } from '../utils/recipeManager';


interface SelectionData {
    tagName: string;
    className: string;
    innerText: string;
    selector: string;
    similarCount: number;
}

const SessionScreen: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lastSelection, setLastSelection] = useState<SelectionData | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    // Scraper State
    const { addItems, scrapedCount } = useScraperStore();
    const [isScraping, setIsScraping] = useState(false);

    // Save Recipe State
    const [recipeName, setRecipeName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Pagination State
    const [nextButtonSelector, setNextButtonSelector] = useState<string | null>(null);
    const [isSelectingNextBtn, setIsSelectingNextBtn] = useState(false);

    useEffect(() => {
        // Check for passed recipe
        if (location.state?.recipe) {
            const recipe = location.state.recipe as Recipe;
            console.log('Loading Recipe:', recipe);
            setLastSelection({
                tagName: 'Saved Recipe',
                className: 'custom-selector',
                innerText: recipe.name,
                selector: recipe.selector,
                similarCount: 0 // Unknown until we run
            });
            if (recipe.paginationSelector) {
                setNextButtonSelector(recipe.paginationSelector);
            }
        }

        // Listen for messages from Content Script
        const handleMessage = (message: any) => {
            if (message.action === 'ELEMENT_SELECTED') {
                const payload = message.payload as SelectionData;
                console.log('Side Panel received selection:', payload);
                setLastSelection(payload);
                // Reset pagination if new main item selected? Maybe not, keep flexible.
            }
            if (message.action === 'NEXT_BUTTON_SELECTED') {
                console.log('Next Button Selected:', message.payload);
                setNextButtonSelector(message.payload.selector);
                setIsSelectingNextBtn(false);
            }
            if (message.action === 'DATA_SCRAPED') {
                const items = message.payload.items;
                addItems(items);
            }
            if (message.action === 'SCROLL_STOPPED' || message.action === 'PAGINATION_STOPPED') {
                setIsScraping(false);
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);
        return () => chrome.runtime.onMessage.removeListener(handleMessage);
    }, []);

    const toggleSelection = () => {
        const newState = !isSelecting;
        setIsSelecting(newState);
        if (newState) setIsSelectingNextBtn(false); // Can't do both

        // Send message to active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: newState ? 'START_SELECTION' : 'STOP_SELECTION'
                });
            }
        });
    };

    const pickNextButton = () => {
        setIsSelectingNextBtn(true);
        setIsSelecting(false); // Ensure main selection is off
        setNextButtonSelector(null);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'START_PAGINATION_SELECTION' });
            }
        });
    };

    const toggleScraper = () => {
        if (!lastSelection) return;

        const newState = !isScraping;
        setIsScraping(newState);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                if (nextButtonSelector) {
                    // Pagination Mode
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: newState ? 'START_PAGINATION' : 'STOP_PAGINATION',
                        payload: {
                            nextBtnSelector: nextButtonSelector,
                            itemSelector: lastSelection.selector
                        }
                    });
                } else {
                    // Auto Scroll active
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: newState ? 'START_AUTO_SCROLL' : 'STOP_AUTO_SCROLL',
                        payload: { selector: lastSelection.selector }
                    });
                }
            }
        });
    };

    const handleSaveRecipe = async () => {
        if (!lastSelection || !recipeName) return;
        setIsSaving(true);
        try {
            // Get current tab domain
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab.url) throw new Error('No URL found');
            const url = new URL(tab.url);

            await RecipeManager.saveRecipe({
                name: recipeName,
                domain: url.hostname,
                selector: lastSelection.selector,
                paginationSelector: nextButtonSelector || undefined
            });
            alert('Recipe Saved!');
            setRecipeName('');
        } catch (error) {
            console.error('Failed to save recipe:', error);
            alert('Failed to save recipe');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100vh', boxSizing: 'border-box' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                >
                    ← Back
                </button>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Active Session</h2>
            </header>

            {/* Stats Bar */}
            {scrapedCount > 0 && (
                <div style={{ background: '#ecfdf5', color: '#047857', padding: '8px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                    Collected {scrapedCount} items
                    <button
                        onClick={() => navigate('/data')}
                        style={{ marginLeft: '10px', padding: '4px 8px', fontSize: '0.8rem', background: '#047857', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Review Data
                    </button>
                </div>
            )}

            <section style={{ flex: 1, border: '1px dashed var(--color-border)', borderRadius: '8px', overflow: 'auto', padding: '8px' }}>
                {lastSelection ? (
                    <div style={{ padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
                        <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>Selection Found</h3>
                        <p><strong>Tag:</strong> {lastSelection.tagName}</p>
                        <p><strong>Sample Pass:</strong> {lastSelection.innerText}</p>
                        <p><strong>Matches:</strong> {lastSelection.similarCount} items found</p>

                        {/* Pagination Config */}
                        <div style={{ marginTop: '16px', background: '#fff', padding: '8px', borderRadius: '4px' }}>
                            <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Pagination (Optional)</p>
                            {nextButtonSelector ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'green' }}>
                                    <span>✅ Next Button Set</span>
                                    <button onClick={pickNextButton} style={{ fontSize: '0.7rem' }}>Change</button>
                                </div>
                            ) : (
                                <button onClick={pickNextButton} disabled={isScraping || isSelectingNextBtn} style={{ width: '100%', fontSize: '0.9rem' }}>
                                    {isSelectingNextBtn ? 'Select Button on Page...' : 'Set "Next" Button'}
                                </button>
                            )}
                        </div>

                        {/* Save Recipe */}
                        <div style={{ marginTop: '16px', background: '#fff', padding: '8px', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <input
                                    type="text"
                                    placeholder="Recipe Name (e.g. Products)"
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    style={{ flex: 1, padding: '4px' }}
                                />
                                <button
                                    onClick={handleSaveRecipe}
                                    disabled={!recipeName || isSaving}
                                    style={{ fontSize: '0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px', borderTop: '1px solid #ccc', paddingTop: '16px' }}>
                            <button
                                onClick={toggleScraper}
                                style={{
                                    width: '100%',
                                    backgroundColor: isScraping ? '#ef4444' : '#10b981',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    padding: '10px'
                                }}
                            >
                                {isScraping
                                    ? (nextButtonSelector ? 'Stop Pagination' : 'Stop Auto-Scroll')
                                    : (nextButtonSelector ? 'Start Paged Scraping' : 'Start Auto-Scroll')
                                }
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button style={{ flex: 1 }} onClick={() => { setLastSelection(null); setNextButtonSelector(null); }}>
                                Discard
                            </button>
                        </div>
                    </div>
                ) : (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '40px' }}>
                        {isSelectingNextBtn ? 'Click the "Next" button on the webpage...' : (
                            isSelecting ? 'Click an element on the page...' : 'Press "Start Selecting" to begin.'
                        )}
                    </p>
                )}
            </section>

            <footer style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={toggleSelection}
                    disabled={isScraping || isSelectingNextBtn}
                    style={{
                        flex: 1,
                        backgroundColor: isSelecting ? '#ef4444' : 'var(--color-accent)',
                        color: 'white',
                        opacity: (isScraping || isSelectingNextBtn) ? 0.5 : 1
                    }}
                >
                    {isSelecting ? 'Stop Selecting' : 'Start Selecting'}
                </button>
                <button style={{ flex: 1 }}>Export</button>
            </footer>
        </div>
    );
};

export default SessionScreen;
