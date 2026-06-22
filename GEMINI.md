# Portfolio Site (React/Vite)

## Architecture
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Mock Backend:** Currently using Base44 inline mock objects (`globalThis.__B44_DB__`) to prevent UI crashes while testing components.
- **Repository:** https://github.com/JimiR3d/portfolio-react-base44

## Important Conventions
- The project has been detached from the Base44 proprietary SDK.
- It requires standard Node dependencies (run `npm install`).
- Start the dev server using `npm run dev`.
- Builds are standard Vite builds (`npm run build`).

## Pending Work
- Replace the inline `globalThis.__B44_DB__` mock database variables with the actual Supabase client or `/api/sync` endpoints.
