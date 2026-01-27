"use client";

import {
    LayoutDashboard, Home, Users, BarChart3,
    Settings, LogOut, Plus, Search, Bell,
    Filter, MoreHorizontal, ShieldCheck,
    Clock, AlertTriangle, Eye, ChevronRight,
    ArrowUpRight, MessageSquare, MapPin, ExternalLink
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProviderDashboard() {
    const stats = [
        { label: "Active Listings", value: "12", icon: Home, color: "text-vr-teal", bg: "bg-vr-teal/5" },
        { label: "Profile Views", value: "1.2k", icon: Eye, color: "text-indigo-500", bg: "bg-indigo-500/5" },
        { label: "WhatsApp Taps", value: "84", icon: ArrowUpRight, color: "text-emerald-500", bg: "bg-emerald-500/5" },
        { label: "Trust Score", value: "98", icon: ShieldCheck, color: "text-vr-navy", bg: "bg-vr-navy/5" },
    ];

    const myProperties = [
        {
            id: "VR-2024-LEK-01",
            title: "Modern 3 Bedroom Apartment",
            location: "Lekki Phase 1, Lagos",
            price: "4.5M",
            status: "verified",
            views: 450,
            taps: 18,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "VR-2024-IKE-02",
            title: "Serviced 2 Bedroom Flat",
            location: "Ikeja GRA, Lagos",
            price: "3.2M",
            status: "pending",
            views: 120,
            leads: 5,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "VR-2024-VI-03",
            title: "Luxury Penthouse",
            location: "Victoria Island, Lagos",
            price: "12M",
            status: "flagged",
            views: 890,
            leads: 25,
            image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&w=400&q=80"
        }
    ];

    return (
        <div className="flex min-h-screen bg-vr-gray/50">
            {/* Sidebar */}
            <aside className="w-72 bg-vr-navy text-white flex flex-col shrink-0 fixed inset-y-0 hidden lg:flex">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <div className="bg-vr-teal p-1.5 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-vr-navy" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Verify<span className="text-vr-teal">Rent</span>
                        </span>
                    </Link>

                    <nav className="space-y-1">
                        <button className="flex items-center gap-3 w-full p-4 bg-white/10 rounded-2xl text-vr-teal font-bold shadow-lg shadow-black/20 text-left">
                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <Home className="w-5 h-5" /> My Properties
                        </button>
                        <Link href="/agent/agt-1">
                            <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                                <Users className="w-5 h-5" /> Public Profile
                            </button>
                        </Link>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <BarChart3 className="w-5 h-5" /> Analytics
                        </button>
                        <div className="pt-8 mb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-white/20">System</div>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <Settings className="w-5 h-5" /> Settings
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-xl bg-vr-teal flex items-center justify-center text-vr-navy font-bold text-xs uppercase">OW</div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none mb-1 text-white">Olakunle W.</span>
                            <span className="text-[10px] text-vr-teal font-bold uppercase tracking-widest">Verified Agent</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 w-full p-4 hover:bg-red-500/10 rounded-2xl text-red-400 transition-all font-medium text-left">
                        <LogOut className="w-5 h-5" /> Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow lg:pl-72 p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-vr-navy">Welcome back, Olakunle</h1>
                            <p className="text-vr-navy/40 font-medium">Your portfolio is performing 12% better this week.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/agent/agt-1">
                                <Button variant="outline" className="h-12 rounded-xl px-6 border-vr-silver text-vr-navy font-bold hover:bg-vr-gray">
                                    <ExternalLink className="w-4 h-4 mr-2" /> View Public Profile
                                </Button>
                            </Link>
                            <Link href="/dashboard/provider/new-property">
                                <Button className="h-12 rounded-xl px-6 font-bold shadow-lg shadow-vr-teal/20">
                                    <Plus className="w-5 h-5 mr-2" /> List New House
                                </Button>
                            </Link>
                            <Button variant="outline" className="h-12 w-12 rounded-xl p-0 relative border-vr-silver/50 bg-white">
                                <Bell className="w-5 h-5 text-vr-navy/40" />
                                <div className="absolute top-3 right-3 w-2 h-2 bg-vr-teal rounded-full" />
                            </Button>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-[2rem] border border-vr-silver/20 shadow-sm shadow-vr-navy/5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    {stat.label === "Trust Score" && (
                                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">Elite</div>
                                    )}
                                </div>
                                <div className="text-2xl font-bold text-vr-navy mb-1">{stat.value}</div>
                                <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Properties List */}
                    <div className="bg-white rounded-[2.5rem] border border-vr-silver/20 shadow-sm shadow-vr-navy/5 overflow-hidden">
                        <div className="p-8 border-b border-vr-silver/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-vr-navy">My Properties</h2>
                            <div className="flex gap-2">
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-navy/20" />
                                    <input
                                        type="text"
                                        placeholder="Search houses..."
                                        className="pl-10 pr-4 h-10 w-48 bg-vr-gray/50 rounded-xl border-none text-xs font-medium focus:ring-1 focus:ring-vr-teal transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-vr-gray/20 text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">
                                        <th className="px-8 py-5 text-left">Property</th>
                                        <th className="px-8 py-5 text-left">Status</th>
                                        <th className="px-8 py-5 text-left">Price (₦)</th>
                                        <th className="px-8 py-5 text-left">Analytics</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-vr-silver/10">
                                    {myProperties.map((prop) => (
                                        <tr key={prop.id} className="hover:bg-vr-gray/10 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                                                        <img src={prop.image} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-vr-navy text-sm">{prop.title}</div>
                                                        <div className="text-[10px] text-vr-navy/30 font-bold flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" /> {prop.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${prop.status === 'verified' ? 'bg-emerald-50 text-emerald-600' :
                                                    prop.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {prop.status === 'verified' ? <ShieldCheck className="w-3 h-3" /> :
                                                        prop.status === 'pending' ? <Clock className="w-3 h-3" /> :
                                                            <AlertTriangle className="w-3 h-3" />}
                                                    {prop.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-vr-navy">{prop.price}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="text-xs font-bold text-vr-navy">{prop.views}</div>
                                                        <div className="text-[10px] text-vr-navy/30 uppercase font-bold">Views</div>
                                                    </div>
                                                    <div className="w-px h-6 bg-vr-silver/30" />
                                                    <div className="text-center">
                                                        <div className="text-xs font-bold text-vr-navy">{prop.taps || 0}</div>
                                                        <div className="text-[10px] text-vr-navy/30 uppercase font-bold">Taps</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-vr-navy hover:text-white group/btn">
                                                    <MoreHorizontal className="w-4 h-4 text-vr-navy/20 group-hover/btn:text-white" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 bg-vr-gray/10 text-center">
                            <button className="text-xs font-bold text-vr-teal uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
                                View Full Portfolio Portfolio Portfolio Portfolio Portfolio Portfolio
                            </button>
                        </div>
                    </div>

                    {/* Quick Tips / Verification Alert */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-vr-navy rounded-[2rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-vr-teal/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-vr-teal/20 transition-all duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-20 h-20 bg-vr-teal rounded-3xl flex items-center justify-center flex-shrink-0 animate-bounce">
                                    <ShieldCheck className="w-10 h-10 text-vr-navy" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Build Listing Trust</h3>
                                    <p className="text-white/60 text-sm mb-6 leading-relaxed">Verified listings get 8x more leads on VerifyRent. Complete your biometric verification to unlock premium listing features and the Elite Trust Badge.</p>
                                    <Link href="/verify-identity">
                                        <Button className="bg-vr-teal text-vr-navy hover:bg-vr-teal/90 font-bold rounded-xl px-8 h-12">
                                            Start Verification Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-vr-silver/20 shadow-sm shadow-vr-navy/5">
                            <h3 className="text-lg font-bold text-vr-navy mb-4">Listing Discussions</h3>
                            <div className="space-y-4">
                                {[
                                    { user: "Chidi O.", property: "Lekki Flat", text: "Is the service charge included?", status: "Replied" },
                                    { user: "Fatima Y.", property: "Ikeja Flat", text: "Can I view on Saturday?", status: "Pending" }
                                ].map((qa, i) => (
                                    <div key={i} className="p-3 hover:bg-vr-gray/50 rounded-2xl transition-all cursor-pointer group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-vr-navy">{qa.user}</span>
                                            <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${qa.status === 'Replied' ? 'bg-emerald-50 text-emerald-600' : 'bg-vr-teal/10 text-vr-navy'}`}>
                                                {qa.status}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-vr-navy/40 font-bold mb-1 italic">on {qa.property}</p>
                                        <p className="text-xs text-vr-navy/60 truncate line-clamp-1">"{qa.text}"</p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest text-vr-navy/40 hover:text-vr-navy">
                                View All Public Q&A
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
