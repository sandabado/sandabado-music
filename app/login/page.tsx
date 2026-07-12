import { InternalHero, InternalPage } from "@/components/internal-page"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() { return <InternalPage solid="dodecahedron"><InternalHero eyebrow="Member Area" title="Enter the constellation.">Your readings, manuals, gatherings, and saved practices live here.</InternalHero><section className="px-6 py-14 sm:py-20"><div className="mx-auto max-w-md"><LoginForm /></div></section></InternalPage> }
