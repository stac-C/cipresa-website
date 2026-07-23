import { AdminShell } from '@/components/admin/admin-shell';
import { ProductForm } from '@/components/admin/product-form';
import { getProductCategories } from '@/lib/data/products';
import { createProduct } from '@/lib/actions/admin/products';

export default async function NewProductPage() {
  const categories = await getProductCategories();

  return (
    <AdminShell>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nouveau produit</h1>
      <ProductForm categories={categories} action={createProduct} />
    </AdminShell>
  );
}
