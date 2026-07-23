import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intrants & Engrais',
  description: 'Produits: Intrants et engrais.',
};

export default function IntrantsEngraisPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Intrants & Engrais</h1>
      <p>Page catégorie « Intrants & Engrais ». Contenu à structurer.</p>
    </main>
  );
}
