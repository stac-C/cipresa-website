import type { Metadata } from 'next';
import ServicePageTemplate from '../ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Projets clé en main | CIPRESA',
  description:
    'Des projets agricoles conçus, pilotés et livrés de manière structurée pour accélérer votre croissance et sécuriser vos résultats.',
};

export default function ProjetsCleEnMainPage() {
  return (
    <ServicePageTemplate
      title="Projets clé en main"
      intro="CIPRESA prend en charge la conception, la mise en œuvre et le pilotage de projets agricoles structurés, avec un accompagnement aligned sur vos objectifs de production, de rentabilité et de durabilité."
      highlights={[
        'Conception d’un plan de projet adapté à vos ressources et réalités terrain.',
        'Coordination des acteurs, intrants, équipements et équipes de mise en œuvre.',
        'Pilotage des phases d’exécution avec suivi des livrables et des indicateurs.',
        'Approche orientée résultats, qualité et continuité opérationnelle.',
      ]}
      imageTitle="Projet agricole livré"
      imageDescription="Zone dédiée à une illustration de chantier, de mise en œuvre ou de production agricole."
    />
  );
}
