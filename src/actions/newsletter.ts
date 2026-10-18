'use server';

import { getDb } from '@/lib/db';

export type NewsletterResult = {
  success: boolean;
  message: string;
};

export async function subscribeNewsletter(
  email: string,
  source: 'landing_hero' | 'landing_cta' = 'landing_hero'
): Promise<NewsletterResult> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    const sql = getDb();
    await sql`
      INSERT INTO newsletter_subscribers (email, source)
      VALUES (${email.toLowerCase().trim()}, ${source})
      ON CONFLICT (email) DO NOTHING
    `;
    return { success: true, message: "You're on the list! We'll be in touch." };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
