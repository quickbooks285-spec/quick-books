import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { JsonLd, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Resource Center & Blog | QuickBooks",
    description: "Expert advice, tutorials, and insights to help your small business grow. Tax tips, cash flow management, AI in accounting, and more.",
    openGraph: {
        title: "QuickBooks Resource Center",
        description: "Business tips, tutorials, and expert insights for small business owners.",
    },
};

export default function BlogPage() {
    const posts = [
        {
            title: "5 Tax Tips Every Small Business Owner Should Know in 2026",
            excerpt: "Get prepared for tax season with these essential tips that could save your business thousands of dollars.",
            category: "Tax Tips",
            author: "Jennifer Law",
            date: "Jan 12, 2026",
            readTime: "5 min read",
        },
        {
            title: "How to Manage Cash Flow Effectively",
            excerpt: "Cash flow is the lifeblood of your business. Learn strategies to keep your finances healthy and predictable.",
            category: "Business Management",
            author: "David Ross",
            date: "Jan 08, 2026",
            readTime: "8 min read",
        },
        {
            title: "The Future of Accounting with AI",
            excerpt: "Discover how artificial intelligence is changing the way businesses manage their books and make decisions.",
            category: "Technology",
            author: "Sarah Chen",
            date: "Dec 15, 2025",
            readTime: "6 min read",
        },
        {
            title: "Success Story: How 'Green Earth' Scaled 300%",
            excerpt: "Read how an eco-friendly startup used financial insights to fuel their rapid expansion across three states.",
            category: "Case Study",
            author: "Mike Johnson",
            date: "Dec 02, 2025",
            readTime: "10 min read",
        },
        {
            title: "Understanding Payroll Regulations",
            excerpt: "Navigate the complex world of payroll compliance with our comprehensive guide for new employers.",
            category: "Compliance",
            author: "Lisa Wong",
            date: "Nov 28, 2025",
            readTime: "7 min read",
        },
        {
            title: "Inventory Management Best Practices",
            excerpt: "Keep your stock levels optimized and avoid overstocking with these proven inventory management techniques.",
            category: "Operations",
            author: "Tom Baker",
            date: "Nov 20, 2025",
            readTime: "6 min read",
        }
    ];

    const categories = ["All", "Tax Tips", "Business Management", "Technology", "Case Studies", "Compliance"];

    const blogListSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "QuickBooks Resource Center",
        "description": "Expert advice, tutorials, and insights to help your small business grow.",
        "url": "https://thequickbook.com/blog",
        "publisher": {
            "@type": "Organization",
            "name": "QuickBooks",
            "logo": {
                "@type": "ImageObject",
                "url": "https://thequickbook.com/icon.png"
            }
        },
        "blogPost": posts.map((post) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
                "@type": "Person",
                "name": post.author
            },
            "datePublished": post.date
        }))
    };

    return (
        <>
            <JsonLd data={blogListSchema} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://thequickbook.com" },
                    { name: "Blog", url: "https://thequickbook.com/blog" }
                ]}
            />
            <div className="pt-20">
                <Section background="muted" className="pb-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Resource Center</h1>
                        <p className="text-xl text-muted-foreground">Expert advice, tutorials, and insights to help your business grow.</p>
                    </div>
                </Section>

                <Section background="white">
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat, i) => (
                            <Button key={cat} variant={i === 0 ? "default" : "outline"} className="rounded-full">
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <BlogGrid posts={posts} />
                </Section>
            </div>
        </>
    );
}
