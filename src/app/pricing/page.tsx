import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { PricingComparison } from "@/components/sections/PricingComparison";
import { FAQ } from "@/components/sections/FAQ";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
    title: "Pricing & Plans | QuickBooks Accounting Software",
    description: "Choose the right QuickBooks plan for your business. Compare Simple Start, Essentials, Plus, and Advanced plans. Start your free 30-day trial today.",
    openGraph: {
        title: "QuickBooks Pricing - Find Your Perfect Plan",
        description: "Compare QuickBooks plans and pricing. From $24/month with annual billing.",
    },
};

export default function PricingPage() {
    const tiers = [
        {
            name: "Simple Start",
            priceMonthly: 30,
            priceAnnual: 24,
            description: "For sole proprietors and new businesses.",
            features: ["Track income & expenses", "Send unlimited invoices", "Connect your bank", "Track VAT", "For one user"],
        },
        {
            name: "Essentials",
            priceMonthly: 60,
            priceAnnual: 48,
            description: "For growing businesses needing more control.",
            features: ["Everything in Simple Start", "Manage bills", "Track employee time", "Multi-currency support", "For up to 3 users"],
            popular: true,
        },
        {
            name: "Plus",
            priceMonthly: 90,
            priceAnnual: 72,
            description: "For established businesses needing inventory.",
            features: ["Everything in Essentials", "Track inventory", "Track project profitability", "Manage budgets", "For up to 5 users"],
        },
        {
            name: "Advanced",
            priceMonthly: 180,
            priceAnnual: 140,
            description: "For scaling businesses needing advanced analytics.",
            features: ["Everything in Plus", "Business analytics", "Automate workflows", "Dedicated support", "For up to 25 users"],
        },
    ];

    const faqs = [
        {
            question: "Can I change my plan later?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the rest of the month. If you downgrade, you'll be charged the new rate starting from the next billing cycle."
        },
        {
            question: "Is there a free trial?",
            answer: "Yes, we offer a 30-day free trial for all our plans. No credit card required to start."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use bank-level 256-bit encryption to protect your data. We also perform automatic backups so you never lose your work."
        },
        {
            question: "Do I need to install anything?",
            answer: "No, QuickBooks Online is cloud-based. You can access it from any device with an internet connection."
        },
        {
            question: "Can I cancel at any time?",
            answer: "Yes, there are no contracts or commitments. You can cancel your subscription at any time within the app."
        }
    ];

    return (
        <div className="pt-20">
            <Section background="muted" className="pb-8">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Plans & Pricing</h1>
                    <p className="text-xl text-muted-foreground">Choose the right plan for your business needs.</p>
                </div>
            </Section>

            <Pricing
                title="Simple pricing, no hidden fees"
                subtitle="Save 20% when you pay annually. Cancel anytime."
                tiers={tiers}
            />

            <PricingComparison />

            <FAQ items={faqs} background="muted" />
        </div>
    );
}
