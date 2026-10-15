import {
  Stethoscope,
  Sparkles,
  Smile,
  Activity,
  Syringe,
  Crown,
  Scissors,
  Braces,
  Anchor,
  Baby,
  ArrowUpRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services } from '../data';
import { Reveal, SectionHeading, Tilt } from './Motion';

const iconMap: Record<string, LucideIcon> = {
  checkup: Stethoscope,
  cleaning: Sparkles,
  whitening: Smile,
  rct: Activity,
  filling: Syringe,
  crown: Crown,
  extraction: Scissors,
  braces: Braces,
  implant: Anchor,
  kids: Baby,
};

export function selectTreatment(id: string) {
  window.dispatchEvent(new CustomEvent('select-treatment', { detail: id }));
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Services() {
  return (
    <section id="services" className="relative bg-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink-50 to-transparent" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Treatments"
          title={
            <>
              Complete dental care under <span className="text-gradient">one gentle roof</span>
            </>
          }
          subtitle="From routine check-ups to advanced restorative and cosmetic dentistry — every treatment is delivered with modern equipment and a calm, reassuring touch."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.id] ?? Stethoscope;
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.08}>
                <Tilt className="h-full">
                  <button
                    onClick={() => selectTreatment(s.id)}
                    className="group relative flex h-full w-full flex-col items-start overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 text-left shadow-[0_20px_50px_-35px_rgba(7,25,42,0.6)] transition-shadow hover:shadow-glow"
                  >
                    <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-aqua-100/60 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950 text-aqua-300 shadow-inner transition-transform duration-500 group-hover:-translate-y-1">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="relative mt-6 font-display text-lg font-bold text-ink-950">
                      {s.title}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                      {s.blurb}
                    </p>
                    <span className="relative mt-6 flex w-full items-center justify-between border-t border-ink-100 pt-4">
                      <span className="text-xs font-semibold text-ink-500">
                        {s.duration} · <span className="text-aqua-600">{s.price}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink-800">
                        Book
                        <ArrowUpRight className="h-4 w-4 text-aqua-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </button>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
