import type { Metadata } from 'next';
import ServicePageTemplate from '../ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Maintenance | CIPRESA',
  description:
    'Maintenance et support pour vos équipements, infrastructures et solutions agricoles, afin de sécuriser vos opérations.',
};

export default function MaintenancePage() {
  return (
    <ServicePageTemplate
      title="Maintenance"
      intro="Nous assurons un soutien technique et une maintenance structurée pour vos équipements et infrastructures agricoles, afin de préserver leur performance et leur durabilité."
      highlights={[
        'Maintenance préventive et corrective des équipements agricoles.',
        'Vérification, diagnostic des pannes et optimisation des installations.',
        'Support technique pour réduire les temps d’arrêt et sécuriser la production.',
        'Plan d’entretien adapté à votre environnement et à votre niveau d’activité.',
      ]}
      imageTitle="Maintenance terrain"
      imageDescription="Zone d’image destinée à un équipement, un chantier de maintenance ou un support technique."
    />
  );
}
