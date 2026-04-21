import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Pages: [
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact us', href: '/contact' },
        ],
        Policies: [
            { name: 'Cookies Policy', href: '/cookies' },
            { name: 'Shipping Policy', href: '/shipping' },
            { name: 'Refund Policy', href: '/refund' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms & Conditions', href: '/terms' },
        ],
    };

    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 mt-auto text-zinc-300">
            <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight text-white">QuickBooks</span>
                        </Link>
                        <p className="text-zinc-400 max-w-sm">
                            Smart accounting software for small businesses. Track expenses, customize invoices, run reports and even more.
                        </p>
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-white">Subscribe to our newsletter</h4>
                            <form className="flex gap-2 max-w-sm">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-primary focus-visible:border-primary"
                                />
                                <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </form>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    <Icon className="h-5 w-5" />
                                    <span className="sr-only">Social link</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns - Company, Resources, Legal all in one row */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="space-y-4">
                            <h3 className="font-semibold text-white">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-zinc-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <p>&copy; {currentYear} Intuit Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
