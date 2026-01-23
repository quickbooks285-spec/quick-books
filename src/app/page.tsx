import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock, Globe, ShieldCheck, Zap, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "QuickBooks | Smart Accounting Software for Small Business",
  description: "QuickBooks helps small businesses track expenses, create invoices, manage bills, and run financial reports. Start your 30-day free trial today.",
  keywords: ["accounting software", "small business", "invoicing", "expense tracking", "QuickBooks"],
  openGraph: {
    title: "QuickBooks | Smart Accounting Software",
    description: "Track expenses, customize invoices, run reports and even more, all from one place.",
    type: "website",
  },
};

export default function Home() {
  const features = [
    {
      title: "Track Expenses",
      description: "Connect your bank accounts and credit cards to automatically download and categorize expenses.",
      icon: BarChart3
    },
    {
      title: "Create Invoices",
      description: "Create professional custom invoices, send them, and track when they've been viewed and paid.",
      icon: Zap
    },
    {
      title: "Maximize Deductions",
      description: "Share your books with your accountant or export important documents so you're ready for tax time.",
      icon: ShieldCheck
    },
    {
      title: "Manage Bills",
      description: "Organize and pay your bills on time, every time. Schedule payments for later.",
      icon: Clock
    },
    {
      title: "Mobile App",
      description: "Run your business on the go. Access your data from your smartphone or tablet anytime.",
      icon: Smartphone
    },
    {
      title: "Multi-currency",
      description: "Send invoices and record transactions in multiple currencies. We handle the exchange rates.",
      icon: Globe
    }
  ];

  const testimonials = [
    {
      content: "QuickBooks has revolutionized how we handle our finances. It's intuitive, powerful, and saves us hours every week.",
      author: "Sarah Jenkins",
      role: "CEO",
      company: "Creative Studios",
      rating: 5
    },
    {
      content: "The best investment we made for our small business. The reporting features give us clear insights into our growth.",
      author: "Michael Chen",
      role: "Founder",
      company: "TechFlow Inc.",
      rating: 5
    },
    {
      content: "Customer support is amazing, and the software just works. I can't imagine running my bakery without it.",
      author: "Jessica Williams",
      role: "Owner",
      company: "Sweet Delights",
      rating: 5
    }
  ];

  return (
    <>
      <Hero />

      <Features
        title="Everything you need to run your business"
        subtitle="Powerful tools to help you take control of your finances"
        features={features}
      />

      {/* Stats Section */}
      <Section background="muted" className="border-y border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">7M+</div>
            <div className="text-muted-foreground font-medium">Customers Worldwide</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">$30B+</div>
            <div className="text-muted-foreground font-medium">Invoices Paid</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground font-medium">Expert Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">99.9%</div>
            <div className="text-muted-foreground font-medium">Uptime Guarantee</div>
          </div>
        </div>
      </Section>

      <Testimonials
        title="Trusted by millions of businesses"
        subtitle="See why small business owners love using QuickBooks"
        testimonials={testimonials}
      />

      {/* Final CTA */}
      <Section background="white">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to get started?</h2>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Join millions of people who use QuickBooks to manage their accounting. Try it free for 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full text-primary hover:bg-white">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/demo">Talk to Sales <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
