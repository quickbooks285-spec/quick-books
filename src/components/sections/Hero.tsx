import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
    title?: string;
    subtitle?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

export function Hero({
    title = "Smart accounting for small businesses",
    subtitle = "Track expenses, customize invoices, run reports and even more, all from one place.",
    primaryCtaText = "Get License",
    primaryCtaLink = "/shop",
    secondaryCtaText = "Talk to Sales",
    secondaryCtaLink = "/contact",
}: HeroProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradients using CSS variables (primary color) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text & CTA */}
                    <div className="space-y-8 text-left">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
                                    QUICKBOOKS DESKTOP
                                </span>
                            </h1>
                            <p className="text-3xl md:text-4xl text-foreground font-medium">
                                Lifetime License
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 text-lg text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                Product Link
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                License Number
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                Product number
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-10 text-xl font-semibold rounded-full shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                                <Link href="/shop">
                                    SHOP NOW <ArrowRight className="ml-2 h-6 w-6" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative mx-auto lg:ml-auto w-full max-w-[600px]">
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src="/images/hero-products.png"
                                alt="QuickBooks Desktop Products"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                        {/* Decorative blob behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
