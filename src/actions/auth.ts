'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getDb } from '@/lib/db';

function signToken(payload: string): string {
  const secret = process.env.SESSION_SECRET!;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  const data = Buffer.from(payload).toString('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token: string): string | null {
  const secret = process.env.SESSION_SECRET!;
  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const payload = Buffer.from(data, 'base64url').toString();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expected = hmac.digest('hex');

  if (signature !== expected) return null;
  return payload;
}

export type LoginResult = {
  success: boolean;
  message: string;
};

export async function login(email: string, password: string): Promise<LoginResult> {
  if (!email?.trim() || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM admin_users WHERE email = ${email.toLowerCase().trim()}`;

    if (rows.length === 0) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return { success: false, message: 'Invalid email or password.' };
    }

    // Create session cookie
    const token = signToken(JSON.stringify({ id: user.id, email: user.email }));
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true, message: 'Login successful.' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

export async function getSession(): Promise<{ id: number; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
