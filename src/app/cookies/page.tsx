import { ArticleSchema } from "@/components/seo/JsonLd";

export const metadata = {
    title: 'Cookies Policy | QuickBooks',
    description: 'Our policy regarding the use of cookies.',
};

export default function CookiesPolicyPage() {
    return (
        <>
            <ArticleSchema
                title="Cookies Policy"
                description="Our policy regarding the use of cookies. Learn how QuickBooks uses cookies to improve your experience."
                url="https://thequickbook.com/cookies"
            />
            <div className="container mx-auto px-4 py-12 md:py-20 md:px-6">
                <h1 className="text-4xl font-bold tracking-tight mb-8">Cookies Policy</h1>
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                    <p className="lead text-xl text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <p>
                            This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used. This Cookies Policy has been created with the help of the Cookies Policy Generator.
                        </p>
                        <p>
                            Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.
                        </p>
                        <p>
                            We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.
                        </p>
                    </section>

                    <section>
                        <h2>Interpretation and Definitions</h2>
                        <h3>Interpretation</h3>
                        <p>
                            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>
                        <h3>Definitions</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy) refers to QuickBooks.</li>
                            <li><strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of Your browsing history on that website among its many uses.</li>
                            <li><strong>Website</strong> refers to QuickBooks, accessible from https://quickbooks.intuit.com/</li>
                            <li><strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>The use of the Cookies</h2>
                        <h3>Type of Cookies We Use</h3>
                        <p>
                            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
                        </p>
                        <p>We use both session and persistent Cookies for the purposes set out below:</p>

                        <div className="space-y-4 pt-4">
                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                                <h4 className="font-semibold text-lg">Necessary / Essential Cookies</h4>
                                <p className="text-sm text-zinc-500 mb-2">Type: Session Cookies | Administered by: Us</p>
                                <p>These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                            </div>

                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                                <h4 className="font-semibold text-lg">Functionality Cookies</h4>
                                <p className="text-sm text-zinc-500 mb-2">Type: Persistent Cookies | Administered by: Us</p>
                                <p>These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2>Your Choices Regarding Cookies</h2>
                        <p>
                            If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.
                        </p>
                        <p>
                            If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.
                        </p>
                        <p>
                            For more information on how to manage your cookie settings, please refer to the "Help" section of your browser.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions about this Cookies Policy, You can contact us:</p>
                        <ul className="list-disc pl-5">
                            <li>By email: support@quickbooks.com</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
