import { Reveal } from './Motion';
import { Star, Stethoscope, CalendarDays, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Star, value: '5.0', label: 'Google rating' },
  { icon: Stethoscope, value: '10+', label: 'Dental treatments' },
  { icon: CalendarDays, value: 'Mon–Sat', label: 'Open 9am – 7pm' },
  { icon: ShieldCheck, value: '100%', label: 'Sterile protocols' },
];

export default function Stats() {
  return (
    <section className="relative z-20 -mt-14 pb-4">
      <div className="container-x">
        <Reveal>
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl shadow-soft md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 bg-white/60 px-6 py-7 ${
                  i !== 0 ? 'md:border-l md:border-ink-100/70' : ''
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-aqua-400 to-ink-600 text-white shadow-[0_10px_24px_-12px_rgba(34,211,238,0.9)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-xl font-extrabold text-ink-950">
                    {value}
                  </span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500">
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
