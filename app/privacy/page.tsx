import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — ColibriV",
  description: "ColibriV Privacy Policy. Learn how we collect, use, and protect your personal information. California CCPA/CPRA compliant.",
}

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-20%,#eef2ff_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-600/20">
            Legal
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.01em] text-slate-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            ColibriV, LLC — Effective January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-slate prose-lg max-w-none">
            
            {/* Introduction */}
            <p className="lead">
              ColibriV, LLC (&quot;ColibriV,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website colibriv.com.
            </p>

            {/* Information Collected */}
            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, and phone number (optional)</li>
              <li><strong>Payment Information:</strong> Payment confirmation data processed through third-party payment processors (we do not store credit card numbers)</li>
              <li><strong>Usage Data:</strong> Analytics data including pages visited, time spent on site, and referring URLs</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and IP address</li>
            </ul>

            {/* Use of Information */}
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To provide campaign updates and pre-launch communications</li>
              <li>To process reservations and support contributions</li>
              <li>To maintain regulatory and compliance documentation</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>

            {/* Data Sharing */}
            <h2>Data Sharing</h2>
            <p>
              <strong>We do not sell, rent, or trade your personal information</strong> to third parties for marketing purposes. We may share your information only in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and processing payments (e.g., Stripe)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, privacy, safety, or property</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            {/* California Privacy Rights */}
            <h2>California Privacy Rights (CCPA/CPRA)</h2>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 not-prose my-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your California Privacy Rights</h3>
              <p className="text-slate-700 mb-4">
                If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Right to Know:</strong> You have the right to know what personal information we collect about you and how it is used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Right to Delete:</strong> You have the right to request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Right to Opt-Out:</strong> You have the right to opt out of the sale or sharing of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Right to Non-Discrimination:</strong> You have the right not to be discriminated against for exercising your privacy rights</span>
                </li>
              </ul>
              <p className="mt-4 text-slate-700 font-medium">
                ColibriV does not sell or share personal information for commercial purposes.
              </p>
            </div>

            {/* Data Retention */}
            <h2>Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>

            {/* Cookies */}
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies to collect usage data and improve your experience on our website. You can control cookie preferences through your browser settings.
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
            </ul>

            {/* Third-Party Services */}
            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or use third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>

            {/* Children's Privacy */}
            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            {/* Security */}
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            {/* Data Deletion */}
            <h2>Requesting Data Deletion</h2>
            <p>
              You may request deletion of your personal information at any time by contacting us at <a href="mailto:privacy@colibriv.com">privacy@colibriv.com</a>. We will respond to your request within 45 days as required by applicable law.
            </p>

            {/* Changes */}
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Effective&quot; date.
            </p>

            {/* Contact */}
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:</p>
          </div>

          {/* Contact Box */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
            <h3 className="text-lg font-bold text-slate-900">Privacy Contact</h3>
            <div className="mt-4 space-y-2 text-slate-700">
              <p>📧 <a href="mailto:privacy@colibriv.com" className="underline underline-offset-2 font-medium">privacy@colibriv.com</a></p>
              <p>📍 6312 S Fiddlers Green Circle, Greenwood Village, CO 80111</p>
              <p>🏢 ColibriV, LLC</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
