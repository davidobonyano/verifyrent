"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Home, ChevronDown, Search, LocateFixed, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyCard } from "@/components/ui/property-card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomSelect } from "@/components/ui/custom-select";
import { NIGERIA_STATES, STATE_LGAS, PROPERTY_TYPES, DUMMY_PROPERTIES, Property } from "@/lib/constants";

export default function PropertiesPage() {
    const [selectedState, setSelectedState] = useState("");
    const [selectedLga, setSelectedLga] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [isDetecting, setIsDetecting] = useState(false);

    const handleDetectLocation = () => {
        setIsDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                // In a real app, you'd use a reverse geocoding API here
                // For this startup demo, we'll simulate detection logic
                setTimeout(() => {
                    setSelectedState("Lagos");
                    setSelectedLga("Ikeja");
                    setIsDetecting(false);
                }, 1500);
            }, (error) => {
                console.error(error);
                setIsDetecting(false);
                alert("Could not detect location. Please select manually.");
            });
        }
    };

    useEffect(() => {
        handleDetectLocation();
    }, []);

    const filteredProperties = DUMMY_PROPERTIES.filter(p => {
        const stateMatch = !selectedState || p.location.includes(selectedState);
        const lgaMatch = !selectedLga || p.location.includes(selectedLga);
        const typeMatch = !selectedType || p.type === PROPERTY_TYPES.find(t => t.value === selectedType)?.label;
        return stateMatch && lgaMatch && typeMatch;
    });

    const suggestedProperties = selectedState || selectedType ? DUMMY_PROPERTIES.filter(p => {
        // Suggest properties in the same state if location was selected, 
        // or just show recent verified properties if everything else fails
        const stateMatch = selectedState && p.location.includes(selectedState);
        const typeMatch = selectedType && p.type === PROPERTY_TYPES.find(t => t.value === selectedType)?.label;
        return (stateMatch || typeMatch) && !filteredProperties.includes(p);
    }).slice(0, 3) : [];

    return (
        <div className="flex flex-col min-h-screen bg-vr-navy">
            <Navbar />
            <main className="flex-grow pt-40 pb-32">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-vr-silver/10 pb-8">
                            <div className="max-w-2xl">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-teal mb-2 block">The Registry</span>
                                <h1 className="text-4xl md:text-6xl font-serif font-bold text-vr-cream leading-none mb-3 uppercase tracking-tighter">FIND YOUR <br /> <span className="text-vr-teal italic">NEXT HOME.</span></h1>
                                <p className="text-vr-cream/50 text-sm font-medium leading-relaxed">Discovery verified listings across Nigeria. Each record held in our kiln of trust.</p>
                            </div>

                            {/* Detection Status (Industrial) */}
                            <div className="bg-vr-iron p-6 border-l-4 border-vr-teal backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-2 h-2 rounded-full", isDetecting ? "bg-vr-teal animate-pulse" : "bg-green-500")} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-vr-cream/60">
                                        {isDetecting ? "Scanning Location..." : "Location Locked: Lagos"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Registry Filter (The Console) */}
                        <div className="bg-vr-iron p-1 border border-vr-silver/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                                <div className="bg-vr-navy p-4 border border-vr-silver/5">
                                    <CustomSelect
                                        label="STATE ORIGIN"
                                        placeholder="Select State"
                                        options={NIGERIA_STATES}
                                        value={selectedState}
                                        onChange={(val) => {
                                            setSelectedState(val);
                                            setSelectedLga("");
                                        }}
                                        icon={<MapPin className="text-vr-teal/40 w-3 h-3" />}
                                    />
                                </div>
                                <div className="bg-vr-navy p-4 border border-vr-silver/5">
                                    <CustomSelect
                                        label="DISTRICT / LGA"
                                        placeholder={selectedState ? "Select LGA" : "Awaiting State..."}
                                        options={selectedState ? STATE_LGAS[selectedState] || [] : []}
                                        value={selectedLga}
                                        onChange={setSelectedLga}
                                        disabled={!selectedState}
                                        icon={<Filter className="text-vr-teal/40 w-3 h-3" />}
                                    />
                                </div>
                                <div className="bg-vr-navy p-4 border border-vr-silver/5">
                                    <CustomSelect
                                        label="ASSET CLASS"
                                        placeholder="Any Type"
                                        options={PROPERTY_TYPES}
                                        value={selectedType}
                                        onChange={setSelectedType}
                                        icon={<Home className="text-vr-teal/40 w-3 h-3" />}
                                    />
                                </div>
                                <Button className="h-full py-6 btn-primary !shadow-none !border-0 flex flex-col items-center justify-center gap-1 group">
                                    <Search className="w-5 h-5 group-hover:scale-110 transition-heavy" />
                                    <span className="text-[9px] tracking-[0.2em] font-bold">SEARCH REGISTRY</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProperties.map((property, index) => (
                                <div key={property.id}>
                                    <PropertyCard {...property} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-16 bg-vr-iron border border-vr-silver/10 text-center relative overflow-hidden"
                            >
                                {/* Empty background texture */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

                                <div className="relative z-10 px-6">
                                    <div className="w-16 h-16 bg-vr-navy border border-vr-silver/10 flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-6 h-6 text-vr-teal/20" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-vr-cream mb-2 uppercase tracking-tight">Search Exhausted</h2>
                                    <p className="text-vr-cream/50 max-w-sm mx-auto font-medium text-xs leading-relaxed">
                                        We couldn't verify exactly what you're looking for in <span className="text-vr-teal">{selectedLga || selectedState || "this area"}</span>.
                                        <br />However, our registry holds strong alternatives nearby.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Smart Suggestions Section */}
                            {suggestedProperties.length > 0 && (
                                <div className="mt-0">
                                    <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-vr-navy p-8 border-x border-vr-silver/10">
                                        <div className="max-w-xl">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vr-teal mb-2 block">Recommended Records</span>
                                            <h3 className="text-xl font-serif font-bold text-vr-cream uppercase tracking-tight">NEAREST VERIFIED ASSETS</h3>
                                        </div>
                                        <div className="h-px flex-1 bg-vr-silver/10 hidden md:block mb-2" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-vr-silver/10">
                                        {suggestedProperties.map((property, index) => (
                                            <div key={property.id} className="border-r border-b last:border-r-0 border-vr-silver/10">
                                                <PropertyCard {...property} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-32 flex justify-center border-t border-vr-silver/10 pt-20">
                        <Button variant="outline" className="btn-outline min-w-[300px] h-20">VIEW DEEPER REGISTRY</Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


