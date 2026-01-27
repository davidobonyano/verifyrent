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
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                {/* Hero Profile Header */}
                <div className="relative">
                    {/* Solid Navy Header Background */}
                    <div className="h-48 md:h-64 bg-vr-navy relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent)]" />
                    </div>

                    <div className="section-container relative -mt-16 md:-mt-24">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-vr-navy/5 p-6 md:p-10 border border-vr-silver/30">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Profile Image */}
                                <div className="relative shrink-0">
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                                        <img
                                            src={agent.image}
                                            alt={agent.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {agent.isVerified && (
                                        <div className="absolute -bottom-2 -right-2 bg-vr-teal text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                            <BadgeCheck className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>

                                {/* Agent Info */}
                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold text-vr-navy mb-1 flex items-center gap-3">
                                                {agent.name}
                                                <span className="text-xs font-semibold px-3 py-1 bg-vr-teal/10 text-vr-teal rounded-full uppercase tracking-wider">
                                                    {agent.isVerified ? `Verified ${agent.role.includes('Landlord') ? 'Landlord' : 'Agent'}` : agent.role}
                                                </span>
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-vr-navy/60 font-medium">
                                                <span className="flex items-center gap-1.5 px-3 py-1 bg-vr-gray rounded-lg text-xs">
                                                    <BadgeCheck className="w-3.5 h-3.5 text-vr-teal" /> {agent.verificationLevel} Status
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" /> {agent.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-vr-teal">
                                                    <CheckCircle2 className="w-4 h-4" /> Trusted Partner
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="outline" className="rounded-xl border-vr-silver hover:bg-vr-gray">
                                                <Share2 className="w-4 h-4 mr-2" /> Share
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-vr-navy/70 leading-relaxed max-w-3xl mb-8">
                                        {agent.bio}
                                    </p>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-vr-gray/50 rounded-3xl border border-vr-silver/30">
                                        <div className="text-center md:border-r border-vr-silver/50">
                                            <div className="text-2xl font-bold text-vr-navy">{agent.stats.properties}</div>
                                            <div className="text-xs font-semibold text-vr-navy/40 uppercase tracking-wider">Listings</div>
                                        </div>
                                        <div className="text-center md:border-r border-vr-silver/50">
                                            <div className="text-2xl font-bold text-vr-teal">{agent.stats.verified}%</div>
                                            <div className="text-xs font-semibold text-vr-navy/40 uppercase tracking-wider">Verified</div>
                                        </div>
                                        <div className="text-center md:border-r border-vr-silver/50">
                                            <div className="text-2xl font-bold text-emerald-500 flex items-center justify-center gap-1">
                                                {agent.stats.rating} <Star className="w-5 h-5 fill-current" />
                                            </div>
                                            <div className="text-xs font-semibold text-vr-navy/40 uppercase tracking-wider">Rating</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-vr-navy">{agent.stats.reviews}</div>
                                            <div className="text-xs font-semibold text-vr-navy/40 uppercase tracking-wider">Reviews</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Tabs & Content */}
                <div className="section-container mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-12">
                        {/* Main Content Area */}
                        <div>
                            <div className="flex gap-8 mb-8 border-b border-vr-silver/30">
                                <button
                                    onClick={() => setActiveTab("listings")}
                                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'listings' ? 'text-vr-teal' : 'text-vr-navy/40'}`}
                                >
                                    My Listings ({agentProperties.length})
                                    {activeTab === 'listings' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-vr-teal rounded-full" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab("verification")}
                                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'verification' ? 'text-vr-teal' : 'text-vr-navy/40'}`}
                                >
                                    Verification Bio
                                    {activeTab === 'verification' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-vr-teal rounded-full" />}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <AnimatePresence mode="wait">
                                    {activeTab === "listings" ? (
                                        agentProperties.map((property: Property, idx: number) => (
                                            <motion.div
                                                key={property.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <PropertyCard {...property} />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="col-span-full bg-white p-8 rounded-[2rem] border border-vr-silver/30"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-vr-teal/10 rounded-xl flex items-center justify-center">
                                                    <ShieldCheck className="text-vr-teal w-6 h-6" />
                                                </div>
                                                <h3 className="text-xl font-bold text-vr-navy">Identity & Verification Status</h3>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between p-4 bg-vr-gray rounded-2xl">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                                                        <span className="font-semibold text-vr-navy">Government ID Verified</span>
                                                    </div>
                                                    <span className="text-xs text-vr-navy/40">Verified Nov 2023</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-vr-gray rounded-2xl">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                                                        <span className="font-semibold text-vr-navy">Facial Biometric Match</span>
                                                    </div>
                                                    <span className="text-xs text-vr-navy/40">Verified Dec 2023</span>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-vr-gray rounded-2xl">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                                                        <span className="font-semibold text-vr-navy">Verified Social Presence</span>
                                                    </div>
                                                    <span className="text-xs text-vr-navy/40">Linked</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <aside className="space-y-8">
                            {/* Contact Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-vr-silver/30 shadow-xl shadow-vr-navy/5">
                                <h3 className="text-xl font-bold text-vr-navy mb-6">Contact Info</h3>
                                <div className="space-y-5">
                                    <a href={`tel:${agent.phone}`} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 bg-vr-gray rounded-xl flex items-center justify-center group-hover:bg-vr-teal/10 transition-colors">
                                            <Phone className="w-5 h-5 text-vr-navy/60 group-hover:text-vr-teal transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-vr-navy/30 uppercase tracking-widest">Phone</div>
                                            <div className="font-semibold text-vr-navy">{agent.phone}</div>
                                        </div>
                                    </a>
                                    <a href={`mailto:${agent.email}`} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 bg-vr-gray rounded-xl flex items-center justify-center group-hover:bg-vr-teal/10 transition-colors">
                                            <Mail className="w-5 h-5 text-vr-navy/60 group-hover:text-vr-teal transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-vr-navy/30 uppercase tracking-widest">Email</div>
                                            <div className="font-semibold text-vr-navy">{agent.email}</div>
                                        </div>
                                    </a>
                                </div>

                                <div className="h-px bg-vr-silver/30 my-8" />

                                <h3 className="text-xl font-bold text-vr-navy mb-6">Social Handle</h3>
                                <div className="space-y-4">
                                    <a href="#" className="flex items-center justify-between p-3 rounded-2xl border border-vr-silver/20 hover:border-vr-teal/30 hover:bg-vr-teal/5 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Instagram className="w-5 h-5 text-vr-navy/60" />
                                            <span className="font-medium text-vr-navy">{agent.socials.instagram}</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-vr-navy/30" />
                                    </a>
                                    <a href="#" className="flex items-center justify-between p-3 rounded-2xl border border-vr-silver/20 hover:border-vr-teal/30 hover:bg-vr-teal/5 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Twitter className="w-5 h-5 text-vr-navy/60" />
                                            <span className="font-medium text-vr-navy">{agent.socials.twitter}</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-vr-navy/30" />
                                    </a>
                                    <a href="#" className="flex items-center justify-between p-3 rounded-2xl border border-vr-silver/20 hover:border-vr-teal/30 hover:bg-vr-teal/5 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-5 h-5 text-vr-navy/60" />
                                            <span className="font-medium text-vr-navy">{agent.socials.website}</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-vr-navy/30" />
                                    </a>
                                </div>

                                <Button className="w-full mt-8 h-12 rounded-xl text-vr-navy border-vr-silver bg-vr-gray hover:bg-vr-silver/50" variant="outline">
                                    <Phone className="w-4 h-4 mr-2" /> Request Call Back
                                </Button>
                            </div>

                            {/* Trust Banner */}
                            <div className="bg-vr-navy rounded-[2rem] p-8 text-white relative overflow-hidden">
                                <BadgeCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
                                <h4 className="text-lg font-bold mb-2">Verified Guarantee</h4>
                                <p className="text-sm text-white/60 mb-6">
                                    This provider has been manually vetted by the VerifyRent team. All payments are secured via our Escrow system.
                                </p>
                                <Button className="w-full bg-vr-teal hover:bg-vr-teal/90 rounded-xl">
                                    Learn More
                                </Button>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
