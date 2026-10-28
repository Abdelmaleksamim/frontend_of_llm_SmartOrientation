import { useState } from "react";
import { BAC_TYPES, CITIES, INSTITUTION_TYPES, INTERESTS } from "../types";
import type { Grades, Profile } from "../types";
import { validate } from "../validation";
import type { Errors } from "../validation";

type Props = { loading: boolean; onSubmit: (p: Profile) => void };

const GRADE_FIELDS: { key: keyof Grades; label: string }[] = [
  { key: "moyenne", label: "Moyenne du bac" },
  { key: "maths", label: "Mathématiques" },
  { key: "physique", label: "Physique" },
  { key: "svt", label: "SVT" },
  { key: "francais", label: "Français" },
  { key: "anglais", label: "Anglais" },
];

export default function ProfileForm({ loading, onSubmit }: Props) {
  const [bac, setBac] = useState<Profile["bac"]>(BAC_TYPES[0]);
  const [grades, setGrades] = useState<Grades>({ moyenne: "", maths: "", physique: "", svt: "", francais: "", anglais: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [city, setCity] = useState<Profile["city"]>(CITIES[0]);
  const [institution, setInstitution] = useState<Profile["institution"]>(INSTITUTION_TYPES[0]);
  const [errors, setErrors] = useState<Errors>({});

  const toggle = (i: string) =>
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(grades, interests);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit({ bac, grades, interests, city, institution });
  };

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Votre profil</h2>

      <label className="field">
        <span>Série du baccalauréat</span>
        <select value={bac} onChange={(e) => setBac(e.target.value as Profile["bac"])}>
          {BAC_TYPES.map((b) => <option key={b}>{b}</option>)}
        </select>
      </label>

      <div className="grid">
        {GRADE_FIELDS.map(({ key, label }) => (
          <label className="field" key={key}>
            <span>{label}</span>
            <input
              inputMode="decimal"
              placeholder="0 – 20"
              value={grades[key]}
              aria-invalid={!!errors[key]}
              onChange={(e) => setGrades({ ...grades, [key]: e.target.value })}
            />
            {errors[key] && <small className="error">{errors[key]}</small>}
          </label>
        ))}
      </div>

      <fieldset className="field">
        <legend>Centres d’intérêt</legend>
        <div className="chips">
          {INTERESTS.map((i) => (
            <button
              type="button" key={i}
              className={interests.includes(i) ? "chip on" : "chip"}
              aria-pressed={interests.includes(i)}
              onClick={() => toggle(i)}
            >{i}</button>
          ))}
        </div>
        {errors.interests && <small className="error">{errors.interests}</small>}
      </fieldset>

      <div className="grid">
        <label className="field">
          <span>Ville souhaitée</span>
          <select value={city} onChange={(e) => setCity(e.target.value as Profile["city"])}>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Type d’établissement</span>
          <select value={institution} onChange={(e) => setInstitution(e.target.value as Profile["institution"])}>
            {INSTITUTION_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <button className="primary" disabled={loading}>
        {loading ? "Analyse en cours…" : "Analyser mon orientation"}
      </button>
    </form>
  );
}
