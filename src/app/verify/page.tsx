"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, ShieldCheck, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyPage() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            if (query.toLowerCase().includes("lekki")) {
                setResult({
                    status: "verified",
                    id: "VR-2024-LEK-01",
                    address: "Plot 15, Admiralty Way, Lekki Phase 1, Lagos",
                    type: "3 Bedroom Apartment",
                    verifiedDate: "Jan 15, 2024",
                    source: "Direct Landlord",
                    images: true,
                });
            } else {
                setResult({
                    status: "not_found",
                });
            }
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen bg-vr-navy">
            <Navbar />
            <main className="flex-grow pt-40 pb-32">
                <div className="section-container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-vr-teal mb-4 block">Asset Validation</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-vr-cream mb-6 tracking-tight">PROPERTY <br /><span className="text-vr-teal italic">INQUEST.</span></h1>
                        <p className="text-vr-cream/40 max-w-md mx-auto text-sm font-medium uppercase tracking-widest leading-relaxed">Enter a Registry ID or physical address to run a verification protocol.</p>
                    </motion.div>

                    <form onSubmit={handleSearch} className="relative mb-20 group">
                        <div className="flex flex-col md:flex-row gap-2 bg-vr-iron p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-vr-silver/10 transition-heavy focus-within:border-vr-teal/50">
                            <div className="flex-1 flex items-center px-6 py-4 md:py-0">
                                <Search className="text-vr-teal/30 mr-4 w-5 h-5 transition-heavy group-focus-within:text-vr-teal group-focus-within:scale-110" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="VR-2024-LEK-01 OR ADDRESS..."
                                    className="w-full bg-transparent text-lg outline-none font-bold uppercase tracking-widest text-vr-cream placeholder:text-vr-cream/10"
                                />
                            </div>
                            <Button type="submit" size="lg" className="h-16 btn-primary min-w-[200px]" disabled={isSearching}>
                                {isSearching ? "SCANNING..." : "RUN PROTOCOL"}
                            </Button>
                        </div>
                    </form>

                    <AnimatePresence mode="wait">
                        {isSearching && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="w-20 h-20 border-2 border-vr-teal/10 border-t-vr-teal rounded-none animate-spin mb-8 shadow-[0_0_30px_rgba(184,134,11,0.2)]" />
                                <p className="text-vr-teal font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">Querying National Registry Database...</p>
                            </motion.div>
                        )}

                        {result && !isSearching && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-vr-iron border border-vr-silver/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden patina burn-in"
                            >
                                {result.status === "verified" ? (
                                    <div className="p-8 md:p-16 border-l-8 border-vr-teal relative overflow-hidden">
                                        {/* Background ID stamp */}
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[15rem] font-bold text-vr-cream/[0.02] pointer-events-none select-none">
                                            {result.id.split('-').pop()}
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                                            <div className="w-28 h-28 bg-vr-navy flex items-center justify-center flex-shrink-0 border border-vr-teal/20 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                                <ShieldCheck className="w-14 h-14 text-vr-teal" />
                                                <div className="absolute inset-0 border border-vr-teal/5 animate-pulse" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                                    <span className="px-4 py-1.5 bg-vr-teal text-vr-navy text-[10px] font-bold uppercase tracking-[0.2em]">VERIFIED RECORD</span>
                                                    <span className="font-mono text-sm text-vr-cream/30 font-bold">{result.id}</span>
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-vr-cream mb-8 leading-tight">{result.address}</h2>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-vr-silver/10">
                                                    <div>
                                                        <p className="text-[10px] text-vr-teal uppercase font-bold tracking-[0.2em] mb-3">Asset Type</p>
                                                        <p className="text-lg font-serif font-bold text-vr-cream">{result.type}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-vr-teal uppercase font-bold tracking-[0.2em] mb-3">Audit Date</p>
                                                        <p className="text-lg font-serif font-bold text-vr-cream">{result.verifiedDate}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-vr-teal uppercase font-bold tracking-[0.2em] mb-3">Source Channel</p>
                                                        <p className="text-lg font-serif font-bold text-vr-teal flex items-center gap-2">
                                                            <CheckCircle2 className="w-5 h-5" />
                                                            {result.source}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-12 p-8 bg-vr-navy/80 border-l-4 border-vr-teal flex items-start gap-6">
                                                    <AlertCircle className="w-8 h-8 text-vr-teal/60 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="text-xs font-bold text-vr-cream uppercase tracking-widest mb-3">Security Protocol 04-B</h4>
                                                        <p className="text-[11px] text-vr-cream/50 leading-relaxed font-medium uppercase tracking-wider">
                                                            Confirmed on-site inspection completed. Ownership deeds authenticated.
                                                            Exclusively authorize payments through the registered channel confirmed in this record.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-16 md:p-24 text-center border-l-8 border-red-900/40 relative overflow-hidden">
                                        <div className="w-24 h-24 bg-vr-navy flex items-center justify-center mx-auto mb-10 border border-vr-silver/10">
                                            <AlertCircle className="w-12 h-12 text-vr-cream/10" />
                                        </div>
                                        <h2 className="text-4xl font-serif font-bold text-vr-cream mb-4 uppercase tracking-tight">Accession Failed</h2>
                                        <p className="text-vr-cream/40 max-w-md mx-auto mb-12 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                                            The requested record is absent from the National Registry. The asset may be in transition or failed current audit protocols.
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                                            <Button variant="outline" className="btn-outline min-w-[200px]">REPORT FRAUD</Button>
                                            <Button className="btn-primary min-w-[200px]">REQUEST AUDIT</Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-32 grid md:grid-cols-3 gap-1px bg-vr-silver/10 border border-vr-silver/10">
                        <div className="p-10 bg-vr-navy hover:bg-vr-iron transition-heavy group">
                            <div className="w-12 h-12 bg-vr-teal/5 flex items-center justify-center mb-6 border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                <MapPin className="w-5 h-5 transition-heavy" />
                            </div>
                            <h4 className="text-[10px] font-bold text-vr-cream uppercase tracking-[0.3em] mb-2">GPS Authenticated</h4>
                            <p className="text-[10px] text-vr-cream/30 uppercase tracking-widest leading-loose">Physical location pinned via satellite audit.</p>
                        </div>
                        <div className="p-10 bg-vr-navy hover:bg-vr-iron transition-heavy group">
                            <div className="w-12 h-12 bg-vr-teal/5 flex items-center justify-center mb-6 border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                <ShieldCheck className="w-5 h-5 transition-heavy" />
                            </div>
                            <h4 className="text-[10px] font-bold text-vr-cream uppercase tracking-[0.3em] mb-2">Title Shield</h4>
                            <p className="text-[10px] text-vr-cream/30 uppercase tracking-widest leading-loose">Deeds and identity records fully cross-examined.</p>
                        </div>
                        <div className="p-10 bg-vr-navy hover:bg-vr-iron transition-heavy group">
                            <div className="w-12 h-12 bg-vr-teal/5 flex items-center justify-center mb-6 border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                <CheckCircle2 className="w-5 h-5 transition-heavy" />
                            </div>
                            <h4 className="text-[10px] font-bold text-vr-cream uppercase tracking-[0.3em] mb-2">Integrity Lock</h4>
                            <p className="text-[10px] text-vr-cream/30 uppercase tracking-widest leading-loose">Zero-tolerance gateway for phantom listings.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
