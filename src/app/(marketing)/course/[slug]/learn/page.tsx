import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCourseBySlug, getCourseCurriculum, hasEntitlement, getCompletedLessonIds } from '@/lib/data/courses';
import { CoursePlayerView } from '@/components/course/course-player-view';

export default async function CourseLearnPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lesson?: string };
}) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?next=/course/${params.slug}/learn`);

  const entitled = await hasEntitlement(user.id, course.id);
  if (!entitled) redirect(`/course/${params.slug}`);

  const [sections, completedLessonIds] = await Promise.all([
    getCourseCurriculum(course.id),
    getCompletedLessonIds(user.id, course.id),
  ]);

  return (
    <CoursePlayerView
      course={course}
      sections={sections}
      completedLessonIds={completedLessonIds}
      initialLessonId={searchParams.lesson}
    />
  );
}
