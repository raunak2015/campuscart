import type { Enquiry, CreateEnquiryInput } from "@/types/enquiry";

export const enquiryService = {
    async create(data: CreateEnquiryInput): Promise<Enquiry> {
        const res = await fetch("/api/enquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to submit enquiry");
        }
        return res.json();
    },

    async getMyEnquiries(): Promise<Enquiry[]> {
        const res = await fetch("/api/enquiries?type=sent");
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to fetch enquiries");
        }
        const data = await res.json();
        return data.enquiries || [];
    },

    async getReceivedEnquiries(): Promise<Enquiry[]> {
        const res = await fetch("/api/enquiries?type=received");
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to fetch received enquiries");
        }
        const data = await res.json();
        return data.enquiries || [];
    },

    async updateStatus(id: string, status: "pending" | "responded"): Promise<Enquiry> {
        const res = await fetch("/api/enquiries", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to update enquiry status");
        }
        const data = await res.json();
        return data.enquiry;
    },
};
