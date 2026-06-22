"use client"

import { useState } from "react"
import type { DesignScenario } from "@/lib/design-scenarios"

interface Props {
  scenarios: DesignScenario[]
}

export default function DesignScenarios({ scenarios }: Props) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="problems-list">
      {scenarios.map(({ name, tag, requirements, components, tradeoffs, sdetAngle }) => {
        const isOpen = open === name
        return (
          <div key={name} className="problem-item">
            <div
              className="problem-row"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(isOpen ? null : name)}
            >
              <span className="problem-chevron" style={{ transform: isOpen ? "rotate(90deg)" : "none" }}>▶</span>
              <span className="problem-name">{name}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "2px 6px",
                  borderRadius: 3,
                  color: tag === "commonly-cited" ? "#22c55e" : "#c4b5fd",
                  background: tag === "commonly-cited" ? "rgba(34,197,94,0.12)" : "rgba(196,181,253,0.12)",
                }}
              >
                {tag}
              </span>
            </div>
            {isOpen && (
              <div
                className="problem-solution"
                style={{
                  padding: "14px 16px",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px",
                  fontSize: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <Section title="Requirements" items={requirements} />
                <Section title="Key Components" items={components} />
                <Section title="Trade-offs" items={tradeoffs} />
                <div>
                  <div className="card-title" style={{ marginBottom: 4 }}>SDET Angle</div>
                  <div style={{ color: "var(--muted)", lineHeight: 1.6 }}>{sdetAngle}</div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="card-title" style={{ marginBottom: 4 }}>{title}</div>
      <ul style={{ paddingLeft: 16, color: "var(--muted)", lineHeight: 1.6 }}>
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}
