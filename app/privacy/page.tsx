import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | XenoCom',
  description: 'XenoCom Privacy Policy - Learn how we protect your data and messaging privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030706] text-[#9dffb4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(58,255,140,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,198,70,0.08),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 rounded-full border border-emerald-400/30 bg-black/70 px-4 py-3 shadow-[0_0_0_1px_rgba(157,255,180,0.15),0_0_40px_rgba(36,255,121,0.08)] backdrop-blur sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-sm uppercase tracking-[0.4em] text-emerald-200 transition hover:text-emerald-100">
              ← XENOCOM
            </Link>
            <h1 className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-200/80">
              Privacy Policy
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-10">
          <div className="rounded-[2rem] border border-emerald-400/25 bg-[#040b09]/85 p-6 shadow-[0_0_60px_rgba(22,255,120,0.08)] sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              {/* Introduction */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-amber-300/80">
                  Effective Date: July 24, 2026
                </p>
                <h2 className="mt-4 text-2xl font-semibold uppercase tracking-[0.26em] text-emerald-100 sm:text-3xl">
                  Your Privacy Matters
                </h2>
                <p className="mt-4 text-base leading-7 text-emerald-100/80">
                  XenoCom is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when using our messaging application.
                </p>
              </section>

              {/* Information Collection */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  1. Information We Collect
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    <span className="font-mono text-emerald-200">Messages:</span> Your SMS and MMS messages are processed for delivery and rendering. Character animation data is generated locally on your device.
                  </p>
                  <p>
                    <span className="font-mono text-emerald-200">Contacts:</span> Your contact list is accessed only for roster integration and presence detection. Contact data remains on your device.
                  </p>
                  <p>
                    <span className="font-mono text-emerald-200">Device Information:</span> We collect information about your Android device type, OS version, and app version for compatibility and crash reporting.
                  </p>
                  <p>
                    <span className="font-mono text-emerald-200">Usage Analytics:</span> Non-identifying telemetry about feature usage helps us improve the app experience. No message content is included.
                  </p>
                </div>
              </section>

              {/* Data Processing */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  2. Local-First Architecture
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    XenoCom is designed with local-first processing as a core principle. Message rendering, character animation, and sound profile processing occur entirely on your device whenever possible.
                  </p>
                  <p>
                    SMS and MMS delivery requires interaction with your carrier's network infrastructure, which is outside our control. We do not store copies of your messages on our servers.
                  </p>
                </div>
              </section>

              {/* Data Usage */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  3. How We Use Your Information
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <ul className="list-inside space-y-3 text-emerald-100/75">
                    <li>• To deliver and display your SMS and MMS messages</li>
                    <li>• To render animated characters and apply sound profiles</li>
                    <li>• To maintain contact roster and presence information</li>
                    <li>• To diagnose technical issues and improve performance</li>
                    <li>• To comply with legal obligations and carrier requirements</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  4. Data Sharing & Third Parties
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    XenoCom does not sell or share your personal data with third parties for marketing purposes. Your information is only shared when required by law or with your explicit consent.
                  </p>
                  <p>
                    <span className="font-mono text-emerald-200">Carrier Integration:</span> SMS and MMS messages must transit through your carrier's networks. We have no control over carrier data practices.
                  </p>
                  <p>
                    <span className="font-mono text-emerald-200">Crash Reporting:</span> Anonymous crash reports may be shared with our analytics provider to improve stability.
                  </p>
                </div>
              </section>

              {/* Permissions */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  5. Android Permissions
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    XenoCom requests specific Android permissions necessary for its core functionality:
                  </p>
                  <ul className="list-inside space-y-3 mt-3 text-emerald-100/75">
                    <li>• <span className="font-mono">READ_SMS / SEND_SMS:</span> To access and send text messages</li>
                    <li>• <span className="font-mono">READ_CONTACTS:</span> To display your contact roster</li>
                    <li>• <span className="font-mono">READ_PHONE_STATE:</span> For call detection and presence</li>
                    <li>• <span className="font-mono">INTERNET:</span> For carrier communication and analytics</li>
                  </ul>
                </div>
              </section>

              {/* Security */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  6. Security Measures
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    We implement industry-standard security practices to protect your data:
                  </p>
                  <ul className="list-inside space-y-3 mt-3 text-emerald-100/75">
                    <li>• Encrypted communication channels with carrier networks</li>
                    <li>• Local storage encryption where supported by Android</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Minimal data retention policies</li>
                  </ul>
                  <p className="mt-4">
                    However, no security system is impenetrable. We cannot guarantee absolute security of your data.
                  </p>
                </div>
              </section>

              {/* User Rights */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  7. Your Privacy Rights
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal data:
                  </p>
                  <ul className="list-inside space-y-3 mt-3 text-emerald-100/75">
                    <li>• Right to access your personal data</li>
                    <li>• Right to correct inaccurate data</li>
                    <li>• Right to request deletion of your data</li>
                    <li>• Right to opt-out of analytics collection</li>
                    <li>• Right to data portability</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, contact us through the information provided below.
                  </p>
                </div>
              </section>

              {/* Data Retention */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  8. Data Retention
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    Messages are retained locally on your device according to your storage settings. We do not maintain copies of your messages on our servers. Analytics data is retained for no longer than 90 days. Device crash reports are retained for 30 days.
                  </p>
                </div>
              </section>

              {/* Children */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  9. Children's Privacy
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    XenoCom is not designed for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with information, we will delete such information promptly.
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section className="mb-8 border-b border-emerald-400/20 pb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  10. Updates to This Policy
                </h3>
                <div className="mt-4 space-y-4 text-sm leading-7 text-emerald-100/80">
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of XenoCom following any changes constitutes your acceptance of the new Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h3 className="font-mono text-[0.85rem] uppercase tracking-[0.32em] text-emerald-200">
                  11. Contact Us
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-7 text-emerald-100/80">
                  <p>
                    If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
                  </p>
                  <div className="mt-4 rounded-lg border border-emerald-400/20 bg-black/40 p-4 font-mono text-emerald-200/90">
                    <p>privacy@xenocom.app</p>
                  </div>
                  <p className="mt-4 text-xs text-emerald-200/60">
                    We will respond to legitimate privacy requests within 30 days.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-emerald-400/20 py-6 text-center text-[0.74rem] uppercase tracking-[0.3em] text-emerald-200/70 sm:text-sm">
          <p>
            <Link href="/" className="transition hover:text-emerald-100">
              Back to XenoCom
            </Link>
          </p>
          <p className="mt-2 text-emerald-200/60">
            Independent software.
          </p>
        </footer>
      </div>
    </div>
  );
}
