# Smart Orientation — Frontend (US03, US06, US07, US09)

Extra endpoint for the dashboard cards: `GET /api/model-info` (see `ModelInfo` in `src/types.ts`).

```bash
npm install
cp .env.example .env     # VITE_USE_MOCK=true → works without backend
npm run dev
```

## Connect to FastAPI (US07)
1. Set `VITE_USE_MOCK=false` in `.env`.
2. Run the backend: `uvicorn main:app --reload --port 8000`.
3. The backend must expose `POST /api/recommendations` (CORS not needed: Vite proxies `/api`).

Request body → see `RecommendationRequest` in `src/types.ts`.
Response → array of `{ filiere, etablissement?, ville?, reussite, rattrapage, echec }`.
