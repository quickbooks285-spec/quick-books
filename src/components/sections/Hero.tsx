import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';
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
    primaryCtaText = "Start Free Trial",
    primaryCtaLink = "/signup",
    secondaryCtaText = "Watch Demo",
    secondaryCtaLink = "/demo",
}: HeroProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradients using CSS variables (primary color) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={cn("inline-block mr-3", i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600" : "")}>
                                {word}
                            </span>
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                            <Link href={primaryCtaLink}>
                                {primaryCtaText} <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50 transition-all">
                            <Link href={secondaryCtaLink}>
                                <PlayCircle className="mr-2 h-5 w-5" /> {secondaryCtaText}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Dashboard Preview / Visual Anchor */}
                <div className="mt-20 relative mx-auto max-w-5xl">
                    <div className="aspect-[16/10] bg-background rounded-xl border border-border shadow-2xl overflow-hidden relative group">
                        {/* Mock UI Header */}
                        <div className="h-12 border-b border-border bg-muted/20 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        {/* Dashboard Image */}
                        <div className="relative w-full h-full bg-muted/5">
                            <Image
                                src="/images/dashboard-preview.png"
                                alt="QuickBooks Dashboard Interface"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating Elements for parallax feel */}
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 flex flex-col justify-center animate-bounce-slow" style={{ animationDuration: '3s' }}>
                        <span className="text-xs text-muted-foreground">Income</span>
                        <span className="text-lg font-bold text-green-600">+$4,250</span>
                    </div>
                    <div className="absolute -left-8 bottom-20 w-32 h-16 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-3 flex items-center gap-3 animate-pulse-slow">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">Tax</div>
                        <div className="h-2 w-12 bg-gray-200 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
