import { LucideIcon } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { cn } from '@/lib/utils';

interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface FeaturesProps {
    title: string;
    subtitle?: string;
    features: Feature[];
    columns?: 2 | 3 | 4;
}

export function Features({
    title,
    subtitle,
    features,
    columns = 3
}: FeaturesProps) {
    return (
        <Section background="white">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
                {subtitle && (
                    <p className="text-lg text-muted-foreground">{subtitle}</p>
                )}
            </div>

            <div className={cn(
                "grid gap-8 md:gap-12",
                {
                    'md:grid-cols-2': columns === 2,
                    'md:grid-cols-3': columns === 3,
                    'md:grid-cols-4': columns === 4,
                }
            )}>
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-start p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
