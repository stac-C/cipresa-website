import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ productIds: [] });
  }

  const { data, error } = await supabase
    .from('wishlist_items')
    .select('item_id')
    .eq('user_id', user.id)
    .eq('item_type', 'product');

  if (error || !data) {
    return NextResponse.json({ productIds: [] });
  }

  return NextResponse.json({
    productIds: (data as { item_id: string }[]).map((row) => row.item_id),
  });
}
