import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { SettingsView } from '@/components/dashboard/settings-view';

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/settings');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, avatar, phone, location, bio')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-2xl">
      <SettingsView
        initialProfile={{
          fullName: profile?.full_name ?? '',
          email: profile?.email ?? user.email ?? '',
          avatar: profile?.avatar ?? '',
          phone: profile?.phone ?? '',
          location: profile?.location ?? '',
          bio: profile?.bio ?? '',
        }}
      />
    </div>
  );
}
