import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
    title: string;
    slug: string;
    href: string; // full path e.g. /blog/parent/child or /blog/post
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    imageUrl?: string;
    parentTitle?: string;
}

interface BlogGridProps {
    posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) {
        return (
            <Section background="white">
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                        <Calendar className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">No Posts Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        We&apos;re working on great content. Check back soon for expert advice and insights.
                    </p>
                </div>
            </Section>
        );
    }

    return (
        <Section background="white">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <Card key={post.slug || index} className="flex flex-col border-none shadow-md hover:shadow-xl transition-all group overflow-hidden">
                        {/* Featured Image */}
                        <div className="h-48 w-full bg-muted/50 relative overflow-hidden">
                            {post.imageUrl ? (
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {post.parentTitle && (
                                <span className="absolute top-4 left-4 bg-white/90 text-foreground text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-sm">
                                    {post.parentTitle}
                                </span>
                            )}
                        </div>

                        <CardHeader className="pb-3 pt-6">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</div>
                                <div className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                <Link href={post.href} className="hover:underline decoration-primary decoration-2 underline-offset-4">
                                    {post.title}
                                </Link>
                            </h3>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-border/50">
                            <Link href={post.href}>
                                <Button variant="link" className="px-0 text-primary hover:text-primary/80 font-semibold gap-1">
                                    Read Article <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            {post.readTime && (
                                <span className="ml-auto text-xs text-muted-foreground">{post.readTime}</span>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
