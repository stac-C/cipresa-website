import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Kits & outils | CIPRESA',
  description:
    'Kits et outils agricoles pour faciliter les opérations, renforcer la productivité et stimuler l’efficacité sur le terrain.',
};

export default function KitsOutilsPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Kits & outils"
      intro="Cette rubrique regroupe des kits et outils pratiques conçus pour rendre les tâches agricoles plus simples, plus rapides et plus efficaces."
      highlights={[
        'Kits prêts à l’emploi pour les besoins courants des exploitations.',
        'Outils utiles pour la préparation, l’entretien et la gestion pratique du terrain.',
        'Propositions adaptées aux besoins de terrain et à la réalité de l’exploitation.',
        'Support pour gagner en temps, fiabilité et efficacité opérationnelle.',
      ]}
      imageTitle="Kits & outils"
      imageDescription="Image d’un kit, d’un ensemble d’outils ou d’un équipement de travail."
      secondaryImageTitle="Usage pratique"
      secondaryImageDescription="Zone visuelle pour un kit en service ou un usage opérationnel sur terrain."
    />
  );
}
