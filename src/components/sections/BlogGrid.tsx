import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import Link from 'next/link';

interface BlogPost {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    imageUrl?: string;
}

interface BlogGridProps {
    posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
    return (
        <Section background="white">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <Card key={index} className="flex flex-col border-none shadow-md hover:shadow-xl transition-all group overflow-hidden">
                        {/* Image Placeholder */}
                        <div className="h-48 w-full bg-muted/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:scale-105 transition-transform duration-500" />
                            <Badge className="absolute top-4 left-4 bg-primary text-white hover:bg-primary z-10">{post.category}</Badge>
                        </div>

                        <CardHeader className="pb-3 pt-6">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</div>
                                <div className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                <Link href="#" className="hover:underline decoration-primary decoration-2 underline-offset-4">
                                    {post.title}
                                </Link>
                            </h3>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-border/50">
                            <Button variant="link" className="px-0 text-primary hover:text-primary/80 font-semibold">
                                Read Article
                            </Button>
                            <span className="ml-auto text-xs text-muted-foreground">{post.readTime}</span>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Button size="lg" variant="outline" className="rounded-full px-8">Load More Articles</Button>
            </div>
        </Section>
    );
}
