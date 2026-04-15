/**
 * Education.jsx — Fully responsive.
 * Mobile: single column, reduced padding.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DEGREES = [
  {
    degree:   'Postgraduate Certificate',
    field:    'Full Stack Software Development',
    school:   'Lambton College',
    location: 'Ontario, Canada',
    period:   'Jan 2024 – Sep 2025',
    gpa:      '3.81 / 4.0',
    flag:     '🇨🇦',
    color:    '#00d4ff',
    courses:  ['Cloud Architecture', 'Distributed Systems', 'DevOps', 'Secure Software Dev'],
    note:     'Canadian institution — local academic credential',
  },
  {
    degree:   'Bachelor of Computer Applications',
    field:    'Computer Science',
    school:   'Lachoo Memorial College',
    location: 'India · WES evaluation available',
    period:   'May 2017 – Nov 2020',
    gpa:      '3.70 / 4.0',
    flag:     '🇮🇳',
    color:    '#8b5cf6',
    courses:  ['Data Structures', 'Algorithms', 'Database Management', 'Software Engineering'],
    note:     'WES credential evaluation available on request',
  },
]

// const CERTS = [
//   { label: 'AWS Solutions Architect – Associate', status: 'In progress', color: '#f59e0b' },
// ]

export default function Education() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">05.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">Education</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {DEGREES.map((d, i) => (
            <motion.div
              key={i}
              className="card-glow rounded-xl p-5 sm:p-6"
              style={{ borderColor: `${d.color}33` }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.14 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{d.flag}</span>
                <span className="font-mono text-lg sm:text-xl font-bold cyan-glow" style={{ color: d.color }}>
                  {d.gpa}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-0.5">{d.degree}</h3>
              <p className="text-sm text-slate-400 mb-1">{d.field}</p>
              <p className="font-semibold text-sm mb-0.5" style={{ color: d.color }}>{d.school}</p>
              <p className="text-xs text-slate-500 mb-4">{d.location} · {d.period}</p>

              <div>
                <p className="font-mono text-xs text-slate-600 mb-2">// relevant coursework</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.courses.map((c, ci) => (
                    <span
                      key={ci}
                      className="px-2 sm:px-2.5 py-0.5 text-[11px] font-mono rounded"
                      style={{ background: `${d.color}10`, color: `${d.color}99`, border: `1px solid ${d.color}22` }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-600 italic">{d.note}</p>
            </motion.div>
          ))}
        </div>

        {/* {CERTS.length > 0 && (
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p className="font-mono text-xs text-slate-600 mb-3">// certifications</p>
            <div className="flex flex-wrap gap-3">
              {CERTS.map((cert, ci) => (
                <div
                  key={ci}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm"
                  style={{ background: `${cert.color}0d`, borderColor: `${cert.color}30`, color: '#94a3b8' }}
                >
                  <span className="text-base">🏅</span>
                  <span className="text-xs sm:text-sm">{cert.label}</span>
                  <span
                    className="ml-1 px-1.5 py-0.5 text-[10px] font-mono rounded"
                    style={{ background: `${cert.color}20`, color: cert.color }}
                  >
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  )
}
