'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface PricingTier {
    name: string;
    priceMonthly: number;
    priceAnnual: number;
    description: string;
    features: string[];
    popular?: boolean;
}

interface PricingProps {
    title: string;
    subtitle?: string;
    tiers: PricingTier[];
}

export function Pricing({ title, subtitle, tiers }: PricingProps) {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <Section id="pricing" background="white">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
                {subtitle && (
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                )}
            </div>

            <div className="flex items-center justify-center gap-4 mb-16">
                <Label htmlFor="pricing-mode" className={cn("text-sm font-medium", !isAnnual && "text-foreground")}>Monthly</Label>
                <Switch
                    id="pricing-mode"
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                />
                <Label htmlFor="pricing-mode" className={cn("text-sm font-medium", isAnnual && "text-foreground")}>
                    Yearly <span className="text-primary text-xs ml-1 font-bold">(Save 20%)</span>
                </Label>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {tiers.map((tier, index) => (
                    <Card
                        key={index}
                        className={cn(
                            "flex flex-col relative transition-all duration-300 hover:-translate-y-2",
                            tier.popular ? "border-primary shadow-xl ring-1 ring-primary" : "shadow-md hover:shadow-xl"
                        )}
                    >
                        {tier.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <Badge className="bg-primary hover:bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full uppercase tracking-wide">
                                    Most Popular
                                </Badge>
                            </div>
                        )}
                        <CardHeader className="text-center pb-8 pt-6">
                            <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                            <div className="mt-4 flex items-baseline justify-center text-5xl font-extrabold tracking-tight">
                                ${isAnnual ? tier.priceAnnual : tier.priceMonthly}
                                <span className="text-xl font-medium text-muted-foreground ml-1">/mo</span>
                            </div>
                            <CardDescription className="mt-4 text-sm">{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-primary">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="pt-8 pb-8">
                            <Button
                                className={cn(
                                    "w-full rounded-full h-12 text-base font-semibold transition-all",
                                    tier.popular ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" : "bg-muted text-foreground hover:bg-muted/80"
                                )}
                                variant={tier.popular ? "default" : "secondary"}
                            >
                                {tier.popular ? "Start Free Trial" : "Choose Plan"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
