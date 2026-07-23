import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conseil agricole',
  description: 'Service : Conseil agricole.',
};

export default function ConseilAgricolePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Conseil agricole</h1>
      <p>Page service « Conseil agricole ». Contenu à structurer.</p>
    </main>
  );
}
