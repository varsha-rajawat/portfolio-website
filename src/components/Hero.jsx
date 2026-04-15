/**
 * Hero.jsx — Fully responsive.
 * Mobile: stacked single column, scaled-down text, smaller gaps.
 * Tablet+: 2-column grid with terminal on right.
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Varsha Rajawat  —  Software Engineer' },
  { type: 'cmd', text: 'cat location.txt' },
  { type: 'out', text: '📍 Canada 🇨🇦  — open to opportunities' },
  { type: 'cmd', text: 'cat stats.json' },
  { type: 'out', text: '{' },
  { type: 'out', text: '  "experience"    : "3+ years",' },
  { type: 'out', text: '  "throughput"    : "+25% (→ 4,000 req/sec)",' },
  { type: 'out', text: '  "release_speed" : "40% faster",' },
  { type: 'out', text: '  "philosophy"    : "if it breaks at 3am, it was my fault"' },
  { type: 'out', text: '}' },
]

const STATS = [
  { end: 3,    suffix: '+', label: 'Years Experience' },
  { end: 25,   suffix: '%', label: 'Throughput Gained' },
  { end: 40,   suffix: '%', label: 'Faster Releases' },
  { end: 4000, suffix: '',  label: 'req/sec Peak' },
]

function Counter({ end, suffix, label, delay, run }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    const duration = 1600
    let startTs = null
    const step = (ts) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 4)) * end))
      if (p < 1) requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), delay * 1000)
    return () => clearTimeout(t)
  }, [run, end, delay])
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold font-mono text-cyber-cyan cyan-glow tabular-nums">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-1 leading-tight">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [lines,      setLines]      = useState([])
  const [lineIdx,    setLineIdx]    = useState(0)
  const [charIdx,    setCharIdx]    = useState(0)
  const [typing,     setTyping]     = useState(true)
  const [statsReady, setStatsReady] = useState(false)

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      setTyping(false)
      setTimeout(() => setStatsReady(true), 400)
      return
    }
    const line  = LINES[lineIdx]
    const full  = line.text
    const speed = line.type === 'cmd' ? 55 : 14
    if (charIdx <= full.length) {
      const id = setTimeout(() => {
        setLines(prev => {
          const next = [...prev]
          if (charIdx === 0) next.push({ ...line, partial: '' })
          else next[next.length - 1] = { ...line, partial: full.slice(0, charIdx) }
          return next
        })
        setCharIdx(c => c + 1)
      }, speed)
      return () => clearTimeout(id)
    } else {
      const pause = line.type === 'cmd' ? 250 : 55
      const id    = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, pause)
      return () => clearTimeout(id)
    }
  }, [lineIdx, charIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-24 pb-16 grid-bg overflow-hidden"
    >
      {/* Ambient blobs — clipped so they don't overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full bg-cyber-cyan/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full bg-cyber-purple/[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ── Left: Intro ── */}
          <div>
            <motion.p
              className="font-mono text-cyber-cyan text-sm mb-3 sm:mb-4 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              &gt;&nbsp; Hello, world —
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans leading-[1.1] mb-3 sm:mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm{' '}
              <span className="text-gradient">Varsha</span>
              <br />
              <span className="text-slate-200">Rajawat</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-400 font-medium mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Software Engineer
            </motion.p>

            <motion.p
              className="text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build distributed systems that handle real load.
              Based in <span className="text-cyber-cyan font-medium">Canada</span>.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-cyber-cyan text-[#060610] font-semibold rounded text-sm"
                whileHover={{ scale: 1.05, boxShadow: '0 0 22px #00d4ff77' }}
                whileTap={{ scale: 0.96 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-5 sm:px-6 py-2.5 sm:py-3 border border-slate-600 text-slate-300 font-semibold rounded text-sm
                           hover:border-cyber-cyan hover:text-cyber-cyan transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: Terminal — hidden on small mobile, shown from md up ── */}
          <motion.div
            className="font-mono text-sm hidden md:block"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <div className="rounded-xl overflow-hidden border border-[#1e1e3a] shadow-[0_0_50px_#00d4ff0a]">
              <div className="bg-[#111127] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e3a]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-slate-500 text-xs select-none">varsha@backend:~</span>
              </div>
              <div className="bg-[#09091a] px-4 sm:px-5 py-4 sm:py-5 min-h-[280px] leading-relaxed">
                {lines.map((line, i) => (
                  <div key={i} className={line.type === 'cmd' ? 'text-cyber-green' : 'text-slate-300'}>
                    {line.type === 'cmd' && <span className="text-cyber-cyan select-none">$ </span>}
                    {line.partial}
                  </div>
                ))}
                {typing && (
                  <span className="inline-block w-[9px] h-[16px] bg-cyber-cyan animate-blink align-text-bottom" />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#1e1e3a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {STATS.map((s, i) => (
            <Counter key={i} {...s} delay={i * 0.12} run={statsReady} />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-6 sm:h-7 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  )
}
