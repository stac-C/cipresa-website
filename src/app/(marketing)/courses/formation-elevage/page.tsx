import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formation elevage',
  description: 'Formation : Elevage.',
};

export default function FormationElevagePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Formation élevage</h1>
      <p>Contenu de la formation élevage à structurer.</p>
    </main>
  );
}
