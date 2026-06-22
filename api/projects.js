import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Return early for preflight CORS requests if needed
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      const projects = await sql`SELECT * FROM portfolio_projects ORDER BY display_order ASC, created_at DESC`;
      const mapped = projects.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        techTags: p.tech_tags,
        githubUrl: p.github_url,
        displayOrder: p.display_order,
        visible: p.visible,
      }));
      return res.status(200).json(mapped);
    }

    if (req.method === 'POST') {
      const { password, ...payload } = req.body;
      if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

      await sql`
        INSERT INTO portfolio_projects (name, description, tech_tags, github_url, display_order, visible)
        VALUES (${payload.name}, ${payload.description}, ${payload.techTags || []}, ${payload.githubUrl}, ${payload.displayOrder || 0}, ${payload.visible ?? true})
      `;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { id, password, ...payload } = req.body;
      if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

      await sql`
        UPDATE portfolio_projects 
        SET name = ${payload.name}, description = ${payload.description}, tech_tags = ${payload.techTags || []}, 
            github_url = ${payload.githubUrl}, display_order = ${payload.displayOrder}, visible = ${payload.visible},
            updated_at = NOW()
        WHERE id = ${id}
      `;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const { id, password } = req.body;
      if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

      await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
