import { createClient, type ContentfulClientApi, type Entry, type Asset, type EntrySkeletonType } from "contentful";

// ── Contentful Client (lazy singleton) ────────────────────
let _client: ContentfulClientApi<undefined> | null = null;

function getClient() {
    if (!_client) {
        _client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID!,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
        });
    }
    return _client;
}

// ── Skeleton Types ────────────────────────────────────────
interface AuthorFields {
    name: EntrySkeletonType["fields"];
    slug: EntrySkeletonType["fields"];
    bio: EntrySkeletonType["fields"];
    avatar: EntrySkeletonType["fields"];
    title: EntrySkeletonType["fields"];
    twitter: EntrySkeletonType["fields"];
    linkedin: EntrySkeletonType["fields"];
}

interface BlogPostFields {
    title: EntrySkeletonType["fields"];
    slug: EntrySkeletonType["fields"];
    excerpt: EntrySkeletonType["fields"];
    bodyMarkdown: EntrySkeletonType["fields"];
    featuredImage: EntrySkeletonType["fields"];
    author: EntrySkeletonType["fields"];
    publishedDate: EntrySkeletonType["fields"];
    readTime: EntrySkeletonType["fields"];
    tags: EntrySkeletonType["fields"];
    metaTitle: EntrySkeletonType["fields"];
    metaDescription: EntrySkeletonType["fields"];
    parentPost: EntrySkeletonType["fields"];
}

type AuthorSkeleton = EntrySkeletonType<AuthorFields, "author">;
type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">;

// ── Parsed Types (used by components) ─────────────────────
export interface ContentfulAuthor {
    name: string;
    slug: string;
    bio?: string;
    avatarUrl?: string;
    jobTitle?: string;
    twitter?: string;
    linkedin?: string;
}

export interface ContentfulBlogPost {
    title: string;
    slug: string;
    excerpt: string;
    body: string; // Markdown content
    featuredImageUrl?: string;
    featuredImageAlt?: string;
    author: ContentfulAuthor;
    publishedDate: string;
    readTime?: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    parentSlug?: string; // slug of the parent post (if any)
    parentTitle?: string; // title of the parent post (if any)
}

// ── Helper: parse an Asset URL ────────────────────────────
function parseAssetUrl(asset?: Asset): string | undefined {
    if (!asset?.fields?.file) return undefined;
    const file = asset.fields.file as any;
    return file.url ? `https:${file.url}` : undefined;
}

function parseAssetAlt(asset?: Asset): string | undefined {
    if (!asset?.fields?.title) return undefined;
    return asset.fields.title as string;
}

// ── Helper: parse Author entry ────────────────────────────
function parseAuthor(entry: Entry<AuthorSkeleton>): ContentfulAuthor {
    const fields = entry.fields as any;
    return {
        name: fields.name ?? "",
        slug: fields.slug ?? "",
        bio: fields.bio,
        avatarUrl: parseAssetUrl(fields.avatar),
        jobTitle: fields.title,
        twitter: fields.twitter,
        linkedin: fields.linkedin,
    };
}

// ── Helper: parse Blog Post entry ─────────────────────────
function parseBlogPost(entry: Entry<BlogPostSkeleton>): ContentfulBlogPost {
    const fields = entry.fields as any;
    const authorEntry = fields.author as Entry<AuthorSkeleton> | undefined;
    const parentEntry = fields.parentPost as Entry<BlogPostSkeleton> | undefined;

    return {
        title: fields.title ?? "",
        slug: fields.slug ?? "",
        excerpt: fields.excerpt ?? "",
        body: fields.bodyMarkdown ?? "",
        featuredImageUrl: parseAssetUrl(fields.featuredImage),
        featuredImageAlt: parseAssetAlt(fields.featuredImage),
        author: authorEntry ? parseAuthor(authorEntry) : { name: "Unknown", slug: "" },
        publishedDate: fields.publishedDate ?? "",
        readTime: fields.readTime,
        tags: fields.tags,
        metaTitle: fields.metaTitle,
        metaDescription: fields.metaDescription,
        parentSlug: parentEntry ? (parentEntry.fields as any).slug : undefined,
        parentTitle: parentEntry ? (parentEntry.fields as any).title : undefined,
    };
}

// ── Helper: build the full URL path for a post ────────────
export function getPostPath(post: ContentfulBlogPost): string {
    if (post.parentSlug) {
        return `/blog/${post.parentSlug}/${post.slug}`;
    }
    return `/blog/${post.slug}`;
}

// ── API: Fetch all blog posts ─────────────────────────────
export async function getBlogPosts(limit = 100): Promise<ContentfulBlogPost[]> {
    try {
        const response = await getClient().getEntries<BlogPostSkeleton>({
            content_type: "blogPost",
            order: ["-fields.publishedDate"],
            include: 2, // resolve linked Author + parent post + assets
            limit,
        } as any);

        return response.items.map(parseBlogPost);
    } catch (error) {
        console.error("Error fetching blog posts from Contentful:", error);
        return [];
    }
}

// ── API: Fetch a single blog post by slug ─────────────────
export async function getBlogPostBySlug(slug: string): Promise<ContentfulBlogPost | null> {
    try {
        const response = await getClient().getEntries<BlogPostSkeleton>({
            content_type: "blogPost",
            "fields.slug": slug,
            include: 2,
            limit: 1,
        } as any);

        if (response.items.length === 0) return null;
        return parseBlogPost(response.items[0]);
    } catch (error) {
        console.error(`Error fetching blog post "${slug}" from Contentful:`, error);
        return null;
    }
}

// ── API: Fetch all blog post slug paths (for routing) ─────
export async function getAllBlogPaths(): Promise<string[][]> {
    try {
        const response = await getClient().getEntries<BlogPostSkeleton>({
            content_type: "blogPost",
            select: ["fields.slug", "fields.parentPost"],
            include: 1,
            limit: 1000,
        } as any);

        return response.items.map((item) => {
            const fields = item.fields as any;
            const parentEntry = fields.parentPost as Entry<BlogPostSkeleton> | undefined;
            const parentSlug = parentEntry ? (parentEntry.fields as any).slug : undefined;

            if (parentSlug) {
                return [parentSlug, fields.slug as string];
            }
            return [fields.slug as string];
        });
    } catch (error) {
        console.error("Error fetching blog paths from Contentful:", error);
        return [];
    }
}

// ── API: Fetch child posts of a given parent slug ─────────
export async function getChildPosts(parentSlug: string): Promise<ContentfulBlogPost[]> {
    try {
        // First get the parent entry by slug
        const parentRes = await getClient().getEntries<BlogPostSkeleton>({
            content_type: "blogPost",
            "fields.slug": parentSlug,
            select: ["sys.id"],
            limit: 1,
        } as any);

        if (parentRes.items.length === 0) return [];
        const parentId = parentRes.items[0].sys.id;

        // Then find entries that link to this parent
        const response = await getClient().getEntries<BlogPostSkeleton>({
            content_type: "blogPost",
            "fields.parentPost.sys.id": parentId,
            order: ["-fields.publishedDate"],
            include: 2,
            limit: 100,
        } as any);

        return response.items.map(parseBlogPost);
    } catch (error) {
        console.error(`Error fetching child posts for "${parentSlug}":`, error);
        return [];
    }
}
