import { ArticleSchema } from "@/components/seo/JsonLd";

export const metadata = {
    title: 'Privacy Policy | QuickBooks',
    description: 'Our commitment to protecting your privacy.',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <ArticleSchema
                title="Privacy Policy"
                description="Our commitment to protecting your privacy. Learn how QuickBooks collects, uses, and protects your personal data."
                url="https://thequickbook.com/privacy"
            />
            <div className="container mx-auto px-4 py-12 md:py-20 md:px-6">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                    <p className="lead text-xl text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <p>
                            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                        </p>
                        <p>
                            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2>Interpretation and Definitions</h2>
                        <h3>Interpretation</h3>
                        <p>
                            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>
                        <h3>Definitions</h3>
                        <p>For the purposes of this Privacy Policy:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to QuickBooks.</li>
                            <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing details of Your browsing history on that website among its many uses.</li>
                            <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                            <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                            <li><strong>Service</strong> refers to the Website.</li>
                            <li><strong>Website</strong> refers to QuickBooks, accessible from https://quickbooks.intuit.com/</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Collecting and Using Your Personal Data</h2>
                        <h3>Types of Data Collected</h3>

                        <h4 className="font-semibold text-lg mt-4">Personal Data</h4>
                        <p>
                            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Phone number</li>
                            <li>Address, State, Province, ZIP/Postal code, City</li>
                            <li>Usage Data</li>
                        </ul>

                        <h4 className="font-semibold text-lg mt-4">Usage Data</h4>
                        <p>Usage Data is collected automatically when using the Service.</p>
                        <p>
                            Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                        </p>
                    </section>

                    <section>
                        <h2>Retention of Your Personal Data</h2>
                        <p>
                            The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                        </p>
                    </section>

                    <section>
                        <h2>Transfer of Your Personal Data</h2>
                        <p>
                            Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                        <ul className="list-disc pl-5">
                            <li>By email: support@quickbooks.com</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
