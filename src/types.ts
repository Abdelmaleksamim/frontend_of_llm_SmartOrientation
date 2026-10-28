export const BAC_TYPES = [
  "Sciences mathématiques",
  "Sciences physiques",
  "Sciences de la vie et de la terre",
  "Sciences économiques",
  "Lettres et sciences humaines",
  "Sciences et technologies",
] as const;

export const INTERESTS = [
  "Informatique", "Santé", "Ingénierie", "Commerce et gestion",
  "Sciences", "Droit", "Langues", "Arts et design",
] as const;

export const CITIES = [
  "Toutes les villes", "Casablanca", "Rabat", "Fès", "Marrakech",
  "Tanger", "Agadir", "Oujda", "Kénitra", "Meknès", "Tétouan",
] as const;

export const INSTITUTION_TYPES = ["Tous", "Public", "Privé"] as const;

export type Grades = {
  moyenne: string;
  maths: string;
  physique: string;
  svt: string;
  francais: string;
  anglais: string;
};

export type Profile = {
  bac: (typeof BAC_TYPES)[number];
  grades: Grades;
  interests: string[];
  city: (typeof CITIES)[number];
  institution: (typeof INSTITUTION_TYPES)[number];
};

// Payload sent to FastAPI: POST /api/recommendations
export type RecommendationRequest = {
  bac: string;
  moyenne: number;
  notes: { maths: number; physique: number; svt: number; francais: number; anglais: number };
  interets: string[];
  ville: string | null;
  type_etablissement: string | null;
};

export type Recommendation = {
  filiere: string;
  etablissement?: string;
  ville?: string;
  reussite: number;    // %
  rattrapage: number;  // %
  echec: number;       // %
};

// GET /api/model-info
export type ModelInfo = {
  model_type: string;            // ex. "Classification"
  model_subtitle: string;        // ex. "Réussite / Rattrapage / Échec"
  dataset_size: number;
  accuracy: number;              // %
  precision: number;
  recall: number;
  f1: number;
  features: { name: string; importance: number }[]; // importance 0–1
};
