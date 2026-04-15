/**
 * FloatingTerminal.jsx
 *
 * Anchored to the BOTTOM-RIGHT corner.
 * Button pulses with a cyan glow + shows a "psst…" hint after 4s.
 * Clicking opens a terminal panel that slides up from the bottom-right.
 *
 * Commands: help, about, hire, skills, coffee, ping, ls,
 *           cat varsha, sudo hire varsha, debug, whoami, clear, exit
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Commands ── */
const COMMANDS = {
  help: () => [
    '  Available commands:',
    '  ──────────────────────────────────────',
    '  about            →  who is Varsha?',
    '  hire             →  let\'s make it happen',
    '  skills           →  what she\'s good at',
    '  coffee           →  critical info',
    '  ping             →  is she available?',
    '  ls               →  look around',
    '  cat varsha       →  read the manual',
    '  sudo hire varsha →  for the bold',
    '  debug            →  spot the bug',
    '  clear            →  clean slate',
    '  exit             →  close terminal',
    '  ──────────────────────────────────────',
  ],
  about: () => [
    '  Varsha Rajawat — Software Engineer · Canada 🇨🇦',
    '',
    '  Started with: "why does this keep breaking?"',
    '  Spent 3+ years finding out.',
    '',
    '  Known side effects of working with her:',
    '  faster APIs, better test coverage,',
    '  one fewer 3am incident per sprint.',
  ],
  hire: () => [
    '  ✅  Great call.',
    '',
    '  → varsharajawat04@gmail.com',
    '  → scroll up to the Contact section',
    '',
    '  Response time: < 24h  (usually much less)',
  ],
  skills: () => [
    '  Loading skill matrix...',
    '',
    '  Backend systems   ████████████░░  90%',
    '  Distributed arch  ███████████░░░  85%',
    '  Breaking things   ██████████████  99%',
    '  Fixing them       █████████████░  95%',
    '  CI/CD pipelines   ████████████░░  88%',
    '  Coffee tolerance  ██████████████  ∞%',
    '',
    '  * coffee tolerance is load-bearing',
  ],
  coffee: () => [
    '  ☕  Coffee initialisation status',
    '  ──────────────────────────────────',
    '  Status:         REQUIRED',
    '  Cups today:     [CLASSIFIED]',
    '  Impact on work: directly proportional',
    '',
    '  WARNING: Do not schedule meetings before',
    '  the first cup. Side effects include:',
    '  great ideas, suspiciously good code.',
  ],
  ping: () => {
    const ms = Math.floor(Math.random() * 8 + 1)
    return [
      `  PING varsha.dev`,
      `  Reply: time=${ms}ms    status=available`,
      `  Reply: time=${ms + 1}ms    status=interested`,
      `  Reply: time=${ms}ms    status=ready_to_ship`,
      '',
      `  3 packets transmitted, 3 received, 0% loss`,
    ]
  },
  ls: () => [
    '  drwxr-xr-x   portfolio/',
    '  drwxr-xr-x   side-projects/       (wip 🔨)',
    '  -rw-r--r--   resume.pdf           [🔒 try: hire]',
    '  -rw-r--r--   ideas.txt            [2,847 lines]',
    '  -rwxr-xr-x   varsha.jar           [compiled & ready]',
    '  -rw-r--r--   coffee.log           [entries: too many]',
  ],
  'cat varsha': () => [
    '  NAME',
    '    varsha — backend engineer, problem solver',
    '',
    '  SYNOPSIS',
    '    varsha [--curious] [--builds-things] [--canada]',
    '',
    '  DESCRIPTION',
    '    Takes debugging personally. Distributed systems,',
    '    APIs, event pipelines. Believes test coverage is',
    '    an act of kindness toward your future self.',
    '',
    '  EXIT STATUS',
    '    0   if you hire her',
    '    1   if you don\'t  (you\'ll regret it)',
  ],
  'sudo hire varsha': () => [
    '  [sudo] password for recruiter: ••••••••',
    '',
    '  🚀  INITIATING HIRE SEQUENCE...',
    '  ▓░░░░░░░░░░░░░░░░░░░  checking availability...',
    '  ▓▓▓▓▓▓░░░░░░░░░░░░░░  confirming excellent taste...',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░  scheduling coffee chat...',
    '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100% ✅',
    '',
    '  SUCCESS. → varsharajawat04@gmail.com',
  ],
  debug: () => [
    '  🐛  Spot the bug:',
    '',
    '  public int divide(int a, int b) {',
    '    return a / b;',
    '  }',
    '  divide(10, 0)  →  💥 ArithmeticException',
    '',
    '  Fix: guard against b == 0 first.',
    '  Varsha has been catching these for 3+ years.',
    '  Hire her before she finds one in yours. 🙂',
  ],
  whoami: () => ['  A person with excellent taste in engineers.'],
  clear:  () => ['__CLEAR__'],
  exit:   () => ['__CLOSE__'],
  quit:   () => ['__CLOSE__'],
}

