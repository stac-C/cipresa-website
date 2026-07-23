import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culture maraichere',
  description: 'Formation : Culture maraîchère.',
};

export default function CultureMaraicherePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Culture maraîchère</h1>
      <p>Contenu de la formation « Culture maraîchère » à structurer.</p>
    </main>
  );
}
