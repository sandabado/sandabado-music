export default function TermsPage() {
  return <article className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
    <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--halo)] glow-halo">Terms of Service</h1>
    <div className="mt-8 space-y-4 leading-7 text-[var(--ghost)]">
      <p><strong className="text-[var(--bone)]">Last updated:</strong> January 2026</p>
      <p>By accessing wholebody.earth, you agree to these terms.</p>
      <LegalHeading>Use of Service</LegalHeading><p>You may use this service for personal, non-commercial purposes only. You may not reverse engineer, scrape, or misuse our systems.</p>
      <LegalHeading>Payments</LegalHeading><p>All payments are processed through Stripe. Refunds are handled on a case-by-case basis.</p>
      <LegalHeading>Disclaimer</LegalHeading><p>The readings and consultations are for entertainment and educational purposes only. They are not medical, psychological, or legal advice.</p>
      <LegalHeading>Liability</LegalHeading><p>wholebody.earth and Whole Body Mastery LLC shall not be liable for any damages arising from your use of this service.</p>
    </div>
  </article>
}

function LegalHeading({ children }: { children: React.ReactNode }) { return <h2 className="pt-4 font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">{children}</h2> }
