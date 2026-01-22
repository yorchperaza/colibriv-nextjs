import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use — ColibriV",
  description: "ColibriV Terms of Use. Read our terms and conditions for using colibriv.com. Governed by Colorado law.",
}

export default function TermsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-20%,#fef3c7_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-600/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-600/20">
            Legal
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.01em] text-slate-900">
            Terms of Use
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
              Welcome to colibriv.com (the &quot;Website&quot;). By accessing or using this Website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this Website.
            </p>

            {/* Acceptance */}
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using colibriv.com, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. These Terms constitute a legally binding agreement between you and ColibriV, LLC.
            </p>

            {/* Informational Purpose */}
            <h2>Informational Purpose Only</h2>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 not-prose my-6">
              <p className="text-red-800 font-medium">
                ⚠️ <strong>Important Notice:</strong> This Website is for informational and preparatory purposes only. No securities are offered or sold through this Website.
              </p>
            </div>
            <p>
              The information provided on this Website is for general informational purposes and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any future offering of securities will be made solely through official offering materials on a registered crowdfunding platform in compliance with U.S. securities laws.
            </p>

            {/* No Investment Advice */}
            <h2>No Investment Advice</h2>
            <p>
              Nothing on this Website constitutes financial, legal, tax, or investment advice. You should consult with qualified professionals before making any financial or investment decisions. ColibriV does not provide investment recommendations or advice.
            </p>

            {/* Pre-Launch Reservations */}
            <h2>Pre-Launch Reservations and Contributions</h2>
            <p>
              Refundable reservations and campaign preparation contributions made through this Website:
            </p>
            <ul>
              <li><strong>Do not</strong> represent equity, ownership, or securities</li>
              <li><strong>Do not</strong> constitute an investment in ColibriV</li>
              <li><strong>Do not</strong> entitle you to any shares, dividends, or ownership rights</li>
              <li>Are subject to our Refund Policy for refundable reservations</li>
            </ul>

            {/* User Conduct */}
            <h2>User Conduct</h2>
            <p>When using this Website, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Transmit any harmful, threatening, or offensive content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to access the Website without permission</li>
              <li>Interfere with the proper functioning of the Website</li>
            </ul>

            {/* Intellectual Property */}
            <h2>Intellectual Property</h2>
            <p>
              All content on this Website, including but not limited to text, graphics, logos, images, videos, and software, is the property of ColibriV, LLC and is protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise use any content from this Website without our prior written consent.
            </p>

            {/* Third-Party Services */}
            <h2>Third-Party Services</h2>
            <p>
              This Website may use third-party services for payment processing, analytics, and other functions. These services may have their own terms and privacy policies. By using our Website, you agree to be bound by the terms of these third-party services where applicable.
            </p>
            <p>
              Payment processing is handled by Stripe. Your use of payment services is subject to Stripe&apos;s terms of service and privacy policy.
            </p>

            {/* Disclaimers */}
            <h2>Disclaimers</h2>
            <p>
              THIS WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. COLIBRIV DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not guarantee the accuracy or completeness of any information on the Website.
            </p>

            {/* Limitation of Liability */}
            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, COLIBRIV, LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THIS WEBSITE.
            </p>
            <p>
              In no event shall our total liability exceed the amount you paid to ColibriV, if any, during the twelve (12) months preceding the claim.
            </p>

            {/* Indemnification */}
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless ColibriV, LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising out of your use of the Website or violation of these Terms.
            </p>

            {/* Governing Law */}
            <h2>Governing Law</h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 not-prose my-6">
              <p className="text-slate-700">
                These Terms of Use are governed by and construed in accordance with the laws of the <strong>State of Colorado</strong>, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in <strong>Denver, Colorado</strong>.
              </p>
            </div>

            {/* Modifications */}
            <h2>Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Effective&quot; date. Your continued use of the Website after any changes constitutes acceptance of the new Terms.
            </p>

            {/* Severability */}
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>

            {/* Entire Agreement */}
            <h2>Entire Agreement</h2>
            <p>
              These Terms of Use, together with our Privacy Policy, constitute the entire agreement between you and ColibriV regarding your use of this Website.
            </p>

            {/* Contact */}
            <h2>Contact Us</h2>
            <p>If you have questions about these Terms of Use, please contact us:</p>
          </div>

          {/* Contact Box */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
            <h3 className="text-lg font-bold text-slate-900">Legal Contact</h3>
            <div className="mt-4 space-y-2 text-slate-700">
              <p>📧 <a href="mailto:legal@colibriv.com" className="underline underline-offset-2 font-medium">legal@colibriv.com</a></p>
              <p>📍 6312 S Fiddlers Green Circle, Greenwood Village, CO 80111</p>
              <p>🏢 ColibriV, LLC</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
