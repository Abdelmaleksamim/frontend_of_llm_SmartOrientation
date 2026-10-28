import type { Recommendation } from "../types";

export default function Results({ items }: { items: Recommendation[] }) {
  return (
    <section className="panel" aria-live="polite">
      <h2>Top {items.length} des filières après le bac</h2>

      <ol className="bars">
        {items.map((r) => (
          <li key={r.filiere}>
            <div className="bar-head">
              <strong>{r.filiere}</strong>
              <span>{r.reussite.toFixed(1)} %</span>
            </div>
            <div className="track" role="img" aria-label={`Réussite ${r.reussite}%`}>
              <i className="ok" style={{ width: `${r.reussite}%` }} />
              <i className="mid" style={{ width: `${r.rattrapage}%` }} />
              <i className="ko" style={{ width: `${r.echec}%` }} />
            </div>
          </li>
        ))}
      </ol>

      <div className="legend">
        <span><i className="ok" /> Réussite</span>
        <span><i className="mid" /> Rattrapage</span>
        <span><i className="ko" /> Échec</span>
      </div>

      <div className="scroll">
        <table>
          <thead>
            <tr><th>Filière</th><th>Réussite</th><th>Rattrapage</th><th>Échec</th></tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.filiere}>
                <td>{r.filiere}</td>
                <td>{r.reussite.toFixed(1)} %</td>
                <td>{r.rattrapage.toFixed(1)} %</td>
                <td>{r.echec.toFixed(1)} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="note">
        Ces recommandations sont une aide à l’orientation, pas une garantie d’admission.
        Vérifiez les conditions d’admission auprès des sources officielles.
      </p>
    </section>
  );
}
