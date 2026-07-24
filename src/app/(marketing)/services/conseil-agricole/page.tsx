import type { Metadata } from 'next';
import ConseilAgricol from './ConseilAgricol';

export const metadata: Metadata = {
  title: 'Conseil agricole | CIPRESA',
  description:
    'Découvrez le service de conseil agricole de CIPRESA : diagnostic agronomique, recommandations, accompagnement et suivi pour améliorer la performance de vos exploitations.',
};

export default function ConseilAgricolePage() {
  return <ConseilAgricol />;
}
