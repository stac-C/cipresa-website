import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Clock, BookOpen, Award, TrendingUp } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCoursesByIds, getUserEnrollments } from '@/lib/data/courses';

export default async function AnalyticsPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/analytics');

  const enrollments = await getUserEnrollments(user.id);
  const courses = await getCoursesByIds(enrollments.map((e) => e.courseId));
  const progressByCourse = Object.fromEntries(enrollments.map((e) => [e.courseId, e]));

  const completedCount = enrollments.filter((e) => e.completedAt).length;
  const inProgressCount = enrollments.length - completedCount;
  const totalHoursLearned = courses.reduce(
    (sum, c) => sum + (c.totalHours * (progressByCourse[c.id]?.progress ?? 0)) / 100,
    0
  );
  const averageProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  const stats = [
    { icon: BookOpen, label: 'Cours en cours', value: inProgressCount.toString(), bg: 'bg-blue-50 dark:bg-blue-950/50', color: 'text-blue-600 dark:text-blue-400' },
    { icon: Award, label: 'Cours terminés', value: completedCount.toString(), bg: 'bg-cipresa-50 dark:bg-cipresa-950/50', color: 'text-cipresa-600 dark:text-cipresa-400' },
    { icon: Clock, label: 'Heures apprises', value: `${Math.round(totalHoursLearned)}h`, bg: 'bg-gray-100 dark:bg-gray-800', color: 'text-gray-600 dark:text-gray-400' },
    { icon: TrendingUp, label: 'Progression moyenne', value: `${averageProgress}%`, bg: 'bg-cipresa-50 dark:bg-cipresa-950/50', color: 'text-cipresa-600 dark:text-cipresa-400' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Progression par cours</h2>
        {courses.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Aucune formation en cours pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => {
              const progress = progressByCourse[course.id]?.progress ?? 0;
              return (
                <Link key={course.id} href={`/course/${course.slug}`} className="block group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-cipresa-600 transition-colors line-clamp-1">{course.title}</span>
                    <span className="text-xs font-semibold text-gray-500 flex-shrink-0 ml-3">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full rounded-full bg-cipresa-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
