import { MapPin, Navigation, Images, Landmark, School, BadgeCheck, CalendarDays, Languages, Hash } from 'lucide-react';
import { Reveal, SectionHeading } from './Motion';
import { school, mapLinks } from '../data';

const details = [
  { icon: MapPin, label: 'Address', value: school.address },
  { icon: Hash, label: 'Plus Code', value: school.plusCode },
  { icon: Landmark, label: 'Management', value: school.management },
  { icon: School, label: 'Classes', value: `${school.classes} · ${school.type}` },
  { icon: Languages, label: 'Medium', value: school.medium },
  { icon: CalendarDays, label: 'Session', value: school.session },
  { icon: BadgeCheck, label: 'UDISE Code', value: school.udise },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_100%,#0e2a41_0%,#07192a_60%,#04101b_100%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-[110px]" />

      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Visit us"
          title={
            <>
              Find Ganesh Das High School in <span className="text-gradient">Kanchan Nagar</span>.
            </>
          }
          subtitle="In the heart of Sualkuchi, minutes from the town’s silk weaving lanes — an all-weather road leads right to our gate."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <ul className="space-y-3.5">
                {details.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                        {d.label}
                      </span>
                      <span className="mt-0.5 block break-words text-sm font-semibold text-white">
                        {d.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={mapLinks.directions} target="_blank" rel="noreferrer" className="btn-primary">
                  <Navigation className="h-5 w-5" />
                  Get directions
                </a>
                <a href={mapLinks.photos} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Images className="h-5 w-5" />
                  Photos on Maps
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white p-2.5 shadow-2xl">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                  <span className="h-2 w-2 rounded-full bg-gold-500" />
                  Google Maps
                </span>
                <a
                  href={mapLinks.place}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-gold-700 hover:text-gold-800"
                >
                  Open full listing →
                </a>
              </div>
              <div className="relative h-[24rem] overflow-hidden rounded-2xl bg-ink-100 sm:h-[27rem]">
                <iframe
                  title="Ganesh Das High School on Google Maps"
                  src={mapLinks.embed}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
