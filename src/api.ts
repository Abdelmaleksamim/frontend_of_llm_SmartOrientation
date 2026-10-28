import type { ModelInfo, Profile, Recommendation, RecommendationRequest } from "./types";
import { toNumber } from "./validation";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export function buildRequest(p: Profile): RecommendationRequest {
  return {
    bac: p.bac,
    moyenne: toNumber(p.grades.moyenne),
    notes: {
      maths: toNumber(p.grades.maths),
      physique: toNumber(p.grades.physique),
      svt: toNumber(p.grades.svt),
      francais: toNumber(p.grades.francais),
      anglais: toNumber(p.grades.anglais),
    },
    interets: p.interests,
    ville: p.city === "Toutes les villes" ? null : p.city,
    type_etablissement: p.institution === "Tous" ? null : p.institution,
  };
}

export async function fetchRecommendations(p: Profile): Promise<Recommendation[]> {
  const body = buildRequest(p);
  if (USE_MOCK) return mockRecommendations(body);

  const res = await fetch("/api/recommendations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Erreur serveur (${res.status}). Réessayez dans un instant.`);
  return (await res.json()) as Recommendation[];
}

/* ---- Simulation used until the FastAPI engine (US05) is ready ---- */
const CATALOG = [
  { filiere: "Génie informatique", tags: ["Informatique", "Ingénierie"], w: { maths: 0.5, physique: 0.2, svt: 0, francais: 0.1, anglais: 0.2 } },
  { filiere: "Développement digital", tags: ["Informatique"], w: { maths: 0.3, physique: 0.1, svt: 0, francais: 0.2, anglais: 0.4 } },
  { filiere: "Génie électrique", tags: ["Ingénierie", "Sciences"], w: { maths: 0.4, physique: 0.5, svt: 0, francais: 0.05, anglais: 0.05 } },
  { filiere: "Médecine", tags: ["Santé", "Sciences"], w: { maths: 0.1, physique: 0.2, svt: 0.55, francais: 0.1, anglais: 0.05 } },
  { filiere: "Biologie", tags: ["Santé", "Sciences"], w: { maths: 0.1, physique: 0.1, svt: 0.6, francais: 0.1, anglais: 0.1 } },
  { filiere: "Gestion et commerce", tags: ["Commerce et gestion"], w: { maths: 0.3, physique: 0, svt: 0, francais: 0.3, anglais: 0.4 } },
  { filiere: "Droit", tags: ["Droit", "Langues"], w: { maths: 0, physique: 0, svt: 0, francais: 0.6, anglais: 0.4 } },
  { filiere: "Études anglaises", tags: ["Langues"], w: { maths: 0, physique: 0, svt: 0, francais: 0.3, anglais: 0.7 } },
  { filiere: "Architecture et design", tags: ["Arts et design", "Ingénierie"], w: { maths: 0.3, physique: 0.2, svt: 0, francais: 0.3, anglais: 0.2 } },
];

function mockRecommendations(r: RecommendationRequest): Recommendation[] {
  return CATALOG.map((c) => {
    const base = (Object.keys(c.w) as (keyof typeof c.w)[]).reduce((s, k) => s + r.notes[k] * c.w[k], 0);
    const interest = c.tags.filter((t) => r.interets.includes(t)).length * 4;
    const score = Math.min(95, Math.max(5, (base * 0.6 + r.moyenne * 0.4) * 5 + interest));
    const rattrapage = Math.round((100 - score) * 0.45 * 10) / 10;
    const echec = Math.round((100 - score - rattrapage) * 10) / 10;
    return { filiere: c.filiere, reussite: Math.round(score * 10) / 10, rattrapage, echec };
  })
    .sort((a, b) => b.reussite - a.reussite)
    .slice(0, 5);
}

export async function fetchModelInfo(): Promise<ModelInfo> {
  if (!USE_MOCK) {
    const res = await fetch("/api/model-info");
    if (!res.ok) throw new Error("Impossible de charger les informations du modèle.");
    return (await res.json()) as ModelInfo;
  }
  return {
    model_type: "Classification",
    model_subtitle: "Réussite / Rattrapage / Échec",
    dataset_size: 2000,
    accuracy: 92, precision: 90, recall: 92, f1: 91,
    features: [
      { name: "Moyenne du bac", importance: 1 },
      { name: "Mathématiques", importance: 0.82 },
      { name: "Série du bac", importance: 0.64 },
      { name: "Physique", importance: 0.58 },
      { name: "SVT", importance: 0.46 },
      { name: "Centres d’intérêt", importance: 0.37 },
      { name: "Français", importance: 0.3 },
      { name: "Anglais", importance: 0.24 },
    ],
  };
}
