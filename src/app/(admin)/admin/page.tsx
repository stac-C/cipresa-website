import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminDashboardView } from '@/components/admin/admin-dashboard-view';
import { getAdminStats, getRecentOrders } from '@/lib/data/admin-stats';
import { getAllCoursesForAdmin } from '@/lib/data/courses';

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/admin');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'superadmin'].includes(profile.role)) redirect('/dashboard');

  const [stats, recentOrders, courses] = await Promise.all([getAdminStats(), getRecentOrders(), getAllCoursesForAdmin()]);

  return (
    <AdminShell>
      <AdminDashboardView stats={stats} recentOrders={recentOrders} courses={courses} />
    </AdminShell>
  );
}
