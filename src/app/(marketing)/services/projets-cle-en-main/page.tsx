import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets cle en main',
  description: 'Service : Projets clé en main.',
};

export default function ProjetsCleEnMainPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Projets clé en main</h1>
      <p>Page service « Projets clé en main ». Contenu à structurer.</p>
    </main>
  );
}
