"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, Briefcase, Home, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
    const [role, setRole] = useState<"tenant" | "provider">("tenant");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        roleType: "Agent", // for providers
    });

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) setStep(2);
        else {
            // Success simulation
            setStep(3);
        }
    };

    return (
        <div className="min-h-screen bg-vr-navy flex flex-col md:flex-row">
            {/* Left side: branding/benefits */}
            <div className="hidden md:flex md:w-5/12 bg-vr-iron p-16 flex-col justify-between text-vr-cream relative overflow-hidden border-r border-vr-silver/10">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                <Link href="/" className="flex items-center gap-3 relative z-10 w-fit group">
                    <div className="bg-vr-teal p-2 rounded-none transition-heavy group-hover:rotate-180">
                        <ShieldCheck className="w-6 h-6 text-vr-navy" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight uppercase">
                        VERIFY<span className="text-vr-teal">RENT</span>
                    </span>
                </Link>

                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {role === "tenant" ? (
                            <motion.div
                                key="tenant-info"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <h1 className="text-6xl font-serif font-bold leading-[0.9]">FIND A HOME <br /><span className="text-vr-teal italic">WITHOUT FEAR.</span></h1>
                                <p className="text-vr-cream/40 text-lg font-light leading-relaxed max-w-sm">Join 10,000+ Nigerians using VerifyRent to discover physically inspected properties and verified landlords.</p>
                                <div className="space-y-6 pt-8">
                                    {["Zero ghost listings", "Direct contact with verified owners", "Secure booking infrastructure"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-6 h-6 rounded-none bg-vr-teal/10 flex items-center justify-center border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/60 group-hover:text-vr-cream transition-heavy">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="provider-info"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <h1 className="text-6xl font-serif font-bold leading-[0.9]">LIST WITH <br /><span className="text-vr-teal italic">NATIONAL TRUST.</span></h1>
                                <p className="text-vr-cream/40 text-lg font-light leading-relaxed max-w-sm">Position your properties in Nigeria's only high-integrity rental marketplace. Get the 'Verified' badge today.</p>
                                <div className="space-y-6 pt-8">
                                    {["Get the Verified Badge", "Advanced tenant screening", "Zero listing fees for 6 months"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-6 h-6 rounded-none bg-vr-teal/10 flex items-center justify-center border border-vr-teal/20 group-hover:bg-vr-teal group-hover:text-vr-navy transition-heavy">
                                                <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/60 group-hover:text-vr-cream transition-heavy">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="text-[10px] font-bold text-vr-teal/30 tracking-[0.4em] uppercase relative z-10">
                    © 2026 VerifyRent Infrastructure / Registry Enrollment
                </div>
            </div>

            {/* Right side: form */}
            <div className="flex-grow flex items-center justify-center p-6 md:p-24 relative overflow-y-auto">
                <div className="w-full max-w-md relative z-10">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="burn-in patina"
                            >
                                <div className="mb-12">
                                    <h2 className="text-4xl font-serif font-bold text-vr-cream mb-4 uppercase tracking-tight">Accession</h2>
                                    <div className="h-1 w-12 bg-vr-teal mb-6" />
                                    <p className="text-vr-cream/40 text-[10px] font-bold uppercase tracking-widest">Choose your designation in the national registry.</p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setRole("tenant")}
                                        className={`w-full p-8 text-left rounded-none border transition-heavy relative overflow-hidden group ${role === 'tenant' ? 'border-vr-teal bg-vr-iron shadow-[0_0_30px_rgba(184,134,11,0.1)]' : 'border-vr-silver/10 bg-vr-navy hover:border-vr-teal/30'}`}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`p-4 rounded-none transition-heavy ${role === 'tenant' ? 'bg-vr-teal text-vr-navy' : 'bg-vr-silver/5 text-vr-teal/20'}`}>
                                                <User className="w-6 h-6" />
                                            </div>
                                            {role === 'tenant' && <CheckCircle2 className="w-6 h-6 text-vr-teal" />}
                                        </div>
                                        <h3 className={`text-xl font-serif font-bold mb-2 uppercase tracking-tight transition-heavy ${role === 'tenant' ? 'text-vr-cream' : 'text-vr-cream/60'}`}>The Tenant</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-vr-cream/30 leading-relaxed">I seek to inhabit verified properties under professional governance.</p>
                                    </button>

                                    <button
                                        onClick={() => setRole("provider")}
                                        className={`w-full p-8 text-left rounded-none border transition-heavy relative overflow-hidden group ${role === 'provider' ? 'border-vr-teal bg-vr-iron shadow-[0_0_30px_rgba(184,134,11,0.1)]' : 'border-vr-silver/10 bg-vr-navy hover:border-vr-teal/30'}`}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`p-4 rounded-none transition-heavy ${role === 'provider' ? 'bg-vr-teal text-vr-navy' : 'bg-vr-silver/5 text-vr-teal/20'}`}>
                                                <Briefcase className="w-6 h-6" />
                                            </div>
                                            {role === 'provider' && <CheckCircle2 className="w-6 h-6 text-vr-teal" />}
                                        </div>
                                        <h3 className={`text-xl font-serif font-bold mb-2 uppercase tracking-tight transition-heavy ${role === 'provider' ? 'text-vr-cream' : 'text-vr-cream/60'}`}>The Provider</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-vr-cream/30 leading-relaxed">I curate and manage high-integrity assets for the marketplace.</p>
                                    </button>

                                    <Button onClick={() => setStep(2)} className="w-full h-20 btn-primary mt-12">
                                        INITIALIZE PROFILE <ChevronRight className="w-5 h-5 ml-3" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : step === 2 ? (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="burn-in patina"
                            >
                                <button onClick={() => setStep(1)} className="text-vr-teal font-bold text-[10px] uppercase tracking-[0.3em] mb-12 hover:brightness-125 transition-heavy flex items-center gap-3">
                                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to designation
                                </button>

                                <div className="mb-12">
                                    <h2 className="text-4xl font-serif font-bold text-vr-cream mb-4 uppercase tracking-tight">Identity</h2>
                                    <div className="h-1 w-12 bg-vr-teal mb-6" />
                                    <p className="text-vr-cream/40 text-[10px] font-bold uppercase tracking-widest">Awaiting digital record formation.</p>
                                </div>

                                <form onSubmit={handleNext} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">Full Legal Name</label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-teal/30" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="JOHN OLAKUNLE"
                                                className="w-full h-16 pl-14 pr-6 bg-vr-iron border border-vr-silver/10 rounded-none text-vr-cream placeholder:text-vr-cream/20 focus:border-vr-teal outline-none transition-heavy uppercase text-xs font-bold tracking-widest"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">Contact Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-teal/30" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="USER@REGISTRY.NG"
                                                className="w-full h-16 pl-14 pr-6 bg-vr-iron border border-vr-silver/10 rounded-none text-vr-cream placeholder:text-vr-cream/20 focus:border-vr-teal outline-none transition-heavy uppercase text-xs font-bold tracking-widest"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">Security Code</label>
                                        <div className="relative">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-teal/30" />
                                            <input
                                                required
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full h-16 pl-14 pr-6 bg-vr-iron border border-vr-silver/10 rounded-none text-vr-cream placeholder:text-vr-cream/20 focus:border-vr-teal outline-none transition-heavy font-mono"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {role === "provider" && (
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">Operational Class</label>
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, roleType: "Agent" })}
                                                    className={`flex-1 h-16 rounded-none border-2 font-bold transition-heavy uppercase text-[10px] tracking-widest ${formData.roleType === 'Agent' ? 'border-vr-teal bg-vr-teal text-vr-navy' : 'border-vr-silver/10 text-vr-cream/30 hover:border-vr-teal/20'}`}
                                                >
                                                    Agent
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, roleType: "Landlord" })}
                                                    className={`flex-1 h-16 rounded-none border-2 font-bold transition-heavy uppercase text-[10px] tracking-widest ${formData.roleType === 'Landlord' ? 'border-vr-teal bg-vr-teal text-vr-navy' : 'border-vr-silver/10 text-vr-cream/30 hover:border-vr-teal/20'}`}
                                                >
                                                    Landlord
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full h-20 btn-primary mt-4">
                                        FINALIZE ENROLLMENT <ArrowRight className="w-5 h-5 ml-3" />
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center burn-in patina"
                            >
                                <div className="w-32 h-32 bg-vr-teal/5 flex items-center justify-center mx-auto mb-12 border border-vr-teal/20">
                                    <CheckCircle2 className="w-16 h-16 text-vr-teal" />
                                </div>
                                <h2 className="text-4xl font-serif font-bold text-vr-cream mb-6 uppercase tracking-tight">Access Granted</h2>
                                <p className="text-vr-cream/40 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-12">Digital record initialized. Awaiting secondary biometric confirmation via email.</p>

                                <Link href="/auth/login">
                                    <Button className="w-full h-20 btn-primary">
                                        PROCEED TO REGISTRY
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-16 text-center text-[10px] font-bold uppercase tracking-[0.2em] pt-12 border-t border-vr-silver/5">
                        <span className="text-vr-cream/20">Already in the registry? </span>
                        <Link href="/auth/login" className="text-vr-teal hover:brightness-125 transition-heavy ml-2">Open Access</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
