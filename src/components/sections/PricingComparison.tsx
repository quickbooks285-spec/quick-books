import { Fragment } from 'react';
import { Check, Minus } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export function PricingComparison() {
    const plans = ["Simple Start", "Essentials", "Plus", "Advanced"];
    const features = [
        {
            category: "Core Features", items: [
                { name: "Track income & expenses", available: [true, true, true, true] },
                { name: "Capture & organize receipts", available: [true, true, true, true] },
                { name: "Send unlimited invoices", available: [true, true, true, true] },
            ]
        },
        {
            category: "Business Management", items: [
                { name: "Manage bills", available: [false, true, true, true] },
                { name: "Track time", available: [false, true, true, true] },
                { name: "Multi-currency", available: [false, true, true, true] },
            ]
        },
        {
            category: "Advanced Reporting", items: [
                { name: "Track inventory", available: [false, false, true, true] },
                { name: "Project profitability", available: [false, false, true, true] },
                { name: "Manage budgets", available: [false, false, true, true] },
                { name: "Business analytics", available: [false, false, false, true] },
            ]
        },
    ];

    return (
        <Section background="brand" id="comparison">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white">Compare Plans</h2>
                <p className="text-primary-foreground/80 mt-2">Find the right fit for your business.</p>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow className="border-white/20 hover:bg-transparent">
                            <TableHead className="w-[30%] text-primary-foreground font-bold">Features</TableHead>
                            {plans.map((plan) => (
                                <TableHead key={plan} className="text-center text-lg font-bold text-white">
                                    {plan}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((section, i) => (
                            <Fragment key={i}>
                                <TableRow className="bg-white/10 hover:bg-white/10 border-white/10">
                                    <TableCell colSpan={5} className="font-bold py-4 text-base text-white">{section.category}</TableCell>
                                </TableRow>
                                {section.items.map((feature, j) => (
                                    <TableRow key={`${i}-${j}`} className="border-white/10 hover:bg-white/5">
                                        <TableCell className="font-medium text-primary-foreground">{feature.name}</TableCell>
                                        {feature.available.map((isAvailable, k) => (
                                            <TableCell key={k} className="text-center">
                                                {isAvailable ? (
                                                    <div className="flex justify-center">
                                                        <Check className="h-5 w-5 text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <Minus className="h-4 w-4 text-primary-foreground/30" />
                                                    </div>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Section>
    );
}
