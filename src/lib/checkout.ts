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

export const handleCheckout = (product: Product, quantity: number = 1) => {
    const url = getCheckoutUrl(product, quantity);
    window.location.href = url;
};
