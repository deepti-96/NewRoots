# CLAUDE.md — NewRoots Development Guide

This file gives you full context to continue development on **NewRoots** without losing any history. Read it top to bottom before touching code.

---

## What This App Is

**NewRoots** is a multilingual first-90-days navigator for newly arrived immigrant families in the United States. It guides users through critical tasks (SIM card, SSN, bank account, health insurance, school enrollment) via a milestone tracker, helps them discover government benefits they qualify for, and explains tax obligations — all in their native language with voice support.

Target users: underrepresented immigrant communities. Designed for low digital literacy. Mobile-first. Simple, guided, not a search engine.

Built for **ASU Innovation Hacks Spring '26**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 7 + TypeScript |
| Routing | Wouter 3 with `useHashLocation` (hash-based — required for iframe deployment) |
| Styling | Tailwind CSS v3 + shadcn/ui (Radix UI) |
| State | React Context (`AppContext`) + TanStack Query v5 |
| Backend | Express 5 |
| Database | SQLite via `better-sqlite3` + Drizzle ORM (synchronous driver) |
| Voice | Web Speech API (`SpeechSynthesis` + `SpeechRecognition`) |
| Build | `tsx` + `esbuild` (custom script at `script/build.ts`) |
| Font | Plus Jakarta Sans (loaded in `client/index.html` via Google Fonts) |

---

## Commands

```bash
npm run dev        # Dev server on port 5000 (Express + Vite together)
npm run build      # Production build → dist/public/ (frontend) + dist/index.cjs (backend)
npm start          # Run production build: NODE_ENV=production node dist/index.cjs
npm run check      # TypeScript type check
npm run db:push    # Push schema changes to SQLite via drizzle-kit
```

The dev server runs both Express and Vite on **port 5000**. Do not modify `server/vite.ts` or `vite.config.ts` — they are pre-wired.

---

## Project Structure

```
NewRoots/
├── client/
│   ├── index.html                   ← Google Fonts loaded here (Plus Jakarta Sans)
│   └── src/
│       ├── App.tsx                  ← AppContext, routing, dark mode init
│       ├── index.css                ← CSS variables (palette), animations
│       ├── main.tsx                 ← React entry point
│       ├── components/
│       │   ├── AppNav.tsx           ← Sticky top bar + bottom nav (4 tabs)
│       │   └── VoiceButton.tsx      ← Inline listen/stop button with wave animation
│       │   └── ui/                  ← shadcn/ui components (do not edit)
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── lib/
│       │   ├── translations.ts      ← All UI strings in 10 languages + LANGUAGES array
│       │   ├── milestoneData.ts     ← 13 milestones with multilingual content + official links
│       │   ├── voiceUtils.ts        ← speakText(), stopSpeaking(), VoiceInput class
│       │   ├── queryClient.ts       ← TanStack Query setup + apiRequest() helper
│       │   └── utils.ts             ← cn() utility
│       └── pages/
│           ├── LandingPage.tsx      ← Marketing hero + login/register forms
│           ├── OnboardingPage.tsx   ← 4-step onboarding flow
│           ├── DashboardPage.tsx    ← 90-day milestone tracker
│           ├── BenefitsPage.tsx     ← Benefits discovery (8 programs)
│           ├── TaxPage.tsx          ← Tax reminders + EITC/VITA/ITIN
│           └── ProfilePage.tsx      ← User profile + language switcher
├── server/
│   ├── index.ts                     ← Express entry point (calls registerRoutes)
│   ├── routes.ts                    ← All API routes
│   ├── storage.ts                   ← DatabaseStorage class (Drizzle queries)
│   ├── db.ts                        ← SQLite connection + CREATE TABLE setup
│   ├── vite.ts                      ← Vite dev middleware (do not edit)
│   └── static.ts                    ← Static file serving for production
├── shared/
│   └── schema.ts                    ← Drizzle schema + Zod types (single source of truth)
├── data.db                          ← SQLite database file (gitignored in prod)
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── drizzle.config.ts
```

