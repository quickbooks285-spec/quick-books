import { createClient } from '@supabase/supabase-js';

export interface Database {
    public: {
        Tables: {
            orders: {
                Row: {
                    id: string;
                    order_number: string;
                    customer_first_name: string;
                    customer_last_name: string;
                    customer_email: string;
                    customer_company: string | null;
                    customer_address: string;
                    customer_city: string;
                    customer_state: string;
                    customer_zip: string;
                    customer_country: string;
                    items: any;
                    subtotal: number;
                    tax: number;
                    total: number;
                    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
                    payment_method: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    order_number: string;
                    customer_first_name: string;
                    customer_last_name: string;
                    customer_email: string;
                    customer_company?: string | null;
                    customer_address: string;
                    customer_city: string;
                    customer_state: string;
                    customer_zip: string;
                    customer_country: string;
                    items: any;
                    subtotal: number;
                    tax: number;
                    total: number;
                    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
                    payment_method: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    order_number?: string;
                    customer_first_name?: string;
                    customer_last_name?: string;
                    customer_email?: string;
                    customer_company?: string | null;
                    customer_address?: string;
                    customer_city?: string;
                    customer_state?: string;
                    customer_zip?: string;
                    customer_country?: string;
                    items?: any;
                    subtotal?: number;
                    tax?: number;
                    total?: number;
                    status?: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
                    payment_method?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
    if (!_supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) throw new Error('Supabase environment variables are not set.');
        _supabase = createClient(url, key);
    }
    return _supabase;
}
