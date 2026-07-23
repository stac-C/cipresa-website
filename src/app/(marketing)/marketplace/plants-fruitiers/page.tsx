import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plants fruitiers',
  description: 'Produits: Plants fruitiers.',
};

export default function PlantsFruitiersPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Plants fruitiers</h1>
      <p>Page catégorie « Plants fruitiers ». Contenu à structurer.</p>
    </main>
  );
}
