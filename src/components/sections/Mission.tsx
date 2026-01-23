import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Mission() {
    return (
        <Section background="muted">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                        Empowering businesses to <span className="text-primary">prosper</span> around the world.
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Our mission is to power prosperity around the world. We do this by providing small businesses and self-employed people with the technology they need to manage their finances, pay their employees, and get paid fast.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                            <p className="text-muted-foreground">We believe in championing those who dare to dream.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                            <p className="text-muted-foreground">We are dedicated to simplifying the complex business of life.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                            <p className="text-muted-foreground">We strive to be the platform of choice for small business growth.</p>
                        </div>
                    </div>
                    <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90">
                        <Link href="/careers">
                            Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="flex-1 relative">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white border border-border/50">
                        <Image
                            src="/images/mission-team.png"
                            alt="QuickBooks Team Collaborating"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Decorative blob */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </Section>
    );
}
