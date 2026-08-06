import { NextResponse } from 'next/server';
import { getPlantBySlug } from '@/lib/data/plants';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const plant = await getPlantBySlug(params.slug);
  if (!plant) return NextResponse.json({ plant: null }, { status: 404 });

  return NextResponse.json({
    plant: {
      id: plant.id,
      slug: plant.slug,
      commonName: plant.commonName,
      scientificName: plant.scientificName,
      images: plant.images,
      category: plant.category,
      climate: plant.climate,
      waterRequirement: plant.waterRequirement,
    },
  });
}
