import type { Metadata } from 'next';
import ServicePageTemplate from '../ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Études de faisabilité | CIPRESA',
  description:
    'Études de faisabilité agricole, appui à la conception de projets et évaluation des opportunités pour optimiser vos investissements.',
};

export default function EtudesFaisabilitePage() {
  return (
    <ServicePageTemplate
      title="Études de faisabilité"
      intro="Nous réalisons des études de faisabilité pour évaluer les opportunités, les risques et les conditions de réussite de vos projets agricoles avant l’investissement."
      highlights={[
        'Analyse du marché, de la demande et des zones de production.',
        'Évaluation des ressources naturelles, techniques et logistiques disponibles.',
        'Projection des coûts, revenus et scénarios de rentabilité.',
        'Cadrage du projet pour la décision et le financement.',
      ]}
      imageTitle="Vue d’étude de projet"
      imageDescription="Zone dédiée à une carte, un schéma de projet ou une illustration de faisabilité agricole."
    />
  );
}
