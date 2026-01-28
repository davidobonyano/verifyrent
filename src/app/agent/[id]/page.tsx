"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Phone, Mail, Globe, Instagram, Twitter,
    ShieldCheck, Star, Calendar, MessageSquare,
    ExternalLink, Share2, MoreVertical, CheckCircle2,
    Home, BadgeCheck, Users, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/ui/property-card";
import { DUMMY_PROPERTIES, Property } from "@/lib/constants";
import { DUMMY_AGENTS } from "@/lib/agents";
import { useState } from "react";

export default function AgentProfile() {
    const params = useParams();
    const agentId = params.id;

    // Find agent or use default
    const agent = DUMMY_AGENTS.find(a => a.id === agentId) || DUMMY_AGENTS[0];
    const agentProperties = DUMMY_PROPERTIES.filter((p: Property) => p.landlord === agent.name);

    const [activeTab, setActiveTab] = useState("listings");

    return (
        <div className="flex flex-col min-h-screen bg-vr-navy">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                {/* Hero Profile Header */}
                <div className="relative">
                    {/* Industrial Header Background */}
                    <div className="h-48 md:h-72 bg-vr-iron relative overflow-hidden border-b border-vr-silver/10">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vr-navy" />
                    </div>

                    <div className="section-container relative -mt-24 md:-mt-32">
                        <div className="bg-vr-iron/50 backdrop-blur-md border border-vr-silver/10 p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-heavy">
                                <ShieldCheck className="w-48 h-48 rotate-12" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                                {/* Profile Image (Industrial Frame) */}
                                <div className="relative shrink-0">
                                    <div className="w-40 h-40 md:w-56 md:h-56 overflow-hidden border border-vr-silver/20 bg-vr-navy p-2 shadow-2xl">
                                        <div className="w-full h-full relative overflow-hidden">
                                            <img
                                                src={agent.image}
                                                alt={agent.name}
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-heavy scale-110 hover:scale-100"
                                            />
                                        </div>
                                    </div>
                                    {agent.isVerified && (
                                        <div className="absolute -bottom-4 -right-4 bg-vr-teal text-vr-navy p-3 shadow-[8px_8px_0_rgba(0,0,0,0.5)] border border-vr-navy">
                                            <BadgeCheck className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>

                                {/* Agent Info */}
                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                        <div>
                                            <span className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.4em] mb-3 block">Certified Provider</span>
                                            <h1 className="text-4xl md:text-6xl font-serif font-black text-vr-cream mb-4 uppercase tracking-tighter leading-none">
                                                {agent.name}
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
                                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-vr-cream/40">
                                                    <MapPin className="w-3.5 h-3.5 text-vr-teal" /> {agent.location}
                                                </span>
                                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-vr-teal">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Registry Level: {agent.verificationLevel}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="px-6 py-3 border border-vr-silver/10 text-[10px] font-bold uppercase tracking-widest text-vr-cream/60 hover:text-vr-teal hover:border-vr-teal transition-heavy">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-vr-cream/50 text-sm leading-relaxed max-w-2xl mb-10 font-medium">
                                        {agent.bio}
                                    </p>

                                    {/* Forged Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-vr-navy border border-vr-silver/10 shadow-2xl">
                                        <div className="bg-vr-iron/50 p-6 border border-vr-silver/5">
                                            <div className="text-3xl font-serif font-bold text-vr-cream mb-1">{agent.stats.properties}</div>
                                            <div className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.2em]">Listings</div>
                                        </div>
                                        <div className="bg-vr-iron/50 p-6 border border-vr-silver/5">
                                            <div className="text-3xl font-serif font-bold text-vr-teal mb-1">{agent.stats.verified}%</div>
                                            <div className="text-[10px] font-bold text-vr-cream/40 uppercase tracking-[0.2em]">Verified</div>
                                        </div>
                                        <div className="bg-vr-iron/50 p-6 border border-vr-silver/5">
                                            <div className="text-3xl font-serif font-bold text-vr-cream mb-1 flex items-center gap-2">
                                                {agent.stats.rating} <Star className="w-5 h-5 text-vr-teal fill-vr-teal" />
                                            </div>
                                            <div className="text-[10px] font-bold text-vr-cream/40 uppercase tracking-[0.2em]">Registry Rating</div>
                                        </div>
                                        <div className="bg-vr-iron/50 p-6 border border-vr-silver/5">
                                            <div className="text-3xl font-serif font-bold text-vr-cream mb-1">{agent.stats.reviews}</div>
                                            <div className="text-[10px] font-bold text-vr-cream/40 uppercase tracking-[0.2em]">Audit Records</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Tabs & Content */}
                <div className="section-container mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-16">
                        {/* Main Content Area */}
                        <div>
                            <div className="flex gap-12 mb-12 border-b border-vr-silver/10">
                                <button
                                    onClick={() => setActiveTab("listings")}
                                    className={`pb-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'listings' ? 'text-vr-teal' : 'text-vr-cream/20 hover:text-vr-cream/40'}`}
                                >
                                    ASSET REGISTRY ({agentProperties.length})
                                    {activeTab === 'listings' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-vr-teal shadow-[0_0_10px_#B8860B]" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab("verification")}
                                    className={`pb-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'verification' ? 'text-vr-teal' : 'text-vr-cream/20 hover:text-vr-cream/40'}`}
                                >
                                    AUDIT PROTOCOLS
                                    {activeTab === 'verification' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-vr-teal shadow-[0_0_10px_#B8860B]" />}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <AnimatePresence mode="wait">
                                    {activeTab === "listings" ? (
                                        agentProperties.map((property: Property, idx: number) => (
                                            <motion.div
                                                key={property.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <PropertyCard {...property} />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="col-span-full bg-vr-iron p-10 border border-vr-silver/10 relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
                                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                                <div className="w-14 h-14 bg-vr-navy border border-vr-silver/10 flex items-center justify-center">
                                                    <ShieldCheck className="text-vr-teal w-7 h-7" />
                                                </div>
                                                <h3 className="text-2xl font-serif font-bold text-vr-cream uppercase tracking-tight">Identity Audit Status</h3>
                                            </div>
                                            <div className="space-y-4 relative z-10">
                                                {[
                                                    { label: "Government ID Verified", date: "Verified Nov 2023" },
                                                    { label: "Facial Biometric Match", date: "Verified Dec 2023" },
                                                    { label: "Verified Social Presence", date: "Linked & Audited" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between p-6 bg-vr-navy border border-vr-silver/5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-2 h-2 rounded-full bg-vr-teal shadow-[0_0_8px_#B8860B]" />
                                                            <span className="text-[10px] font-bold text-vr-cream uppercase tracking-widest">{item.label}</span>
                                                        </div>
                                                        <span className="text-[8px] font-bold text-vr-cream/20 uppercase tracking-widest">{item.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Sidebar Info (Industrial) */}
                        <aside className="space-y-12">
                            {/* Contact Card */}
                            <div className="bg-vr-iron border border-vr-silver/10 p-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-vr-teal/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                                <h3 className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.4em] mb-8">Registry Contact</h3>
                                <div className="space-y-8">
                                    <a href={`tel:${agent.phone}`} className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 bg-vr-navy border border-vr-silver/10 flex items-center justify-center group-hover:border-vr-teal/50 transition-heavy">
                                            <Phone className="w-5 h-5 text-vr-cream/40 group-hover:text-vr-teal transition-heavy" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-bold text-vr-cream/20 uppercase tracking-widest mb-1">Authenticated Phone</div>
                                            <div className="text-sm font-bold text-vr-cream group-hover:text-vr-teal transition-heavy">{agent.phone}</div>
                                        </div>
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-5 group">
                                        <div className="w-12 h-12 bg-vr-navy border border-vr-silver/10 flex items-center justify-center group-hover:border-vr-teal/50 transition-heavy">
                                            <Mail className="w-5 h-5 text-vr-cream/40 group-hover:text-vr-teal transition-heavy" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-bold text-vr-cream/20 uppercase tracking-widest mb-1">Audit Email</div>
                                            <div className="text-sm font-bold text-vr-cream group-hover:text-vr-teal transition-heavy">{agent.email}</div>
                                        </div>
                                    </a>
                                </div>

                                <div className="h-px bg-vr-silver/10 my-10" />

                                <h3 className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.4em] mb-6">Social Handles</h3>
                                <div className="space-y-3">
                                    {[
                                        { Icon: Instagram, handle: agent.socials.instagram },
                                        { Icon: Twitter, handle: agent.socials.twitter },
                                        { Icon: Globe, handle: agent.socials.website }
                                    ].map((item, i) => (
                                        <a key={i} href="#" className="flex items-center justify-between p-4 bg-vr-navy border border-vr-silver/5 hover:border-vr-teal/30 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <item.Icon className="w-4 h-4 text-vr-cream/40 group-hover:text-vr-teal transition-heavy" />
                                                <span className="text-[10px] font-bold text-vr-cream/60 group-hover:text-vr-cream transition-heavy uppercase tracking-widest">{item.handle}</span>
                                            </div>
                                            <ExternalLink className="w-3 h-3 text-vr-cream/10" />
                                        </a>
                                    ))}
                                </div>

                                <button className="w-full mt-10 py-5 bg-vr-navy border border-vr-silver/10 text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] hover:bg-vr-teal hover:text-vr-navy transition-heavy shadow-xl border-b-4 border-vr-silver/5 active:border-b-0 active:translate-y-1">
                                    <Phone className="w-4 h-4 mr-2 inline" /> Request Callback
                                </button>
                            </div>

                            {/* Trust Banner (Premium FORGE Style) */}
                            <div className="p-8 border border-vr-teal/20 bg-gradient-to-br from-vr-teal/10 to-transparent relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-heavy">
                                    <ShieldCheck className="w-32 h-32 rotate-12" />
                                </div>
                                <h4 className="text-xl font-serif font-black text-vr-cream uppercase tracking-tight mb-4">Registry Guarantee</h4>
                                <p className="text-[10px] text-vr-cream/40 font-bold uppercase tracking-widest leading-relaxed mb-8">
                                    This provider has been manually vetted. All transactions are held in our kiln of trust.
                                </p>
                                <button className="w-full py-4 bg-vr-teal text-vr-navy text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-heavy">
                                    Learn More
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
