export const metadata = {
    title: 'Shipping Policy | QuickBooks',
    description: 'Our policy regarding shipping and delivery.',
};

export default function ShippingPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 md:px-6">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Shipping Policy</h1>
            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
                <p className="lead text-xl text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <p>
                        The following terms and conditions constitute our Shipping Policy.
                    </p>
                </section>

                <section>
                    <h2>Domestic Shipping Policy</h2>

                    <h3 className="text-lg font-medium mt-6 mb-2">Shipment processing time</h3>
                    <p>
                        All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
                    </p>
                    <p>
                        If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of Your order, we will contact You via email or telephone.
                    </p>

                    <h3 className="text-lg font-medium mt-6 mb-2">Shipping rates & delivery estimates</h3>
                    <p>
                        Shipping charges for Your order will be calculated and displayed at checkout.
                    </p>

                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-left text-sm whitespace-nowrap">
                            <thead className="uppercase tracking-wider border-b-2 border-zinc-200 dark:border-zinc-800 font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Shipment method</th>
                                    <th scope="col" className="px-6 py-4">Estimated delivery time</th>
                                    <th scope="col" className="px-6 py-4">Shipment cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                    <td className="px-6 py-4">Standard Shipping</td>
                                    <td className="px-6 py-4">3-5 business days</td>
                                    <td className="px-6 py-4">Free</td>
                                </tr>
                                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                    <td className="px-6 py-4">Two Days Shipping</td>
                                    <td className="px-6 py-4">2 business days</td>
                                    <td className="px-6 py-4">$12.95</td>
                                </tr>
                                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                    <td className="px-6 py-4">Overnight *</td>
                                    <td className="px-6 py-4">1-2 business days</td>
                                    <td className="px-6 py-4">$19.95</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-zinc-500 mt-2">* Overnight delivery is only available for orders with delivery addresses within the continental United States.</p>
                </section>

                <section>
                    <h2>International Shipping Policy</h2>
                    <p>
                        We currently do not ship outside the U.S.
                    </p>
                </section>

                <section>
                    <h2>Returns Policy</h2>
                    <p>
                        Our <a href="/refund" className="text-primary hover:underline">Refund Policy</a> provides detailed information about options and procedures for returning your order.
                    </p>
                </section>
            </div>
        </div>
    );
}
