import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Informations sur les certifications proposées.',
};

export default function CertificationsPage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Certifications</h1>
      <p>Informations sur les certifications disponibles. Contenu à ajouter.</p>
    </main>
  );
}
