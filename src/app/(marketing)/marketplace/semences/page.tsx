import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Semences | CIPRESA',
  description:
    'Découvrez des semences adaptées à la production agricole locale, avec des conseils sur le choix, la qualité et les meilleures pratiques.',
};

export default function SemencesPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Semences"
      intro="Nos semences sont sélectionnées pour répondre aux besoins réels des exploitations agricoles, avec un équilibre entre productivité, qualité et adaptation au contexte local."
      highlights={[
        'Semences adaptées aux conditions agro-climatiques de votre zone.',
        'Choix orienté rendement, tolérance et qualité de germination.',
        'Conseils sur le bon dosage, les pratiques de semis et le suivi.',
        'Approche commerciale simple, saine et orientée performance.',
      ]}
      imageTitle="Lot de semences"
      imageDescription="Image d’un lot de semences, d’un sac ou d’un conditionnement de produit."
      secondaryImageTitle="Semis et rendement"
      secondaryImageDescription="Zone visuelle dédiée à un champ, un semis ou un rendement agricole."
    />
  );
}
