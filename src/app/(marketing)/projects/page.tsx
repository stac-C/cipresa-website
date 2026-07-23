import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets',
  description: 'Projets agricoles et accompagnement clé en main par CIPRESA.',
};

export default function ProjectsPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Projets</h1>
      <p>Page dédiée aux projets agricoles. Contenu à structurer.</p>
    </main>
  );
}
