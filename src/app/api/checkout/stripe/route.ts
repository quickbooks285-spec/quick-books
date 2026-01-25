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
            // DEMO MODE: Simulate Stripe checkout session
            console.log('🎭 DEMO MODE: Creating simulated Stripe checkout session');
            console.log('Items:', items);
            console.log('Customer:', customerEmail);
            console.log('Total:', total);

            // Generate a fake session ID
            const demoSessionId = `demo_cs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // In demo mode, redirect to our success page directly with demo data
            const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id=${demoSessionId}&payment_method=stripe&demo=true`;

            return NextResponse.json({
                success: true,
                demo: true,
                sessionId: demoSessionId,
                url: successUrl,
                message: 'Demo mode: Simulating Stripe checkout'
            });
        }

        // PRODUCTION MODE: Real Stripe integration
        // Uncomment and configure when you have real Stripe keys
        /*
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: `${item.category} Edition`,
                },
                unit_amount: Math.round(item.price * 100), // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        // Add tax as a line item
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Tax (8.75%)',
                },
                unit_amount: Math.round(tax * 100),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: customerEmail,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&payment_method=stripe`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=true`,
            metadata: {
                customer_name: `${billingInfo.firstName} ${billingInfo.lastName}`,
                customer_address: billingInfo.address,
                customer_city: billingInfo.city,
                customer_state: billingInfo.state,
                customer_zip: billingInfo.zip,
            },
        });

        return NextResponse.json({
            success: true,
            sessionId: session.id,
            url: session.url,
        });
        */

        // If not in demo mode but Stripe is not configured
        return NextResponse.json(
            { error: 'Stripe is not configured. Please add your API keys or enable demo mode.' },
            { status: 500 }
        );

    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
