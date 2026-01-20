import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Command, Wifi, Database, Clock, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-32 pb-32 px-6 md:px-8 flex flex-col items-center overflow-hidden bg-white">

            {/* Background Glows (Notchie Style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-200/50 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-multiply opacity-60" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-multiply" />

            <div className="container mx-auto max-w-screen-xl relative z-10 flex flex-col items-center text-center">

                {/* Floating Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm font-semibold text-slate-600">Ultimate Scraper 2.0 is here</span>
                        <ArrowRight size={14} className="text-slate-400 ml-1" />
                    </div>
                </motion.div>

                {/* Massive Typography */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.05] max-w-5xl"
                >
                    Read the web.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Structure everything.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium"
                >
                    Turn any website into a clean API or CSV. <br className="hidden md:block" />
                    No code required. Just point, click, and extract.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-20"
                >
                    <button className="h-14 px-8 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1">
                        <Download size={20} />
                        Get Extension - Free
                    </button>
                    <button className="h-14 px-8 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
                        View Documentation
                    </button>
                </motion.div>

                {/* Product Visualization with Glow */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full relative px-4"
                >
                    {/* The "Notchie" Glow Behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-[80px] rounded-[3rem] -z-10" />

                    <div className="relative mx-auto max-w-[1200px] rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5">

                        {/* Browser Chrome (Light Mode) */}
                        <div className="h-12 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex items-center px-6 gap-4">
                            <div className="flex gap-2">
                                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300" />
                                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300" />
                                <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300" />
                            </div>
                            <div className="flex-1 max-w-lg mx-auto h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs text-slate-400 font-medium gap-2">
                                <span className="text-emerald-500">🔒</span> ultimatescraper.io/app
                            </div>
                            <div className="w-16"></div>
                        </div>

                        {/* App Interface Mockup (Light Mode) */}
                        <div className="flex h-[600px] bg-slate-50/50">

                            {/* Sidebar */}
                            <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-8">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                        <Command size={18} />
                                    </div>
                                    Ultimate
                                </div>
                                <div className="space-y-1">
                                    {['Dashboard', 'Projects', 'Recipes', 'Schedules', 'Settings'].map((item, i) => (
                                        <div key={item} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex justify-between items-center ${i === 0 ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto p-4 rounded-xl bg-slate-100 border border-slate-200">
                                    <div className="flex items-center gap-2 text-slate-700 text-xs font-bold mb-1">
                                        <Wifi size={12} className="text-emerald-500" /> System Status
                                    </div>
                                    <div className="text-[10px] text-slate-500">All systems operational</div>
                                </div>
                            </div>

                            {/* Main Canvas */}
                            <div className="flex-1 p-8 flex flex-col relative overflow-hidden bg-white">

                                {/* Header Stats */}
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold text-slate-900">Amazon Price Monitor</h2>
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">RUNNING</span>
                                        </div>
                                        <div className="flex gap-6 text-xs font-medium text-slate-500">
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> Started 12m ago</span>
                                            <span className="flex items-center gap-1.5"><Database size={14} className="text-slate-400" /> 1,420 rows</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="h-9 px-4 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50">Export Data</button>
                                        <button className="h-9 px-4 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-lg shadow-slate-900/20">New Recipe</button>
                                    </div>
                                </div>

                                {/* Table Mockup */}
                                <div className="flex-1 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden relative">

                                    {/* Scanning Line Animation (Blue) */}
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-10 opacity-50"
                                        animate={{ top: ['0%', '100%'], opacity: [0, 0.5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />

                                    <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-100 text-[11px] font-semibold text-slate-400 bg-slate-50/50 uppercase tracking-wider">
                                        <div className="col-span-1">Status</div>
                                        <div className="col-span-1">ASIN</div>
                                        <div className="col-span-2">PRODUCT NAME</div>
                                        <div className="col-span-1 text-right">PRICE</div>
                                    </div>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-slate-100/50 text-sm text-slate-600 font-medium hover:bg-blue-50/30 transition-colors items-center group cursor-default">
                                            <div className="col-span-1">
                                                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                                                    <CheckCircle2 size={14} className="fill-emerald-100 text-emerald-600" /> Success
                                                </div>
                                            </div>
                                            <div className="col-span-1 font-mono text-slate-400 text-xs">B08{i}X9{i}Z</div>
                                            <div className="col-span-2 truncate text-slate-900">Sony WH-1000XM{i} Wireless Noise Canceling</div>
                                            <div className="col-span-1 text-right text-slate-900 font-bold">$34{i}.00</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
