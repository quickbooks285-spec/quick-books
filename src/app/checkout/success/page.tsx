'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import {
    Check,
    Package,
    Mail,
    Download,
    ArrowRight,
    Sparkles,
    CreditCard,
    AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// PayPal SVG Icon Component
const PayPalIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
    </svg>
);

function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    const paymentMethod = searchParams.get('payment_method') || 'stripe';
    const isDemo = searchParams.get('demo') === 'true';
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');
    const transactionId = sessionId || orderId || `ORD-${Date.now()}`;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50/50 to-background">
            <Section className="py-16">
                <div className="max-w-2xl mx-auto">
                    {/* Success Animation */}
                    <div className="text-center mb-10">
                        <div className="relative inline-block">
                            <div className="h-28 w-28 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 animate-in zoom-in duration-500">
                                <Check className="h-14 w-14 text-white" strokeWidth={3} />
                            </div>
                            <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                <Sparkles className="h-4 w-4 text-yellow-800" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mt-8 mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Payment Successful!
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Thank you for your purchase. Your order has been confirmed.
                        </p>
                    </div>

                    {/* Demo Mode Notice */}
                    {isDemo && (
                        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-amber-800">Demo Mode Active</p>
                                <p className="text-sm text-amber-700">
                                    This is a simulated payment. No actual transaction was processed.
                                    To accept real payments, configure your Stripe/PayPal API keys in the environment variables.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Order Details Card */}
                    <div className="bg-card rounded-2xl border shadow-lg overflow-hidden mb-8">
                        {/* Payment Method Header */}
                        <div className={cn(
                            "px-6 py-4 flex items-center gap-3",
                            paymentMethod === 'stripe'
                                ? "bg-gradient-to-r from-[#635BFF]/10 to-[#635BFF]/5"
                                : "bg-gradient-to-r from-[#003087]/10 to-[#009CDE]/5"
                        )}>
                            <div className={cn(
                                "h-10 w-10 rounded-lg flex items-center justify-center",
                                paymentMethod === 'stripe' ? "bg-[#635BFF]/15" : "bg-[#003087]/15"
                            )}>
                                {paymentMethod === 'stripe' ? (
                                    <CreditCard className="h-5 w-5 text-[#635BFF]" />
                                ) : (
                                    <PayPalIcon className="h-5 w-5 text-[#003087]" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold">
                                    Paid via {paymentMethod === 'stripe' ? 'Credit Card (Stripe)' : 'PayPal'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Transaction completed successfully
                                </p>
                            </div>
                        </div>

                        {/* Order Info */}
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center py-3 border-b">
                                <span className="text-muted-foreground">Transaction ID</span>
                                <span className="font-mono text-sm font-semibold">{transactionId}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                <span className="text-muted-foreground">Date</span>
                                <span className="font-medium">{new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-muted-foreground">Status</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                    Completed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="bg-card rounded-2xl border p-6 mb-8">
                        <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Confirmation Email</p>
                                    <p className="text-sm text-muted-foreground">
                                        You&apos;ll receive an email with your order details and license keys shortly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <Download className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Download Your Software</p>
                                    <p className="text-sm text-muted-foreground">
                                        Access your downloads from the dashboard or via the email link.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <Package className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Start Using QuickBooks</p>
                                    <p className="text-sm text-muted-foreground">
                                        Install and activate your software using the provided license key.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <Link href="/shop">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <CheckoutSuccessContent />
        </Suspense>
    );
}
