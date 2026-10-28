import type { ModelInfo } from "../types";

export default function StatCards({ info }: { info: ModelInfo | null }) {
  const cards = [
    { label: "Précision du modèle", value: info ? `${info.accuracy}%` : "–", sub: "Performance élevée", tone: "c1" },
    { label: "Type de modèle", value: info?.model_type ?? "–", sub: info?.model_subtitle ?? "", tone: "c2" },
    { label: "Taille du dataset", value: info ? `${info.dataset_size.toLocaleString("fr-FR")}+` : "–", sub: "Dossiers d’étudiants", tone: "c3" },
  ];
  return (
    <div className="stats">
      {cards.map((c) => (
        <div className="stat" key={c.label}>
          <span className={`stat-icon ${c.tone}`} aria-hidden />
          <div>
            <div className="stat-label">{c.label}</div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-sub">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
