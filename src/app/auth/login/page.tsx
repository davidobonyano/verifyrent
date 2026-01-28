"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation: Redirect to dashboard based on email or dummy logic
        window.location.href = "/dashboard/provider";
    };

    return (
        <div className="min-h-screen bg-vr-navy flex flex-col md:flex-row">
            {/* Left side: branding/image */}
            <div className="hidden md:flex md:w-5/12 p-16 flex-col justify-between text-vr-cream relative overflow-hidden border-r border-vr-silver/10 group">
                <Image
                    src="/images/verifyrent_bold_ambassador_1769584850475.png"
                    alt="VerifyRent Ambassador"
                    fill
                    className="object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-vr-navy/80 via-vr-navy/40 to-vr-navy/90 z-10" />

                <Link href="/" className="flex items-center gap-3 relative z-20 w-fit group/logo">
                    <div className="bg-vr-teal p-2 rounded-none transition-heavy group-hover/logo:rotate-180">
                        <ShieldCheck className="w-6 h-6 text-vr-navy" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight uppercase drop-shadow-lg">
                        VERIFY<span className="text-vr-teal">RENT</span>
                    </span>
                </Link>

                <div className="relative z-20 space-y-8">
                    <h1 className="text-6xl font-serif font-bold leading-[0.9] drop-shadow-2xl">ACCESS THE <br /> <span className="text-vr-teal italic">REGISTRY.</span></h1>
                    <p className="text-vr-cream/70 text-lg max-w-sm font-bold leading-relaxed drop-shadow-md uppercase tracking-wider">The neutral trust layer for Nigerian Real Estate. We audit the person, the paper, and the property.</p>
                </div>

                <div className="text-[10px] font-bold text-vr-teal tracking-[0.4em] uppercase relative z-20 drop-shadow-lg">
                    National Trust Infrastructure / Forge No. 01
                </div>
            </div>

            {/* Right side: form */}
            <div className="flex-grow flex items-center justify-center p-6 md:p-24 relative">
                <div className="w-full max-w-md relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="burn-in patina"
                    >
                        <div className="mb-12">
                            <h2 className="text-4xl font-serif font-bold text-vr-cream mb-4 uppercase tracking-tight">Sign In</h2>
                            <div className="h-1 w-12 bg-vr-teal mb-6" />
                            <p className="text-vr-cream/40 text-sm font-bold uppercase tracking-widest">Awaiting verification of your digital identity.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">Registry Email</label>
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
                                <div className="flex justify-between items-end px-0.5">
                                    <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em]">Access Code</label>
                                    <Link href="#" className="text-[9px] font-bold text-vr-teal/40 hover:text-vr-teal transition-heavy uppercase tracking-widest">Reset Code</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-teal/30" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-16 pl-14 pr-6 bg-vr-iron border border-vr-silver/10 rounded-none text-vr-cream placeholder:text-vr-cream/20 focus:border-vr-teal outline-none transition-heavy"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-20 btn-primary">
                                OPEN REGISTRY <ArrowRight className="w-5 h-5 ml-3" />
                            </Button>
                        </form>

                        <div className="mt-16 text-center text-[10px] font-bold uppercase tracking-[0.2em] pt-12 border-t border-vr-silver/5">
                            <span className="text-vr-cream/20">Not in the registry? </span>
                            <Link href="/auth/register" className="text-vr-teal hover:brightness-125 transition-heavy ml-2">Secure an Account</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
