"use client";

import {
    LayoutDashboard, UserCheck, ShieldAlert,
    Settings, LogOut, Search, Bell,
    Filter, MoreHorizontal, CheckCircle2,
    XCircle, AlertTriangle, Phone, ExternalLink,
    Eye, Trash2, Ban, ArrowUpRight, TrendingUp,
    ShieldCheck, Users, Home, ClipboardList,
    Flag, MessageCircle
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MOCK_VERIFICATIONS, MOCK_REPORTS, PendingVerification, Report, ProfileStatus } from "@/lib/admin-data";

export default function AdminDashboard() {
    const [verifications, setVerifications] = useState<PendingVerification[]>(MOCK_VERIFICATIONS);
    const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
    const [selectedUser, setSelectedUser] = useState<PendingVerification | null>(null);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [activeTab, setActiveTab] = useState<"queue" | "reports">("queue");

    const stats = [
        { label: "Pending Verification", value: verifications.filter(v => v.status === 'pending').length, icon: UserCheck, color: "text-vr-teal", bg: "bg-vr-teal/5" },
        { label: "Unresolved Reports", value: reports.filter(r => r.status === 'new').length, icon: Flag, color: "text-vr-navy", bg: "bg-vr-navy/5" },
        { label: "Active Verified", value: 1242, icon: ShieldCheck, color: "text-vr-teal", bg: "bg-vr-teal/5" },
        { label: "Total Properties", value: 4502, icon: Home, color: "text-vr-navy", bg: "bg-vr-navy/5" },
    ];

    const handleUpdateStatus = (id: string, newStatus: ProfileStatus) => {
        setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
        setSelectedUser(null);
    };

    const handleResolveReport = (id: string, newStatus: "resolved" | "dismissed") => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        setSelectedReport(null);
    };

    return (
        <div className="flex min-h-screen bg-[#F0F2F5]">
            {/* Sidebar */}
            <aside className="w-72 bg-vr-navy text-white flex flex-col shrink-0">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-vr-teal rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-vr-navy" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Admin Shield</span>
                    </div>

                    <nav className="space-y-2">
                        <button className="flex items-center gap-3 w-full p-4 bg-white/10 rounded-2xl text-vr-teal font-bold shadow-lg shadow-black/20 text-left">
                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <UserCheck className="w-5 h-5" /> Verifications
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <Flag className="w-5 h-5" /> Reports
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <Users className="w-5 h-5" /> User Management
                        </button>
                        <div className="pt-8 mb-4 px-4 text-xs font-bold uppercase tracking-widest text-white/20">System</div>
                        <button className="flex items-center gap-3 w-full p-4 hover:bg-white/5 rounded-2xl text-white/60 hover:text-white transition-all font-medium text-left">
                            <Settings className="w-5 h-5" /> Settings
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-8">
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                        <div className="text-[10px] font-bold text-white/40 uppercase mb-2 tracking-widest">Logged in Account</div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-vr-teal flex items-center justify-center text-vr-navy font-bold text-xs">AD</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold">Root Admin</span>
                                <span className="text-[10px] text-white/40">Infrastructure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10 overflow-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-vr-navy">Command Dashboard</h1>
                        <p className="text-vr-navy/40 font-medium tracking-tight">VerifyRent Identity & Integrity Management</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vr-navy/20" />
                            <input
                                type="text"
                                placeholder="Search IDs, Phones..."
                                className="pl-11 pr-6 h-12 w-64 bg-white rounded-xl border border-vr-silver/50 focus:outline-none focus:ring-1 focus:ring-vr-teal focus:border-vr-teal transition-all text-sm font-medium"
                            />
                        </div>
                        <Button variant="outline" className="h-12 w-12 rounded-xl p-0 relative border-vr-silver/50">
                            <Bell className="w-5 h-5 text-vr-navy/40" />
                            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-vr-teal rounded-full" />
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
                            className="bg-white p-6 rounded-[2rem] border border-vr-silver/30 shadow-sm shadow-vr-navy/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-vr-navy mb-1">{stat.value.toLocaleString()}</div>
                            <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Tabs */}
                <div className="flex gap-8 mb-8 border-b border-vr-silver/30">
                    <button
                        onClick={() => setActiveTab("queue")}
                        className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'queue' ? 'text-vr-teal' : 'text-vr-navy/30'}`}
                    >
                        Verification Queue
                        {activeTab === 'queue' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vr-teal" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("reports")}
                        className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === 'reports' ? 'text-vr-teal' : 'text-vr-navy/30'}`}
                    >
                        User Reports ({reports.length})
                        {activeTab === 'reports' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-vr-teal" />}
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-vr-silver/30 shadow-sm shadow-vr-navy/5 overflow-hidden">
                    {activeTab === "queue" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-vr-gray/20 border-b border-vr-silver/30">
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Provider</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Type</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Trust Score</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-vr-silver/10">
                                    {verifications.map((user) => (
                                        <tr key={user.id} className="hover:bg-vr-gray/10 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-9 h-9 rounded-lg bg-vr-navy/5 flex items-center justify-center text-vr-navy/40 font-bold uppercase text-xs">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-vr-navy text-sm">{user.name}</div>
                                                        <div className="text-[10px] text-vr-navy/30 font-bold uppercase tracking-tighter">{user.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-vr-navy/60">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-20 h-1 bg-vr-silver/30 rounded-full overflow-hidden">
                                                        <div className="h-full bg-vr-navy/40" style={{ width: `${user.trustScore}%` }} />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-vr-navy/40">{user.trustScore}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-vr-navy/40 flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'verified' ? 'bg-vr-teal shadow-[0_0_8px_rgba(0,196,204,0.5)]' : 'bg-vr-navy/20'}`} />
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Button
                                                    onClick={() => setSelectedUser(user)}
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 rounded-lg hover:bg-vr-navy hover:text-white transition-all group/btn"
                                                >
                                                    <Eye className="w-3.5 h-3.5 text-vr-navy/20 group-hover:text-white" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-vr-gray/20 border-b border-vr-silver/30">
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Reporter</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Target Agent</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Reason</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-vr-silver/10">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-vr-gray/10 transition-colors">
                                            <td className="px-8 py-6 text-sm font-bold text-vr-navy">{report.reporterName}</td>
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-vr-navy text-sm">{report.agentName}</div>
                                                <div className="text-[10px] text-vr-navy/30 font-bold uppercase tracking-tighter">{report.agentId}</div>
                                            </td>
                                            <td className="px-8 py-6 max-w-xs">
                                                <div className="text-xs text-vr-navy/60 font-medium truncate">{report.reason}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${report.status === 'new' ? 'text-vr-navy' : 'text-vr-navy/30'}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <Button
                                                    onClick={() => setSelectedReport(report)}
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 rounded-lg hover:bg-vr-navy hover:text-white transition-all group/btn"
                                                >
                                                    <ShieldAlert className="w-3.5 h-3.5 text-vr-navy/20 group-hover:text-white" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Verification Detail Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 bg-vr-navy/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh]"
                        >
                            <div className="flex-grow bg-vr-gray/20 p-10 flex flex-col overflow-auto">
                                <div className="mb-10">
                                    <span className="text-[10px] font-bold text-vr-teal uppercase tracking-widest mb-2 block">Identity Verification</span>
                                    <h3 className="text-2xl font-bold text-vr-navy">Manual Comparison</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-3">
                                        <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">Government Document</div>
                                        <div className="aspect-square bg-vr-navy rounded-3xl overflow-hidden border border-vr-silver/30 grayscale shadow-inner">
                                            <img src={selectedUser.documents.idImageUrl} className="w-full h-full object-cover" alt="ID" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">WebSDK Face Scan</div>
                                        <div className="aspect-square bg-vr-navy rounded-3xl overflow-hidden border border-vr-silver/30 shadow-inner">
                                            <img src={selectedUser.documents.faceScanUrl} className="w-full h-full object-cover" alt="Face" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-2xl border border-vr-silver/30 mb-8">
                                    <h4 className="text-xs font-bold text-vr-navy/30 uppercase mb-4 tracking-widest">Agent Connections</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="flex items-center gap-2 text-xs font-bold text-vr-navy/60 hover:text-vr-teal transition-colors underline decoration-vr-silver/50 underline-offset-4">
                                            <ExternalLink className="w-3.5 h-3.5" /> View Linked Properties
                                        </a>
                                        <a href="#" className="flex items-center gap-2 text-xs font-bold text-vr-navy/60 hover:text-vr-teal transition-colors underline decoration-vr-silver/50 underline-offset-4">
                                            <ExternalLink className="w-3.5 h-3.5" /> Audit Social Handles
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[320px] bg-white p-10 border-l border-vr-silver/20 flex flex-col">
                                <button onClick={() => setSelectedUser(null)} className="ml-auto p-2 bg-vr-gray rounded-lg hover:bg-vr-silver/30 transition-colors mb-8">
                                    <XCircle className="w-5 h-5 text-vr-navy/40" />
                                </button>

                                <div className="text-center mb-10">
                                    <div className="w-20 h-20 bg-vr-navy rounded-2xl flex items-center justify-center text-vr-teal text-2xl font-bold mx-auto mb-4 tracking-tighter shadow-lg shadow-vr-navy/10">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <h4 className="text-lg font-bold text-vr-navy leading-none mb-1">{selectedUser.name}</h4>
                                    <span className="text-[10px] font-bold text-vr-navy/30 uppercase tracking-widest">{selectedUser.role} Account</span>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <Button
                                        onClick={() => handleUpdateStatus(selectedUser.id, 'verified')}
                                        className="w-full h-14 rounded-xl bg-vr-navy text-vr-teal hover:bg-vr-navy/95 font-bold shadow-xl shadow-vr-navy/20"
                                    >
                                        Verify Professional
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateStatus(selectedUser.id, 'flagged')}
                                        variant="outline"
                                        className="w-full h-14 rounded-xl border-vr-silver text-vr-navy font-bold hover:bg-vr-gray"
                                    >
                                        Request Additional ID
                                    </Button>
                                    {selectedUser.status === 'banned' ? (
                                        <Button
                                            onClick={() => handleUpdateStatus(selectedUser.id, 'pending')}
                                            className="w-full h-14 rounded-xl bg-vr-teal text-vr-navy hover:bg-vr-teal/90 transition-all font-bold group"
                                        >
                                            <ShieldCheck className="w-4 h-4 mr-2" /> Unban & Restore
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleUpdateStatus(selectedUser.id, 'banned')}
                                            className="w-full h-14 rounded-xl bg-white text-vr-navy/40 border-2 border-dashed border-vr-silver hover:border-vr-navy hover:text-vr-navy transition-all font-bold group"
                                        >
                                            <Ban className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> Permanent Ban
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Report Detail Modal */}
            <AnimatePresence>
                {selectedReport && (
                    <div className="fixed inset-0 bg-vr-navy/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl p-10"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <span className="text-[10px] font-bold text-vr-teal uppercase tracking-widest mb-2 block">Integrity Violation Report</span>
                                    <h3 className="text-2xl font-bold text-vr-navy">Reviewing Complaint</h3>
                                </div>
                                <button onClick={() => setSelectedReport(null)} className="p-2 bg-vr-gray rounded-lg hover:bg-vr-silver/30 transition-colors">
                                    <XCircle className="w-5 h-5 text-vr-navy/40" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="p-4 bg-vr-gray rounded-xl">
                                    <div className="text-[10px] font-bold text-vr-navy/30 uppercase mb-1">Target Agent</div>
                                    <div className="font-bold text-vr-navy">{selectedReport.agentName}</div>
                                    <div className="text-[10px] text-vr-navy/30 font-bold">{selectedReport.agentId}</div>
                                </div>
                                <div className="p-4 bg-vr-gray rounded-xl">
                                    <div className="text-[10px] font-bold text-vr-navy/30 uppercase mb-1">Reporter</div>
                                    <div className="font-bold text-vr-navy">{selectedReport.reporterName}</div>
                                    <div className="text-[10px] text-vr-navy/30 font-bold">{selectedReport.date}</div>
                                </div>
                            </div>

                            <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-vr-silver/50 mb-8 font-medium text-vr-navy/70 italic leading-relaxed">
                                "{selectedReport.reason}"
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={() => handleResolveReport(selectedReport.id, "resolved")}
                                    className="flex-grow h-14 rounded-xl bg-vr-navy text-vr-teal font-bold shadow-xl shadow-vr-navy/10"
                                >
                                    Review & Mark Resolved
                                </Button>
                                <Button
                                    onClick={() => {
                                        setVerifications(prev => prev.map(v => v.id === selectedReport.agentId ? { ...v, status: 'banned' } : v));
                                        handleResolveReport(selectedReport.id, "resolved");
                                    }}
                                    className="h-14 px-8 rounded-xl bg-white text-vr-navy/60 border border-vr-silver hover:bg-vr-navy hover:text-vr-teal transition-all font-bold"
                                >
                                    <Ban className="w-4 h-4 mr-2" /> Ban Agent
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
