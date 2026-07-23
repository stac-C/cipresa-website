import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getPlantBySlug } from '@/lib/data/plants';
import { getCoursesByIds } from '@/lib/data/courses';
import { isItemWishlisted } from '@/lib/data/wishlist';
import { PlantDetailView } from '@/components/encyclopedia/plant-detail-view';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const plant = await getPlantBySlug(params.slug);
  if (!plant) return {};

  return {
    title: `${plant.commonName} (${plant.scientificName})`,
    description: plant.description.slice(0, 160),
    openGraph: {
      title: plant.commonName,
      description: plant.description.slice(0, 160),
      images: plant.images[0] ? [{ url: plant.images[0] }] : undefined,
    },
  };
}

export default async function PlantDetailPage({ params }: { params: { slug: string } }) {
  const plant = await getPlantBySlug(params.slug);
  if (!plant) notFound();

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [relatedCourses, isWishlisted] = await Promise.all([
    getCoursesByIds(plant.relatedCourses),
    user ? isItemWishlisted(user.id, 'plant', plant.id) : Promise.resolve(false),
  ]);

  return <PlantDetailView plant={plant} relatedCourses={relatedCourses} initialIsWishlisted={isWishlisted} />;
}
