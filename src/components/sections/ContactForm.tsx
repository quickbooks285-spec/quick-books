'use client';

import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function ContactForm() {
    return (
        <Section background="muted" id="contact">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get in touch with our expert team</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Have questions about QuickBooks? We're here to help you find the right solution for your business. Fill out the form and we'll be in touch shortly.
                    </p>
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                P
                            </div>
                            <div>
                                <div className="font-semibold">Phone Support</div>
                                <div className="text-muted-foreground">Mon-Fri, 9am - 6pm EST</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                E
                            </div>
                            <div>
                                <div className="font-semibold">Email Us</div>
                                <div className="text-muted-foreground">support@quickbooks.com</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@company.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Topic</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sales">Sales Inquiry</SelectItem>
                                    <SelectItem value="support">Technical Support</SelectItem>
                                    <SelectItem value="billing">Billing Question</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </Section>
    );
}
