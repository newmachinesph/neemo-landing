import { readFileSync } from 'fs';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Load .env.local manually (no dotenv dependency)
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIndex = trimmed.indexOf('=');
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex).trim();
  const val = trimmed.slice(eqIndex + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL in .env.local');
    process.exit(1);
  }

  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: npx tsx src/scripts/seed-admin.ts <email> <password>');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const passwordHash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO admin_users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET password_hash = ${passwordHash}
  `;

  console.log(`Admin user seeded: ${email}`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
