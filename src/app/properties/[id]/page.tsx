"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
    MapPin, BedDouble, Bath, Square,
    ShieldCheck, CheckCircle2, Phone,
    MessageSquare, Send, User, Calendar,
    ChevronLeft, ChevronRight, Heart, Share2,
    Flag, AlertTriangle, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { DUMMY_PROPERTIES } from "@/lib/constants";
import Link from "next/link";

export default function PropertyDetail() {
    const params = useParams();
    const id = params.id;
    const property = DUMMY_PROPERTIES.find(p => p.id === id) || DUMMY_PROPERTIES[0];

    const [currentImage, setCurrentImage] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
        { id: 1, user: "Chidi O.", text: "Is the service charge included in the annual rent?", date: "2h ago", reply: "Yes, the service charge covers security and waste disposal." },
        { id: 2, user: "Fatima Y.", text: "Can I schedule a viewing for Saturday morning?", date: "5h ago", reply: null }
    ]);

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            user: "Joshua D. (You)",
            text: comment,
            date: "Just now",
            reply: null
        };
        setComments([newComment, ...comments]);
        setComment("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-vr-gray/30">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="section-container">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold text-vr-navy/30 uppercase tracking-widest mb-8">
                        <Link href="/properties" className="hover:text-vr-teal">Properties</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-vr-navy">{property.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Content Case */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Gallery */}
                            <div className="relative rounded-[3rem] overflow-hidden bg-vr-navy shadow-2xl group">
                                <div className="aspect-[16/9] relative">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImage}
                                            src={property.images[currentImage]}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full object-cover"
                                            alt={property.title}
                                        />
                                    </AnimatePresence>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setCurrentImage(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-vr-navy transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImage(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-vr-navy transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                    {property.images.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all ${i === currentImage ? 'w-8 bg-vr-teal' : 'w-2 bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Property Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    {property.isDirectLandlord ? (
                                        <span className="px-3 py-1 bg-vr-teal text-vr-navy text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3 h-3" /> Direct Landlord
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-vr-navy text-vr-teal text-[10px] font-bold rounded-lg uppercase tracking-wider">Verified Agent</span>
                                    )}
                                    <span className="px-3 py-1 bg-vr-gray text-vr-navy/40 text-[10px] font-bold rounded-lg uppercase tracking-wider">{property.type}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-vr-navy mb-4 leading-tight">{property.title}</h1>
                                <div className="flex items-center gap-2 text-lg text-vr-navy/60 font-medium pb-8 border-b border-vr-silver/30">
                                    <MapPin className="w-5 h-5 text-vr-teal" /> {property.location}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                            <BedDouble className="w-6 h-6 text-vr-teal" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-vr-navy">{property.beds}</div>
                                            <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Bedrooms</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                            <Bath className="w-6 h-6 text-vr-teal" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-vr-navy">{property.baths}</div>
                                            <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Bathrooms</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                            <Square className="w-6 h-6 text-vr-teal" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-vr-navy">2,400</div>
                                            <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Sq. Ft</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                            <ShieldCheck className="w-6 h-6 text-vr-teal" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-vr-navy">Verified</div>
                                            <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Security</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Public Discussion / Comments */}
                            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-vr-silver/30 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-vr-teal/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-bold text-vr-navy">Public Q&A</h3>
                                        <div className="px-4 py-1.5 bg-vr-navy text-vr-teal text-[10px] font-bold rounded-lg uppercase tracking-widest">
                                            {comments.length} Questions
                                        </div>
                                    </div>

                                    <p className="text-vr-navy/60 mb-8 max-w-lg leading-relaxed">
                                        Have a question about the service charge, location, or amenities? Ask it here.
                                        Questions and replies from the provider are public to help other tenants.
                                    </p>

                                    {/* Post a question */}
                                    <form onSubmit={handlePostComment} className="mb-12">
                                        <div className="relative p-2 bg-vr-gray rounded-[2rem] border-2 border-transparent focus-within:border-vr-teal focus-within:bg-white transition-all">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Ask your question publicly..."
                                                className="w-full bg-transparent border-none focus:ring-0 p-6 min-h-[120px] resize-none font-medium text-vr-navy"
                                            />
                                            <div className="flex justify-between items-center p-4">
                                                <p className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest px-2">Your question will be visible to everyone</p>
                                                <Button type="submit" className="rounded-2xl h-12 px-8">
                                                    Post Question <Send className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </form>

                                    {/* Questions List */}
                                    <div className="space-y-8">
                                        <AnimatePresence mode="popLayout">
                                            {comments.map((c) => (
                                                <motion.div
                                                    key={c.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="group"
                                                >
                                                    <div className="flex gap-4 items-start mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-vr-navy/5 flex items-center justify-center flex-shrink-0 text-vr-navy/30 font-bold uppercase text-xs">
                                                            {c.user.charAt(0)}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex items-center gap-3 mb-1">
                                                                <span className="font-bold text-vr-navy text-sm">{c.user}</span>
                                                                <span className="text-[10px] font-bold text-vr-navy/20 uppercase tracking-widest flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" /> {c.date}
                                                                </span>
                                                            </div>
                                                            <p className="text-vr-navy/70 leading-relaxed">{c.text}</p>
                                                        </div>
                                                    </div>

                                                    {c.reply ? (
                                                        <div className="ml-14 p-6 bg-vr-gray/50 rounded-3xl border border-vr-silver/20 relative">
                                                            <div className="absolute top-4 -left-3 w-6 h-6 bg-vr-gray/50 border-l border-b border-vr-silver/20 rotate-45" />
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="px-2 py-0.5 bg-vr-teal text-vr-navy text-[8px] font-bold rounded-md uppercase tracking-widest">Provider Reply</div>
                                                            </div>
                                                            <p className="text-sm text-vr-navy/80 font-medium leading-relaxed italic">
                                                                "{c.reply}"
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="ml-14 mt-2">
                                                            <span className="text-[10px] font-bold text-vr-teal uppercase tracking-widest animate-pulse">Waiting for provider response...</span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Booking/Contact */}
                        <aside className="space-y-8">
                            <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-vr-silver/30 shadow-2xl shadow-vr-navy/5 sticky top-24">
                                <div className="mb-8">
                                    <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest mb-1">Annual Rent</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-vr-navy tracking-tight">{property.price}</span>
                                        <span className="text-lg font-bold text-vr-navy/40">/yr</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="p-4 bg-vr-gray rounded-2xl flex items-center justify-between border border-vr-silver/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-vr-teal shadow-lg shadow-vr-teal/10 flex items-center justify-center">
                                                <ShieldCheck className="w-5 h-5 text-vr-navy" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-vr-navy uppercase tracking-widest">VerifyRent Protected</div>
                                                <p className="text-[10px] text-vr-navy/40 leading-none">Escrow Enabled</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/2348100000000?text=I'm%20interested%20in%20Verified%20Property%20${property.id}%20on%20VerifyRent`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-vr-teal/20">
                                            Get Direct Contact <Phone className="w-5 h-5 ml-2" />
                                        </Button>
                                    </a>
                                    <Button variant="outline" className="w-full h-16 rounded-2xl font-bold border-vr-silver text-vr-navy">
                                        Schedule Physical Viewing
                                    </Button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-vr-silver/30 flex justify-between items-center px-2">
                                    <button className="flex flex-col items-center gap-1 group">
                                        <div className="w-10 h-10 rounded-xl bg-vr-gray flex items-center justify-center group-hover:bg-vr-teal/10 transition-colors">
                                            <Heart className="w-5 h-5 text-vr-navy/30 group-hover:text-vr-teal group-hover:fill-vr-teal transition-all" />
                                        </div>
                                        <span className="text-[8px] font-bold text-vr-navy/30 uppercase tracking-widest">Save</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 group">
                                        <div className="w-10 h-10 rounded-xl bg-vr-gray flex items-center justify-center group-hover:bg-vr-navy group-hover:text-white transition-colors">
                                            <Share2 className="w-5 h-5 text-vr-navy/30 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[8px] font-bold text-vr-navy/30 uppercase tracking-widest">Share</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-1 group">
                                        <div className="w-10 h-10 rounded-xl bg-vr-gray flex items-center justify-center group-hover:bg-vr-navy group-hover:text-white transition-colors">
                                            <Flag className="w-5 h-5 text-vr-navy/30 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[8px] font-bold text-vr-navy/30 uppercase tracking-widest">Report</span>
                                    </button>
                                </div>
                            </div>

                            {/* Verification Shield */}
                            <div className="bg-vr-navy p-8 rounded-[3rem] text-white relative overflow-hidden">
                                <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4">Integrity First</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-vr-teal shrink-0 mt-0.5" />
                                            <p className="text-xs text-white/60">Property physically verified via GPS/Biometric logs.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <CheckCircle2 className="w-4 h-4 text-vr-teal shrink-0 mt-0.5" />
                                            <p className="text-xs text-white/60">Payment protection via verified owner registry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
