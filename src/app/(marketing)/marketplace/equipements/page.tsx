import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Équipements | CIPRESA',
  description:
    'Équipements agricoles pour renforcer l’efficacité de vos opérations, la productivité et la qualité de travail sur le terrain.',
};

export default function EquipementsPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Équipements"
      intro="Cette page présente les outils et équipements utiles pour moderniser une exploitation, améliorer la cadence de travail et sécuriser la qualité des opérations agricoles."
      highlights={[
        'Matériel agricole adapté à la réalité des exploitations locales.',
        'Solutions pour le travail au champ, la manutention et la préparation des parcelles.',
        'Possibilité d’association avec conseil et support technique.',
        'Réponse concrète aux besoins de performance et de fiabilité.',
      ]}
      imageTitle="Équipement agricole"
      imageDescription="Image d’un outil, d’un matériel agricole ou d’un atelier d’utilisation."
      secondaryImageTitle="Travail de terrain"
      secondaryImageDescription="Zone visuelle pour un équipement en usage sur une exploitation."
    />
  );
}
