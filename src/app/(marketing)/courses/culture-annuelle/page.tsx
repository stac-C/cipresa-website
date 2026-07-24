import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Culture annuelle | CIPRESA',
  description:
    'Formation sur la culture annuelle : planification, semis, conduite de culture et optimisation des rendements.',
};

export default function CultureAnnuellePage() {
  return (
    <CourseCategoryPageTemplate
      title="Culture annuelle"
      intro="Cette formation permet de comprendre les principes de base et les bonnes pratiques pour conduire une culture annuelle avec efficacité, maîtrise des intrants et amélioration des rendements."
      level="Niveau débutant à intermédiaire"
      outcomes={[
        'Identifier les étapes clés du cycle de production d’une culture annuelle.',
        'Maîtriser les pratiques de préparation du sol, semis et suivi agronomique.',
        'Optimiser la gestion de l’eau, des intrants et des ressources disponibles.',
        'Améliorer la planification et la rentabilité au champ.',
      ]}
      imageTitle="Culture annuelle"
      imageDescription="Zone d’image prête pour une photo d’un champ, d’un semis ou d’un travail de terrain."
    />
  );
}
