import { Section } from "@/components/layout/Section";

export default function TermsPage() {
    return (
        <div className="pt-20">
            <Section>
                <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
                <p className="text-muted-foreground">Last updated: January 2026</p>
                <div className="prose max-w-none mt-8">
                    <p>Content goes here...</p>
                </div>
            </Section>
        </div>
    );
}
