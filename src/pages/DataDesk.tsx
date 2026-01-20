import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScraperStore } from '../store/scraperStore';
import { Trash2, ArrowLeft, Download } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToJSON } from '../utils/exportUtils';

const DataDesk: React.FC = () => {
    const navigate = useNavigate();
    const { scrapedData, scrapedCount, clearData, deleteItem } = useScraperStore();

    // Dynamically deduce headers from the first few items
    const sampleItems = scrapedData.slice(0, 5);
    const allKeys = new Set<string>();
    sampleItems.forEach(item => Object.keys(item).forEach(k => allKeys.add(k)));
    const headers = Array.from(allKeys).filter(k => k !== 'selector'); // Hide raw selector if desired

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px', background: '#f8fafc' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={() => navigate('/session')}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 style={{ margin: 0 }}>Data Desk</h2>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        onClick={() => exportToCSV(scrapedData)}
                        disabled={scrapedCount === 0}
                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: scrapedCount === 0 ? 0.5 : 1 }}
                        title="Export to CSV"
                    >
                        <Download size={16} /> CSV
                    </button>
                    <button
                        onClick={() => exportToJSON(scrapedData)}
                        disabled={scrapedCount === 0}
                        style={{ background: '#64748b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: scrapedCount === 0 ? 0.5 : 1 }}
                        title="Export to JSON"
                    >
                        <Download size={16} /> JSON
                    </button>
                    <button
                        onClick={() => exportToExcel(scrapedData)}
                        disabled={scrapedCount === 0}
                        style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: scrapedCount === 0 ? 0.5 : 1 }}
                        title="Export to Excel"
                    >
                        <Download size={16} /> Excel
                    </button>

                    <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>

                    <button
                        onClick={() => { if (confirm('Clear all data?')) clearData(); }}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        <Trash2 size={16} /> Clear
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, overflow: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white' }}>
                {scrapedData.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        No data collected yet.
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead style={{ position: 'sticky', top: 0, background: '#f1f5f9' }}>
                            <tr>
                                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>#</th>
                                {headers.map(h => (
                                    <th key={h} style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #cbd5e1', textTransform: 'capitalize' }}>
                                        {h}
                                    </th>
                                ))}
                                <th style={{ padding: '8px', width: '40px', borderBottom: '1px solid #cbd5e1' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {scrapedData.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '8px', color: '#94a3b8' }}>{idx + 1}</td>
                                    {headers.map(h => (
                                        <td key={`${idx}-${h}`} style={{ padding: '8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {String(row[h] || '')}
                                        </td>
                                    ))}
                                    <td style={{ padding: '8px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => deleteItem(idx)}
                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DataDesk;
