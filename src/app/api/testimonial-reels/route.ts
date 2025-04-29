// ▶ SERVER component: runs in full Node
export const runtime = 'nodejs';

import fs   from 'node:fs';
import path from 'node:path';

export async function GET() {
  const dir = path.join(
    process.cwd(),
    'public', 'videos', 'testimonials'
  );

  // grab every .mp4 in the folder
  const sources = fs.readdirSync(dir)
    .filter(f => f.endsWith('.mp4'))
    .map   (f => `/videos/testimonials/${f}`);

  return Response.json(sources);
}
