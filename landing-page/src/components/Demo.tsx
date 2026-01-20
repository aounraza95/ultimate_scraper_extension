import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Lock } from 'lucide-react';

const Demo: React.FC = () => {
    const [step, setStep] = useState(0);

    // Auto-play demo loop
    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const steps = [
        { title: "Point & Click", desc: "Select any element on the page." },
        { title: "Define Structure", desc: "Our engine detects the pattern." },
        { title: "Preview Data", desc: "See your rows instantly." },
        { title: "Export", desc: "Download as CSV or JSON." }
    ];

    return (
        <section className="py-32 px-6 md:px-8 bg-white relative overflow-hidden">

            <div className="container mx-auto max-w-screen-xl">

                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left Panel: Text & Steps */}
                    <div className="flex-1 max-w-lg">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Built for speed.</h2>
                            <p className="text-xl text-slate-500 leading-relaxed">
                                Don't waste time coding selectors. Just click what you want, and let Ultimate Scraper figure out the rest.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {steps.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${step === i ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'opacity-40 hover:opacity-70'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className={`text-lg font-bold mb-1 ${step === i ? 'text-blue-900' : 'text-slate-900'}`}>{s.title}</h4>
                                        <p className="text-sm text-slate-500">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Interactive Mockup */}
                    <div className="flex-1 w-full max-w-xl">
                        <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5 aspect-square">

                            {/* Browser Bar */}
                            <div className="h-10 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                </div>
                                <div className="flex-1 h-7 bg-white rounded-md border border-slate-200 flex items-center px-3 text-[10px] text-slate-400">
                                    <Lock size={10} className="mr-1.5 text-slate-300" /> example-store.com
                                </div>
                            </div>

                            {/* Content Mockup */}
                            <div className="p-8 grid grid-cols-2 gap-6 bg-slate-50/30 h-full relative">

                                {/* Overlay for Step 0 (Selection) */}
                                {step === 0 && (
                                    <motion.div
                                        layoutId="selector"
                                        className="absolute top-20 left-8 width-[40%] height-[120px] border-2 border-blue-500 bg-blue-500/10 rounded-lg z-20 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                                            H3.product-title
                                        </div>
                                    </motion.div>
                                )}

                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative group">
                                        <div className="aspect-video bg-slate-100 rounded-lg mb-3" />
                                        <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                                        <div className="h-3 w-1/2 bg-slate-100 rounded mb-4" />
                                        <div className="flex justify-between items-center">
                                            <div className="h-4 w-1/3 bg-blue-100 rounded-full" />
                                            <div className="h-6 w-16 bg-slate-900 rounded-md" />
                                        </div>
                                    </div>
                                ))}

                                {/* Cursor Animation */}
                                <motion.div
                                    className="absolute z-50 pointer-events-none text-slate-900"
                                    animate={{
                                        x: step === 0 ? "20%" : "80%",
                                        y: step === 0 ? "30%" : "80%",
                                        scale: step === 0 ? 1 : 0.8
                                    }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                >
                                    <MousePointer2 size={24} className="fill-black stroke-white stroke-2 drop-shadow-lg" />
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Demo;
