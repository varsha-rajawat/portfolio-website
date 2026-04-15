/**
 * Experience.jsx — Click to expand bullets. Fully responsive.
 * Mobile: full-width cards, no timeline line, reduced padding.
 * Desktop: timeline with glowing dots.
 */

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const JOBS = [
  {
    role:    'Software Engineer, Co-op',
    company: 'BaseNought Inc.',
    detail:  'Early-stage SaaS startup · Canada',
    period:  'May 2025 – Aug 2025',
    color:   '#00d4ff',
    bullets: [
      'Pushed API throughput from 3,200 to <b>4,000 req/sec</b> through a targeted refactor',
      'Cut database load by <b>30%</b> — no new hardware, just smarter queries and caching',
      'Took test coverage from <b>61% to 87%</b> because "works on my machine" isn\'t a deployment strategy',
    ],
  },
  {
    role:    'Software Engineer',
    company: 'Meganexus Pvt Ltd',
    detail:  'UK-headquartered fintech · Distributed team',
    period:  'Mar 2022 – Dec 2023',
    color:   '#8b5cf6',
    bullets: [
      'Doubled event-processing throughput on a pipeline that couldn\'t afford to miss a message',
      'Slashed release time by <b>40%</b> through CI/CD automation — nobody was sad about that',
      'Maintained a high-volume REST API suite that external clients depended on daily',
    ],
  },
  {
    role:    'Software Developer',
    company: 'Tata Consultancy Services (TCS)',
    detail:  'Global IT services · Enterprise modernisation',
    period:  'Nov 2020 – Mar 2022',
    color:   '#10b981',
    bullets: [
      'Broke a legacy monolith into <b>8 microservices</b> without breaking what was running in production',
      'Improved SQL performance by <b>30%</b> — the kind of win that makes the whole team feel it',
      'Grew regression coverage from <b>52% to 79%</b> before I touched a new line of feature code',
    ],
  },
]

function Chevron({ open, color }) {
  return (
    <motion.svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke={open ? color : '#475569'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      className="shrink-0"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  )
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState(new Set())

  const toggle = (i) =>
    setOpen(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <section id="experience" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6 bg-[#080814]">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">02.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">Experience</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
          <p className="text-slate-600 text-xs font-mono mt-3">// click a role to expand</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line — desktop only */}
          <div
            className="absolute left-[9px] top-4 bottom-8 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #00d4ff, #8b5cf6, #10b981, transparent)' }}
          />

          <div className="space-y-4 sm:space-y-5">
            {JOBS.map((job, i) => {
              const isOpen = open.has(i)
              return (
                <motion.div
                  key={i}
                  className="relative md:pl-12"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.14 }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-5 w-[19px] h-[19px] rounded-full border-2 hidden md:flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: job.color,
                      background: '#060610',
                      boxShadow: isOpen ? `0 0 18px ${job.color}88` : `0 0 8px ${job.color}33`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ background: job.color, opacity: isOpen ? 1 : 0.5 }} />
                  </div>

                  {/* Card */}
                  <motion.div
                    className="card-glow rounded-xl overflow-hidden cursor-pointer select-none"
                    style={{ borderColor: isOpen ? `${job.color}44` : `${job.color}18` }}
                    whileHover={{ borderColor: `${job.color}55` }}
                    onClick={() => toggle(i)}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-tight">
                          {job.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                          <span className="font-semibold text-sm" style={{ color: job.color }}>{job.company}</span>
                          <span className="text-slate-600 text-xs hidden sm:inline">·</span>
                          <span className="text-slate-500 text-xs sm:text-sm hidden sm:inline">{job.detail}</span>
                        </div>
                        {/* Detail on its own line for mobile */}
                        <p className="text-slate-600 text-xs mt-0.5 sm:hidden">{job.detail}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs sm:text-sm text-slate-500 hidden xs:block">{job.period}</span>
                        <Chevron open={isOpen} color={job.color} />
                      </div>
                    </div>
                    {/* Period on very small screens */}
                    <div className="px-4 pb-2 xs:hidden">
                      <span className="font-mono text-xs text-slate-600">{job.period}</span>
                    </div>

                    {/* Expandable bullets */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="bullets"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="mx-4 sm:mx-6 mb-4 sm:mb-5 pt-4 border-t" style={{ borderColor: `${job.color}22` }}>
                            <ul className="space-y-2.5">
                              {job.bullets.map((b, bi) => (
                                <motion.li
                                  key={bi}
                                  className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed"
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: bi * 0.06 }}
                                >
                                  <span className="mt-1.5 shrink-0 text-[7px]" style={{ color: job.color }}>▶</span>
                                  <span dangerouslySetInnerHTML={{ __html: b }} />
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
