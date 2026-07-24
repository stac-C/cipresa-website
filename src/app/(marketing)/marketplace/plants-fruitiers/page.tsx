import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Plants fruitiers | CIPRESA',
  description:
    'Des plants fruitiers de qualité pour les vergers, les exploitations et les agriculteurs en quête de production pérenne.',
};

export default function PlantsFruitiersPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Plants fruitiers"
      intro="Cette catégorie met à votre disposition des plants fruitiers de qualité pour lancer ou développer des productions pérennes fiables et rentables."
      highlights={[
        'Plants fruitiers sélectionnés pour la qualité de la pousse et de la reprise.',
        'Adaptation aux zones de production et aux objectifs de diversification.',
        'Conseil sur l’installation, la conduite et la gestion à court et long terme.',
        'Support pour une production fruitière durable et performante.',
      ]}
      imageTitle="Plants fruitiers"
      imageDescription="Image d’un jeune plant, d’un verger ou d’un lot de plants végétaux."
      secondaryImageTitle="Verger en croissance"
      secondaryImageDescription="Illustration d’un verger, d’une plantation ou d’un jardin fruitier."
    />
  );
}
