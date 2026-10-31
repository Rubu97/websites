import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, CheckCircle2, ClipboardPen, AlertCircle } from 'lucide-react';
import { Reveal, SectionHeading } from './Motion';
import { admissionSteps, documents, classOptions } from '../data';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialForm = {
  studentName: '',
  guardianName: '',
  phone: '',
  classChoice: '',
  message: '',
};

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState<string[]>([]);

  const set = (key: keyof typeof initialForm) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');
    setFeedback([]);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState('error');
        setFeedback(Array.isArray(data.details) ? data.details : [data.error || 'Something went wrong.']);
        return;
      }
      setState('success');
      setForm(initialForm);
    } catch {
      setState('error');
      setFeedback(['Unable to reach the server. Please try again shortly.']);
    }
  }

  return (
    <section id="admissions" className="relative overflow-hidden bg-ink-50 py-24 sm:py-28">
      <div className="pointer-events-none absolute -left-32 bottom-16 h-96 w-96 rounded-full bg-gold-100 blur-[110px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Admissions"
          title={
            <>
              Begin your child’s journey with us — <span className="text-gradient">Class VI</span>.
            </>
          }
          subtitle="Admission enquiries for the April academic session are open. Follow four simple steps, or send an enquiry right here — our office will guide you from there."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {admissionSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-soft"
                >
                  <span className="font-display text-4xl font-extrabold text-gold-200">
                    {s.step}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-ink-950">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{s.text}</p>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-7">
                <h3 className="flex items-center gap-2.5 text-lg font-extrabold text-ink-950">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-950 text-gold-300">
                    <FileText className="h-4.5 w-4.5" />
                  </span>
                  Documents required
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {documents.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 rounded-xl bg-ink-50 px-3.5 py-2.5 text-[13px] font-medium text-ink-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-2xl">
              <div className="relative bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950 px-7 pb-6 pt-7 sm:px-8">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                  <ClipboardPen className="h-3.5 w-3.5" />
                  Admission enquiry form
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white">
                  Send us a few details
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-200/80">
                  Our office will review your enquiry and guide you through the next step. Fields
                  marked with * are required.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4 bg-white px-7 py-7 sm:px-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Student’s name *
                    </span>
                    <input
                      className="input"
                      required
                      minLength={2}
                      placeholder="Full name of the student"
                      value={form.studentName}
                      onChange={set('studentName')}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Guardian’s name *
                    </span>
                    <input
                      className="input"
                      required
                      minLength={2}
                      placeholder="Parent / guardian"
                      value={form.guardianName}
                      onChange={set('guardianName')}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Mobile number *
                    </span>
                    <input
                      className="input"
                      required
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+\-() ]{7,15}"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={set('phone')}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Class applying for *
                    </span>
                    <select
                      className="input appearance-none"
                      required
                      value={form.classChoice}
                      onChange={set('classChoice')}
                    >
                      <option value="" disabled>
                        Select a class
                      </option>
                      {classOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                    Message <span className="normal-case text-ink-300">(optional)</span>
                  </span>
                  <textarea
                    className="input min-h-24 resize-y"
                    placeholder="Previous school, village, or any question for the office…"
                    value={form.message}
                    onChange={set('message')}
                  />
                </label>

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <ClipboardPen className="h-5 w-5" />
                      Submit enquiry
                    </>
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {state === 'success' && (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      Thank you! Your enquiry has been recorded. The school office will contact you.
                    </motion.p>
                  )}
                  {state === 'error' && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {feedback.join(' ')}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="text-center text-[11px] leading-relaxed text-ink-400">
                  Enquiries are stored securely for the school office only. For anything urgent,
                  please visit the school in person.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
