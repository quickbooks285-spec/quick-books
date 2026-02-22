import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd, BreadcrumbSchema } from "@/components/seo/JsonLd";
import {
    getBlogPostBySlug,
    getBlogPosts,
    getChildPosts,
    getPostPath,
} from "@/lib/contentful";
import { ArrowLeft, Calendar, Clock, User, Share2, ChevronRight } from "lucide-react";

// Force SSR — always fetch fresh data from Contentful on every request
export const dynamic = "force-dynamic";

// ── Dynamic metadata ──────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;
    // The actual post slug is always the last segment
    const postSlug = slug[slug.length - 1];
    const post = await getBlogPostBySlug(postSlug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: post.metaTitle || `${post.title} | QuickBooks Blog`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: "article",
            publishedTime: post.publishedDate,
            authors: [post.author.name],
            ...(post.featuredImageUrl && {
                images: [{ url: post.featuredImageUrl, alt: post.featuredImageAlt || post.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            ...(post.featuredImageUrl && { images: [post.featuredImageUrl] }),
        },
    };
}

// ── Rich text renderer options ────────────────────────────
const richTextOptions = {
    renderMark: {
        [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold">{text}</strong>,
        [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
        [MARKS.CODE]: (text: React.ReactNode) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{text}</code>
        ),
    },
    renderNode: {
        [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
            <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 tracking-tight">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
            <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3">{children}</h3>
        ),
        [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
            <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>
        ),
        [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">{children}</p>
        ),
        [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
            <ul className="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-muted-foreground">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
            <li className="leading-relaxed">{children}</li>
        ),
        [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
                {children}
            </blockquote>
        ),
        [BLOCKS.HR]: () => <hr className="my-10 border-border/50" />,
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const { title, file } = node.data.target.fields;
            if (!file?.url) return null;
            return (
                <figure className="my-8">
                    <Image
                        src={`https:${file.url}`}
                        alt={title || "Blog image"}
                        width={file.details?.image?.width || 800}
                        height={file.details?.image?.height || 450}
                        className="rounded-xl shadow-lg w-full"
                    />
                    {title && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-3">
                            {title}
                        </figcaption>
                    )}
                </figure>
            );
        },
        [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
            <a
                href={node.data.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors"
            >
                {children}
            </a>
        ),
    },
};

// ── Page Component ────────────────────────────────────────
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;

    // The actual post slug is always the last segment
    const postSlug = slug[slug.length - 1];
    const expectedParentSlug = slug.length > 1 ? slug[0] : undefined;

    const post = await getBlogPostBySlug(postSlug);

    if (!post) {
        notFound();
    }

    // Validate URL hierarchy: if the post has a parent, the URL must include it
    // If the URL has a parent segment, it must match the post's actual parent
    if (expectedParentSlug && post.parentSlug !== expectedParentSlug) {
        notFound();
    }
    if (!expectedParentSlug && post.parentSlug) {
        // Post has a parent but URL doesn't include it — redirect would be ideal,
        // but for now just show the post (canonical URL will handle SEO)
    }

    const postPath = getPostPath(post);

    // Fetch related posts (same parent or siblings)
    const allPosts = await getBlogPosts(20);
    const relatedPosts = allPosts
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3);

    // Fetch child posts (if this is a parent post)
    const childPosts = await getChildPosts(post.slug);

    const publishedDate = new Date(post.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Build breadcrumb items
    const breadcrumbItems = [
        { name: "Home", url: "https://thequickbook.com" },
        { name: "Blog", url: "https://thequickbook.com/blog" },
    ];
    if (post.parentSlug && post.parentTitle) {
        breadcrumbItems.push({
            name: post.parentTitle,
            url: `https://thequickbook.com/blog/${post.parentSlug}`,
        });
    }
    breadcrumbItems.push({
        name: post.title,
        url: `https://thequickbook.com${postPath}`,
    });

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedDate,
        author: {
            "@type": "Person",
            name: post.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "QuickBooks",
            logo: {
                "@type": "ImageObject",
                url: "https://thequickbook.com/icon.png",
            },
        },
        ...(post.featuredImageUrl && { image: post.featuredImageUrl }),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://thequickbook.com${postPath}`,
        },
    };

    return (
        <>
            <JsonLd data={articleSchema} />
            <BreadcrumbSchema items={breadcrumbItems} />

            <div className="pt-20">
                {/* Hero / Header */}
                <Section background="muted" className="pb-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb navigation */}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
                            <Link href="/blog" className="hover:text-foreground transition-colors">
                                Blog
                            </Link>
                            {post.parentSlug && post.parentTitle && (
                                <>
                                    <ChevronRight className="h-3 w-3" />
                                    <Link
                                        href={`/blog/${post.parentSlug}`}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {post.parentTitle}
                                    </Link>
                                </>
                            )}
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-foreground font-medium truncate max-w-[200px]">
                                {post.title}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Author & Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                {post.author.avatarUrl ? (
                                    <Image
                                        src={post.author.avatarUrl}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-foreground">{post.author.name}</p>
                                    {post.author.jobTitle && (
                                        <p className="text-xs text-muted-foreground">{post.author.jobTitle}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> {publishedDate}
                            </div>

                            {post.readTime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> {post.readTime}
                                </div>
                            )}
                        </div>
                    </div>
                </Section>

                {/* Featured Image */}
                {post.featuredImageUrl && (
                    <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8">
                        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={post.featuredImageUrl}
                                alt={post.featuredImageAlt || post.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                        </div>
                    </div>
                )}

                {/* Post Body */}
                <Section background="white">
                    <article className="max-w-3xl mx-auto prose-content">
                        {post.body && documentToReactComponents(post.body, richTextOptions)}
                    </article>
                </Section>

                {/* Child Posts (if this is a parent) */}
                {childPosts.length > 0 && (
                    <Section background="white" className="pt-0">
                        <div className="max-w-3xl mx-auto border-t border-border/50 pt-8">
                            <h2 className="text-xl font-bold mb-6">Articles in this series</h2>
                            <div className="space-y-4">
                                {childPosts.map((child) => (
                                    <Link
                                        key={child.slug}
                                        href={getPostPath(child)}
                                        className="group flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all"
                                    >
                                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                        <div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {child.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                {child.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <Section background="white" className="pt-0 pb-8">
                        <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="rounded-full text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Author Footer */}
                <Section background="white" className="pt-0">
                    <div className="max-w-3xl mx-auto border-t border-border/50 pt-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {post.author.avatarUrl ? (
                                    <Image
                                        src={post.author.avatarUrl}
                                        alt={post.author.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-6 w-6 text-primary" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold">{post.author.name}</p>
                                    {post.author.bio && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                                            {post.author.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>
                </Section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <Section background="muted">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={getPostPath(related)}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                                    >
                                        {related.featuredImageUrl ? (
                                            <div className="relative h-40 w-full overflow-hidden">
                                                <Image
                                                    src={related.featuredImageUrl}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                                        )}
                                        <div className="p-5">
                                            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                {/* CTA */}
                <Section background="white">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold">Ready to streamline your finances?</h2>
                        <p className="text-muted-foreground text-lg">
                            Join thousands of small businesses that trust QuickBooks to manage their accounting.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/shop">
                                <Button size="lg" className="rounded-full px-8">Get Started</Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="rounded-full px-8">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}
