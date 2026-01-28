"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-40 pb-32 md:pt-64 md:pb-48 bg-vr-navy overflow-hidden">
            {/* Background Image: Luxury Apartment */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/hero_luxury_apartment_reforge_1769584491562.png"
                    alt="Luxury Verfied Property"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-vr-navy via-vr-navy/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-vr-navy via-transparent to-vr-navy/50" />
            </div>

            {/* Industrial Texture Overlay */}
            <div className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="section-container relative z-20">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="flex-1 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="mb-8 flex items-center gap-4"
                        >
                            <div className="h-[2px] w-12 bg-vr-teal" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-teal">National Registry Protocol</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-9xl font-serif font-bold text-vr-cream leading-[0.9] mb-12 drop-shadow-2xl"
                        >
                            RENT WITH <br />
                            <span className="text-vr-teal italic">IRON-CLAD TRUST.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="max-w-2xl"
                        >
                            <p className="text-xl md:text-2xl text-vr-cream/70 mb-12 leading-relaxed font-light drop-shadow-lg">
                                We've killed the friction of Nigerian rentals.
                                <span className="text-vr-cream font-medium"> Verified homes</span> delivered with technical and legal certainty.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Button size="lg" className="h-20 px-12 btn-primary min-w-[280px]" onClick={() => window.location.href = '/properties'}>
                                    START INQUEST <ArrowUpRight className="ml-3 w-6 h-6" />
                                </Button>
                                <Button size="lg" variant="outline" className="h-20 px-12 btn-outline min-w-[280px]" onClick={() => window.location.href = '/verify'}>
                                    RUN VR-ID SCAN
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Floating Trust Card (Ambassador) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="relative w-full max-w-md lg:w-[450px] aspect-[4/5] bg-vr-iron p-2 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-vr-silver/10 translate-y-12"
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            <Image
                                src="/images/verifyrent_bold_ambassador_1769584850475.png"
                                alt="Official VerifyRent Ambassador"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-vr-navy via-transparent to-transparent opacity-60" />

                            {/* Overlay Label */}
                            <div className="absolute bottom-10 left-10 right-10">
                                <span className="inline-block px-4 py-1.5 bg-vr-teal text-vr-navy text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Registry Authenticator</span>
                                <h3 className="text-3xl font-serif font-bold text-vr-cream leading-tight">THE FACE OF <br />VERIFICATION.</h3>
                                <div className="mt-6 flex items-center gap-4 border-t border-vr-silver/10 pt-6">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-vr-navy bg-vr-iron flex items-center justify-center overflow-hidden">
                                                <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" width={32} height={32} />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-bold text-vr-cream/40 uppercase tracking-widest">5,000+ AUDITS COMPLETED</p>
                                </div>
                            </div>

                            {/* Seal */}
                            <div className="absolute top-10 right-10 w-24 h-24 border border-vr-teal/30 flex items-center justify-center backdrop-blur-md">
                                <div className="text-center">
                                    <p className="text-[8px] font-bold text-vr-teal uppercase tracking-tighter leading-none mb-1">OFFICIAL</p>
                                    <p className="text-lg font-serif font-bold text-vr-teal leading-none">SEAL</p>
                                    <p className="text-[8px] font-bold text-vr-teal uppercase tracking-tighter leading-none mt-1">2026</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scrolling Banner (Industrial) */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-vr-iron/80 backdrop-blur-md flex items-center overflow-hidden border-t border-vr-silver/20 z-30">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-6">
                            <CheckCircle2 className="w-4 h-4 text-vr-teal" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-cream/60">
                                Direct Landlord Verified • Lagos High Court Registered • Biometric Security Logged • 0% Fraud Guarantee
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
