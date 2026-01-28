"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const IdentityVerificationClient = dynamic(
    () => import("@/components/IdentityVerificationClient"),
    {
        ssr: false,
        loading: () => (
            <div className="flex flex-col min-h-screen bg-vr-navy items-center justify-center">
                <Loader2 className="w-16 h-16 text-vr-teal animate-spin mb-4" />
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Initializing Secure Environment...</h3>
            </div>
        )
    }
);

export default function IdentityVerification() {
    return <IdentityVerificationClient />;
}
