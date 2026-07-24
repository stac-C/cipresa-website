import type { Metadata } from 'next';
import MarketplaceCategoryPageTemplate from '../MarketplaceCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Irrigation | CIPRESA',
  description:
    'Solutions d’irrigation pour une meilleure gestion de l’eau, un meilleur rendement et des exploitations plus résilientes.',
};

export default function IrrigationPage() {
  return (
    <MarketplaceCategoryPageTemplate
      title="Irrigation"
      intro="Nos solutions d’irrigation sont conçues pour optimiser l’usage de l’eau, réduire les pertes et renforcer la régularité de production sur les exploitations."
      highlights={[
        'Systèmes adaptés aux cultures, aux terrains et au niveau d’investissement.',
        'Gestion plus efficiente de l’eau et meilleure régularisation des besoins en culture.',
        'Contribution à la résilience climatique et à la stabilité des rendements.',
        'Support technique pour une mise en œuvre efficace et durable.',
      ]}
      imageTitle="Système d’irrigation"
      imageDescription="Image d’un réseau d’irrigation, de goutte-à-goutte ou d’un point d’eau."
      secondaryImageTitle="Gestion de l’eau"
      secondaryImageDescription="Illustration d’un champ irrigué ou d’un schéma de distribution d’eau."
    />
  );
}