---

## Routing

Uses **hash-based routing** via `wouter` + `useHashLocation`. Routes are:

| Route | Component |
|---|---|
| `/#/` | LandingPage (login/register) |
| `/#/onboarding` | OnboardingPage |
| `/#/dashboard` | DashboardPage |
| `/#/benefits` | BenefitsPage |
| `/#/taxes` | TaxPage |
| `/#/profile` | ProfilePage |

**Critical**: Always wrap `<Switch>` inside `<Router hook={useHashLocation}>`. Never put `hook` on `<Switch>`. Never use `href="#section"` anchor links — they will be intercepted as route changes. Use `onClick` + `scrollIntoView()` for in-page scroll.

---

## App Context (`client/src/App.tsx`)

Global state lives in `AppContext`. Access it with `useApp()`:

```ts
const { user, setUser, language, setLanguage, largeText, setLargeText, voiceEnabled, setVoiceEnabled } = useApp();
```

| Field | Type | Description |
|---|---|---|
| `user` | `AppUser \| null` | Logged-in user (id, username, language, profileComplete) |
| `setUser` | fn | Set after login/register |
| `language` | `Language` | Active UI language code (`"en"`, `"es"`, etc.) |
| `largeText` | boolean | Accessibility: bumps `font-size` to 18px on `<html>` |
| `voiceEnabled` | boolean | Whether voice readout is on by default |

**No localStorage / sessionStorage / cookies.** These are blocked in the deployment sandbox. All persistence goes through the SQLite backend.

---

## Database & Storage

### Schema (`shared/schema.ts`)

Three tables:

**`users`**
- `id`, `username`, `password` (plain text — no hashing yet)
- `language` (default `"en"`)
- `arrivalDate`, `familySize`, `hasChildren`, `employmentStatus`, `hasInsurance`
- `documents` — JSON text column storing `string[]` of document keys
- `state` — US state the user arrived in
- `profileComplete` — boolean, set to `true` after onboarding

**`milestones`**
- `id`, `userId`, `key` (e.g. `"ssn"`, `"bank_account"`)
- `completed`, `completedAt`, `notes`

**`taxReminders`**
- `id`, `userId`, `reminderType`, `scheduledDate`, `dismissed`

### Drizzle Driver Rules (important)

The `better-sqlite3` driver is **synchronous**. Always terminate queries correctly:

```ts
db.select().from(users).where(eq(users.id, id)).get()    // single row or undefined
db.select().from(users).all()                             // array
db.insert(users).values(data).returning().get()           // inserted row
db.update(users).set(data).where(...).returning().get()   // updated row
db.delete(users).where(...).run()                         // void
```

Never destructure `const [row] = db.select()...` — it won't work.

### Adding a New Table

1. Add to `shared/schema.ts` (table + insert schema + types)
2. Add to `server/db.ts` (raw `CREATE TABLE IF NOT EXISTS`)
3. Add methods to `IStorage` interface in `server/storage.ts`
4. Implement in `DatabaseStorage` class
5. Add routes in `server/routes.ts`

---

## API Routes

All routes are in `server/routes.ts` and registered via `registerRoutes(httpServer, app)`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account → returns `{ id, username, language, profileComplete }` |
| POST | `/api/auth/login` | Login → same response |
| GET | `/api/user/:id` | Full user profile |
| PATCH | `/api/user/:id` | Update profile fields |
| GET | `/api/milestones/:userId` | All milestones for a user |
| POST | `/api/milestones` | Upsert a milestone (by `userId` + `key`) |
| PATCH | `/api/milestones/:id` | Toggle `completed` (also sets `completedAt`) |
| GET | `/api/tax-reminders/:userId` | All tax reminders |
| POST | `/api/tax-reminders` | Create reminder |
| PATCH | `/api/tax-reminders/:id/dismiss` | Dismiss a reminder |

