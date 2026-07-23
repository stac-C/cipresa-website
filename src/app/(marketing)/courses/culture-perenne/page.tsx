import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culture perenne',
  description: 'Formation : Culture pérenne.',
};

export default function CulturePerennePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Culture pérenne</h1>
      <p>Contenu de la formation « Culture pérenne » à structurer.</p>
    </main>
  );
}
