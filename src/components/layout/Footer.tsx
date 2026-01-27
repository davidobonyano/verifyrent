import Link from "next/link";
import { ShieldCheck, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-vr-teal pt-32 pb-16">
            <div className="section-container">
                {/* Large Stamp Button */}
                <div className="mb-32">
                    <button className="w-full h-32 md:h-48 border-2 border-vr-navy flex items-center justify-center group relative overflow-hidden transition-heavy">
                        <div className="absolute inset-0 bg-vr-navy translate-y-full group-hover:translate-y-0 transition-heavy" />
                        <span className="relative z-10 text-4xl md:text-7xl font-serif font-black text-vr-navy group-hover:text-vr-teal transition-heavy">
                            TALK TO AN EXPERT
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <div className="bg-vr-navy p-2 rounded-none">
                                <ShieldCheck className="w-6 h-6 text-vr-teal" />
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-tight text-vr-navy">
                                VERIFYRENT
                            </span>
                        </Link>
                        <p className="text-vr-navy/70 text-sm leading-relaxed mb-8 max-w-xs font-medium">
                            The neutral trust layer for Nigerian Real Estate. We audit the person, the paper, and the property.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 border border-vr-navy/20 flex items-center justify-center text-vr-navy hover:bg-vr-navy hover:text-vr-teal transition-heavy">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-vr-navy mb-8 uppercase text-[10px] tracking-[0.3em]">The Registry</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Browse Houses</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Verify VR-ID</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Agent Portal</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Landlord Hall</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-vr-navy mb-8 uppercase text-[10px] tracking-[0.3em]">Governance</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Anti-Fraud Policy</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Trial Records</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Ethics Charter</Link></li>
                            <li><Link href="#" className="text-vr-navy/60 hover:text-vr-navy transition-heavy">Support Hub</Link></li>
                        </ul>
                    </div>

                    <div className="bg-vr-navy/5 p-10 border border-vr-navy/10">
                        <h4 className="font-bold text-vr-navy mb-6 uppercase text-[10px] tracking-[0.3em]">Live Status</h4>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-2 h-2 rounded-full bg-vr-navy animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-vr-navy">FORGE TEMPERATURE: 1050°C</span>
                        </div>
                        <p className="text-[10px] text-vr-navy/40 font-bold uppercase leading-relaxed">
                            Currently verifying property VR-24A-LK. <br /> Systems operational.
                        </p>
                    </div>
                </div>

                <div className="pt-12 border-t border-vr-navy/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-vr-navy/40">
                    <p>© {new Date().getFullYear()} VERIFYRENT NIGERIA. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-12">
                        <Link href="#" className="hover:text-vr-navy transition-heavy">PRIVACY</Link>
                        <Link href="#" className="hover:text-vr-navy transition-heavy">TERMS</Link>
                        <Link href="#" className="hover:text-vr-navy transition-heavy">LEGAL</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
