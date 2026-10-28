import type { ModelInfo } from "../types";

const COLORS = ["var(--c-purple)", "var(--c-blue)", "var(--c-orange)", "var(--c-pink)"];

export default function ModelPerformance({ info }: { info: ModelInfo }) {
  const metrics = [
    { name: "Accuracy", value: info.accuracy },
    { name: "Precision", value: info.precision },
    { name: "Recall", value: info.recall },
    { name: "F1-Score", value: info.f1 },
  ];
  const total = metrics.reduce((s, m) => s + m.value, 0);
  const r = 70, C = 2 * Math.PI * r, gap = 3;
  let offset = 0;

  return (
    <section className="panel">
      <h2>Performance du modèle</h2>
      <div className="perf">
        <svg viewBox="0 0 180 180" width="170" height="170" role="img" aria-label={`Accuracy ${info.accuracy}%`}>
          <g transform="rotate(-90 90 90)" fill="none" strokeWidth="22">
            {metrics.map((m, i) => {
              const len = (m.value / total) * C;
              const el = (
                <circle key={m.name} cx="90" cy="90" r={r} stroke={COLORS[i]}
                  strokeDasharray={`${len - gap} ${C - len + gap}`} strokeDashoffset={-offset} />
              );
              offset += len;
              return el;
            })}
          </g>
          <text x="90" y="92" textAnchor="middle" className="donut-value">{info.accuracy}%</text>
          <text x="90" y="112" textAnchor="middle" className="donut-label">Accuracy</text>
        </svg>
        <ul className="metrics">
          {metrics.map((m, i) => (
            <li key={m.name}>
              <i style={{ background: COLORS[i] }} /> <span>{m.name}</span> <b>{m.value}%</b>
            </li>
          ))}
        </ul>
      </div>
      <p className="note">Évalué sur le jeu de test.</p>
    </section>
  );
}
