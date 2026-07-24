import type { Metadata } from 'next';
import ServicePageTemplate from '../ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Suivi & évaluation | CIPRESA',
  description:
    'Suivi de performance, évaluation des résultats et ajustement des actions pour renforcer la qualité et la rentabilité agricole.',
};

export default function SuiviEvaluationPage() {
  return (
    <ServicePageTemplate
      title="Suivi & évaluation"
      intro="Nous aidons les acteurs agricoles à mesurer les résultats de leurs actions, identifier les écarts et ajuster leur stratégie pour atteindre des performances durables."
      highlights={[
        'Suivi des indicateurs de production, rendement et efficacité opérationnelle.',
        'Évaluation des impacts des actions menées sur le terrain.',
        'Analyse des écarts, recommandations d’ajustement et pilotage de la performance.',
        'Reporting structuré pour les équipes, partenaires et décideurs.',
      ]}
      imageTitle="Tableau de suivi"
      imageDescription="Zone d’image prévue pour un tableau de bord, un rapport ou une vue de performance."
    />
  );
}
