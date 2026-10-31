import { motion } from 'framer-motion';
import { ArrowRight, CalendarRange, Languages, Repeat2, Users } from 'lucide-react';
import { Reveal, SectionHeading, Tilt } from './Motion';
import { journey, subjects, school } from '../data';

const facts = [
  { icon: Languages, label: 'Medium', value: 'Assamese' },
  { icon: CalendarRange, label: 'Session', value: 'April – March' },
  { icon: Users, label: 'Type', value: 'Co-educational' },
  { icon: Repeat2, label: 'Board', value: 'SEBA · Class X' },
];

export default function Academics() {
  return (
    <section id="academics" className="relative overflow-hidden bg-ink-50 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Academics"
          title={
            <>
              A clear path from <span className="text-gradient">Class VI</span> to the boards.
            </>
          }
          subtitle="Two focused stages, one goal — every student of Ganesh Das High School reaches the Class X State Board examinations confident and prepared, taught by our team of 21 teachers."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {journey.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.12}>
              <Tilt intensity={6} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow hover:shadow-glow">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gold-100 blur-2xl transition-all group-hover:scale-150" />

                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-ink-950 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                      {j.stage}
                    </span>
                    <span className="text-sm font-bold text-ink-500">{j.classes}</span>
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-ink-950">{j.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{j.text}</p>

                  <ul className="mt-5 space-y-2.5">
                    {j.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-ink-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gold-700">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    {i === 0 ? 'Continues to Class IX' : 'Leads to Class XI'}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white px-5 py-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
                <f.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
                  {f.label}
                </span>
                <span className="block text-sm font-bold text-ink-900">{f.value}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 rounded-3xl border border-ink-100 bg-white p-7 shadow-soft sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-ink-950">
                  Subjects taught across classes VI – X
                </h3>
                <p className="mt-1.5 text-sm text-ink-600">
                  Following the Assam State Board curriculum in the Assamese medium, with English taught
                  as a second language from Class VI.
                </p>
              </div>
              <span className="rounded-full bg-gold-50 px-4 py-2 text-xs font-bold text-gold-700 ring-1 ring-gold-200">
                {school.board}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {subjects.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-gold-400 hover:bg-gold-50 hover:text-gold-800"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