COMMANDS['cat resume'] = COMMANDS['cat varsha']

function getResponse(raw) {
  const key = raw.trim().toLowerCase()
  if (COMMANDS[key]) return COMMANDS[key]()
  if (key.includes('hire'))   return COMMANDS['hire']()
  if (key.includes('coffee')) return COMMANDS['coffee']()
  if (key.includes('skill'))  return COMMANDS['skills']()
  return [
    `  command not found: ${key}`,
    '  type "help" to see what\'s available',
  ]
}

const WELCOME = [
  '  ┌──────────────────────────────────────┐',
  '  │   varsha@backend — interactive mode   │',
  '  └──────────────────────────────────────┘',
  '  Type "help" to see available commands.',
  '',
]

export default function FloatingTerminal() {
  const [open,    setOpen]    = useState(false)
  const [history, setHistory] = useState(WELCOME)
  const [input,   setInput]   = useState('')
  const [cmdHist, setCmdHist] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [hinted,  setHinted]  = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 180)
  }, [open])

  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setHinted(true), 4000)
    return () => clearTimeout(t)
  }, [open])

  const submit = () => {
    if (!input.trim()) return
    const response = getResponse(input)
    if (response[0] === '__CLOSE__') { setOpen(false); return }
    if (response[0] === '__CLEAR__') { setHistory(WELCOME); setInput(''); return }
    setHistory(prev => [...prev, `  $ ${input}`, ...response, ''])
    setCmdHist(prev => [input, ...prev])
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submit() }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHist.length - 1)
      setHistIdx(next); setInput(cmdHist[next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next); setInput(next === -1 ? '' : cmdHist[next])
    }
  }

  return (
    <>
      {/* ── Trigger button — bottom-right with safe-area inset ── */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">

        {/* "psst" hint */}
        <AnimatePresence>
          {hinted && !open && (
            <motion.span
              className="pointer-events-none font-mono text-[11px] text-cyber-cyan/70 tracking-wide"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              psst… I'm interactive ↓
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!open && (
            <motion.button
              className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full
                         bg-[#0d0d1f] border border-cyber-cyan/50 text-cyber-cyan
                         font-mono text-sm font-semibold shadow-2xl"
              initial={{ y: 60, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                boxShadow: [
                  '0 0 10px #00d4ff33',
                  '0 0 26px #00d4ff88, 0 0 40px #8b5cf633',
                  '0 0 10px #00d4ff33',
                ],
                borderColor: ['#00d4ff44', '#00d4ffbb', '#00d4ff44'],
              }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ y: { type: 'spring', stiffness: 320, damping: 28, delay: 0.6 },
                            opacity: { delay: 0.6 },
                            boxShadow: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1 },
                            borderColor: { repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 1 } }}
              onClick={() => { setOpen(true); setHinted(false) }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
              </span>
              <span>&gt;_</span>
              <span className="text-slate-400 font-normal text-xs">try the terminal</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Terminal panel — slides up from bottom-right ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px]"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0,  opacity: 1, scale: 1 }}
              exit={{    y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <div className="rounded-2xl overflow-hidden border border-[#1e1e3a] shadow-[0_-4px_50px_#00d4ff1a]">

                {/* Title bar */}
                <div className="bg-[#111127] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e3a]">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-slate-400 text-xs font-mono">varsha@backend — interactive</span>
                  <span className="ml-auto text-[10px] text-slate-600 font-mono">try: sudo hire varsha</span>
                </div>

                {/* Output */}
                <div
                  className="bg-[#090916] px-3 py-3 h-48 sm:h-64 overflow-y-auto font-mono text-xs leading-relaxed cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith('  $')             ? 'text-cyber-green'  :
                        line.includes('✅') || line.includes('SUCCESS') ? 'text-cyber-green'  :
                        line.includes('💥') || line.includes('WARNING') ? 'text-cyber-amber'  :
                        line.includes('▓') || line.includes('%')        ? 'text-cyber-cyan'   :
                        line.includes('🚀')                ? 'text-cyber-purple' :
                        'text-slate-400'
                      }
                    >
                      {line || '\u00A0'}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="bg-[#090916] border-t border-[#1e1e3a] px-4 py-3 flex items-center gap-3">
                  <span className="text-cyber-cyan font-mono text-xs shrink-0">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="type a command…"
                    className="flex-1 bg-transparent text-slate-200 font-mono text-xs outline-none
                               placeholder:text-slate-700 caret-cyber-cyan"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    onClick={submit}
                    className="text-[10px] font-mono text-slate-600 hover:text-cyber-cyan transition-colors
                               px-2 py-1 border border-[#1e1e3a] rounded"
                  >
                    ↵
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
