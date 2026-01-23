import { Star } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface Testimonial {
    content: string;
    author: string;
    role: string;
    company: string;
    avatarUrl?: string;
    rating?: number;
}

interface TestimonialsProps {
    title: string;
    subtitle?: string;
    testimonials: Testimonial[];
}

export function Testimonials({ title, subtitle, testimonials }: TestimonialsProps) {
    return (
        <Section background="muted">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
                {subtitle && (
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex gap-1">
                                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="pb-6">
                            <blockquote className="text-lg text-foreground font-medium leading-relaxed">
                                "{testimonial.content}"
                            </blockquote>
                        </CardContent>
                        <CardFooter className="flex items-center gap-4 pt-4 border-t">
                            <Avatar>
                                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
                                <AvatarFallback>{testimonial.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm">{testimonial.author}</div>
                                <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
