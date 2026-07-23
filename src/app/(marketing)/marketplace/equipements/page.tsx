import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipements',
  description: 'Produits: Equipements.',
};

export default function EquipementsPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Equipements</h1>
      <p>Page catégorie « Equipements ». Contenu à structurer.</p>
    </main>
  );
}
