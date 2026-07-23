import { AdminShell } from '@/components/admin/admin-shell';
import { PlantForm } from '@/components/admin/plant-form';
import { getPlantCategories } from '@/lib/data/plants';
import { createPlant } from '@/lib/actions/admin/plants';

export default async function NewPlantPage() {
  const categories = await getPlantCategories();

  return (
    <AdminShell>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nouvelle fiche plante</h1>
      <PlantForm categories={categories} action={createPlant} />
    </AdminShell>
  );
}
