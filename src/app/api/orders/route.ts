import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

// GET /api/orders - Fetch all orders
export async function GET(request: NextRequest) {
    try {
        const { data, error } = await getSupabase()
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ orders: data }, { status: 200 });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await getSupabase()
            .from('orders')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ order: data }, { status: 201 });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
