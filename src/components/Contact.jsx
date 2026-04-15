/**
 * Contact.jsx
 *
 * Two-column layout:
 *  Left  — copy + social links + availability badge
 *  Right — contact form (powered by Formspree, free & no backend needed)
 *
 * ── HOW TO ACTIVATE THE FORM ──
 * 1. Go to https://formspree.io and sign up (free)
 * 2. Click "New Form" → name it "Portfolio Contact"
 * 3. Copy your form ID (looks like: xpwzgkrb)
 * 4. Replace YOUR_FORMSPREE_ID below with that ID
 * 5. Every submission lands in your Gmail inbox automatically
 *
 * ── ALSO UPDATE ──
 * Replace YOUR_HANDLE and YOUR_USERNAME with real LinkedIn / GitHub URLs.
 */

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'

// ← Replace this with your Formspree form ID
const FORMSPREE_ID = 'xbdqdlwe'

const LINKS = [
  {
    Icon:  Mail,
    label: 'Email',
    value: 'varsharajawat04@gmail.com',
    href:  'mailto:varsharajawat04@gmail.com',
    color: '#00d4ff',
  },
  {
    Icon:  Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/varsharajawat04',
    href:  'https://www.linkedin.com/in/varsharajawat04/',
    color: '#8b5cf6',
  },
  {
    Icon:  Github,
    label: 'GitHub',
    value: 'github.com/varsha-rajawat',
    href:  'https://github.com/varsha-rajawat',
    color: '#10b981',
  },
]

/* ── Input field component ── */
function Field({ label, id, type = 'text', value, onChange, placeholder, multiline }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-slate-500 uppercase tracking-widest">
        {label}
      </label>
      <Tag
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
        required
        className="bg-[#0d0d1f] border border-[#1e1e3a] rounded-lg px-4 py-3
                   text-sm text-slate-200 placeholder:text-slate-700
                   outline-none transition-all duration-200 resize-none font-sans
                   focus:border-cyber-cyan/60 focus:shadow-[0_0_0_3px_#00d4ff12]
                   hover:border-[#2a2a4a]"
      />
    </div>
  )
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-[#080814]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">06.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">Let's Talk</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Left: copy + links ── */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-slate-400 text-lg leading-relaxed mb-3">
              If you're building something meaningful and need someone
              who can own backend systems end-to-end —
            </p>
            <p className="text-slate-200 text-xl font-semibold mb-10">
              let's grab coffee ☕
            </p>

            {/* Social links */}
            <div className="flex flex-col gap-3 mb-10">
              {LINKS.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border
                             transition-all duration-200 group w-fit"
                  style={{ background: `${link.color}08`, borderColor: `${link.color}2a` }}
                  whileHover={{ x: 4, borderColor: link.color, boxShadow: `0 0 18px ${link.color}2a` }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <link.Icon
                    size={18}
                    className="shrink-0 transition-colors"
                    style={{ color: link.color }}
                  />
                  <div>
                    <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wide">{link.label}</div>
                    <div className="text-sm text-slate-300 group-hover:text-white transition-colors">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e1e3a] bg-[#0d0d1f]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-green" />
              </span>
              <span className="font-mono text-xs text-slate-500">🇨🇦 Canada · Open to opportunities</span>
            </motion.div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card-glow rounded-2xl p-7">
              <p className="font-mono text-cyber-cyan text-xs tracking-widest mb-6">// send a message</p>

              <AnimatePresence mode="wait">

                {/* Success state */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-4xl">🎉</div>
                    <p className="text-slate-200 font-semibold text-lg">Message sent!</p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs font-mono text-cyber-cyan hover:underline"
                    >
                      send another →
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Name"
                        id="name"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your name"
                      />
                      <Field
                        label="Email"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@company.com"
                      />
                    </div>

                    <Field
                      label="Message"
                      id="message"
                      multiline
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell me about the role / project…"
                    />

                    {/* Error */}
                    {status === 'error' && (
                      <p className="text-xs text-red-400 font-mono">
                        ⚠ Something went wrong. Try emailing directly instead.
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="mt-1 w-full py-3 rounded-lg font-semibold text-sm
                                 bg-cyber-cyan text-[#060610] disabled:opacity-60
                                 disabled:cursor-not-allowed transition-opacity"
                      whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 22px #00d4ff66' } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                    >
                      {status === 'sending' ? (
                        <span className="font-mono tracking-widest text-xs animate-pulse">
                          sending…
                        </span>
                      ) : (
                        'Send Message →'
                      )}
                    </motion.button>

                    <p className="text-[11px] text-slate-700 font-mono text-center">
                      powered by Formspree · no spam, ever
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
