import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maintenance',
  description: 'Service : Maintenance.',
};

export default function MaintenancePage() {
  return (
    <main className="prose mx-auto py-12 px-5 sm:px-8">
      <h1>Maintenance</h1>
      <p>Page service « Maintenance ». Contenu à structurer.</p>
    </main>
  );
}
