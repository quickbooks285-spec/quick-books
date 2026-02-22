import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { Section } from "@/components/layout/Section";
import { JsonLd, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { getBlogPosts, getPostPath } from "@/lib/contentful";

export const metadata: Metadata = {
    title: "Resource Center & Blog | QuickBooks",
    description: "Expert advice, tutorials, and insights to help your small business grow. Tax tips, cash flow management, AI in accounting, and more.",
    openGraph: {
        title: "QuickBooks Resource Center",
        description: "Business tips, tutorials, and expert insights for small business owners.",
    },
};

// Force SSR — always fetch fresh data from Contentful on every request
export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const contentfulPosts = await getBlogPosts();

    // Map Contentful posts to the BlogGrid format with hierarchical paths
    const posts = contentfulPosts.map((post) => ({
        title: post.title,
        slug: post.slug,
        href: getPostPath(post),
        excerpt: post.excerpt,
        author: post.author.name,
        date: new Date(post.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }),
        readTime: post.readTime || "",
        imageUrl: post.featuredImageUrl,
        parentTitle: post.parentTitle,
    }));

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
        "blogPost": contentfulPosts.map((post) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
                "@type": "Person",
                "name": post.author.name
            },
            "datePublished": post.publishedDate,
            ...(post.featuredImageUrl && { "image": post.featuredImageUrl }),
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
                    <BlogGrid posts={posts} />
                </Section>
            </div>
        </>
    );
}
