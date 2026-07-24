import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Culture pérenne | CIPRESA',
  description:
    'Formation dédiée aux cultures pérennes, leur gestion, leur entretien et leur contribution à une agriculture durable.',
};

export default function CulturePerennePage() {
  return (
    <CourseCategoryPageTemplate
      title="Culture pérenne"
      intro="Cette catégorie de formation aborde la mise en place, l’entretien et la valorisation des cultures pérennes pour renforcer la durabilité des exploitations agricoles."
      level="Niveau intermédiaire"
      outcomes={[
        'Comprendre les spécificités des cultures pérennes sur le long terme.',
        'Mettre en œuvre des pratiques de gestion durable des arbres et plantations.',
        'Évaluer les besoins en entretien, irrigation et protection.',
        'Préparer une stratégie de production pérenne plus résiliente et rentable.',
      ]}
      imageTitle="Culture pérenne"
      imageDescription="Zone d’image pour une plantation, un verger ou une illustration de production pérenne."
    />
  );
}
