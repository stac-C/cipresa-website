import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kits & Outils',
  description: 'Produits: Kits & Outils.',
};

export default function KitsOutilsPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Kits & Outils</h1>
      <p>Page catégorie « Kits & Outils ». Contenu à structurer.</p>
    </main>
  );
}
