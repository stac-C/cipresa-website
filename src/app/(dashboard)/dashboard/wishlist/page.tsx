import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getUserWishlistWithDetails } from '@/lib/data/wishlist';
import { WishlistView } from '@/components/dashboard/wishlist-view';

export default async function WishlistPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/wishlist');

  const items = await getUserWishlistWithDetails(user.id);

  return <WishlistView items={items} />;
}
