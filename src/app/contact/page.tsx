import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | QuickBooks Support & Sales",
    description: "Get in touch with QuickBooks. Contact our support team, sales representatives, or send us a message. We're here to help your business succeed.",
    openGraph: {
        title: "Contact QuickBooks",
        description: "Reach out to our team for support, sales inquiries, or general questions.",
    },
};

export default function ContactPage() {
    return (
        <div className="pt-20">
            <ContactForm />
        </div>
    );
}
