"use client";

import {
    Heart, Home, Search, Settings,
    LogOut, Bell, ShieldCheck, MapPin,
    Clock, ChevronRight, Star, MessageSquare,
    BarChart3
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DUMMY_PROPERTIES } from "@/lib/constants";
import Link from "next/link";

export default function TenantDashboard() {
    const savedProperties = DUMMY_PROPERTIES.slice(0, 2);

    const [activeTab, setActiveTab] = useState<"saved" | "applications">("saved");

    const applications = [
        {
            id: "APP-402",
            property: "Modern 3 Bedroom Apartment",
            location: "Lekki Phase 1",
            status: "In Review",
            date: "2 days ago",
            agent: "Olakunle W."
        }
    ];

    return (
        <div className="min-h-screen bg-vr-gray/30 flex flex-col">
            {/* Top Navigation */}
            <div className="bg-white border-b border-vr-silver/30 py-4 sticky top-0 z-50">
                <div className="section-container flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-vr-teal p-1.5 rounded-lg group-hover:rotate-12 transition-smooth">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-vr-navy">
                            Verify<span className="text-vr-teal">Rent</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl relative">
                            <Bell className="w-5 h-5 text-vr-navy/40" />
                            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-vr-teal rounded-full" />
                        </Button>
                        <div className="w-10 h-10 rounded-xl bg-vr-navy flex items-center justify-center text-vr-teal font-bold shadow-lg shadow-vr-navy/10">
                            JD
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow py-12 md:py-16">
                <div className="section-container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-vr-navy mb-2 leading-tight">Hello, Joshua</h1>
                            <p className="text-vr-navy/40 font-medium">Manage your housing search and verified applications.</p>
                        </div>
                        <Link href="/properties">
                            <Button className="h-14 px-8 rounded-2xl font-bold shadow-xl shadow-vr-teal/20">
                                <Search className="w-5 h-5 mr-3" /> Find New Houses
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left: Lists */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex gap-8 border-b border-vr-silver/30">
                                <button
                                    onClick={() => setActiveTab("saved")}
                                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'saved' ? 'text-vr-teal' : 'text-vr-navy/30'}`}
                                >
                                    Saved Houses ({savedProperties.length})
                                    {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vr-teal" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab("applications")}
                                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'applications' ? 'text-vr-teal' : 'text-vr-navy/30'}`}
                                >
                                    My Applications
                                    {activeTab === 'applications' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vr-teal" />}
                                </button>
                            </div>

                            {activeTab === "saved" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {savedProperties.map((prop) => (
                                        <div key={prop.id} className="bg-white rounded-[2.5rem] border border-vr-silver/30 shadow-sm overflow-hidden group">
                                            <div className="aspect-[16/10] relative">
                                                <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                                                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                                    <Heart className="w-5 h-5 fill-white" />
                                                </button>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-vr-navy mb-1">{prop.title}</h3>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest mb-4">
                                                    <MapPin className="w-3 h-3" /> {prop.location}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-bold text-vr-navy">₦{prop.price}</span>
                                                    <Link href={`/properties/${prop.id}`}>
                                                        <Button variant="ghost" size="sm" className="text-vr-teal font-bold gap-1 hover:bg-vr-teal/10 p-0">
                                                            View House <ChevronRight className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {applications.map((app) => (
                                        <div key={app.id} className="bg-white p-6 rounded-3xl border border-vr-silver/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-vr-navy/5 rounded-2xl flex items-center justify-center text-vr-navy/20">
                                                    <Home className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-vr-navy">{app.property}</h3>
                                                    <p className="text-xs text-vr-navy/40 font-medium">Agent: {app.agent}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-10">
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest mb-1">Status</div>
                                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">{app.status}</span>
                                                </div>
                                                <Button variant="outline" className="h-12 rounded-xl border-vr-silver font-bold">Details</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Sidebar Info */}
                        <div className="space-y-6">
                            <div className="bg-vr-navy rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-vr-teal/10 rounded-full -mt-10 -mr-10 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/10 text-vr-teal rounded-2xl flex items-center justify-center mb-6">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Compare Houses</h3>
                                    <p className="text-white/50 text-xs mb-6 leading-relaxed">Not sure which one to pick? Compare your saved properties side-by-side to find your perfect match.</p>
                                    <Button className="w-full bg-vr-teal text-vr-navy hover:bg-white font-bold rounded-xl h-12 transition-all">Start Comparison</Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 border border-vr-silver/30 shadow-sm">
                                <h3 className="text-lg font-bold text-vr-navy mb-6">Account Actions</h3>
                                <div className="space-y-1">
                                    <button className="flex items-center justify-between w-full p-4 hover:bg-vr-gray rounded-2xl transition-all group">
                                        <div className="flex items-center gap-3">
                                            <Settings className="w-5 h-5 text-vr-navy/20 group-hover:text-vr-navy transition-colors" />
                                            <span className="text-sm font-bold text-vr-navy/60 group-hover:text-vr-navy transition-colors">Settings</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-vr-navy/10" />
                                    </button>
                                    <button className="flex items-center justify-between w-full p-4 hover:bg-vr-gray rounded-2xl transition-all group">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-vr-navy/20 group-hover:text-vr-navy transition-colors" />
                                            <span className="text-sm font-bold text-vr-navy/60 group-hover:text-vr-navy transition-colors">Support</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-vr-navy/10" />
                                    </button>
                                    <div className="pt-4 mt-4 border-t border-vr-silver/30">
                                        <button className="flex items-center gap-3 w-full p-4 hover:bg-red-50 text-red-500 rounded-2xl transition-all">
                                            <LogOut className="w-5 h-5" />
                                            <span className="text-sm font-bold">Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
