export type ProfileStatus = "pending" | "verified" | "banned" | "flagged";

export interface Report {
    id: string;
    agentId: string;
    agentName: string;
    reporterName: string;
    reason: string;
    date: string;
    evidenceUrl?: string;
    status: "new" | "resolved" | "dismissed";
}

export interface PendingVerification {
    id: string;
    name: string;
    role: "Agent" | "Landlord";
    email: string;
    phone: string;
    submittedDate: string;
    status: ProfileStatus;
    trustScore: number;
    socials: {
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    documents: {
        idType: string;
        idImageUrl: string;
        faceScanUrl: string;
    };
}

export const MOCK_VERIFICATIONS: PendingVerification[] = [
    {
        id: "USR-001",
        name: "Samuel Chinedu",
        role: "Agent",
        email: "s.chinedu@realtyhub.ng",
        phone: "+234 902 345 6789",
        submittedDate: "2 hours ago",
        status: "pending",
        trustScore: 45,
        socials: {
            instagram: "@sam_realty_lagos",
            twitter: "@sam_realtor",
            linkedin: "linkedin.com/in/samuel-chinedu"
        },
        documents: {
            idType: "International Passport",
            idImageUrl: "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?w=400&h=250&fit=crop",
            faceScanUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        }
    },
    {
        id: "USR-002",
        name: "Bosede Adebayo",
        role: "Landlord",
        email: "bosede.a@gmail.com",
        phone: "+234 810 555 0122",
        submittedDate: "5 hours ago",
        status: "pending",
        trustScore: 68,
        socials: {
            instagram: "@adebayo_properties",
            twitter: "@bosedehomes",
            linkedin: "linkedin.com/in/bosede-adebayo"
        },
        documents: {
            idType: "Driver's License",
            idImageUrl: "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?w=400&h=250&fit=crop",
            faceScanUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
        }
    },
    {
        id: "USR-003",
        name: "Ibrahim Musa",
        role: "Agent",
        email: "musa_ib@kano-estates.com",
        phone: "+234 703 111 2233",
        submittedDate: "1 day ago",
        status: "flagged",
        trustScore: 12,
        socials: {
            instagram: "@musa_abu_estate",
            twitter: "@musa_ib_estate",
            linkedin: "none"
        },
        documents: {
            idType: "National ID (NIN)",
            idImageUrl: "https://images.unsplash.com/photo-1554126807-6b10f6f6692a?w=400&h=250&fit=crop",
            faceScanUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
        }
    }
];

export const MOCK_REPORTS: Report[] = [
    {
        id: "REP-001",
        agentId: "agt-1",
        agentName: "Olakunle Williams",
        reporterName: "Chidi Okafor",
        reason: "Agent requested payment before viewing the apartment which is against platform policy.",
        date: "3 hours ago",
        status: "new"
    },
    {
        id: "REP-002",
        agentId: "USR-003",
        agentName: "Ibrahim Musa",
        reporterName: "Fatima Yusuf",
        reason: "Property in the photo does not match the actual property on site.",
        date: "1 day ago",
        status: "new"
    }
];
