import { Star, Quote, ExternalLink } from 'lucide-react';
import { reviews, clinic, mapsLink } from '../data';
import { Reveal, SectionHeading } from './Motion';

const breakdown = [
  { stars: 5, count: 3 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-ink-50/60 py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Patient Reviews"
          title={
            <>
              Loved by the <span className="text-gradient">Sualkuchi community</span>
            </>
          }
          subtitle="Real feedback from real patients on Google. Your comfort and confidence is the review we care about most."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[340px_1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
              <span className="font-display text-6xl font-extrabold leading-none text-ink-950">
                {clinic.rating.toFixed(1)}
              </span>
              <span className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-aqua-400 text-aqua-400" />
                ))}
              </span>
              <span className="mt-2 text-sm font-semibold text-ink-500">
                Based on {clinic.reviewCount} Google reviews
              </span>

              <div className="mt-6 space-y-2.5">
                {breakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-semibold text-ink-500">{row.stars}★</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-aqua-400 to-ink-600"
                        style={{
                          width: `${clinic.reviewCount ? (row.count / clinic.reviewCount) * 100 : 0}%`,
                        }}
                      />
                    </span>
                    <span className="w-4 text-right text-xs text-ink-400">{row.count}</span>
                  </div>
                ))}
              </div>

              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-auto pt-3 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                See us on Google
              </a>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(7,25,42,0.8)]">
                  <Quote className="h-7 w-7 text-aqua-300" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                    {r.text ? `“${r.text}”` : <span className="text-ink-400 italic">Rating only — no comment left.</span>}
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-aqua-400 to-ink-600 font-display text-sm font-bold text-white">
                      {r.name.charAt(0)}
                    </span>
                    <figcaption className="leading-tight">
                      <span className="block text-sm font-bold text-ink-950">{r.name}</span>
                      <span className="block text-xs text-ink-400">
                        {r.meta} · {r.when}
                      </span>
                    </figcaption>
                    <span className="ml-auto flex gap-0.5">
                      {Array.from({ length: r.stars }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-aqua-400 text-aqua-400" />
                      ))}
                    </span>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
