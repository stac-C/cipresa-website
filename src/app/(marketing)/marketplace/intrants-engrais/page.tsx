import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Intrants & engrais | CIPRESA',
  description:
    'Intrants et engrais pour renforcer la fertilité du sol, la vigueur des cultures et la performance globale des exploitations.',
};

export default function IntrantsEngraisPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Intrants & engrais"
      intro="Cette rubrique regroupe les solutions de fertilisation et d’appui agronomique nécessaires pour soutenir la croissance des cultures et sécuriser le rendement."
      highlights={[
        'Produit adaptés à la nature du sol, du cycle de culture et des objectifs de production.',
        'Appui à la nutrition des plantes et à la répartition des éléments nutritifs.',
        'Guidance sur l’usage adapté pour une efficacité maximale et un meilleur rapport coût-résultat.',
        'Contribution à une agriculture plus productive et plus durable.',
      ]}
      imageTitle="Intrants agricoles"
      imageDescription="Image d’un paquet d’engrais, d’un produit de traitement ou d’un support agronomique."
      secondaryImageTitle="Fertilité du sol"
      secondaryImageDescription="Illustration d’un champ, d’une culture saine ou d’un suivi agronomique."
    />
  );
}
