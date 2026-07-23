'use client';

import Link from 'next/link';
import {
  BookOpen, Clock, Award, TrendingUp, User, ShoppingBag,
  Play, ChevronRight, Star, GraduationCap, Milestone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import type { Course } from '@/types';
import type { NextPathCourse } from '@/lib/data/learning-paths';

interface DashboardViewProps {
  enrolledCourses: Course[];
  progressByCourse: Record<string, number>;
  popularCourses: Course[];
  nextPathCourse: NextPathCourse | null;
  totalHoursLearned: number;
  completedCourses: number;
}

export function DashboardView({
  enrolledCourses,
  progressByCourse,
  popularCourses,
  nextPathCourse,
  totalHoursLearned,
  completedCourses,
}: DashboardViewProps) {
  const hasEnrolledCourses = enrolledCourses.length > 0;
  // enrolledCourses only holds in-progress courses (see dashboard/page.tsx),
  // so a user who finished everything would have hasEnrolledCourses=false
  // too — the welcome hero should only show for someone with zero activity
  // ever, not someone who's caught up.
  const isNewUser = enrolledCourses.length === 0 && completedCourses === 0;

  const quickActions = [
    { icon: BookOpen, label: 'Continuer un cours', href: hasEnrolledCourses ? `/course/${enrolledCourses[0].slug}` : '/courses', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' },
    { icon: Award, label: 'Voir mes certificats', href: '/dashboard/certificates', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400' },
    { icon: User, label: 'Compléter mon profil', href: '/dashboard/settings', color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400' },
    { icon: ShoppingBag, label: 'Dernière commande', href: '/dashboard/orders', color: 'bg-cipresa-50 text-cipresa-600 dark:bg-cipresa-950/50 dark:text-cipresa-400' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', action.color)}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white leading-tight line-clamp-2">{action.label}</span>
          </Link>
        ))}
      </div>

      {!isNewUser ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { icon: BookOpen, label: 'Cours en cours', value: enrolledCourses.length.toString(), bg: 'bg-blue-50 dark:bg-blue-950/50', iconColor: 'text-blue-600 dark:text-blue-400' },
            { icon: Award, label: 'Cours terminés', value: completedCourses.toString(), bg: 'bg-amber-50 dark:bg-amber-950/50', iconColor: 'text-amber-600 dark:text-amber-400' },
            { icon: Clock, label: 'Heures apprises', value: `${totalHoursLearned}h`, bg: 'bg-gray-100 dark:bg-gray-800', iconColor: 'text-gray-600 dark:text-gray-400' },
            { icon: TrendingUp, label: 'Progression moyenne', value: `${Object.values(progressByCourse).length > 0 ? Math.round(Object.values(progressByCourse).reduce((a, b) => a + b, 0) / Object.values(progressByCourse).length) : 0}%`, bg: 'bg-cipresa-50 dark:bg-cipresa-950/50', iconColor: 'text-cipresa-600 dark:text-cipresa-400' },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
                <stat.icon className={cn('w-5 h-5', stat.iconColor)} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-cipresa-100 dark:border-cipresa-900 bg-gradient-to-br from-cipresa-50 to-white dark:from-cipresa-950/30 dark:to-gray-900 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-cipresa-500 flex items-center justify-center flex-shrink-0 shadow-button">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Bienvenue sur CIPRESA !</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                Votre tableau de bord se remplira au fil de vos formations et de votre progression. Commencez par explorer nos contenus pour démarrer.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                <Link href="/courses"><Button size="sm">Explorer les formations</Button></Link>
                <Link href="/marketplace"><Button size="sm" variant="outline">Voir la boutique</Button></Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {nextPathCourse && (
        <Link href={`/course/${nextPathCourse.course.slug}`} className="block mb-6">
          <Card className="rounded-2xl p-5 border-cipresa-200 dark:border-cipresa-900 bg-cipresa-50/50 dark:bg-cipresa-950/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cipresa-500 flex items-center justify-center flex-shrink-0">
                <Milestone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-cipresa-600 font-medium uppercase tracking-wide">Parcours &middot; {nextPathCourse.pathTitle}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Prochaine étape : {nextPathCourse.course.title}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-cipresa-500 flex-shrink-0" />
            </div>
          </Card>
        </Link>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">Continuer l&apos;apprentissage</h2>
              <Link href="/courses" className="text-xs text-cipresa-600 hover:underline">Voir tout</Link>
            </div>
            {hasEnrolledCourses ? (
              <div className="space-y-1.5">
                {enrolledCourses.map((course) => (
                  <Link key={course.id} href={`/course/${course.slug}/learn`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <div className="w-14 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${course.thumbnail})` }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</p>
                      <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 mt-2">
                        <div className="h-full rounded-full bg-cipresa-500" style={{ width: `${progressByCourse[course.id] ?? 0}%` }} />
                      </div>
                    </div>
                    <Play className="w-7 h-7 p-1.5 rounded-lg bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-3">Commencez votre première formation</p>
                <Link href="/courses">
                  <Button size="sm">Explorer les cours</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">Recommandations</h2>
              <Link href="/courses" className="text-xs text-cipresa-600 hover:underline">Voir tout</Link>
            </div>
            <div className="space-y-1.5">
              {popularCourses.map((course) => (
                <Link key={course.id} href={`/course/${course.slug}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <div className="w-11 h-11 rounded-lg bg-cover bg-center flex-shrink-0 bg-gray-100 dark:bg-gray-800" style={{ backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : undefined }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{course.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-500">{course.rating} ({course.totalStudents})</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-cipresa-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
              {popularCourses.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">Aucune recommandation pour le moment.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
