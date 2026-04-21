import { createClient } from '@supabase/supabase-js';

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Supabase environment variables are not set.');
        }
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
    get(_target, prop) {
        return (getSupabaseClient() as any)[prop];
    },
});

// Database types (auto-generated would be better, but this works for now)
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
                    items: any; // JSONB
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
            };
        };
    };
}
