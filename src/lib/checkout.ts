import { Product } from '@/types';

export const getCheckoutUrl = (product: Product, quantity: number = 1): string => {
    const baseUrl = 'https://checkout-two-lake.vercel.app/checkout';
    const params = new URLSearchParams();

    // Clean up product name to get just the subscription type (remove "QuickBooks " and extra details)
    let subscriptionType = product.name.replace('QuickBooks ', '').split(' – ')[0];

    params.append('name', subscriptionType);
    params.append('price', product.price.toString());
    params.append('quantity', quantity.toString());
    params.append('product_id', product.id);
    params.append('description', product.description || '');

    return `${baseUrl}?${params.toString()}`;
};

import { CartItem } from '@/context/CartContext';

export const handleCheckout = (product: Product, quantity: number = 1) => {
    const url = getCheckoutUrl(product, quantity);
    window.location.href = url;
};

export const handleCartCheckout = (items: CartItem[]) => {
    if (items.length === 0) return;

    if (items.length === 1) {
        handleCheckout(items[0], items[0].quantity);
        return;
    }

    const baseUrl = 'https://checkout-two-lake.vercel.app/checkout';
    const params = new URLSearchParams();

    // Aggregate items
    const subscriptionTypes = items
        .map(item => item.name.replace('QuickBooks ', '').split(' – ')[0])
        .join(', ');

    // Calculate total price (the external checkout takes a single price)
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const description = items
        .map(item => `${item.quantity}x ${item.name}`)
        .join(', ');

    params.append('name', `Bundle: ${subscriptionTypes}`);
    params.append('price', totalPrice.toString());
    params.append('quantity', '1'); // Treat as 1 bundle
    params.append('product_id', 'bundle_' + Date.now());
    params.append('description', description);

    window.location.href = `${baseUrl}?${params.toString()}`;
};
