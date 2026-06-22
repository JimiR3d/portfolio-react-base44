import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

const seedProjects = [
  {
    name: 'QUIDAX DASHBOARD',
    description: 'An interactive, data-driven B2B intelligence dashboard built for Quidax, featuring live market data and strategic growth opportunities.',
    techTags: ['React', 'Node.js'],
    githubUrl: 'https://github.com/JimiR3d/Quidax-Dashboard',
    liveUrl: 'https://quidax-b2b-dashboard.vercel.app/',
    status: 'ACTIVE',
    visible: true
  },
  {
    name: 'QUIDAX TELEGRAM GEMINI',
    description: 'This project is an AI-powered customer support dashboard designed to intercept and classify messages from a Telegram community group in real-time. It uses Groq for rapid message classification and Gemini 3.1 Pro to generate professional suggested replies for your human agents.',
    techTags: ['Groq', 'Gemini', 'Node.js', 'Telegram API'],
    githubUrl: 'https://github.com/JimiR3d/Quidax-Telegram-gemini',
    liveUrl: null,
    status: 'ACTIVE',
    visible: true
  },
  {
    name: 'JOBPULSE',
    description: 'JobPulse aggregates remote jobs from 60+ boards and company career pages, scores them against your profile using AI, filters out geo-restricted and overqualified roles, and alerts you on Telegram when something genuinely worth your time drops.',
    techTags: ['AI', 'Data Scraping', 'Telegram API'],
    githubUrl: 'https://github.com/JimiR3d/jobpulse',
    liveUrl: 'https://jobpulse-sepia.vercel.app/dashboard',
    status: 'ACTIVE',
    visible: true
  },
  {
    name: 'REGULATORY REPORT GENERATOR',
    description: 'Work in Progress',
    techTags: ['Data Engineering', 'Python'],
    githubUrl: 'https://github.com/JimiR3d/regulatory-report-generator',
    liveUrl: null,
    status: 'IN PROGRESS',
    visible: true
  },
  {
    name: 'QUIDAX MARKET ANALYTICS',
    description: 'Work in Progress',
    techTags: ['Data Analysis', 'Python'],
    githubUrl: 'https://github.com/JimiR3d/quidax-market-analytics',
    liveUrl: null,
    status: 'IN PROGRESS',
    visible: true
  },
  {
    name: 'OIL GAS DATA PIPELINE',
    description: 'Work in Progress',
    techTags: ['Data Pipeline', 'SQL'],
    githubUrl: 'https://github.com/JimiR3d/oil-gas-data-pipeline',
    liveUrl: null,
    status: 'IN PROGRESS',
    visible: true
  },
  {
    name: 'BASEL 3 DASHBOARD',
    description: 'Work in Progress',
    techTags: ['Data Visualization', 'Finance'],
    githubUrl: 'https://github.com/JimiR3d/basel3-dashboard',
    liveUrl: null,
    status: 'IN PROGRESS',
    visible: true
  }
];

async function seed() {
  try {
    console.log('Adding live_url column if not exists...');
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS live_url TEXT;`;

    console.log('Adding status column if not exists...');
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'ACTIVE';`;

    console.log('Dropping NOT NULL constraint on github_url...');
    await sql`ALTER TABLE portfolio_projects ALTER COLUMN github_url DROP NOT NULL;`;

    console.log('Clearing old projects...');
    await sql`DELETE FROM portfolio_projects;`;

    console.log('Inserting predefined projects...');
    for (let i = 0; i < seedProjects.length; i++) {
      const p = seedProjects[i];
      await sql`
        INSERT INTO portfolio_projects (name, description, tech_tags, github_url, live_url, status, display_order, visible)
        VALUES (${p.name}, ${p.description}, ${p.techTags}, ${p.githubUrl}, ${p.liveUrl}, ${p.status}, ${i}, ${p.visible})
      `;
      console.log(`Inserted: ${p.name}`);
    }
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Failed to seed DB:', error);
  }
}

seed();
