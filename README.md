# Stoneflow Frontend

This project is a minimal React + Vite setup. To run the app locally install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Backend API configuration

All network requests use the `VITE_API_BASE_URL` environment variable as the API base URL. Copy `.env.example` to `.env` and adjust the URL if needed. The default points to `http://localhost:8000` for local development.

```bash
cp .env.example .env
# edit .env to change the base URL
```

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run test` – run unit tests with Vitest
- `npm run lint` – run ESLint