**Note**: Passwords are stored as plain text. Add bcrypt hashing before going to real production.

---

## Frontend Data Fetching

Always use `apiRequest` from `@/lib/queryClient` — never raw `fetch()`. Raw fetch bypasses the `__PORT_5000__` URL rewriting needed for deployment.

```ts
import { apiRequest } from "@/lib/queryClient";

// GET
const data = await apiRequest("GET", `/api/user/${id}`).then(r => r.json());

// POST
const res = await apiRequest("POST", "/api/auth/login", { username, password });
const user = await res.json();

// PATCH
await apiRequest("PATCH", `/api/milestones/${id}`, { completed: true });
```

Use TanStack Query v5 object syntax:
```ts
useQuery({ queryKey: ["/api/milestones", userId], queryFn: () => apiRequest("GET", ...).then(r => r.json()) })
useMutation({ mutationFn: (data) => apiRequest("PATCH", ..., data), onSuccess: () => qc.invalidateQueries(...) })
```

---

## Translations (`client/src/lib/translations.ts`)

All UI strings are translated into 10 languages. Use the `t()` helper:

```ts
import { t } from "@/lib/translations";
import { useApp } from "@/App";

const { language } = useApp();
<h1>{t(language, "heroTitle")}</h1>
```

### Supported Languages

| Code | Label | Native |
|---|---|---|
| `en` | English | English |
| `es` | Spanish | Español |
| `zh` | Chinese | 中文 |
| `hi` | Hindi | हिन्दी |
| `ar` | Arabic | العربية |
| `fr` | French | Français |
| `pt` | Portuguese | Português |
| `vi` | Vietnamese | Tiếng Việt |
| `ko` | Korean | 한국어 |
| `tl` | Filipino | Filipino |

### Adding a New Translation Key

1. Add to the `translations` object in `translations.ts` — one entry per language code
2. Add the key to the `TranslationKey` type (TypeScript will catch missing keys)
3. Use `t(language, "yourNewKey")` in any component

---

## Voice (`client/src/lib/voiceUtils.ts`)

```ts
import { speakText, stopSpeaking, isSpeaking, VoiceInput } from "@/lib/voiceUtils";

// Text to speech
speakText("Hello, welcome to NewRoots.", language);
stopSpeaking();

// Speech to text
const input = new VoiceInput({
  lang: language,
  onResult: (text) => console.log("User said:", text),
  onError: (err) => console.error(err),
  onStart: () => setListening(true),
  onEnd: () => setListening(false),
});
if (input.isSupported()) input.start();
```

BCP-47 codes are mapped per language in `LANGUAGE_CODES` inside `voiceUtils.ts`. Voices are matched by language prefix, falling back to English. The `VoiceButton` component wraps this with a UI + wave animation.

---

## Milestones (`client/src/lib/milestoneData.ts`)

13 milestones seeded on onboarding completion. Keys:

```
sim_card, address, i94, ssn, bank_account, health_insurance,
snap, school_enrollment, drivers_license, itin, vita_tax, wic, medicaid
```

Each milestone has: `key`, `week` (1–4), `urgency` (`"urgent"` | `"recommended"` | `"optional"`), `icon`, plus multilingual `title`, `description`, `tip`, and `link`.

To add a milestone: add to the array in `milestoneData.ts`, add to the seed list in `OnboardingPage.tsx`.

---

## Design System

### Color Palette

