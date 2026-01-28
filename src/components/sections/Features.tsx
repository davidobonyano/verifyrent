"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldAlert, Building2, Smartphone, CheckCircle2, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

export function Features() {
    return (
        <section className="py-32 bg-vr-navy relative overflow-hidden" id="verification">
            {/* Ambient emerald glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-vr-teal/5 blur-[100px] -ml-44" />

            <div className="section-container">
                <div className="flex flex-col mb-24">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-vr-teal mb-4">The Workshop</span>
                    <h2 className="text-5xl md:text-8xl font-serif font-bold text-vr-cream leading-tight max-w-4xl">TOOLS OF <br /> <span className="text-vr-teal italic">THE REGISTRY.</span></h2>
                </div>

                {/* Material Grid / Raw Assets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {[
                        {
                            title: "DEED AUDIT",
                            label: "The Core",
                            desc: "Every land title is verified against government registries. No fake papers permitted.",
                            bg: "bg-vr-iron",
                            image: "/images/deed_audit_visual_1769585504330.png"
                        },
                        {
                            title: "BIOMETRIC LOG",
                            label: "The Grain",
                            desc: "Agents must log GPS and biometric check-ins at the property. Proof of presence is mandatory.",
                            bg: "bg-vr-navy",
                            image: "/images/biometric_log_visual_1769585694956.png"
                        },
                        {
                            title: "ESCROW IRON",
                            label: "The Bond",
                            desc: "Payment is held in our neutral trust layer until keys are successfully exchanged.",
                            bg: "bg-vr-iron",
                            image: "/images/hero_luxury_apartment_reforge_1769584491562.png" // Fallback since escrow failed
                        },
                        {
                            title: "DIRECT ACCESS",
                            label: "The Edge",
                            desc: "Cut through the middleman. Interact directly with verified landlords to save on fees.",
                            bg: "bg-vr-navy",
                            image: "/images/verifyrent_bold_ambassador_1769584850475.png" // Use ambassador as the 'direct' face
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${feature.bg} relative overflow-hidden border border-vr-silver/10 hover:border-vr-teal/50 transition-heavy group burn-in`}
                        >
                            <div className="h-40 relative opacity-40 group-hover:opacity-60 transition-heavy overflow-hidden grayscale group-hover:grayscale-0">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-heavy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-vr-iron via-transparent to-transparent" />
                            </div>

                            <div className="p-8 relative z-10">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vr-teal mb-4 block opacity-50">{feature.label}</span>
                                <h4 className="text-xl font-serif font-bold text-vr-cream mb-4">{feature.title}</h4>
                                <p className="text-xs text-vr-cream/40 leading-relaxed mb-8">
                                    {feature.desc}
                                </p>
                                <div className="flex justify-between items-center group-hover:translate-x-1 transition-heavy">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-vr-teal">Audit Protocol</span>
                                    <ChevronRight className="w-4 h-4 text-vr-teal" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* The Assembly / Craftsmanship */}
                <div className="space-y-px bg-vr-silver/10 border border-vr-silver/10">
                    {[
                        { step: "HAND-VERIFIED", title: "Physical Inquest", desc: "Our field team physically stands in the flat, testing doors, checking plumbing, and verifying the VR-ID code on the wall." },
                        { step: "POLISHED", title: "Title Scrubbing", desc: "No listing goes public without a 24-hour legal scrub. We ensure the person listing has the right to collect your money." },
                        { step: "SEASONED", title: "Trust Scores", desc: "History is our heat. Providers are aged by their successful rentals and high tenant feedback scores." }
                    ].map((row, i) => (
                        <div key={i} className="group relative bg-vr-navy p-12 overflow-hidden hover:bg-vr-iron transition-heavy cursor-default">
                            <div className="absolute inset-0 bg-vr-teal/5 opacity-0 group-hover:opacity-100 transition-heavy pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="max-w-md">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-teal mb-2 block">{row.step}</span>
                                    <h4 className="text-3xl font-serif font-bold text-vr-cream">{row.title}</h4>
                                </div>
                                <p className="text-sm text-vr-cream/40 max-w-sm leading-relaxed group-hover:text-vr-cream/60 transition-heavy">
                                    {row.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Final Stamp */}
                <div className="mt-40 bg-vr-teal p-16 md:p-24 flex flex-col items-center text-center shadow-[0_30px_100px_rgba(184,134,11,0.2)]">
                    <span className="text-xs font-bold uppercase tracking-[0.5em] text-vr-navy mb-8">Official Guarantee</span>
                    <h4 className="text-5xl md:text-7xl font-serif font-bold text-vr-navy mb-12 leading-tight">THE SEAL OF <br /> INTEGRITY.</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-left mb-16 max-w-4xl mx-auto">
                        {[
                            "Zero Ghost Listing Policy",
                            "Identity-Matched Ownership",
                            "Biometric Check-in Logged",
                            "Legal Tenancy Framework"
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-4 text-vr-navy font-bold uppercase tracking-widest text-sm border-b border-vr-navy/10 pb-4">
                                <CheckCircle2 className="w-5 h-5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Button className="bg-vr-navy text-vr-teal hover:bg-vr-navy/90 h-20 px-16 text-lg font-bold rounded-none shadow-[0_10px_0_#000]">
                        GET VERIFIED NOW
                    </Button>
                </div>
            </div>
        </section>
    );
}
