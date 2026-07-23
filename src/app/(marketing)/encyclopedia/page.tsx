import type { Metadata } from 'next';
import { getPublishedPlants, getPlantCategories } from '@/lib/data/plants';
import { EncyclopediaBrowser } from '@/components/encyclopedia/encyclopedia-browser';

export const metadata: Metadata = {
  title: 'Encyclopédie des plantes',
  description: 'Base de connaissances sur les plantes africaines : climat, sol, rendement, risques et valeur marchande.',
};

export default async function EncyclopediaPage() {
  const [plants, categories] = await Promise.all([getPublishedPlants(), getPlantCategories()]);
  return <EncyclopediaBrowser plants={plants} categories={categories} />;
}
