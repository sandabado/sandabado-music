import { EventCalendar } from "@/components/event-calendar"
import { InternalHero, InternalPage } from "@/components/internal-page"

export default function EventsPage() { return <InternalPage solid="tetrahedron" color="194,84,45"><InternalHero eyebrow="Gatherings & Workshops" title="The calendar">Monthly gatherings, focused workshops, and opportunities to practice your pillar in company.</InternalHero><section className="px-6 py-14 sm:py-20"><div className="mx-auto max-w-4xl"><EventCalendar /></div></section></InternalPage> }
