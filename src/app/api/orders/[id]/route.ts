import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/orders/[id] - Fetch a single order
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ order: data }, { status: 200 });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

// PATCH /api/orders/[id] - Update an order (mainly for status updates)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('orders')
            .update(body)
            .eq('id', params.id)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ order: data }, { status: 200 });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
