import { Section } from '@/components/layout/Section';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    title?: string;
    items: FAQItem[];
    background?: 'white' | 'muted';
}

export function FAQ({ title = "Frequently Asked Questions", items, background = 'white' }: FAQProps) {
    return (
        <Section background={background}>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-10">{title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium py-6">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    );
}
