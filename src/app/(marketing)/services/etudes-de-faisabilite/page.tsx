import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Etudes de faisabilite',
  description: 'Service : Etudes de faisabilite.',
};

export default function EtudesFaisabilitePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Etudes de faisabilite</h1>
      <p>Page service « Etudes de faisabilite ». Contenu à structurer.</p>
    </main>
  );
}
