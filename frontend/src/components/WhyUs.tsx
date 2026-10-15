import {
  HeartHandshake,
  ShieldCheck,
  Cpu,
  Wallet,
  Users,
  Clock,
  Check,
} from 'lucide-react';
import { Reveal, SectionHeading, Tilt } from './Motion';
import { clinic } from '../data';

const features = [
  {
    icon: HeartHandshake,
    title: 'Painless, gentle care',
    text: 'Modern anaesthesia and a calm approach make every visit comfortable — even for nervous patients.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict sterilisation',
    text: 'Autoclaved instruments and single-use disposables for every patient, every time.',
  },
  {
    icon: Cpu,
    title: 'Modern equipment',
    text: 'Digital diagnosis and precise, minimally invasive treatment for better long-term results.',
  },
  {
    icon: Wallet,
    title: 'Affordable & transparent',
    text: 'Clear pricing shared before treatment begins. No surprises, no hidden costs.',
  },
  {
    icon: Users,
    title: 'Family & kid friendly',
    text: 'A welcoming space for every age — from a child’s first check-up to complete family care.',
  },
  {
    icon: Clock,
    title: 'Open 6 days a week',
    text: `${clinic.hours}. Convenient appointments for the whole Sualkuchi community.`,
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_15%_10%,#123f5d_0%,#0a2438_45%,#07192a_100%)]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-aqua-500/15 blur-[130px]" />

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              center={false}
              eyebrow="Why Smile Care"
              title={
                <>
                  Dentistry that feels <span className="text-gradient">calm and honest</span>
                </>
              }
              subtitle="We built Smile Care around a simple belief: quality dental care should be comfortable, transparent and available close to home."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-aqua-300/40 hover:bg-white/[0.07]">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-aqua-400/15 text-aqua-300 ring-1 ring-aqua-300/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-200/75">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <Tilt intensity={8} className="mx-auto max-w-md">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-8 shadow-soft backdrop-blur">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aqua-400/20 blur-2xl" />
                <span className="inline-flex items-center gap-2 rounded-full bg-aqua-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-aqua-200 ring-1 ring-aqua-300/30">
                  Visit with confidence
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-white">
                  Everything you need for a healthier smile
                </h3>
                <ul className="mt-6 space-y-3">
                  {[
                    'Free initial consultation & oral check-up',
                    'Personalised treatment plan and cost estimate',
                    'Follow-up reminders after every procedure',
                    'Care for the whole family in one visit',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-100/90">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-400/20 text-mint-300">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#booking" className="btn-primary mt-8 w-full">
                  Reserve a slot
                </a>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
