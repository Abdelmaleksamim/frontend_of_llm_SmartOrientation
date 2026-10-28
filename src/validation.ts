import type { Grades } from "./types";

export type Errors = Partial<Record<keyof Grades | "interests", string>>;

const LABELS: Record<keyof Grades, string> = {
  moyenne: "Moyenne du bac",
  maths: "Mathématiques",
  physique: "Physique",
  svt: "SVT",
  francais: "Français",
  anglais: "Anglais",
};

export function validate(grades: Grades, interests: string[]): Errors {
  const errors: Errors = {};
  (Object.keys(grades) as (keyof Grades)[]).forEach((k) => {
    const raw = grades[k].trim().replace(",", ".");
    const n = Number(raw);
    if (raw === "" || Number.isNaN(n)) errors[k] = `${LABELS[k]} : saisissez un nombre.`;
    else if (n < 0 || n > 20) errors[k] = `${LABELS[k]} : entre 0 et 20.`;
  });
  if (interests.length === 0) errors.interests = "Choisissez au moins un centre d’intérêt.";
  return errors;
}

export const toNumber = (s: string) => Number(s.trim().replace(",", "."));
