export default function PrivacyPage() {
  return <article className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
    <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--halo)] glow-halo">Privacy Policy</h1>
    <div className="mt-8 space-y-4 leading-7 text-[var(--ghost)]">
      <p><strong className="text-[var(--bone)]">Last updated:</strong> January 2026</p>
      <p>At wholebody.earth, we respect your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
      <LegalHeading>Data Collection</LegalHeading>
      <p>We collect:</p><ul className="list-inside list-disc space-y-2 pl-4"><li>Birth data for readings: date, time, and place</li><li>User account information: email and name</li><li>Purchase history, including orders and event RSVPs</li></ul>
      <LegalHeading>Data Protection</LegalHeading>
      <p>This site does not track you. We do not sell your data. We protect it using zero-access encryption.</p>
      <LegalHeading>Third Parties</LegalHeading>
      <p>We use:</p><ul className="list-inside list-disc space-y-2 pl-4"><li>Supabase for authentication and database services</li><li>Stripe for payments</li><li>Swiss Ephemeris API for birth chart calculations</li></ul>
      <LegalHeading>Contact</LegalHeading><p>Email: <a className="text-[var(--halo)] hover:underline" href="mailto:hello@wholebody.earth">hello@wholebody.earth</a></p>
    </div>
  </article>
}

function LegalHeading({ children }: { children: React.ReactNode }) { return <h2 className="pt-4 font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">{children}</h2> }
