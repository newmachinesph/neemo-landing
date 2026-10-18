'use server';

import { getDb } from '@/lib/db';

export type Subscriber = {
  id: number;
  email: string;
  subscribed_at: string;
  source: string;
  is_active: boolean;
};

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  contact_reason: string;
  submitted_at: string;
  is_read: boolean;
};

export type AdminStats = {
  totalSubscribers: number;
  totalContacts: number;
  unreadContacts: number;
  subscribersToday: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  const sql = getDb();
  const [subCount] = await sql`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = true`;
  const [contactCount] = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
  const [unreadCount] = await sql`SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = false`;
  const [todayCount] = await sql`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE subscribed_at >= CURRENT_DATE`;
  return {
    totalSubscribers: Number(subCount.count),
    totalContacts: Number(contactCount.count),
    unreadContacts: Number(unreadCount.count),
    subscribersToday: Number(todayCount.count),
  };
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC`;
  return rows as Subscriber[];
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM contact_submissions ORDER BY submitted_at DESC`;
  return rows as ContactSubmission[];
}

export async function deleteSubscriber(id: number): Promise<{ success: boolean }> {
  const sql = getDb();
  await sql`DELETE FROM newsletter_subscribers WHERE id = ${id}`;
  return { success: true };
}

export async function deleteContactSubmission(id: number): Promise<{ success: boolean }> {
  const sql = getDb();
  await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
  return { success: true };
}

export async function markContactAsRead(id: number): Promise<{ success: boolean }> {
  const sql = getDb();
  await sql`UPDATE contact_submissions SET is_read = true WHERE id = ${id}`;
  return { success: true };
}
