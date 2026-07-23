import { redirect } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Play, CheckCircle } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCoursesByIds, getUserEnrollments } from '@/lib/data/courses';
import { Button } from '@/components/ui/button';

export default async function MyCoursesPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/my-courses');

  const enrollments = await getUserEnrollments(user.id);
  const courses = await getCoursesByIds(enrollments.map((e) => e.courseId));
  const progressByCourse = Object.fromEntries(enrollments.map((e) => [e.courseId, e]));

  const inProgress = courses.filter((c) => !progressByCourse[c.id]?.completedAt);
  const completed = courses.filter((c) => progressByCourse[c.id]?.completedAt);

  if (courses.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
        <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-4">Vous n&apos;êtes inscrit à aucune formation pour le moment.</p>
        <Link href="/courses"><Button size="sm">Explorer les formations</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {inProgress.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">En cours ({inProgress.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {inProgress.map((course) => {
              const progress = progressByCourse[course.id]?.progress ?? 0;
              return (
                <Link
                  key={course.id}
                  href={`/course/${course.slug}/learn${progressByCourse[course.id]?.currentLessonId ? `?lesson=${progressByCourse[course.id].currentLessonId}` : ''}`}
                  className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-cipresa-300 dark:hover:border-cipresa-800 transition-colors group"
                >
                  <div className="w-24 h-20 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${course.thumbnail})` }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{course.title}</p>
                    <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 mt-3">
                      <div className="h-full rounded-full bg-cipresa-500" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">{progress}% complété</p>
                  </div>
                  <Play className="w-8 h-8 p-2 rounded-lg bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-500 opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Terminés ({completed.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {completed.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-cipresa-300 dark:hover:border-cipresa-800 transition-colors"
              >
                <div className="w-24 h-20 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${course.thumbnail})` }} />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{course.title}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-cipresa-600 w-fit">
                    <CheckCircle className="w-3.5 h-3.5" /> Terminé
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
