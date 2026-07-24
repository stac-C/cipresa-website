import type { Metadata } from 'next';
import CourseCategoryPageTemplate from '../CourseCategoryPageTemplate';

export const metadata: Metadata = {
  title: 'Certifications | CIPRESA',
  description:
    'Découvrez les certifications et les parcours de validation proposés par CIPRESA pour renforcer les compétences agricoles et professionnelles.',
};

export default function CertificationsPage() {
  return (
    <CourseCategoryPageTemplate
      title="Certifications"
      intro="Nos certifications visent à valider les compétences acquises, renforcer la crédibilité professionnelle et ouvrir de nouvelles opportunités de développement."
      level="Niveau certifiant"
      outcomes={[
        'Valider les compétences acquises dans les domaines agricoles visés.',
        'Renforcer la crédibilité des parcours professionnels et institutionnels.',
        'Créer un repère de qualité pour les apprenants et les partenaires.',
        'Faciliter la progression vers des responsabilités plus larges.',
      ]}
      imageTitle="Certification"
      imageDescription="Zone d’image dédiée à un certificat, un parcours de validation ou une réalisation professionnelle."
    />
  );
}
