import { redirect } from 'next/navigation';
import { getSession } from '@/actions/auth';
import { getAdminStats, getSubscribers, getContactSubmissions } from '@/actions/admin';
import { AdminHeader } from './components/AdminHeader';
import { StatsCards } from './components/StatsCards';
import { SubscribersTable } from './components/SubscribersTable';
import { ContactTable } from './components/ContactTable';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const [stats, subscribers, contacts] = await Promise.all([
    getAdminStats(),
    getSubscribers(),
    getContactSubmissions(),
  ]);

  return (
    <>
      <AdminHeader email={session.email} />
      <StatsCards stats={stats} />
      <div className="space-y-8">
        <SubscribersTable subscribers={subscribers} />
        <ContactTable contacts={contacts} />
      </div>
    </>
  );
}
