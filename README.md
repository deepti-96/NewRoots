# NewRoots 🌱

**Your First 90 Days in America — A guided caseworker in your pocket.**

NewRoots is a multilingual web app that helps newly arrived immigrant families navigate their first 90 days in the United States. It provides a step-by-step milestone tracker, benefits discovery, tax guidance, and voice support — all in the user's native language.

---

## The Problem

When immigrants arrive in the United States, they face an overwhelming number of urgent tasks: getting a SIM card, finding housing, applying for an SSN, opening a bank account, enrolling children in school, and understanding which government benefits they qualify for. There is no single guided resource that walks them through this process in their language.

NewRoots fills that gap.

---

## Features

### 🗺️ 90-Day Milestone Tracker
- 13 milestones grouped by week (First Days → Key Paperwork → Benefits & Family → Long-Term Setup)
- Mark milestones complete and watch your progress update in real time
- Urgency indicators so users know what to prioritize first
- Tips and official links for every milestone

### 🌐 10 Languages
- English, Español, 中文, हिन्दी, العربية, Français, Português, Tiếng Việt, 한국어, Filipino
- Full UI translation across all pages
- Voice intro reads the welcome message in the selected language

### 🔊 Voice Support
- **Text-to-speech**: Any section can be read aloud using the Web Speech API
- **Speech-to-text**: Voice input on the dashboard for hands-free navigation
- BCP-47 locale codes mapped per language for accurate pronunciation

### 🎁 Benefits Discovery
- 8 benefit programs: SNAP (food), Medicaid, Housing (HUD), Banking, SSN, Job Resources, Education, WIC
- Personalized qualification badges based on family profile ("You may qualify" / "Worth checking")
- Expandable cards: What It Is → Who Qualifies → How To Apply → official government links

### 🧾 Tax Help & Reminders
- Live countdown to April 15 filing deadline
- EITC (up to $7,830 refund), Child Tax Credit, VITA free filing, ITIN guidance
- Plain-language explanations in all 10 languages

### 👤 Onboarding Flow (4 Steps)
1. Language & accessibility preferences (voice readout, large text)
2. Family profile (size, children, employment, insurance, state, arrival date)
3. Document checklist (passport, visa, I-94, SSN card, etc.)
4. Confirmation with personalized 90-day plan

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Routing | Wouter (hash-based) |
| Backend | Express.js |
| Database | SQLite via better-sqlite3 + Drizzle ORM |
| Voice | Web Speech API (SpeechSynthesis + SpeechRecognition) |
| Build | tsx + esbuild |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/deepti-96/NewRoots.git
cd NewRoots

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at `http://localhost:5000`.

### Production Build

```bash
npm run build
NODE_ENV=production node dist/index.cjs
```

---

## Project Structure

```
NewRoots/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx                  # App context (user, language, voice, theme)
│       ├── index.css                # Custom palette + animations
│       ├── components/
│       │   ├── AppNav.tsx           # Top bar + bottom navigation
│       │   └── VoiceButton.tsx      # Inline listen/stop button
│       ├── pages/
│       │   ├── LandingPage.tsx      # Marketing hero + login/register
│       │   ├── OnboardingPage.tsx   # 4-step family profile setup
│       │   ├── DashboardPage.tsx    # 90-day milestone tracker
│       │   ├── BenefitsPage.tsx     # Benefits discovery cards
│       │   ├── TaxPage.tsx          # Tax reminders + EITC/VITA/ITIN
│       │   └── ProfilePage.tsx      # User profile + language switcher
│       └── lib/
│           ├── translations.ts      # Full UI translations in 10 languages
│           ├── milestoneData.ts     # 13 milestones with multilingual content
│           ├── voiceUtils.ts        # speakText(), VoiceInput class
│           └── queryClient.ts       # TanStack Query + apiRequest helper
├── server/
│   ├── index.ts                     # Express entry point
│   ├── routes.ts                    # API routes (auth, user, milestones, tax)
│   ├── storage.ts                   # DatabaseStorage (Drizzle ORM)
│   └── db.ts                        # SQLite connection + table init
├── shared/
│   └── schema.ts                    # Drizzle schema + Zod types
└── package.json
```

---

## API Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/user/:id` | Get user profile |
| PATCH | `/api/user/:id` | Update profile |
| GET | `/api/milestones/:userId` | Get all milestones |
| POST | `/api/milestones` | Create/seed milestone |
| PATCH | `/api/milestones/:id` | Toggle complete |
| GET | `/api/tax-reminders/:userId` | Get tax reminders |
| POST | `/api/tax-reminders` | Create tax reminder |
| PATCH | `/api/tax-reminders/:id/dismiss` | Dismiss reminder |

---

## Design

- **Color palette**: Cobalt blue (`hsl(215 72% 38%)`) + Amber gold (`hsl(38 88% 55%)`) — hope and trust
- **Typography**: Plus Jakarta Sans (Google Fonts)
- **Dark mode**: Fully supported, toggled in the nav bar
- **Mobile-first**: Designed for 390px viewport, scales to desktop

---

## Built For

**Innovation Hacks Spring '26** — ASU Hackathon

Target users: underrepresented and underserved immigrant communities arriving in the United States, with a focus on the critical first 90 days.

---

## License

MIT
