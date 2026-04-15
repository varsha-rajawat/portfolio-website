/**
 * Skills.jsx — Four dimension cards (added Frontend).
 *
 * Grid: 1 col mobile → 2 cols tablet → 4 cols desktop
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DIMENSIONS = [
  {
    icon:  '⚡',
    title: 'Backend systems that stay fast',
    color: '#00d4ff',
    body:  "Distributed architecture, REST APIs, event-driven pipelines. I care about how a system behaves at 4,000 requests per second — not just when it's happy.",
    tags:  ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis'],
  },
  {
    icon:  '🖥️',
    title: 'Frontend — enough to own the whole thing',
    color: '#ec4899',
    body:  "JavaScript, HTML/CSS, and React (and growing). I built this site. I can own a feature end-to-end without needing a handoff at the API boundary.",
    tags:  ['JavaScript', 'React', 'HTML / CSS'],
  },
  {
    icon:  '☁️',
    title: 'Infrastructure I can reason about',
    color: '#8b5cf6',
    body:  "Code that isn't deployed is just a local experiment. I'm comfortable with containers, CI/CD pipelines, and cloud environments — shipping is part of the craft.",
    tags:  ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'PostgreSQL'],
  },
  {
    icon:  '🧪',
    title: 'Quality as a default, not an afterthought',
    color: '#10b981',
    body:  "I don't write tests because someone asked me to. I write them because the alternative is debugging production at 3am. Test coverage has gone up in every team I've been part of.",
    tags:  ['JUnit 5', 'Testcontainers', 'TDD', 'Mockito'],
  },
]

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">03.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">How I Work</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
        </motion.div>

        {/* 1 col → 2 col → 4 col */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {DIMENSIONS.map((d, i) => (
            <motion.div
              key={i}
              className="card-glow rounded-xl p-5 flex flex-col"
              style={{ borderColor: `${d.color}22` }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5, borderColor: `${d.color}55`, transition: { duration: 0.2 } }}
            >
              <div className="h-[2px] w-10 rounded-full mb-5" style={{ background: d.color }} />
              <span className="text-2xl mb-3">{d.icon}</span>
              <h3 className="text-sm font-bold mb-3 leading-snug" style={{ color: d.color }}>
                {d.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">
                {d.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {d.tags.map((tag, ti) => (
                  <motion.span
                    key={ti}
                    className="px-2 py-0.5 text-[11px] font-mono rounded text-slate-400 cursor-default"
                    style={{ background: `${d.color}0d`, border: `1px solid ${d.color}22` }}
                    whileHover={{ background: `${d.color}1a`, border: `1px solid ${d.color}55`, color: '#f1f5f9', transition: { duration: 0.12 } }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-slate-600 text-sm font-mono mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          // more tools in the toolbox — ask me about them →{' '}
          <a href="#contact" className="text-cyber-cyan hover:underline">let's talk</a>
        </motion.p>
      </div>
    </section>
  )
}
