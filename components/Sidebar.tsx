"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
  {
    group: "Fundamentals",
    items: [
      { href: "/complexity",  label: "Big O / Complexity", icon: "Ο" },
      { href: "/recursion",   label: "Recursion",          icon: "↺" },
    ],
  },
  {
    group: "Linear Structures",
    items: [
      { href: "/arrays",       label: "Arrays",          icon: "[]" },
      { href: "/strings",      label: "Strings",         icon: '""' },
      { href: "/linked-lists", label: "Linked Lists",    icon: "→" },
      { href: "/stacks-queues",label: "Stacks & Queues", icon: "⇅" },
      { href: "/hashmaps",     label: "Hash Maps",       icon: "#" },
    ],
  },
  {
    group: "Core Techniques",
    items: [
      { href: "/two-pointers",   label: "Two Pointers",   icon: "⇔" },
      { href: "/sliding-window", label: "Sliding Window", icon: "▦" },
      { href: "/binary-search",  label: "Binary Search",  icon: "½" },
    ],
  },
  {
    group: "Non-Linear",
    items: [
      { href: "/trees",  label: "Trees",  icon: "🌲" },
      { href: "/graphs", label: "Graphs", icon: "◎" },
    ],
  },
  {
    group: "Algorithms",
    items: [
      { href: "/sorting",               label: "Sorting",               icon: "↕" },
      { href: "/dynamic-programming",   label: "Dynamic Programming",   icon: "▦" },
    ],
  },
  {
    group: "System Design",
    items: [
      { href: "/system-design", label: "System Design", icon: "⚙" },
    ],
  },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">AlgoPrep</div>
        <div className="sidebar-logo-sub">SDET Interview Prep</div>
      </div>

      {NAV.map(({ group, items }) => (
        <div key={group} className="nav-group">
          <div className="nav-group-label">{group}</div>
          {items.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${path === href ? "active" : ""}`}
            >
              <span style={{ width: 18, textAlign: "center", fontSize: 13, opacity: 0.8 }}>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      ))}

      <div style={{ marginTop: "auto", padding: "12px 16px", borderTop: "1px solid var(--border)", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
        15 topics · DSA for SDETs
      </div>
    </nav>
  )
}
