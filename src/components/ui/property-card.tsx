"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MapPin, BedDouble, Bath, CheckCircle2, Phone, ChevronLeft, ChevronRight, Flag, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
    id: string;
    title: string;
    price: string;
    location: string;
    type: string;
    beds: number;
    baths: number;
    sqft?: string;
    isDirectLandlord: boolean;
    images?: string[];
    agentId?: string;
    agentName?: string;
}

export function PropertyCard({
    id, title, price, location, type, beds, baths, isDirectLandlord, images = [], agentId = "agt-1", agentName = "Olakunle Williams"
}: PropertyCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [reportText, setReportText] = useState("");

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative bg-vr-iron border border-vr-silver/10 overflow-hidden burn-in patina"
            >
                <Link href={`/properties/${id}`}>
                    <div className="relative aspect-[4/3] bg-vr-navy overflow-hidden">
                        <AnimatePresence mode="wait">
                            {images.length > 0 ? (
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    alt={title}
                                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px) brightness(0.5)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-heavy group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-vr-teal/20">
                                    <ShieldCheck className="w-16 h-16" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Encrypted Asset</span>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Industrial Overlays */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-vr-navy/80 to-transparent pointer-events-none" />

                        {/* Navigation Arrows (Heavy Industrial) */}
                        {images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-heavy">
                                <button onClick={prevImage} className="w-10 h-10 bg-vr-navy/80 border border-vr-teal/20 text-vr-teal hover:bg-vr-teal hover:text-vr-navy transition-heavy">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={nextImage} className="w-10 h-10 bg-vr-navy/80 border border-vr-teal/20 text-vr-teal hover:bg-vr-teal hover:text-vr-navy transition-heavy">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Status Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                            <div className="px-3 py-1 bg-vr-teal text-vr-navy text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                                VERIFIED
                            </div>
                            {isDirectLandlord && (
                                <div className="px-3 py-1 bg-vr-iron border border-vr-teal/30 text-vr-teal text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                    DIRECT LANDLORD
                                </div>
                            )}
                        </div>

                        {/* The Stamp (VR-ID) */}
                        <div className="absolute bottom-6 left-6 z-10">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold text-vr-teal uppercase tracking-[0.4em] mb-1">Registry Code</span>
                                <div className="px-2 py-1 bg-vr-navy/80 border-l-2 border-vr-teal text-vr-cream text-xs font-mono font-bold tracking-tighter">
                                    {id}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="p-8 border-t border-vr-silver/10">
                    <div className="flex justify-between items-end mb-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] mb-2">{type}</span>
                            <Link href={`/properties/${id}`}>
                                <h3 className="text-2xl font-serif font-bold text-vr-cream group-hover:text-vr-teal transition-heavy leading-none">
                                    {title}
                                </h3>
                            </Link>
                        </div>
                        <div className="text-right">
                            <span className="text-[8px] font-bold text-vr-cream/30 uppercase tracking-widest block mb-1">Annual Fee</span>
                            <span className="text-2xl font-serif font-bold text-vr-teal">₦{price}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-vr-cream/40 text-[10px] font-bold uppercase tracking-widest mb-8">
                        <MapPin className="w-3.5 h-3.5 text-vr-teal" />
                        {location}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-vr-navy border border-vr-silver/5">
                            <BedDouble className="w-4 h-4 text-vr-teal/40" />
                            <span className="text-[10px] font-bold text-vr-cream/60 uppercase tracking-widest">{beds} SLEEPING</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-vr-navy border border-vr-silver/5">
                            <Bath className="w-4 h-4 text-vr-teal/40" />
                            <span className="text-[10px] font-bold text-vr-cream/60 uppercase tracking-widest">{baths} BATHS</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-vr-silver/10">
                        <Link href={`/agent/${agentId}`} className="flex items-center gap-3 group/agent">
                            <div className="w-10 h-10 border border-vr-silver/20 overflow-hidden grayscale group-hover/agent:grayscale-0 transition-heavy">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                                    alt={agentName}
                                    className="w-full h-full object-cover scale-110 group-hover/agent:scale-100 transition-heavy"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[8px] font-bold text-vr-teal uppercase tracking-widest leading-none mb-1">Audited By</span>
                                <span className="text-xs font-bold text-vr-cream group-hover/agent:text-vr-teal transition-heavy">{agentName}</span>
                            </div>
                        </Link>

                        <div className="flex gap-2">
                            <a
                                href={`https://wa.me/2348100000000?text=I'm%20interested%20in%20Verified%20Property%20${id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-vr-teal/20 flex items-center justify-center text-vr-teal hover:bg-vr-teal hover:text-vr-navy transition-heavy"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsReportModalOpen(true);
                                }}
                                className="w-10 h-10 border border-vr-navy flex items-center justify-center text-vr-cream/20 hover:text-red-500 hover:border-red-500 transition-heavy group/flag"
                                title="Report Record"
                            >
                                <Flag className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Report Protocol Modal */}
            <AnimatePresence>
                {isReportModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-vr-navy/90 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsReportModalOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-vr-iron border border-vr-silver/20 p-8 max-w-md w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-serif font-bold text-vr-cream uppercase tracking-tight">Report Protocol</h4>
                                    <p className="text-[10px] font-bold text-vr-teal uppercase tracking-widest leading-none">Inquest ID: {id}</p>
                                </div>
                            </div>

                            <p className="text-xs text-vr-cream/60 leading-relaxed mb-6 font-medium">
                                Submit a formal discrepancy report regarding this listing, agent, or landlord. Our audit team will investigate the claim within 24 hours.
                            </p>

                            <textarea
                                className="w-full h-32 bg-vr-navy border border-vr-silver/10 p-4 text-vr-cream text-sm placeholder:text-vr-cream/20 focus:border-vr-teal/50 focus:outline-none transition-heavy mb-6 resize-none font-bold"
                                placeholder="State the discrepancy clearly (e.g. Agent requested advance inspection fee, Landlord is not the owner, Photos are misleading)..."
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                autoFocus
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsReportModalOpen(false)}
                                    className="flex-1 py-4 border border-vr-silver/10 text-[10px] font-bold uppercase tracking-widest text-vr-cream/40 hover:text-vr-cream transition-heavy"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!reportText.trim()}
                                    onClick={() => {
                                        setIsReportModalOpen(false);
                                        setIsSuccessModalOpen(true);
                                        setReportText("");
                                    }}
                                    className="flex-1 py-4 bg-red-600 disabled:bg-vr-silver/10 disabled:text-vr-cream/20 text-vr-navy text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 transition-heavy border-b-4 border-red-900 active:border-b-0 active:translate-y-1"
                                >
                                    Submit Protocol
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Protocol Modal */}
            <AnimatePresence>
                {isSuccessModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-vr-navy/90 backdrop-blur-md"
                        onClick={() => setIsSuccessModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-vr-teal border-4 border-vr-navy p-10 max-w-sm w-full shadow-[20px_20px_0_rgba(0,0,0,0.5)] relative text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-20 h-20 bg-vr-navy flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <ShieldCheck className="w-10 h-10 text-vr-teal" />
                            </div>

                            <h4 className="text-2xl font-serif font-black text-vr-navy uppercase tracking-tighter mb-4 leading-none">DISCREPANCY <br /> LOGGED.</h4>

                            <div className="h-[2px] w-12 bg-vr-navy/20 mx-auto mb-6" />

                            <p className="text-xs text-vr-navy font-bold uppercase tracking-widest leading-relaxed mb-10">
                                Our audit team has been <span className="underlineDecoration">officially dispatched</span>. Investigation of Inquest {id} will conclude within 24 hours.
                            </p>

                            <button
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="w-full py-4 bg-vr-navy text-vr-teal text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-vr-navy/90 transition-heavy shadow-[0_6px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1"
                            >
                                Acknowledge
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
