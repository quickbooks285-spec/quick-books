import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop QuickBooks | All Products & Pricing",
    description: "Browse and compare all QuickBooks products. Find the perfect accounting software for your business - from Simple Start to Enterprise solutions.",
    openGraph: {
        title: "Shop QuickBooks Products",
        description: "Find the perfect QuickBooks accounting solution for your business needs.",
    },
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
