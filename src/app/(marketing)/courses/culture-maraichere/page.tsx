import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Culture maraîchère | CIPRESA',
  description:
    'Formation sur la culture maraîchère : gestion des parcelles, planification de la production et techniques de valorisation.',
};

export default function CultureMaraicherePage() {
  return (
    <CourseCategoryPageTemplate
      title="Culture maraîchère"
      intro="Cette formation vous accompagne dans la gestion d’un jardin, d’une petite exploitation maraîchère ou d’une unité de production intensive en vue d’optimiser la productivité."
      level="Niveau intermédiaire"
      outcomes={[
        'Comprendre les cycles de production de légumes et cultures de rente.',
        'Planifier les semis, plans de rotation et calendrier d’entretien.',
        'Améliorer la qualité des récoltes et la gestion des intrants.',
        'Développer une logique de production plus rentable et durable.',
      ]}
      imageTitle="Culture maraîchère"
      imageDescription="Zone d’image prévue pour une parcelle maraîchère, une serre ou un plan de production."
    />
  );
}
