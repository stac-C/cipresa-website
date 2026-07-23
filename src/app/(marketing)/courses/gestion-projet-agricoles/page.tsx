import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestion de projet agricoles',
  description: 'Formation : Gestion de projet agricoles.',
};

export default function GestionProjetAgricolesPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Gestion de projet agricoles</h1>
      <p>Contenu de la formation « Gestion de projet agricoles » à structurer.</p>
    </main>
  );
}
