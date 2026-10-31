import { BadgeCheck, Quote } from 'lucide-react';
import { Reveal, SectionHeading, Tilt } from './Motion';
import { school, aboutPoints, coverPhoto, streetViewPhoto } from '../data';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-gold-100 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-ink-100 blur-[110px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="About the school"
          title={
            <>
              Seven decades of learning on the banks of the{' '}
              <span className="text-gradient">Brahmaputra</span>.
            </>
          }
          subtitle={`Ganesh Das High School is a government, co-educational high school in Kanchan Nagar, Sualkuchi — recognised by UDISE code ${school.udise} and managed by the Department of Education, Assam.`}
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <Tilt className="relative overflow-hidden rounded-3xl shadow-soft">
              <img
                src={coverPhoto}
                alt="Ganesh Das High School, Kanchan Nagar, Sualkuchi — photo from Google Maps"
                className="h-[26rem] w-full object-cover sm:h-[30rem]"
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.dataset.fallback !== 'street') {
                    el.dataset.fallback = 'street';
                    el.src = streetViewPhoto;
                  } else {
                    el.dataset.fallback = 'crest';
                    el.src = '/crest.svg';
                    el.className =
                      'h-[26rem] w-full bg-ink-950 object-contain p-16 sm:h-[30rem]';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />

              <div className="absolute left-5 top-5 rounded-2xl border border-white/20 bg-ink-950/70 px-4 py-3 text-white backdrop-blur">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                  Established
                </div>
                <div className="font-display text-2xl font-extrabold">{school.founded}</div>
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <Quote className="h-5 w-5 shrink-0 text-gold-300" />
                  <p className="text-sm font-medium leading-relaxed text-white">
                    From the weaving lanes of Sualkuchi to classrooms full of curiosity — a school
                    that has stood with its community since {school.founded}.
                  </p>
                </div>
              </div>
            </Tilt>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-ink-700">
                Sualkuchi — the silk town of Assam — has always valued hard work and craft. Our school
                carries that spirit into education: steady teaching, close supervision and a friendly
                campus where children from Kanchan Nagar and neighbouring villages learn together.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed text-ink-600">
                With {school.type.toLowerCase()} classes from VI to X, an Assamese medium of instruction
                and a team of 21 dedicated teachers, we prepare students for the Assam State Board
                examinations — and for life beyond them.
              </p>
            </Reveal>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              {aboutPoints.map((p, i) => (
                <Reveal key={p.title} delay={0.2 + i * 0.08}>
                  <Tilt intensity={7} className="h-full">
                    <div className="h-full rounded-2xl border border-ink-100 bg-ink-50/70 p-5 transition-colors hover:border-gold-300">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
                        <BadgeCheck className="h-5 w-5" />
                      </span>
                      <h3 className="mt-3 text-base font-bold text-ink-950">{p.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{p.text}</p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  school.management,
                  school.type,
                  school.medium + ' medium',
                  school.board,
                  school.session + ' session',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
