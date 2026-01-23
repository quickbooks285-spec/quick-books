import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    background?: 'white' | 'muted' | 'none' | 'brand';
}

export function Section({
    children,
    className,
    id,
    background = 'none'
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "py-16 md:py-24 lg:py-32",
                {
                    'bg-background': background === 'white',
                    'bg-muted/30': background === 'muted',
                    'bg-primary text-primary-foreground': background === 'brand',
                },
                className
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                {children}
            </div>
        </section>
    );
}
