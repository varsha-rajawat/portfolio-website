/**
 * App.jsx — Root component
 *
 * Includes:
 *  - CustomCursor  : glowing orb that follows the mouse (desktop)
 *  - FloatingTerminal : Easter egg ">_" terminal in bottom-right corner
 *  - All page sections in order
 */

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import About            from './components/About'
import Experience       from './components/Experience'
import Skills           from './components/Skills'
import Projects         from './components/Projects'
import Education        from './components/Education'
import Contact          from './components/Contact'
import Footer           from './components/Footer'
import FloatingTerminal from './components/FloatingTerminal'

/* ── Glowing cursor orb ── */
function CustomCursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x  = useSpring(mx, { stiffness: 500, damping: 30 })
  const y  = useSpring(my, { stiffness: 500, damping: 30 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX - 8); my.set(e.clientY - 8) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      style={{
        x, y,
        background: 'radial-gradient(circle, #00d4ff, #8b5cf6)',
        boxShadow: '0 0 12px #00d4ff, 0 0 28px #00d4ff55',
      }}
    />
  )
}

/* ── Main App ── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#060610] text-slate-100 overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Easter egg — always visible in corner */}
      <FloatingTerminal />
    </div>
  )
}
