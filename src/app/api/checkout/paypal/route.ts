import { NextRequest, NextResponse } from 'next/server';

// Demo mode check
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

interface CheckoutRequest {
    items: CartItem[];
    customerEmail: string;
    billingInfo: {
        firstName: string;
        lastName: string;
        email: string;
        company?: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: CheckoutRequest = await request.json();
        const { items, customerEmail, billingInfo } = body;

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items in cart' },
                { status: 400 }
            );
        }

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.0875;
        const total = subtotal + tax;

        if (isDemoMode) {
            // DEMO MODE: Simulate PayPal order creation
            console.log('🎭 DEMO MODE: Creating simulated PayPal order');
            console.log('Items:', items);
            console.log('Customer:', customerEmail);
            console.log('Total:', total);

            // Generate a fake order ID
            const demoOrderId = `DEMO-PAYPAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // In demo mode, redirect to our success page directly with demo data
            const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?order_id=${demoOrderId}&payment_method=paypal&demo=true`;

            return NextResponse.json({
                success: true,
                demo: true,
                orderId: demoOrderId,
                url: successUrl,
                message: 'Demo mode: Simulating PayPal checkout'
            });
        }

        // PRODUCTION MODE: Real PayPal integration
        // Uncomment and configure when you have real PayPal credentials
        /*
        const PAYPAL_API_BASE = process.env.NEXT_PUBLIC_PAYPAL_MODE === 'live' 
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

        // Get PayPal access token
        const authResponse = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
                ).toString('base64')}`,
            },
            body: 'grant_type=client_credentials',
        });

        const authData = await authResponse.json();
        const accessToken = authData.access_token;

        // Create PayPal order
        const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: subtotal.toFixed(2),
                            },
                            tax_total: {
                                currency_code: 'USD',
                                value: tax.toFixed(2),
                            },
                        },
                    },
                    items: items.map((item) => ({
                        name: item.name,
                        description: `${item.category} Edition`,
                        unit_amount: {
                            currency_code: 'USD',
                            value: item.price.toFixed(2),
                        },
                        quantity: item.quantity.toString(),
                        category: 'DIGITAL_GOODS',
                    })),
                }],
                application_context: {
                    brand_name: 'QuickBooks',
                    landing_page: 'BILLING',
                    user_action: 'PAY_NOW',
                    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?payment_method=paypal`,
                    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=true`,
                },
            }),
        });

        const orderData = await orderResponse.json();

        // Find the approval URL
        const approveUrl = orderData.links.find((link: any) => link.rel === 'approve')?.href;

        return NextResponse.json({
            success: true,
            orderId: orderData.id,
            url: approveUrl,
        });
        */

        // If not in demo mode but PayPal is not configured
        return NextResponse.json(
            { error: 'PayPal is not configured. Please add your API keys or enable demo mode.' },
            { status: 500 }
        );

    } catch (error) {
        console.error('PayPal checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create PayPal order' },
            { status: 500 }
        );
    }
}
