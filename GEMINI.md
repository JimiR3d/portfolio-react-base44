# Portfolio Site (React/Vite)

## Architecture
- **Frontend:** React + Vite
- **Backend:** Vercel Serverless Functions (`/api/projects.js`)
- **Database:** Neon PostgreSQL Serverless
- **Styling:** Tailwind CSS + shadcn/ui components
- **Repository:** https://github.com/JimiR3d/portfolio-react-base44

## Important Conventions
- The project has been detached from the Base44 proprietary SDK.
- It requires standard Node dependencies (run `npm install`).
- `npm run dev` runs the Vite frontend. (To test the Vercel API locally, use `vercel dev`).
- The Admin dashboard is secured entirely by the Vercel API via the `ADMIN_PASSWORD` env variable.
- For deployment on Vercel, the following environment variables must be provided:
  - `DATABASE_URL`
  - `ADMIN_PASSWORD`
