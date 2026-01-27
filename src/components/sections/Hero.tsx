"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, Users, Home, MapPin, ArrowUpRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-40 pb-32 md:pt-64 md:pb-48 bg-vr-navy overflow-hidden">
            {/* Ambient Lighting / Forge Glow */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-vr-teal/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-vr-copper/5 rounded-full blur-[120px] -ml-48 -mb-48" />

            {/* Industrial Texture Overlay */}
            <div className="absolute inset-0 -z-20 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="section-container">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="mb-8 flex items-center gap-4"
                    >
                        <div className="h-[2px] w-12 bg-vr-teal" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-teal">The Tenant's Registry.</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-serif font-bold text-vr-cream leading-[0.9] mb-12"
                    >
                        HOUSE HUNTING, <br />
                        <span className="text-vr-teal italic italic italic">REFORGED.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                    >
                        <div>
                            <p className="text-xl md:text-2xl text-vr-cream/50 mb-12 leading-relaxed font-light">
                                We've killed the friction of Nigerian rentals. No ghost listings, no fake agents.
                                <span className="text-vr-cream font-medium"> Just verified homes</span> delivered with iron-clad certainty.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Button size="lg" className="btn-primary min-w-[240px]" onClick={() => window.location.href = '/properties'}>
                                    START YOUR SEARCH <ArrowUpRight className="ml-3 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="btn-outline min-w-[240px]">
                                    TRUSTED BY 5,000+ TENANTS
                                </Button>
                            </div>
                        </div>

                        <div className="bg-vr-iron/50 border-l-4 border-vr-teal p-12 backdrop-blur-sm self-stretch flex flex-col justify-center">
                            <div className="space-y-10">
                                <div className="flex gap-6 items-start">
                                    <span className="text-4xl font-serif font-bold text-vr-teal/40">01</span>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-widest text-vr-cream mb-2">Effortless Discovery</h3>
                                        <p className="text-sm text-vr-cream/40 leading-relaxed">Filter by verified districts. See real photos, audited by our field team. No more wasted site visits.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <span className="text-4xl font-serif font-bold text-vr-teal/40">02</span>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-widest text-vr-cream mb-2">Safe Tenancy</h3>
                                        <p className="text-sm text-vr-cream/40 leading-relaxed">Connect directly with audited landlords. We match the paper to the person for your peace of mind.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scrolling Banner (Industrial) */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-vr-teal/10 flex items-center overflow-hidden border-t border-vr-silver/20">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <ShieldCheck className="w-4 h-4 text-vr-teal" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vr-teal/60">
                                Direct Landlord Verified • Lagos High Court Registered • Biometric Security Logged • 0% Fraud Guarantee
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
