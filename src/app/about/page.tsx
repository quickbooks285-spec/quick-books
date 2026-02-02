import type { Metadata } from "next";
import { Mission } from "@/components/sections/Mission";
import { Team } from "@/components/sections/Team";
import { Features } from "@/components/sections/Features";
import { Section } from "@/components/layout/Section";
import { Heart, Users, Target, Zap, Shield, Globe } from "lucide-react";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "About Us | QuickBooks Company & Mission",
    description: "Learn about QuickBooks' mission to power prosperity around the world. Meet our leadership team and discover our core values.",
    openGraph: {
        title: "About QuickBooks - Powering Prosperity",
        description: "Empowering businesses to prosper with smart accounting solutions.",
    },
};

export default function AboutPage() {
    const values = [
        {
            title: "Customer Obsessed",
            description: "We fall in love with our customers' problems, not our solutions.",
            icon: Heart
        },
        {
            title: "Stronger Together",
            description: "We champion diversity, inclusion, and a respectful environment for all.",
            icon: Users
        },
        {
            title: "Be Bold",
            description: "We take risks, fail fast, and learn faster to deliver innovation.",
            icon: Zap
        },
        {
            title: "Integrity Without Compromise",
            description: "We speak the truth and assume best intent. We value trust above all.",
            icon: Shield
        },
        {
            title: "We Care",
            description: "We give back to the communities where we live and work.",
            icon: Globe
        },
        {
            title: "Deliver Awesome",
            description: "We delight our customers with experiences they thank us for.",
            icon: Target
        }
    ];

    const teamMembers = [
        {
            name: "Sasan Goodarzi",
            role: "CEO",
            bio: "Leading Into the future with AI-driven expert platforms."
        },
        {
            name: "Marianna Tessel",
            role: "CTO",
            bio: "Driving technology innovation and platform strategy."
        },
        {
            name: "Mark Notarainni",
            role: "EVP, Customer Success",
            bio: "Obsessed with delivering delightful customer experiences."
        },
        {
            name: "Lauren Hotz",
            role: "EVP, Global People",
            bio: "Building a world-class culture and diverse team."
        }
    ];

    return (
        <>
            <OrganizationSchema />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://thequickbook.com" },
                    { name: "About", url: "https://thequickbook.com/about" }
                ]}
            />
            <div className="pt-20">
                <Section background="white" className="pb-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About QuickBooks</h1>
                        <p className="text-xl text-muted-foreground">Powering prosperity around the world.</p>
                    </div>
                </Section>

                <Mission />

                <Features
                    title="Our Core Values"
                    subtitle="The principles that guide our culture and our work."
                    features={values}
                    columns={3}
                />

                <Team
                    title="Leadership Team"
                    subtitle="Meet the people guiding our mission effectively."
                    members={teamMembers}
                    background="brand"
                />
            </div>
        </>
    );
}
