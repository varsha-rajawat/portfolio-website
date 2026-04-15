/**
 * Navbar.jsx
 *
 * Features:
 *  - Fades in from top on load
 *  - Becomes a frosted-glass bar after 50px of scroll
 *  - Scroll-progress bar at the very bottom of the nav
 *  - Active-section underline that glides between links (layoutId)
 *  - "Hire Me" CTA button
 *  - Mobile hamburger menu
 */

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

const NAV_ITEMS = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [active, setActive]   = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]       = useState(false)
  const { scrollYProgress }   = useScroll()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Find which section is currently in view
      const reversed = [...NAV_ITEMS].reverse()
      for (const name of reversed) {
        const el = document.getElementById(name.toLowerCase())
        if (el && window.scrollY + 150 >= el.offsetTop) {
          setActive(name.toLowerCase())
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060610]/85 backdrop-blur-md border-b border-[#1e1e3a]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.button
          className="font-mono text-lg font-bold tracking-tight"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-cyber-cyan">VR</span>
          <span className="text-cyber-purple">.</span>
          <span className="text-slate-300">dev</span>
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                active === item.toLowerCase()
                  ? 'text-cyber-cyan'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              whileHover={{ y: -1 }}
            >
              {item}
              {active === item.toLowerCase() && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-cyber-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            className="px-4 py-1.5 text-sm font-semibold border border-cyber-cyan/60 text-cyber-cyan rounded
                       hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-200"
            whileHover={{ scale: 1.04, boxShadow: '0 0 14px #00d4ff44' }}
            whileTap={{ scale: 0.96 }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile hamburger — larger tap target */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-[5px] p-3 -mr-3"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <motion.div
          className="md:hidden bg-[#0d0d1f] border-t border-[#1e1e3a] px-6 py-5 flex flex-col gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-400 hover:text-cyber-cyan transition-colors text-sm"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="text-cyber-cyan text-sm font-semibold mt-1"
            onClick={() => setOpen(false)}
          >
            → Hire Me
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
