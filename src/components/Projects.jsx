/**
 * Projects.jsx — Redesigned as GitHub-ready project cards.
 *
 * Card anatomy:
 *   Top row  : folder icon (left) + GitHub & live-demo icon links (right)
 *   Middle   : project title + 2-line description
 *   Bottom   : small tag pills
 *
 * ── HOW TO ADD YOUR GITHUB PROJECTS ──
 * 1. Replace the placeholder entries in PROJECTS below.
 * 2. Set `github` to your real repo URL.
 * 3. Set `live` to your deployed URL, or null to hide the live link.
 * 4. Update title, desc, and tags.
 * 5. The card handles the rest automatically.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Folder } from 'lucide-react'

const PROJECTS = [
  // ── Replace these with your real GitHub projects ──
  {
    title:  'Distributed Task Queue',
    desc:   'A scalable distributed task queue built with Node.js, Redis, and PostgreSQL, supporting priority-based processing, retries with exponential backoff, cron scheduling, and a dead-letter queue for failed jobs.',
    tags:   ['Node.js', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/varsha-rajawat/distributed-task-queue',   // ← your repo URL
    live:   null,                                   // ← or 'https://your-demo.com'
  },
  {
    title:  'AI Companion Chat',
    desc:   'A full-stack real-time conversational AI application built with strict TypeScript, React, Node.js, WebSockets, and the OpenAI API. LLM responses stream token-by-token from the server to the client via a persistent WebSocket connection. Conversation history is persisted per-session in PostgreSQL',
    tags:   ['TypeScript', 'React', 'Node.js', 'WebSockets', 'OpenAI API'],
    github: 'https://github.com/varsha-rajawat/ai-companion-chat',
    live:   null,
  },
  {
    title:  'Monolith → Microservices',
    desc:   'Decomposed a legacy Java EE monolith into 8 independent Spring Boot services without a single production outage. Coverage went from 52% to 79%.',
    tags:   ['Java', 'Microservices', 'AWS'],
    github: 'https://github.com/varsha-rajawat',
    live:   null,
  },
  {
    title:  'Coming Soon',
    desc:   'A personal project currently in progress. Check back or watch the GitHub repo.',
    tags:   [],
    github: 'https://github.com/varsha-rajawat',
    live:   null,
    wip:    true,
  },
]

/* ── Single card ── */
function ProjectCard({ project, delay, inView }) {
  return (
    <motion.div
      className="relative flex flex-col bg-[#111127] rounded-2xl p-6 border border-[#1e1e3a]
                 hover:border-cyber-cyan/30 hover:shadow-[0_8px_40px_#00d4ff0d]
                 transition-all duration-300 group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -6 }}
    >
      {/* WIP badge */}
      {project.wip && (
        <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-mono rounded-full
                         bg-cyber-amber/10 text-cyber-amber border border-cyber-amber/20">
          wip
        </span>
      )}

      {/* Top row: folder + links */}
      <div className="flex items-start justify-between mb-5">
        <Folder
          size={32}
          className="text-cyber-cyan group-hover:text-cyber-cyan transition-colors"
          strokeWidth={1.5}
        />

        <div className="flex items-center gap-3">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
              whileHover={{ y: -2 }}
              title="Live demo"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={18} strokeWidth={1.5} />
            </motion.a>
          )}
          {project.github && !project.wip && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-cyan transition-colors"
              whileHover={{ y: -2 }}
              title="View on GitHub"
              onClick={e => e.stopPropagation()}
            >
              <Github size={18} strokeWidth={1.5} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug
                     group-hover:text-cyber-cyan transition-colors duration-200">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-6">
        {project.desc}
      </p>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-[11px] font-mono text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="py-24 px-6 bg-[#080814]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-cyber-cyan text-sm">04.</span>
            <h2 className="text-3xl font-bold font-sans text-slate-100">Projects</h2>
          </div>
          <div className="w-14 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
        </motion.div>

        {/* 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              delay={i * 0.08}
              inView={inView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/varsha-rajawat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500
                       hover:text-cyber-cyan transition-colors font-mono group"
          >
            <Github size={15} />
            <span>see more on GitHub</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
