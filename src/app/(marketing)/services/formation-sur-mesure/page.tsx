import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formation sur mesure',
  description: 'Service : Formation sur mesure.',
};

export default function FormationSurMesurePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Formation sur mesure</h1>
      <p>Page service « Formation sur mesure ». Contenu à structurer.</p>
    </main>
  );
}
