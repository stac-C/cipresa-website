import type { Metadata } from 'next';
import { getPublishedCourses, getCourseCategories } from '@/lib/data/courses';
import { CoursesBrowser } from '@/components/course/courses-browser';

export const metadata: Metadata = {
  title: 'Catalogue de formations',
  description: 'Découvrez nos formations agricoles en ligne : gestion d\'exploitation, élevage, cultures maraîchères et plus encore.',
};

export const dynamic = 'force-static';
export const revalidate = 300;

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [courses, categories] = await Promise.all([getPublishedCourses(), getCourseCategories()]);

  return <CoursesBrowser courses={courses} categories={categories} initialCategory={searchParams.category ?? null} />;
}
