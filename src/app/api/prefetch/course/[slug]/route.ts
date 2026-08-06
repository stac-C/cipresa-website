import { NextResponse } from 'next/server';
import { getCourseBySlug } from '@/lib/data/courses';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) return NextResponse.json({ course: null }, { status: 404 });

  return NextResponse.json({
    course: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      thumbnail: course.thumbnail,
      price: course.price,
      salePrice: course.salePrice,
      currency: course.currency,
      category: course.category,
      rating: course.rating,
    },
  });
}
