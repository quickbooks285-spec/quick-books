import { ArticleSchema } from "@/components/seo/JsonLd";

export const metadata = {
    title: 'Refund Policy | QuickBooks',
    description: 'Our policy regarding refunds and returns.',
};

export default function RefundPolicyPage() {
    return (
        <>
            <ArticleSchema
                title="Refund Policy"
                description="Our policy regarding refunds and returns. Learn about our 30-day return policy and refund process."
                url="https://thequickbook.com/refund"
            />
            <div className="container mx-auto px-4 py-12 md:py-20 md:px-6">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Refund Policy</h1>
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                    <p className="lead text-xl text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2>Thank You for Shopping at QuickBooks</h2>
                        <p>
                            If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.
                        </p>
                        <p>The following terms are applicable for any products that You purchased with Us.</p>
                    </section>

                    <section>
                        <h2>Interpretation and Definitions</h2>
                        <h3>Interpretation</h3>
                        <p>
                            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>
                        <h3>Definitions</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to QuickBooks.</li>
                            <li><strong>Goods</strong> refer to the items offered for sale on the Service.</li>
                            <li><strong>Orders</strong> mean a request by You to purchase Goods from Us.</li>
                            <li><strong>Service</strong> refers to the Website.</li>
                            <li><strong>Website</strong> refers to QuickBooks, accessible from https://quickbooks.intuit.com/</li>
                            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Your Order Cancellation Rights</h2>
                        <p>
                            You are entitled to cancel Your Order within 30 days without giving any reason for doing so.
                        </p>
                        <p>
                            The deadline for cancelling an Order is 30 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.
                        </p>
                        <p>
                            In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:
                        </p>
                        <ul className="list-disc pl-5">
                            <li>By email: support@quickbooks.com</li>
                        </ul>
                        <p className="mt-4">
                            We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
                        </p>
                    </section>

                    <section>
                        <h2>Condition for Returns</h2>
                        <p>In order for the Goods to be eligible for a return, please make sure that:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The Goods were purchased in the last 30 days</li>
                            <li>The Goods are in the original packaging</li>
                        </ul>
                        <p className="mt-4">The following Goods cannot be returned:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The supply of Goods made to Your specifications or clearly personalized.</li>
                            <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
                            <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                            <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
                        <ul className="list-disc pl-5">
                            <li>By email: support@quickbooks.com</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
