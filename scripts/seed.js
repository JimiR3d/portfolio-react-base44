import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('Fetching repositories from GitHub for JimiR3d...');
  try {
    const res = await fetch('https://api.github.com/users/JimiR3d/repos?sort=updated&per_page=100');
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    
    const repos = await res.json();
    
    // Define repos we care about based on past interactions
    const targetRepos = ['quidax-b2b-dashboard', 'hcp-aptitude-test-prep', 'seplat-hcp-aptitude-preparation'];
    
    // Add public repos up to 10 if targets aren't enough
    const selectedRepos = repos.filter(r => targetRepos.includes(r.name) || r.stargazers_count > 0).slice(0, 10);
    
    // If empty, just pick first 5
    if (selectedRepos.length === 0) {
        selectedRepos.push(...repos.slice(0, 5));
    }

    console.log(`Found ${selectedRepos.length} repos to seed.`);

    for (let i = 0; i < selectedRepos.length; i++) {
      const repo = selectedRepos[i];
      const name = repo.name.replace(/-/g, ' ').toUpperCase();
      const description = repo.description || `A ${repo.language || 'code'} project.`;
      const techTags = repo.language ? [repo.language] : [];
      if (repo.topics) techTags.push(...repo.topics);
      const url = repo.html_url;

      console.log(`Inserting: ${name}`);

      await sql`
        INSERT INTO portfolio_projects (name, description, tech_tags, github_url, display_order, visible)
        VALUES (${name}, ${description}, ${techTags}, ${url}, ${i}, true)
        ON CONFLICT (github_url) DO UPDATE 
        SET description = EXCLUDED.description, tech_tags = EXCLUDED.tech_tags
      `;
    }
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Failed to seed DB:', error);
  }
}

seed();