Cobalt blue (trust) + Amber gold (hope). Defined as CSS variables in `client/src/index.css`:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--primary` | `215 72% 38%` | `215 68% 58%` | Buttons, links, active nav |
| `--secondary` | `38 88% 55%` | `38 78% 52%` | Gold badges, Day counter |
| `--accent` | `150 58% 38%` | `150 48% 45%` | Completed/success green |
| `--background` | `220 30% 97%` | `220 20% 9%` | Page background |
| `--card` | `220 28% 98%` | `220 18% 11%` | Card surfaces |

Hero gradient class: `.hero-gradient` (defined in `index.css`) — cobalt blue diagonal gradient.

### Typography

Font: **Plus Jakarta Sans** (loaded via Google Fonts in `client/index.html`).

- Max heading in the app interior: `text-xl` (Tailwind)
- Hero marketing headings only: `text-2xl` / `text-3xl`
- Use `font-bold` / `font-semibold` for display weight, `font-normal` for body

### Dark Mode

Toggle button in `AppNav.tsx` (moon/sun icon). Dark mode adds `class="dark"` to `document.documentElement`. All Tailwind utility colors adapt automatically via CSS variables. No localStorage — state lives in React.

### Animations

- `pulse-urgent`: amber glow pulse on urgent milestone cards (CSS keyframes in `index.css`)
- `progress-fill`: progress bar width animation
- `accordion-down/up`: shadcn accordion (Tailwind config keyframes)

---

## Key Patterns & Gotchas

### ❌ Never do this
```ts
// Wrong apiRequest signature (old pattern — caused silent form failures)
await apiRequest("/api/user/1", { method: "PATCH", body: JSON.stringify(data) });

// Wrong — no .get() terminator on Drizzle query
const user = db.select().from(users).where(eq(users.id, 1));

// Wrong — localStorage/sessionStorage/cookies (blocked in sandbox)
localStorage.setItem("user", JSON.stringify(user));

// Wrong — puts hook on Switch instead of Router
<Switch hook={useHashLocation}>

// Wrong — in-page anchor hash link (intercepted as route change)
<a href="#section">Jump</a>
```

### ✅ Do this instead
```ts
// Correct apiRequest: (method, url, body?)
await apiRequest("PATCH", "/api/user/1", data);

// Correct Drizzle: terminate with .get() or .all()
const user = db.select().from(users).where(eq(users.id, 1)).get();

// Correct — React state for transient data, API for persistent
const [user, setUser] = useState(null);

// Correct — hook on Router
<Router hook={useHashLocation}><Switch>...</Switch></Router>

// Correct — scroll to section via JS
<button onClick={() => document.getElementById("section")?.scrollIntoView({ behavior: "smooth" })}>
```

### Adding a New Page

1. Create `client/src/pages/NewPage.tsx`
2. Import and add `<Route path="/new-page" component={NewPage} />` in `App.tsx`
3. Add to bottom nav in `AppNav.tsx` if needed

### Adding a New API Route

1. Add method to `IStorage` interface in `server/storage.ts`
2. Implement in `DatabaseStorage` class
3. Add `app.get/post/patch/delete(...)` in `server/routes.ts`
4. If new table needed: add to `shared/schema.ts` + `server/db.ts`

---

## What's Not Implemented Yet (Future Work)

- **Password hashing** — currently stored as plain text. Add `bcrypt` before production.
- **Session management** — no JWT or session tokens. User object lives only in React state; refresh = logout. Consider adding persistent auth (JWT in memory, refresh via cookie).
- **Document upload** — the document checklist tracks which docs users *have* but doesn't let them upload files.
- **Push notifications** — tax deadline reminders are in the DB but no notification delivery mechanism.
- **AI chat assistant** — "Tap and speak" voice input on dashboard takes text but doesn't connect to an LLM yet.
- **State-specific benefits** — user's state is collected but benefits content is not yet state-specific.
- **Admin / caseworker dashboard** — no multi-role system exists yet.
- **Localized government links** — benefit links point to federal pages; state-specific links would be more useful.
- **Accessibility audit** — ARIA labels and keyboard navigation need a full pass.

---

## Environment

- Node.js 18+ required
- SQLite database file: `data.db` (auto-created on first run by `server/db.ts`)
- No external services or API keys required to run locally
- No `.env` file needed for basic operation

---

## Git

- Repo: https://github.com/deepti-96/NewRoots
- Branch: `main`
- Author: `bharanidharan27`

```bash
git add .
git commit -m "your message"
git push origin main
```
