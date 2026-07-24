import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Formation élevage | CIPRESA',
  description:
    'Formation en élevage : santé animale, gestion de troupeau, alimentation et amélioration des performances.',
};

export default function FormationElevagePage() {
  return (
    <CourseCategoryPageTemplate
      title="Formation élevage"
      intro="Cette formation permet d’acquérir les fondamentaux de la gestion d’un troupeau, avec une attention particulière à la santé animale, l’alimentation et la performance globale."
      level="Niveau intermédiaire"
      outcomes={[
        'Comprendre les bases de la gestion de troupeau et de la conduite d’élevage.',
        'Mieux piloter l’alimentation, la santé animale et les conditions d’élevage.',
        'Identifier les leviers d’amélioration de la productivité.',
        'Mettre en place des pratiques plus performantes et plus sûres.',
      ]}
      imageTitle="Élevage"
      imageDescription="Zone d’image dédiée à un élevage, un troupeau ou une illustration de gestion animale."
    />
  );
}
