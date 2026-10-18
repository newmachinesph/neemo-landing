'use server';

import { getDb } from '@/lib/db';

export type ContactResult = {
  success: boolean;
  message: string;
};

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactReason: string;
}): Promise<ContactResult> {
  const { name, email, subject, message, contactReason } = formData;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return { success: false, message: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    const sql = getDb();
    await sql`
      INSERT INTO contact_submissions (name, email, subject, message, contact_reason)
      VALUES (${name.trim()}, ${email.toLowerCase().trim()}, ${subject.trim()}, ${message.trim()}, ${contactReason})
    `;
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
