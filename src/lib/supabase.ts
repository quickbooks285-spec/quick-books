import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
            };
        };
    };
}

let _supabase: SupabaseClient<Database> | null = null;

function getSupabaseClient(): SupabaseClient<Database> {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Supabase environment variables are not set.');
        }
        _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient<Database>, {
    get(_target, prop) {
        return (getSupabaseClient() as any)[prop];
    },
});
