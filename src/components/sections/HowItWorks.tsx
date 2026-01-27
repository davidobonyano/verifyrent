"use client";

import { motion } from "framer-motion";
import { User, Briefcase, ChevronRight, FileCheck, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
    return (
        <section className="py-32 bg-vr-iron relative" id="how-it-works">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b border-vr-silver/10 pb-16">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-vr-teal mb-4 block">The Process</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-vr-cream leading-tight">WEIGHING THE <br /> <span className="text-vr-teal italic">INTEGRITY.</span></h2>
                    </div>
                    <p className="text-vr-cream/40 max-w-xs text-sm leading-relaxed mb-2">
                        Every listing on VerifyRent undergoes a trial by fire. We audit the person, the paper, and the property.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-vr-silver/10 border border-vr-silver/10">
                    {[
                        {
                            step: "01",
                            title: "THE ANVIL",
                            label: "Registration",
                            desc: "Providers submit deed of ownership & biometrics. We strip away the anonymous and solidify the identity.",
                            icon: User
                        },
                        {
                            step: "02",
                            title: "THE QUENCH",
                            label: "Physical Audit",
                            desc: "Our agents perform a 'cold-truth' inspection. GPS pins are logged, and keys are confirmed on-site.",
                            icon: MapPin
                        },
                        {
                            step: "03",
                            title: "THE STAMP",
                            label: "Verification",
                            desc: "Only after passing the trial is the VR-ID stamped. Your property is now part of the iron-clad registry.",
                            icon: FileCheck
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-vr-navy p-12 hover:bg-vr-iron transition-heavy group cursor-default"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <span className="text-6xl font-serif font-bold text-vr-teal/10 group-hover:text-vr-teal/30 transition-heavy leading-none">{item.step}</span>
                                <div className="w-12 h-12 bg-vr-teal/5 flex items-center justify-center text-vr-teal rounded-none border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                    <item.icon className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vr-teal">{item.label}</span>
                                <h3 className="text-2xl font-serif font-bold text-vr-cream mt-2">{item.title}</h3>
                            </div>

                            <p className="text-vr-cream/40 text-sm leading-relaxed mb-8 group-hover:text-vr-cream/60 transition-heavy">
                                {item.desc}
                            </p>

                            <div className="h-[1px] w-0 bg-vr-teal group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-px bg-vr-silver/10 border border-vr-silver/10 overflow-hidden">
                    <div className="bg-vr-navy p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-vr-teal mb-6">FOR THE TENANT</h3>
                            <p className="text-vr-cream/40 text-sm leading-relaxed mb-8">
                                House hunting, simplified. Search verified listings, skip the fake agents, and move into your dream home with 100% certainty.
                            </p>
                            <Button className="btn-primary w-full">FIND MY HOME</Button>
                        </div>
                    </div>
                    <div className="bg-vr-iron p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-vr-cream mb-6">FOR THE LANDLORD</h3>
                            <p className="text-vr-cream/40 text-sm leading-relaxed mb-8">
                                Direct listings with zero commission. Forge a direct bond with your tenants through verified transparency.
                            </p>
                            <Button variant="outline" className="btn-outline w-full text-xs">LIST PROPERTY</Button>
                        </div>
                    </div>
                    <div className="bg-vr-navy p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-vr-cream mb-6">FOR THE AGENT</h3>
                            <p className="text-vr-cream/40 text-sm leading-relaxed mb-8">
                                Professional tools for serious brokers. We verify your portfolio so you can command the trust you deserve.
                            </p>
                            <Button variant="outline" className="btn-outline w-full text-xs">JOIN THE GUILD</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
