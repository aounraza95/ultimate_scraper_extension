import { Wand2, MousePointerClick, FileSpreadsheet, RefreshCw, Clock } from 'lucide-react';

const Features: React.FC = () => {
    return (
        <section className="py-32 px-6 md:px-8 bg-slate-50 relative overflow-hidden">

            <div className="container mx-auto max-w-screen-xl relative z-10">

                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Before Notchie vs. After Notchie</h2>
                    <p className="text-xl text-slate-500">
                        Okay, not actually Notchie. But seriously, see how we compare to the old way of scraping.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Feature 1: The Magic Selector (Large) */}
                    <div className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-10 overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-200/40 hover:border-blue-200 transition-all duration-300">
                        <div className="relative z-10 max-w-lg">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-8 text-blue-600">
                                <Wand2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Structural Selection</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                Our engine looks beyond CSS classes. It understands the structural hierarchy of the DOM, ensuring selections assume the correct path even when classes change.
                            </p>
                        </div>

                        {/* Visual: DOM Tree (Light Mode) */}
                        <div className="absolute right-0 bottom-0 top-0 w-2/3 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none md:block hidden" />
                        <div className="absolute right-10 bottom-10 w-72 p-6 rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 skew-y-3 transform origin-bottom-right group-hover:skew-y-0 group-hover:scale-105 transition-all duration-500">
                            <div className="space-y-3 font-mono text-[11px] text-slate-400">
                                <div className="pl-0 text-slate-300">&lt;div class="product"&gt;</div>
                                <div className="pl-4 border-l border-slate-100 text-slate-600 bg-slate-50/50 p-1 rounded">&lt;h2&gt;Product Title&lt;/h2&gt;</div>
                                <div className="pl-4 border-l border-slate-100 flex items-center gap-2">
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">&lt;span&gt;$99.00&lt;/span&gt;</span>
                                    <div className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">Target</div>
                                </div>
                                <div className="pl-0 text-slate-300">&lt;/div&gt;</div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Pagination */}
                    <div className="group relative rounded-3xl bg-white border border-slate-200 p-10 overflow-hidden shadow-xl shadow-slate-200/40 hover:border-violet-200 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-8 text-violet-600">
                            <MousePointerClick size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Auto-Pagination</h3>
                        <p className="text-slate-500 text-lg">
                            Detects "Next" buttons and infinite scroll zones automatically.
                        </p>

                        {/* Visual: Pagination Buttons */}
                        <div className="absolute bottom-8 right-8 flex gap-3">
                            <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400">1</div>
                            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-slate-900/20 scale-110">2</div>
                            <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400">3</div>
                        </div>
                    </div>

                    {/* Feature 3: Export */}
                    <div className="group relative rounded-3xl bg-white border border-slate-200 p-10 overflow-hidden shadow-xl shadow-slate-200/40 hover:border-emerald-200 transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8 text-emerald-600">
                            <FileSpreadsheet size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Export to Anything</h3>
                        <p className="text-slate-500 text-lg">
                            CSV, JSON, Excel, or direct Webhook integration.
                        </p>
                    </div>

                    {/* Feature 4: Automation (Large) */}
                    <div className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-10 overflow-hidden shadow-xl shadow-slate-200/40 hover:border-amber-200 transition-all duration-300">
                        <div className="relative z-10 max-w-lg">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-8 text-amber-600">
                                <RefreshCw size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Scheduled Runs</h3>
                            <p className="text-slate-500 text-lg">
                                Set it and forget it. Run your recipes on a cloud schedule to monitor price changes or content updates without keeping your browser open.
                            </p>
                        </div>

                        <div className="absolute right-8 bottom-8 flex gap-4">
                            <div className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold flex items-center gap-2">
                                <Clock size={14} /> Daily @ 9:00 AM
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 text-xs font-bold flex items-center gap-2 opacity-50">
                                <Clock size={14} /> Weekly
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
