import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semences',
  description: 'Produits: Semences.',
};

export default function SemencesPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Semences</h1>
      <p>Page catégorie « Semences ». Contenu à structurer.</p>
    </main>
  );
}
