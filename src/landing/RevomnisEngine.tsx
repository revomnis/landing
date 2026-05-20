import type { ReactNode } from "react";
import { ENGINE_NODES, ENGINE_MOBILE_NODES, ENGINE_LAYERS } from "./engineData";

const delayClass = (i: number) => {
  if (i === 1) return "animate-in--delay-1";
  if (i === 2) return "animate-in--delay-2";
  if (i === 3) return "animate-in--delay-3";
  return "";
};

/* ─── Orbit geometry (viewBox 0 0 100 100) ─── */

const CX = 50;
const CY = 50;
const ORBIT_R = 46;

const NODE_POS = [
  { x: 50,   y: 4    },
  { x: 82.5, y: 17.5 },
  { x: 96,   y: 50   },
  { x: 82.5, y: 82.5 },
  { x: 50,   y: 96   },
  { x: 17.5, y: 82.5 },
  { x: 4,    y: 50   },
  { x: 17.5, y: 17.5 },
] as const;

/* ─── Icons (Lucide-style, 24×24 viewBox, 1.5 stroke) ─── */

const ICON_PATHS: Record<string, ReactNode> = {
  audience: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  classification: (
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  ),
  infrastructure: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <line x1="8" y1="11" x2="8" y2="16" />
      <line x1="8" y1="8" x2="8.01" y2="8" strokeWidth={2} />
      <path d="M12 16v-4a2.5 2.5 0 0 1 5 0v4" />
    </>
  ),
  replies: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  meetings: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  insights: (
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </>
  ),
  "email-linkedin": (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
};

function NodeIcon({ nodeKey, className }: { nodeKey: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[nodeKey]}
    </svg>
  );
}

/* ─── SVG orbit layer ─── */

function OrbitSvg() {
  return (
    <svg className="engine__svg" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        {/* Impulse dot glow */}
        <filter id="eng-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft ring glow */}
        <filter id="eng-ring-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>

        {/* Layered center glow: tight core */}
        <radialGradient id="eng-glow-core">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0.26} />
          <stop offset="35%" stopColor="#2563EB" stopOpacity={0.10} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
        </radialGradient>

        {/* Layered center glow: wide aura */}
        <radialGradient id="eng-glow-aura">
          <stop offset="0%" stopColor="#1E3A5F" stopOpacity={0.20} />
          <stop offset="45%" stopColor="#0F1D32" stopOpacity={0.10} />
          <stop offset="100%" stopColor="#080A0F" stopOpacity={0} />
        </radialGradient>

        {/* Connector line: radial fade, bright at outer ring, faint at center */}
        <radialGradient
          id="eng-line-grad"
          gradientUnits="userSpaceOnUse"
          cx={CX} cy={CY} r={ORBIT_R}
        >
          <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.01} />
          <stop offset="35%" stopColor="#94A3B8" stopOpacity={0.06} />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.14} />
        </radialGradient>
      </defs>

      {/* Wide atmospheric aura */}
      <circle cx={CX} cy={CY} r={50} fill="url(#eng-glow-aura)" />

      {/* Core blue glow */}
      <circle cx={CX} cy={CY} r={30} fill="url(#eng-glow-core)" />

      {/* Outer orbit ring */}
      <circle
        cx={CX} cy={CY} r={ORBIT_R}
        fill="none" stroke="rgba(148,163,184,0.07)" strokeWidth={0.4}
        filter="url(#eng-ring-glow)"
      />

      {/* Inner orbit ring */}
      <circle
        cx={CX} cy={CY} r={24}
        fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth={0.25}
        filter="url(#eng-ring-glow)"
      />

      {/* Connectors + impulse signals */}
      {NODE_POS.map((pos, i) => {
        const pathId = `eng-c${i}`;
        const d = `M ${pos.x} ${pos.y} L ${CX} ${CY}`;
        const delay = `${(i * 0.45).toFixed(2)}s`;
        return (
          <g key={i}>
            {/* Static connector */}
            <path
              id={pathId}
              d={d}
              stroke="url(#eng-line-grad)"
              strokeWidth={0.4}
              fill="none"
            />

            {/* Animated impulse dot */}
            <circle
              className="engine__impulse"
              r={1.05}
              fill="rgba(147,197,253,0.80)"
              filter="url(#eng-glow)"
            >
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin={delay}
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.75;0"
                keyTimes="0;0.10;0.65;1"
                dur="3.5s"
                repeatCount="indefinite"
                begin={delay}
              />
              <animate
                attributeName="r"
                values="0.6;1.1;0.8"
                keyTimes="0;0.15;1"
                dur="3.5s"
                repeatCount="indefinite"
                begin={delay}
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Main section component ─── */

export function RevomnisEngine() {
  return (
    <section className="engine section" aria-labelledby="engine-heading">
      <div className="container engine__inner">
        {/* Header */}
        <p className="section__title engine__eyebrow animate-in">
          The Revomnis Engine
        </p>
        <h2
          id="engine-heading"
          className="engine__headline animate-in animate-in--delay-1"
        >
          One managed outbound system. Every moving part connected.
        </h2>
        <p className="engine__subcopy animate-in animate-in--delay-2">
          Revomnis connects audience logic, managed infrastructure, coordinated
          email&nbsp;+&nbsp;LinkedIn, reply handling, meeting booking, and portal
          insight into one outbound system, run by Revomnis.
        </p>

        {/* ── Desktop orbit ── */}
        <div className="engine__orbit animate-in animate-in--delay-3">
          <OrbitSvg />

          <div className="engine__center">
            <span className="engine__center-label">Revomnis Engine</span>
            <span className="engine__center-sub">Managed by Revomnis</span>
          </div>

          {ENGINE_NODES.map((node, i) => (
            <div key={node.key} className={`engine__node engine__node--${i}`}>
              <NodeIcon nodeKey={node.key} className="engine__node-icon" />
              <span className="engine__node-label">{node.label}</span>
            </div>
          ))}
        </div>

        {/* ── Mobile vertical flow ── */}
        <div className="engine__mobile">
          <div className="engine__mobile-hub animate-in">
            <span className="engine__center-label">Revomnis Engine</span>
            <span className="engine__center-sub">Managed by Revomnis</span>
          </div>

          <div className="engine__mobile-list">
            {ENGINE_MOBILE_NODES.map((node, i) => (
              <div
                key={node.key}
                className={`engine__mobile-step animate-in ${delayClass((i + 1) % 4)}`}
              >
                <span className="engine__mobile-dot" aria-hidden="true" />
                <NodeIcon nodeKey={node.key} className="engine__mobile-icon" />
                <div className="engine__mobile-body">
                  <span className="engine__mobile-label">{node.label}</span>
                  <span className="engine__mobile-desc">{node.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Supporting layer cards ── */}
        <div className="engine__layers">
          {ENGINE_LAYERS.map((layer, i) => (
            <div
              key={layer.title}
              className={`engine__layer animate-in ${delayClass(i)}`}
            >
              <h3 className="engine__layer-title">{layer.title}</h3>
              <p className="engine__layer-desc">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
