/**
 * About.jsx — Short, human, story-driven. Fully responsive.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">01.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">About Me</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Story ── */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="text-xl sm:text-2xl font-semibold text-slate-100 leading-snug mb-5 sm:mb-6">
              I started with one question:{' '}
              <span className="text-gradient italic">"why does this keep breaking?"</span>
            </p>

            <p className="text-slate-400 leading-relaxed text-base mb-4 sm:mb-5">
              That question became a career. Three years across fintech platforms,
              SaaS startups, and enterprise software — I've been the person who
              digs in when a system struggles under pressure and doesn't come up
              for air until it doesn't anymore.
            </p>

            <p className="text-slate-400 leading-relaxed mb-4 sm:mb-5">
              I moved to Canada chasing bigger problems to solve. Still chasing.
            </p>

            <p className="text-slate-500 leading-relaxed text-sm italic border-l-2 border-cyber-purple/40 pl-4">
              Currently finishing a postgrad at Lambton College while actively
              looking for the team I'll pour that energy into next.
            </p>
          </motion.div>

          {/* ── Right: Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="space-y-4"
          >
            <div className="card-glow rounded-xl p-5 sm:p-6 space-y-4">
              <p className="font-mono text-cyber-cyan text-xs tracking-widest">// three things to know</p>

              {[
                {
                  num: '01',
                  heading: 'I take debugging personally.',
                  body: "If a system fails under load, that's not bad luck — that's a missed conversation between the code and its environment. I find those.",
                },
                {
                  num: '02',
                  heading: 'I care about the build, not the credit.',
                  body: "I'd rather write the unglamorous piece that makes everything else fast than own the feature no one ever uses.",
                },
                {
                  num: '03',
                  heading: "I'm still curious.",
                  body: "3+ years in and I still get excited when something works in a way I didn't expect. That hasn't changed.",
                },
              ].map((item) => (
                <motion.div
                  key={item.num}
                  className="flex gap-4"
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                >
                  <span className="font-mono text-cyber-cyan/40 text-xs pt-1 shrink-0">{item.num}</span>
                  <div>
                    <p className="text-slate-200 text-sm font-semibold mb-0.5">{item.heading}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1e1e3a] bg-[#0d0d1f]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-green" />
              </span>
              <p className="text-xs text-slate-500 font-mono">
                Open to opportunities in Canada — let's talk.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
