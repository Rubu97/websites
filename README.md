# Ganesh Das High School — Sualkuchi, Assam

A modern, fully animated single-page website for **Ganesh Das High School** (গণেশ দাস হাই স্কুল),
Kanchan Nagar, Sualkuchi, Assam 781103.

![Established](https://img.shields.io/badge/Established-1954-gold) ![Classes](https://img.shields.io/badge/Classes-VI%E2%80%93X-blue) ![Medium](https://img.shields.io/badge/Medium-Assamese-green)

## Highlights

- **3D animated hero** — floating books, graduation cap, knowledge globe and orbit rings built with React Three Fiber
- **Scroll animations everywhere** — section reveals, stat counters, tilt cards, staggered grids (Framer Motion)
- **Bilingual identity** — English + Assamese (নো সঁজাৰা / Noto Sans Bengali typography)
- **Gallery with lightbox** — school photos with a link out to the official Google Maps photo album
- **Admission enquiry form** — validated by a small Express API, stored in `backend/data/`
- **Google Maps embed + directions** using the school's real coordinates (26.1677234, 91.5641811)
- Fully responsive, accessible, and respects `prefers-reduced-motion`

## Sections

Hero · Stats · About · Academics · Campus & Facilities · Gallery · Notice Board · Admissions · Contact · Footer

## Tech stack

| Layer     | Stack                                                          |
| --------- | -------------------------------------------------------------- |
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Three.js |
| Backend   | Node.js, Express (enquiries API)                               |
| Design    | Navy + gold "heritage" theme, Sora / Manrope / Noto Sans Bengali |

## Run locally

```bash
npm install:all     # install backend + frontend deps
npm start           # starts API on :3001 and site on :5173
```

Production build: `npm run build` (output in `frontend/dist`).

## Editing content

All school content lives in [`frontend/src/data.ts`](frontend/src/data.ts):

- Facts & address, UDISE code, classes, medium
- Stats, facilities, subjects, journey stages
- **Notice board items** (currently sample announcements — replace with real notices)
- Gallery images (`frontend/public/gallery/`)

### Photos

The site uses **real photographs served live from the school's Google Maps listing** (uploaded by
Local Guide "Nibed D" and other visitors) — they load directly from Google's CDN in the visitor's
browser, so they always stay in sync with the listing. Street View of the frontage is included, and
every tile is credited and links back to Maps. The full album (45 photos):
https://maps.app.goo.gl/ubkQUEnV4XEuiLME9

Photo URLs live in `frontend/src/data.ts` (`coverPhoto`, `streetViewPhoto`, `gallery`). If you later
have original photo files, drop them in `frontend/public/gallery/` and point the gallery entries at
those paths instead.

## API

| Method | Route             | Purpose                          |
| ------ | ----------------- | -------------------------------- |
| GET    | `/api/health`     | Health check                     |
| POST   | `/api/enquiries`  | Submit an admission enquiry      |
| GET    | `/api/enquiries`  | List submitted enquiries         |
