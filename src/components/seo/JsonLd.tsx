"use client";

interface JsonLdProps {
    data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Organization Schema for About page
export function OrganizationSchema() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "QuickBooks",
        "url": "https://thequickbook.com",
        "logo": "https://thequickbook.com/icon.png",
        "description": "QuickBooks is smart accounting software that helps small businesses track expenses, customize invoices, run reports, and manage finances from one place.",
        "foundingDate": "1983",
        "sameAs": [
            "https://www.facebook.com/quickbooks",
            "https://twitter.com/quickbooks",
            "https://www.linkedin.com/company/quickbooks",
            "https://www.youtube.com/quickbooks"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@quickbooks.com",
            "availableLanguage": ["English"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        }
    };

    return <JsonLd data={organizationData} />;
}

// Blog Posting Schema for individual blog articles
interface BlogPostingSchemaProps {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
}

export function BlogPostingSchema({
    title,
    description,
    author,
    datePublished,
    dateModified,
    image,
    url
}: BlogPostingSchemaProps) {
    const blogPostingData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "QuickBooks",
            "logo": {
                "@type": "ImageObject",
                "url": "https://thequickbook.com/icon.png"
            }
        },
        "datePublished": datePublished,
        "dateModified": dateModified || datePublished,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        ...(image && { "image": image })
    };

    return <JsonLd data={blogPostingData} />;
}

// Article Schema for content pages
interface ArticleSchemaProps {
    title: string;
    description: string;
    datePublished?: string;
    dateModified?: string;
    url: string;
}

export function ArticleSchema({
    title,
    description,
    datePublished,
    dateModified,
    url
}: ArticleSchemaProps) {
    const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "publisher": {
            "@type": "Organization",
            "name": "QuickBooks",
            "logo": {
                "@type": "ImageObject",
                "url": "https://thequickbook.com/icon.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        ...(datePublished && { "datePublished": datePublished }),
        ...(dateModified && { "dateModified": dateModified })
    };

    return <JsonLd data={articleData} />;
}

// WebSite Schema for homepage
export function WebSiteSchema() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "QuickBooks",
        "url": "https://thequickbook.com",
        "description": "Smart accounting software for small businesses. Track expenses, customize invoices, run reports and more.",
        "publisher": {
            "@type": "Organization",
            "name": "QuickBooks"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thequickbook.com/shop?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return <JsonLd data={websiteData} />;
}

// Product Schema for shop pages
interface ProductSchemaProps {
    name: string;
    description: string;
    price: number;
    currency?: string;
    image?: string;
    url: string;
    sku?: string;
    brand?: string;
}

export function ProductSchema({
    name,
    description,
    price,
    currency = "USD",
    image,
    url,
    sku,
    brand = "QuickBooks"
}: ProductSchemaProps) {
    const productData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": description,
        "brand": {
            "@type": "Brand",
            "name": brand
        },
        "offers": {
            "@type": "Offer",
            "price": price,
            "priceCurrency": currency,
            "availability": "https://schema.org/InStock",
            "url": url
        },
        ...(image && { "image": image }),
        ...(sku && { "sku": sku })
    };

    return <JsonLd data={productData} />;
}

// BreadcrumbList Schema
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return <JsonLd data={breadcrumbData} />;
}
