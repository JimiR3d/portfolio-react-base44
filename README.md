# Oluwafolajinmi Aboderin — Portfolio

My personal portfolio site — a fast, animated single-page app showcasing my work as an AI Engineer, Full-Stack Developer, and Data Analyst.

🔗 **Live:** [oluwafolajinmi-aboderin.vercel.app](https://oluwafolajinmi-aboderin.vercel.app/)

---

## Tech stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Animation:** Framer Motion · Three.js
- **Data viz:** Recharts
- **Backend:** Neon (serverless Postgres) behind a small Vercel API route
- **Hosting:** Vercel

The projects shown on the site aren't hardcoded — they're served from a Neon
Postgres table through `api/projects.js`, with a password-protected admin
endpoint for adding and editing entries.

---

## Running locally

```bash
# 1. Clone the repo
git clone https://github.com/JimiR3d/oluwafolajinmi-aboderin-portfolio.git
cd oluwafolajinmi-aboderin-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app runs on [http://localhost:5173](http://localhost:5173) by default.

### Environment variables

The projects API needs these set (locally in a `.env` file, or in your Vercel
project settings):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon serverless Postgres connection string |
| `ADMIN_PASSWORD` | Password guarding the admin create/update/delete routes |

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## About

Built and maintained by **Oluwafolajinmi Aboderin**.

- 🌐 [Live site](https://oluwafolajinmi-aboderin.vercel.app/)
- 📧 [folajinmi13@gmail.com](mailto:folajinmi13@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/oluwafolajinmi-aboderin-695848249/)
