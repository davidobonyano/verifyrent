import { MapPin, Phone, Mail, Globe, Instagram, Twitter, ShieldCheck, Star, Calendar, MessageSquare, ExternalLink } from "lucide-react";

export const DUMMY_AGENTS = [
    {
        id: "agt-1",
        name: "Olakunle Williams",
        role: "Verified Premium Agent",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        bio: "Specializing in luxury apartments in Lekki and Victoria Island. With over 8 years of experience in the Lagos real estate market, I ensure every tenant finds their perfect home through a seamless, verified process.",
        location: "Lekki Phase 1, Lagos",
        phone: "+234 803 123 4567",
        email: "williams.o@verifyrent.com",
        isVerified: true,
        verificationLevel: "Diamond",
        joinedDate: "October 2023",
        stats: {
            properties: 12,
            verified: 12,
            rating: 4.9,
            reviews: 48
        },
        socials: {
            instagram: "@williams_realty",
            twitter: "@williams_homes",
            website: "www.williamsrealty.ng"
        }
    },
    {
        id: "lnd-1",
        name: "Alhaji Ibrahim Musa",
        role: "Direct Landlord",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        bio: "Owner of the Musa Estate in Ikeja. I pride myself on providing high-quality, serviced apartments for families and young professionals. All my houses are personally managed and VerifyRent certified.",
        location: "Ikeja GRA, Lagos",
        phone: "+234 802 987 6543",
        email: "ibrahim.m@musaestate.com",
        isVerified: true,
        verificationLevel: "Gold",
        joinedDate: "January 2024",
        stats: {
            properties: 3,
            verified: 3,
            rating: 4.7,
            reviews: 15
        },
        socials: {
            instagram: "@musa_estates",
            twitter: "@musa_homes",
            website: "www.musaestate.com"
        }
    }
];
