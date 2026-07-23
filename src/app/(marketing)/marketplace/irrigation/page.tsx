import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Irrigation',
  description: 'Produits: Irrigation.',
};

export default function IrrigationPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Irrigation</h1>
      <p>Page catégorie « Irrigation ». Contenu à structurer.</p>
    </main>
  );
}
