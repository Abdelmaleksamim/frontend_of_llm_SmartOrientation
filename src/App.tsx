import { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import Results from "./components/Results";
import StatCards from "./components/StatCards";
import ModelPerformance from "./components/ModelPerformance";
import FeatureImportance from "./components/FeatureImportance";
import { fetchModelInfo, fetchRecommendations } from "./api";
import type { ModelInfo, Profile, Recommendation } from "./types";

export default function App() {
  const [items, setItems] = useState<Recommendation[] | null>(null);
  const [info, setInfo] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModelInfo().then(setInfo).catch(() => setInfo(null));
  }, []);

  const analyse = async (profile: Profile) => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchRecommendations(profile));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <header>
        <h1>Smart Orientation</h1>
        <p>Trouvez la filière post-bac qui correspond à votre profil.</p>
      </header>

      <StatCards info={info} />

      <div className="layout">
        <ProfileForm loading={loading} onSubmit={analyse} />
        <div>
          {error && <div className="panel alert" role="alert">{error}</div>}
          {items ? (
            <Results items={items} />
          ) : (
            <div className="panel empty">
              <p>Remplissez votre profil pour voir vos filières recommandées.</p>
            </div>
          )}
        </div>
      </div>

      {info && (
        <div className="row2">
          <ModelPerformance info={info} />
          <FeatureImportance info={info} />
        </div>
      )}
    </main>
  );
}
