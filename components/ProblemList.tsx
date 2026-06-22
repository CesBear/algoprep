"use client"

import { useState } from "react"
import { hl } from "@/lib/highlight"

interface Problem {
  name: string
  diff: string
  tags: string[]
  href: string
}

interface Props {
  problems: Problem[]
  solutions: Record<string, string>
}

export default function ProblemList({ problems, solutions }: Props) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="problems-list">
      {problems.map(({ name, diff, tags, href }) => {
        const isOpen = open === name
        const sol = solutions[name]
        return (
          <div key={name} className="problem-item">
            <div
              className="problem-row"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(isOpen ? null : name)}
            >
              <span className="problem-chevron" style={{ transform: isOpen ? "rotate(90deg)" : "none" }}>▶</span>
              <span className="problem-name">{name}</span>
              <div className="problem-tags">
                {tags.map(t => <span key={t} className="problem-tag">{t}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="problem-lc-link"
                  onClick={e => e.stopPropagation()}
                >
                  LC ↗
                </a>
                <span className={`diff diff-${diff.toLowerCase()}`}>{diff}</span>
              </div>
            </div>
            {isOpen && sol && (
              <div className="problem-solution">
                <div
                  className="code-block"
                  style={{ fontSize: 11, marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  dangerouslySetInnerHTML={{ __html: hl(sol) }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
