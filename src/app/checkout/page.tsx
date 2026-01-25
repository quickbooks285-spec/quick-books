'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ShoppingBag,
    CreditCard,
    Lock,
    Check,
    ArrowLeft,
    Trash2,
    Shield,
    Zap,
    ExternalLink,
    AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PaymentMethod = 'stripe' | 'paypal';

// PayPal SVG Icon Component
const PayPalIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
    </svg>
);

// Stripe SVG Icon Component
const StripeIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { items, removeFromCart, subtotal, tax, total, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [completedOrderNumber, setCompletedOrderNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
    const [error, setError] = useState<string | null>(null);

    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        nameOnCard: '',
    });

    const handleBillingChange = (field: string, value: string) => {
        setBillingInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handlePaymentChange = (field: string, value: string) => {
        setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmitOrder = async () => {
        setError(null);
        setIsProcessing(true);

        try {
            // Validate billing info (basic validation)
            if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || !billingInfo.address) {
                throw new Error('Please fill in all required billing information fields.');
            }

            // SIMULATED CHECKOUT FOR PRODUCTION (No Payment API)
            // Simulating network delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create order in database
            await addOrder({
                items: items,
                subtotal: subtotal,
                tax: tax,
                total: total,
                status: 'pending',
                paymentMethod: paymentMethod === 'stripe' ? 'Credit Card (Stripe)' : 'PayPal',
                customer: billingInfo,
            });

            clearCart();

            // Set success state directly
            setCompletedOrderNumber('ORD-' + Date.now());
            setOrderComplete(true);

        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0 && !orderComplete) {
        return (
            <div className="pt-20">
                <Section className="py-24">
                    <div className="max-w-md mx-auto text-center space-y-6">
                        <div className="h-24 w-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Your cart is empty</h1>
                        <p className="text-muted-foreground">
                            Add some products to your cart before checking out.
                        </p>
                        <Link href="/shop">
                            <Button className="bg-primary hover:bg-primary/90">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Section>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="pt-20">
                <Section className="py-24">
                    <div className="max-w-lg mx-auto text-center space-y-6">
                        <div className="h-24 w-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                            <AlertCircle className="h-12 w-12 text-amber-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-amber-600">Payment Method Not Set</h1>
                        <p className="text-muted-foreground text-lg">
                            Your order has been recorded, but the payment method is not configured.
                        </p>
                        <div className="bg-muted/50 rounded-xl p-6 text-left space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Number</span>
                                <span className="font-mono font-semibold">{completedOrderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-medium">{billingInfo.email || 'customer@email.com'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium text-amber-600">Pending Payment</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            We have received your order details. Please contact support if you need assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/shop">
                                <Button variant="outline">Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-muted/20 min-h-screen">
            <Section className="py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/shop" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        Secure Checkout
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Billing Information */}
                        <div className="bg-card rounded-2xl border p-6 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-primary">1</span>
                                </div>
                                <h2 className="text-xl font-semibold">Billing Information</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={billingInfo.firstName}
                                        onChange={(e) => handleBillingChange('firstName', e.target.value)}
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={billingInfo.lastName}
                                        onChange={(e) => handleBillingChange('lastName', e.target.value)}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={billingInfo.email}
                                    onChange={(e) => handleBillingChange('email', e.target.value)}
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name (Optional)</Label>
                                <Input
                                    id="company"
                                    value={billingInfo.company}
                                    onChange={(e) => handleBillingChange('company', e.target.value)}
                                    placeholder="Acme Inc."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={billingInfo.address}
                                    onChange={(e) => handleBillingChange('address', e.target.value)}
                                    placeholder="123 Main Street"
                                />
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={billingInfo.city}
                                        onChange={(e) => handleBillingChange('city', e.target.value)}
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        value={billingInfo.state}
                                        onChange={(e) => handleBillingChange('state', e.target.value)}
                                        placeholder="NY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input
                                        id="zip"
                                        value={billingInfo.zip}
                                        onChange={(e) => handleBillingChange('zip', e.target.value)}
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Payment Information */}
                        <div className="bg-card rounded-2xl border p-6 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <span className="font-bold text-primary">2</span>
                                </div>
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Stripe Credit Card Option */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('stripe')}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg",
                                        paymentMethod === 'stripe'
                                            ? "border-[#635BFF] bg-gradient-to-br from-[#635BFF]/10 to-[#635BFF]/5 shadow-md"
                                            : "border-muted-foreground/20 bg-muted/30 hover:border-[#635BFF]/50"
                                    )}
                                >
                                    {paymentMethod === 'stripe' && (
                                        <div className="absolute top-3 right-3 h-5 w-5 bg-[#635BFF] rounded-full flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "h-12 w-12 rounded-lg flex items-center justify-center transition-colors",
                                        paymentMethod === 'stripe' ? "bg-[#635BFF]/15" : "bg-muted"
                                    )}>
                                        <StripeIcon className={cn(
                                            "h-6 w-6 transition-colors",
                                            paymentMethod === 'stripe' ? "text-[#635BFF]" : "text-muted-foreground"
                                        )} />
                                    </div>
                                    <div className="text-center">
                                        <p className={cn(
                                            "font-semibold transition-colors",
                                            paymentMethod === 'stripe' ? "text-[#635BFF]" : "text-foreground"
                                        )}>Credit Card</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Powered by Stripe</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="h-5 w-8 bg-gradient-to-r from-[#1A1F71] to-[#006FCF] rounded text-[6px] text-white flex items-center justify-center font-bold">VISA</div>
                                        <div className="h-5 w-8 bg-gradient-to-r from-[#EB001B] to-[#F79E1B] rounded flex items-center justify-center">
                                            <div className="flex -space-x-1">
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#EB001B]"></div>
                                                <div className="h-2.5 w-2.5 rounded-full bg-[#F79E1B]"></div>
                                            </div>
                                        </div>
                                        <div className="h-5 w-8 bg-[#006FCF] rounded text-[5px] text-white flex items-center justify-center font-bold">AMEX</div>
                                    </div>
                                </button>

                                {/* PayPal Option */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg",
                                        paymentMethod === 'paypal'
                                            ? "border-[#003087] bg-gradient-to-br from-[#003087]/10 to-[#009CDE]/5 shadow-md"
                                            : "border-muted-foreground/20 bg-muted/30 hover:border-[#003087]/50"
                                    )}
                                >
                                    {paymentMethod === 'paypal' && (
                                        <div className="absolute top-3 right-3 h-5 w-5 bg-[#003087] rounded-full flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "h-12 w-12 rounded-lg flex items-center justify-center transition-colors",
                                        paymentMethod === 'paypal' ? "bg-[#003087]/15" : "bg-muted"
                                    )}>
                                        <PayPalIcon className={cn(
                                            "h-6 w-6 transition-colors",
                                            paymentMethod === 'paypal' ? "text-[#003087]" : "text-muted-foreground"
                                        )} />
                                    </div>
                                    <div className="text-center">
                                        <p className={cn(
                                            "font-semibold transition-colors",
                                            paymentMethod === 'paypal' ? "text-[#003087]" : "text-foreground"
                                        )}>PayPal</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Fast & Secure</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-muted-foreground">Pay with balance or cards</span>
                                    </div>
                                </button>
                            </div>

                            {/* Stripe Credit Card Form */}
                            {paymentMethod === 'stripe' && (
                                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center gap-2 p-3 bg-[#635BFF]/10 rounded-lg border border-[#635BFF]/20">
                                        <StripeIcon className="h-4 w-4 text-[#635BFF]" />
                                        <span className="text-sm font-medium text-[#635BFF]">Secure card payment via Stripe</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <div className="relative">
                                            <Input
                                                id="cardNumber"
                                                value={paymentInfo.cardNumber}
                                                onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                                                placeholder="1234 5678 9012 3456"
                                                className="pl-10"
                                            />
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input
                                                id="expiry"
                                                value={paymentInfo.expiry}
                                                onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input
                                                id="cvc"
                                                value={paymentInfo.cvc}
                                                onChange={(e) => handlePaymentChange('cvc', e.target.value)}
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nameOnCard">Name on Card</Label>
                                        <Input
                                            id="nameOnCard"
                                            value={paymentInfo.nameOnCard}
                                            onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* PayPal Section */}
                            {paymentMethod === 'paypal' && (
                                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center gap-2 p-3 bg-[#003087]/10 rounded-lg border border-[#003087]/20">
                                        <PayPalIcon className="h-4 w-4 text-[#003087]" />
                                        <span className="text-sm font-medium text-[#003087]">You&apos;ll be redirected to PayPal to complete payment</span>
                                    </div>

                                    <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-6 text-center space-y-4">
                                        <div className="h-16 w-16 mx-auto bg-gradient-to-br from-[#003087] to-[#009CDE] rounded-2xl flex items-center justify-center shadow-lg">
                                            <PayPalIcon className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Pay with PayPal</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Login to your PayPal account to complete the purchase securely.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Shield className="h-3.5 w-3.5 text-green-600" />
                                                Buyer Protection
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Lock className="h-3.5 w-3.5 text-blue-600" />
                                                Encrypted Payment
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Zap className="h-3.5 w-3.5 text-amber-600" />
                                                Instant Checkout
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                                <Lock className="h-4 w-4" />
                                Your payment information is encrypted and secure
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-2xl border p-6 sticky top-24 space-y-6">
                            <h2 className="text-xl font-semibold">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 p-3 bg-muted/30 rounded-xl">
                                        <div className={cn(
                                            "h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0",
                                            item.category === 'Pro' && "bg-emerald-500/10",
                                            item.category === 'Premier' && "bg-blue-500/10",
                                            item.category === 'Enterprise' && "bg-purple-500/10"
                                        )}>
                                            <span className={cn(
                                                "text-lg font-bold",
                                                item.category === 'Pro' && "text-emerald-600",
                                                item.category === 'Premier' && "text-blue-600",
                                                item.category === 'Enterprise' && "text-purple-600"
                                            )}>
                                                {item.category.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            <p className="font-semibold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (8.75%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                className={cn(
                                    "w-full h-12 text-base font-semibold rounded-xl transition-all duration-300",
                                    paymentMethod === 'stripe'
                                        ? "bg-[#635BFF] hover:bg-[#635BFF]/90 shadow-lg shadow-[#635BFF]/25"
                                        : "bg-[#003087] hover:bg-[#003087]/90 shadow-lg shadow-[#003087]/25"
                                )}
                                onClick={handleSubmitOrder}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {paymentMethod === 'paypal' ? 'Connecting to PayPal...' : 'Processing Payment...'}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {paymentMethod === 'stripe' ? (
                                            <>
                                                <CreditCard className="h-4 w-4" />
                                                Pay ${total.toFixed(2)} with Card
                                            </>
                                        ) : (
                                            <>
                                                <PayPalIcon className="h-4 w-4" />
                                                Pay ${total.toFixed(2)} with PayPal
                                            </>
                                        )}
                                    </span>
                                )}
                            </Button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Zap className="h-4 w-4 text-amber-600" />
                                    <span>Instant Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
