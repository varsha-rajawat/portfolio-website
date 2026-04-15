/**
 * Footer.jsx — Simple single-line footer.
 * Intentionally minimal — don't give the page a heavy bottom.
 */

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[#1e1e3a]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
        <span>
          <span className="text-cyber-cyan">VR</span>
          <span className="text-cyber-purple">.</span>
          <span className="text-slate-400">dev</span>
          {' — '}Varsha Rajawat
        </span>

        <span>Built with React + Tailwind + Framer Motion ⚡</span>

        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
