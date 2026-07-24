import type { Metadata } from 'next';
import ServicePageTemplate from '../ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Formation sur mesure | CIPRESA',
  description:
    'Des formations agricoles sur mesure pour renforcer les compétences techniques, managériales et opérationnelles de vos équipes.',
};

export default function FormationSurMesurePage() {
  return (
    <ServicePageTemplate
      title="Formation sur mesure"
      intro="Notre service de formation sur mesure est conçu pour répondre aux besoins précis des agriculteurs, gestionnaires, équipes techniques et organisations agricoles."
      highlights={[
        'Programmes adaptés à vos cibles, votre niveau et vos objectifs.',
        'Approche pratique, concrète et ancrée dans le contexte agricole africain.',
        'Accompagnement hybride : sessions, supports, démonstrations et coaching.',
        'Renforcement des compétences pour plus de performance et d’autonomie.',
      ]}
      imageTitle="Formation terrain"
      imageDescription="Zone d’image prêt à accueillir une photographie de formation sur le terrain ou en salle."
    />
  );
}
