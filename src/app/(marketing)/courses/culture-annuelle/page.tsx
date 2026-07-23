import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culture annuelle',
  description: 'Formation : Culture annuelle.',
};

export default function CultureAnnuellePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Culture annuelle</h1>
      <p>Contenu de la formation « Culture annuelle » à structurer.</p>
    </main>
  );
}
