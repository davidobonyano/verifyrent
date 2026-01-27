"use client";

import { useState } from "react";
import {
    ChevronRight, ChevronLeft, ShieldCheck,
    Upload, MapPin, Home, Camera,
    CheckCircle2, DollarSign, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { NIGERIA_STATES, STATE_LGAS, PROPERTY_TYPES } from "@/lib/constants";
import Link from "next/link";

export default function NewPropertyPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        type: "",
        state: "",
        lga: "",
        address: "",
        beds: "1",
        baths: "1",
        description: "",
        images: [] as string[],
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, label: "Core Details", icon: Home },
        { id: 2, label: "Location", icon: MapPin },
        { id: 3, label: "Media & Photos", icon: Camera },
    ];

    return (
        <div className="min-h-screen bg-vr-gray/50 flex flex-col">
            {/* Nav Header */}
            <div className="bg-white border-b border-vr-silver/30 py-4 sticky top-0 z-50">
                <div className="section-container flex items-center justify-between">
                    <Link href="/dashboard/provider" className="flex items-center gap-2 group">
                        <div className="bg-vr-teal p-1.5 rounded-lg group-hover:rotate-12 transition-smooth">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-vr-navy">
                            Verify<span className="text-vr-teal">Rent</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {steps.map((s) => (
                            <div key={s.id} className={`flex items-center gap-2 ${step >= s.id ? 'text-vr-navy' : 'text-vr-navy/20'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= s.id ? 'bg-vr-teal text-white' : 'bg-vr-silver/30'}`}>
                                    {step > s.id ? <CheckCircle2 className="w-3 h-3" /> : s.id}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? 'opacity-100' : 'opacity-40'}`}>{s.label}</span>
                                {s.id < 3 && <div className="w-8 h-px bg-vr-silver/30 mx-2" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-grow flex items-center justify-center p-6 py-12 md:py-20">
                <div className="w-full max-w-4xl">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] p-8 md:p-12 border border-vr-silver/20 shadow-2xl shadow-vr-navy/5"
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold text-vr-navy mb-2">Basic Information</h2>
                                    <p className="text-vr-navy/40 font-medium tracking-tight">Tell us about the property you're listing.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6 md:col-span-2">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Listing Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Spacious 3 Bedroom Flat with BQ"
                                                className="w-full h-16 px-6 bg-vr-gray/30 rounded-2xl border-none focus:ring-2 focus:ring-vr-teal/20 transition-all font-medium text-vr-navy"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Monthly/Annual Rent (₦)</label>
                                            <div className="relative">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-vr-navy">₦</div>
                                                <input
                                                    type="text"
                                                    placeholder="4,500,000"
                                                    className="w-full h-16 pl-12 pr-6 bg-vr-gray/30 rounded-2xl border-none focus:ring-2 focus:ring-vr-teal/20 transition-all font-medium text-vr-navy"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Property Type</label>
                                            <CustomSelect
                                                options={PROPERTY_TYPES}
                                                value={formData.type}
                                                onChange={(val) => setFormData({ ...formData, type: val })}
                                                placeholder="Select Type"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Bedroom(s)</label>
                                            <div className="flex gap-2">
                                                {["1", "2", "3", "4", "5+"].map((n) => (
                                                    <button
                                                        key={n}
                                                        onClick={() => setFormData({ ...formData, beds: n })}
                                                        className={`flex-1 h-14 rounded-xl font-bold transition-all ${formData.beds === n ? 'bg-vr-navy text-vr-teal' : 'bg-vr-gray/30 text-vr-navy/40 hover:bg-vr-gray/50'}`}
                                                    >
                                                        {n}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Bathroom(s)</label>
                                            <div className="flex gap-2">
                                                {["1", "2", "3", "4", "5+"].map((n) => (
                                                    <button
                                                        key={n}
                                                        onClick={() => setFormData({ ...formData, baths: n })}
                                                        className={`flex-1 h-14 rounded-xl font-bold transition-all ${formData.baths === n ? 'bg-vr-navy text-vr-teal' : 'bg-vr-gray/30 text-vr-navy/40 hover:bg-vr-gray/50'}`}
                                                    >
                                                        {n}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <Button onClick={handleNext} className="h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-vr-teal/20">
                                        Next Component <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : step === 2 ? (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] p-8 md:p-12 border border-vr-silver/20 shadow-2xl shadow-vr-navy/5"
                            >
                                <div className="mb-10 text-center">
                                    <h2 className="text-3xl font-bold text-vr-navy mb-2">Location & Discovery</h2>
                                    <p className="text-vr-navy/40 font-medium tracking-tight">Where is this house located in Nigeria?</p>
                                </div>

                                <div className="space-y-8 max-w-2xl mx-auto">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">State</label>
                                            <CustomSelect
                                                options={NIGERIA_STATES.map(s => ({ label: s, value: s }))}
                                                value={formData.state}
                                                onChange={(val) => setFormData({ ...formData, state: val, lga: "" })}
                                                placeholder="Select State"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Local Gov (LGA)</label>
                                            <CustomSelect
                                                options={formData.state ? (STATE_LGAS[formData.state] || []).map(l => ({ label: l, value: l })) : []}
                                                value={formData.lga}
                                                onChange={(val) => setFormData({ ...formData, lga: val })}
                                                placeholder="Select LGA"
                                                disabled={!formData.state}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-vr-navy uppercase tracking-widest px-2">Full Street Address</label>
                                        <textarea
                                            placeholder="e.g. Plot 15, Admiralty Way, Lekki Phase 1"
                                            className="w-full h-32 p-6 bg-vr-gray/30 rounded-3xl border-none focus:ring-2 focus:ring-vr-teal/20 transition-all font-medium text-vr-navy resize-none"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="p-6 bg-vr-teal/5 rounded-3xl border border-vr-teal/10 flex items-start gap-4">
                                        <div className="w-10 h-10 bg-vr-teal rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-vr-navy mb-1 text-sm">Physical Verification Note</h4>
                                            <p className="text-xs text-vr-navy/50 leading-relaxed">Once listed, our team may visit this location to verify its existence. Ensure the address is precise for GPS tagging.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between">
                                    <Button onClick={handleBack} variant="outline" className="h-16 px-10 rounded-2xl font-bold">
                                        <ChevronLeft className="w-5 h-5 mr-2" /> Back
                                    </Button>
                                    <Button onClick={handleNext} className="h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-vr-teal/20">
                                        Continue <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : step === 3 ? (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-[3rem] p-8 md:p-12 border border-vr-silver/20 shadow-2xl shadow-vr-navy/5"
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold text-vr-navy mb-2">Visual Catalog</h2>
                                    <p className="text-vr-navy/40 font-medium tracking-tight">High quality photos get verified faster.</p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                                    <label className="aspect-square rounded-3xl border-2 border-dashed border-vr-silver flex flex-col items-center justify-center cursor-pointer hover:bg-vr-gray/50 transition-all group">
                                        <div className="w-12 h-12 bg-vr-silver/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Camera className="w-6 h-6 text-vr-navy/30" />
                                        </div>
                                        <span className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Main Cover</span>
                                    </label>
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="aspect-square rounded-3xl border-2 border-dashed border-vr-silver flex items-center justify-center text-vr-navy/10">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-vr-navy rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-vr-navy/20">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-vr-teal rounded-3xl flex items-center justify-center animate-pulse">
                                            <ShieldCheck className="w-8 h-8 text-vr-navy" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">Ready for Submission?</h3>
                                            <p className="text-white/40 text-sm">Listing will enter "Pending" status for review.</p>
                                        </div>
                                    </div>
                                    <Button onClick={handleNext} className="bg-vr-teal text-vr-navy hover:bg-vr-teal/90 h-16 px-12 rounded-2xl text-lg font-bold shadow-xl shadow-vr-teal/40">
                                        Submit Property
                                    </Button>
                                </div>

                                <button onClick={handleBack} className="mt-8 text-xs font-bold text-vr-navy/40 uppercase tracking-widest hover:text-vr-navy transition-colors">
                                    Back to Location
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="final"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-bold text-vr-navy mb-4">Submission Sent!</h2>
                                <p className="text-vr-navy/40 font-medium max-w-md mx-auto mb-10 text-lg">Your listing is now in our verification queue. Our team will review the details and photos within 24 hours.</p>

                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Link href="/dashboard/provider">
                                        <Button className="h-16 px-10 rounded-2xl text-lg font-bold min-w-[200px]">Go to Dashboard</Button>
                                    </Link>
                                    <Button variant="outline" className="h-16 px-10 rounded-2xl font-bold min-w-[200px]" onClick={() => setStep(1)}>List Another House</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
