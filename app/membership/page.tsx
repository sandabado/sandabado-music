import { MembershipCheckoutButton, ManageMembershipButton } from "@/components/billing/membership-actions"
import { InternalHero, InternalPage, InternalPanel } from "@/components/internal-page"

export default function MembershipPage() {
  return <InternalPage solid="dodecahedron" color="109,74,255">
    <InternalHero eyebrow="Whole Body Library" title="Keep the signal close.">Membership gives you ongoing access to the Whole Body digital library as new volumes are published.</InternalHero>
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <InternalPanel className="border-[var(--halo)]/35 bg-[var(--carbon)] text-center"><p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.2em] text-[var(--halo-dim)]">Monthly</p><p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--halo)]">$11</p><p className="mt-1 text-sm text-[var(--ghost)]">per month</p><MembershipCheckoutButton interval="monthly" className="mt-8 w-full bg-[var(--halo)] px-5 py-4 font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:bg-[#e3c257]">Join monthly →</MembershipCheckoutButton></InternalPanel>
        <InternalPanel className="border-[var(--halo)] bg-[var(--halo)]/10 text-center shadow-[0_0_30px_rgba(201,162,39,.12)]"><p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[.2em] text-[var(--halo)]">Annual</p><p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--halo)]">$111</p><p className="mt-1 text-sm text-[var(--ghost)]">per year</p><MembershipCheckoutButton interval="annual" className="mt-8 w-full bg-[var(--halo)] px-5 py-4 font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:bg-[#e3c257]">Join annually →</MembershipCheckoutButton></InternalPanel>
      </div>
      <div className="mx-auto mt-10 max-w-3xl text-center"><p className="text-sm leading-6 text-[var(--ghost)]">Manage or cancel your membership any time through the secure Stripe billing portal.</p><ManageMembershipButton /></div>
    </section>
  </InternalPage>
}
