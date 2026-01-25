import { Mail, ShieldCheck, Download, CreditCard } from 'lucide-react';

const valueProps = [
    {
        title: "Instant Delivery",
        description: "Instant Delivery via email",
        icon: Mail,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Original and Genuine Key",
        description: "lifetime subscription",
        icon: ShieldCheck,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "Download Link",
        description: "From official website",
        icon: Download,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "One Time Purchase",
        description: "One-Time Purchase",
        icon: CreditCard, // or Infinity for lifetime? CreditCard fits "Purchase"
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    }
];

export function ValueProps() {
    return (
        <section className="py-12 bg-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {valueProps.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                            <div className={`p-3 rounded-full ${item.bg} mb-4`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                            <h3 className="font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
