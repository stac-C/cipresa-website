import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { LearningPath } from '@/types';
import { getCourseBySlug } from './courses';

interface LearningPathRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  level: LearningPath['level'];
}

interface LearningPathCourseRow {
  path_id: string;
  display_order: number;
  is_required: boolean;
  course: {
    slug: string;
  };
}

async function assembleLearningPath(row: LearningPathRow): Promise<LearningPath | null> {
  const supabase = supabaseAdmin;
  const { data: pathCourses } = await supabase
    .from('learning_path_courses')
    .select('path_id, display_order, is_required, course:courses(slug)')
    .eq('path_id', row.id)
    .order('display_order');

  const rows = (pathCourses ?? []) as unknown as LearningPathCourseRow[];
  const courses = await Promise.all(
    rows.map(async (r) => {
      const course = await getCourseBySlug(r.course.slug);
      return course ? { course, order: r.display_order, isRequired: r.is_required } : null;
    })
  );

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description ?? '',
    thumbnail: row.thumbnail ?? '',
    level: row.level,
    courses: courses.filter((c): c is NonNullable<typeof c> => c !== null),
  };
}

export async function getPublishedLearningPaths(): Promise<LearningPath[]> {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('learning_paths')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];

  const paths = await Promise.all((data as LearningPathRow[]).map(assembleLearningPath));
  return paths.filter((p): p is LearningPath => p !== null);
}

// Cached per-request — see getCourseBySlug in courses.ts for why.
export const getLearningPathBySlug = cache(async (slug: string): Promise<LearningPath | null> => {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('learning_paths')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error || !data) return null;
  return assembleLearningPath(data as LearningPathRow);
});

export async function isUserOnPath(userId: string, pathId: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('learning_path_enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('path_id', pathId)
    .maybeSingle();
  return !!data;
}

export interface NextPathCourse {
  pathTitle: string;
  pathSlug: string;
  course: LearningPath['courses'][number]['course'];
}

/** The next not-yet-owned course in the first learning path the user is actively working through, if any. */
export async function getNextCourseInActivePath(userId: string): Promise<NextPathCourse | null> {
  const supabase = createServerSupabaseClient();
  const { data: activeEnrollments } = await supabase
    .from('learning_path_enrollments')
    .select('path_id, learning_paths(id, title, slug, description, thumbnail, level)')
    .eq('user_id', userId)
    .is('completed_at', null)
    .limit(1);

  const enrollment = (activeEnrollments ?? [])[0] as unknown as
    | { path_id: string; learning_paths: LearningPathRow }
    | undefined;
  if (!enrollment) return null;

  const path = await assembleLearningPath(enrollment.learning_paths);
  if (!path) return null;

  const { data: entitlementRows } = await supabase
    .from('entitlements')
    .select('course_id')
    .eq('user_id', userId)
    .is('revoked_at', null);
  const owned = new Set((entitlementRows ?? []).map((r: { course_id: string }) => r.course_id));

  const next = path.courses.find((c) => !owned.has(c.course.id));
  return next ? { pathTitle: path.title, pathSlug: path.slug, course: next.course } : null;
}
