// Google Ads Conversion Tracking
// This function reports purchase conversions to Google Ads

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export const GA_MEASUREMENT_ID = 'AW-17649394185';
export const GA_CONVERSION_ID = 'AW-17649394185/SjgICOOylfIbEInE8d9B';

/**
 * Reports a conversion event to Google Ads
 * @param url - Optional URL to redirect to after reporting the conversion
 * @param value - The conversion value in USD (default: 1.0)
 * @param transactionId - Optional transaction ID for deduplication
 */
export function gtagReportConversion(
    url?: string,
    value: number = 1.0,
    transactionId: string = ''
): boolean {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
        console.warn('Google gtag not available');
        if (url) {
            window.location.href = url;
        }
        return false;
    }

    const callback = function () {
        if (typeof url !== 'undefined' && url) {
            window.location.href = url;
        }
    };

    window.gtag('event', 'conversion', {
        send_to: GA_CONVERSION_ID,
        value: value,
        currency: 'USD',
        transaction_id: transactionId,
        event_callback: callback,
    });

    return false;
}

/**
 * Reports a purchase conversion with product details
 * @param productName - Name of the product being purchased
 * @param price - Price of the product
 * @param quantity - Quantity being purchased
 * @param redirectUrl - URL to redirect to after reporting
 */
export function trackPurchaseConversion(
    productName: string,
    price: number,
    quantity: number = 1,
    redirectUrl: string
): void {
    const totalValue = price * quantity;
    const transactionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    gtagReportConversion(redirectUrl, totalValue, transactionId);
}
