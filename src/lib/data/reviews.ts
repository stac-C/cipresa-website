import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Review } from '@/types';

interface ReviewRow {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  target_id: string;
  target_type: Review['targetType'];
  rating: number;
  comment: string | null;
  created_at: string;
}

function mapReview(row: ReviewRow): Review {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    userAvatar: row.user_avatar ?? undefined,
    targetId: row.target_id,
    targetType: row.target_type,
    rating: row.rating,
    comment: row.comment ?? '',
    createdAt: row.created_at,
  };
}

export async function getApprovedReviews(targetId: string, targetType: 'course' | 'product'): Promise<Review[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('target_id', targetId)
    .eq('target_type', targetType)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as ReviewRow[]).map(mapReview);
}
