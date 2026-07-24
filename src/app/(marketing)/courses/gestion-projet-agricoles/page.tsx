import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Gestion de projet agricole | CIPRESA',
  description:
    'Formation sur la gestion de projet agricole : planification, coordination, suivi et pilotage d’initiatives agricoles.',
};

export default function GestionProjetAgricolesPage() {
  return (
    <CourseCategoryPageTemplate
      title="Gestion de projet agricole"
      intro="Cette formation aide les acteurs agricoles à structurer leurs projets, cadrer les ressources, suivre les étapes et mieux piloter les résultats."
      level="Niveau avancé"
      outcomes={[
        'Mettre en place une planification de projet claire et réaliste.',
        'Coordonner les ressources humaines, techniques et financières.',
        'Suivre les livrables, les délais et les indicateurs de performance.',
        'Améliorer la gestion des risques et la réussite des initiatives agricoles.',
      ]}
      imageTitle="Gestion de projet"
      imageDescription="Zone d’image pour un tableau de bord, un planning ou un schéma de coordination projet."
    />
  );
}
