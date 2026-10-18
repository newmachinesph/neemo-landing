import { readFileSync } from 'fs';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';

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

async function setup() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set.');
    console.error('Make sure .env.local exists with your Neon connection string.');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  console.log('Creating newsletter_subscribers table...');
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      source VARCHAR(50) DEFAULT 'landing_hero',
      is_active BOOLEAN DEFAULT TRUE
    )
  `;

  console.log('Creating contact_submissions table...');
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(500) NOT NULL,
      message TEXT NOT NULL,
      contact_reason VARCHAR(50) NOT NULL DEFAULT 'general',
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      is_read BOOLEAN DEFAULT FALSE
    )
  `;

  console.log('Creating admin_users table...');
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  console.log('Creating indexes...');
  await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions(submitted_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_is_read ON contact_submissions(is_read)`;

  console.log('Database setup complete!');
}

setup().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
