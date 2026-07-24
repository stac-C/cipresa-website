import type { Metadata } from 'next';
import { ProjectsPageClient } from '@/components/marketing/projects-page-client';

export const metadata: Metadata = {
  title: 'Projets | CIPRESA',
  description: 'Découvrez nos projets agricoles, nos réalisations et notre accompagnement clé en main sur terrain.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
