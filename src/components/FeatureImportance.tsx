import type { ModelInfo } from "../types";

const COLORS = ["var(--c-purple)", "var(--c-blue)", "var(--c-purple)", "var(--c-orange)", "var(--c-orange)", "var(--c-pink)", "var(--c-pink)", "var(--c-purple)"];

export default function FeatureImportance({ info }: { info: ModelInfo }) {
  const items = [...info.features].sort((a, b) => b.importance - a.importance);
  return (
    <section className="panel">
      <h2>Importance des critères</h2>
      <ul className="features">
        {items.map((f, i) => (
          <li key={f.name}>
            <span className="f-name">{f.name}</span>
            <div className="f-track">
              <i style={{ width: `${f.importance * 100}%`, background: COLORS[i % COLORS.length] }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="axis"><span>0</span><span>0,5</span><span>1</span></div>
      <p className="note center">Score d’importance</p>
    </section>
  );
}
