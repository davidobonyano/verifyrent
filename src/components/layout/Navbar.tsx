"use client";

import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-heavy border-b",
                isScrolled
                    ? "bg-vr-navy/95 backdrop-blur-md border-vr-silver py-4 shadow-2xl"
                    : "bg-transparent border-transparent py-8"
            )}
        >
            <div className="section-container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-vr-teal p-2 rounded-none group-hover:rotate-180 transition-heavy shadow-[0_0_15px_rgba(184,134,11,0.3)]">
                        <ShieldCheck className="w-6 h-6 text-vr-navy" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight text-vr-cream">
                        VERIFY<span className="text-vr-teal">RENT</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="/properties" className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/60 hover:text-vr-teal transition-heavy">
                        Browse Houses
                    </Link>
                    <Link href="/verify" className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/60 hover:text-vr-teal transition-heavy">
                        Verify by ID
                    </Link>
                    <Link href="#how-it-works" className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/60 hover:text-vr-teal transition-heavy">
                        How it Works
                    </Link>
                    <div className="flex items-center gap-6 pl-8 border-l border-vr-silver/30">
                        <Link href="/auth/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-vr-cream/40 hover:text-vr-teal transition-heavy">
                            Log In
                        </Link>
                        <Link href="/auth/register">
                            <Button variant="primary" size="sm" className="shadow-[0_4px_0_#B87333]">Get Started</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-vr-teal"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-vr-navy border-b border-vr-silver p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-500">
                    <Link href="/properties" className="text-sm font-bold uppercase tracking-widest text-vr-cream" onClick={() => setIsMobileMenuOpen(false)}>
                        Browse Houses
                    </Link>
                    <Link href="/verify" className="text-sm font-bold uppercase tracking-widest text-vr-cream" onClick={() => setIsMobileMenuOpen(false)}>
                        Verify by ID
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-bold uppercase tracking-widest text-vr-cream" onClick={() => setIsMobileMenuOpen(false)}>
                        How it Works
                    </Link>
                    <hr className="border-vr-silver/20" />
                    <Button variant="outline" className="w-full">Log In</Button>
                    <Button variant="primary" className="w-full">Get Started</Button>
                </div>
            )}
        </nav>
    );
}
