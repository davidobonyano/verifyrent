"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[] | string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    searchable?: boolean;
}

export function CustomSelect({
    options,
    value,
    onChange,
    placeholder,
    label,
    icon,
    disabled,
    className,
    searchable = true
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const formattedOptions = options.map(opt =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
    );

    const filteredOptions = formattedOptions.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = formattedOptions.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("space-y-3 relative", className)} ref={containerRef}>
            {label && (
                <label className="text-[10px] font-bold text-vr-teal uppercase tracking-[0.3em] ml-0.5">
                    {label}
                </label>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full h-14 pl-12 pr-10 bg-vr-navy rounded-none border border-vr-silver/10 outline-none text-xs font-bold uppercase tracking-widest text-vr-cream flex items-center justify-between transition-heavy hover:border-vr-teal/50",
                    disabled && "opacity-30 cursor-not-allowed",
                    isOpen && "border-vr-teal shadow-[0_0_20px_rgba(184,134,11,0.1)]"
                )}
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {icon}
                </div>

                <span className={cn("truncate", !value && "text-vr-cream/20")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <ChevronDown className={cn(
                    "w-4 h-4 text-vr-teal/30 transition-transform duration-500",
                    isOpen && "rotate-180 text-vr-teal"
                )} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="absolute top-full left-0 right-0 mt-1 bg-vr-iron rounded-none border border-vr-teal/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] overflow-hidden patina"
                    >
                        {searchable && (
                            <div className="p-4 border-b border-vr-silver/10 bg-vr-navy">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-vr-teal/30" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="SCANNIG REGISTRY..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-vr-iron border border-vr-silver/10 rounded-none py-3 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest text-vr-cream outline-none focus:border-vr-teal transition-heavy"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 custom-scrollbar bg-vr-iron">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                            setSearchTerm("");
                                        }}
                                        className={cn(
                                            "w-full text-left px-5 py-4 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-heavy flex items-center justify-between group relative overflow-hidden",
                                            value === option.value
                                                ? "bg-vr-teal text-vr-navy"
                                                : "text-vr-cream/50 hover:bg-vr-navy hover:text-vr-teal"
                                        )}
                                    >
                                        <span className="relative z-10">{option.label}</span>
                                        {value === option.value && <Check className="w-3 h-3 relative z-10" />}
                                    </button>
                                ))
                            ) : (
                                <div className="p-12 text-center text-vr-teal/20 text-[10px] font-bold uppercase tracking-widest italic">
                                    NO RECORDS FOUND
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
