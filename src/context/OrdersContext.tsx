'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';
import { getSupabase } from '@/lib/supabase';

export interface Order {
    id: string;
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
    paymentMethod: string;
    customer: {
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
    createdAt: string;
    updatedAt: string;
}

interface OrdersContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
    updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
    getOrder: (orderId: string) => Order | undefined;
    getOrderByNumber: (orderNumber: string) => Order | undefined;
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    isLoading: boolean;
    refreshOrders: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// Generate a unique order number
function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `QB-${timestamp}-${random}`;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch orders from Supabase
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await (getSupabase().from('orders') as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
                return;
            }

            // Transform database format to our Order interface
            const transformedOrders: Order[] = (data || []).map((dbOrder: any) => ({
                id: dbOrder.id,
                orderNumber: dbOrder.order_number,
                items: dbOrder.items,
                subtotal: parseFloat(dbOrder.subtotal.toString()),
                tax: parseFloat(dbOrder.tax.toString()),
                total: parseFloat(dbOrder.total.toString()),
                status: dbOrder.status as Order['status'],
                paymentMethod: dbOrder.payment_method,
                customer: {
                    firstName: dbOrder.customer_first_name,
                    lastName: dbOrder.customer_last_name,
                    email: dbOrder.customer_email,
                    company: dbOrder.customer_company || undefined,
                    address: dbOrder.customer_address,
                    city: dbOrder.customer_city,
                    state: dbOrder.customer_state,
                    zip: dbOrder.customer_zip,
                    country: dbOrder.customer_country,
                },
                createdAt: dbOrder.created_at,
                updatedAt: dbOrder.updated_at,
            }));

            setOrders(transformedOrders);
        } catch (error) {
            console.error('Error in fetchOrders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load orders on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
        const orderNumber = generateOrderNumber();

        // Transform to database format
        const dbOrder = {
            order_number: orderNumber,
            customer_first_name: orderData.customer.firstName,
            customer_last_name: orderData.customer.lastName,
            customer_email: orderData.customer.email,
            customer_company: orderData.customer.company || null,
            customer_address: orderData.customer.address,
            customer_city: orderData.customer.city,
            customer_state: orderData.customer.state,
            customer_zip: orderData.customer.zip,
            customer_country: orderData.customer.country,
            items: orderData.items,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            total: orderData.total,
            status: orderData.status,
            payment_method: orderData.paymentMethod,
        };

        const { data, error } = await (getSupabase().from('orders') as any)
            .insert([dbOrder])
            .select()
            .single();

        if (error) {
            console.error('Error creating order:', error);
            throw new Error(error.message);
        }

        // Transform back to Order interface
        const newOrder: Order = {
            id: data.id,
            orderNumber: data.order_number,
            items: data.items,
            subtotal: parseFloat(data.subtotal.toString()),
            tax: parseFloat(data.tax.toString()),
            total: parseFloat(data.total.toString()),
            status: data.status,
            paymentMethod: data.payment_method,
            customer: {
                firstName: data.customer_first_name,
                lastName: data.customer_last_name,
                email: data.customer_email,
                company: data.customer_company || undefined,
                address: data.customer_address,
                city: data.customer_city,
                state: data.customer_state,
                zip: data.customer_zip,
                country: data.customer_country,
            },
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
        const { data, error } = await (getSupabase().from('orders') as any)
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating order:', error);
            throw new Error(error.message);
        }

        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? { ...order, status, updatedAt: data.updated_at }
                    : order
            )
        );
    };

    const getOrder = (orderId: string) => {
        return orders.find((order) => order.id === orderId);
    };

    const getOrderByNumber = (orderNumber: string) => {
        return orders.find((order) => order.orderNumber === orderNumber);
    };

    const totalRevenue = orders
        .filter((o) => o.status === 'completed')
        .reduce((sum, order) => sum + order.total, 0);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
    const completedOrders = orders.filter((o) => o.status === 'completed').length;

    return (
        <OrdersContext.Provider
            value={{
                orders,
                addOrder,
                updateOrderStatus,
                getOrder,
                getOrderByNumber,
                totalRevenue,
                totalOrders,
                pendingOrders,
                completedOrders,
                isLoading,
                refreshOrders: fetchOrders,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrdersContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
}
