import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  HandHelping,
  Leaf,
  LineChart,
  Sprout,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pillars = [
  {
    icon: Sprout,
    title: 'Diagnostic agronomique',
    description:
      'Analyse de votre exploitation, de vos cultures et de vos contraintes pour prioriser les actions à fort impact.',
  },
  {
    icon: LineChart,
    title: 'Plan d’amélioration',
    description:
      'Réalisation d’un plan d’action personnalisé avec recommandations sur les intrants, la gestion et la production.',
  },
  {
    icon: BookOpenCheck,
    title: 'Formation & transfert de compétences',
    description:
      'Accompagnement des équipes et agriculteurs pour renforcer les compétences techniques et manageriales.',
  },
];

const steps = [
  {
    title: '1. Diagnostic',
    description: 'Recueil des besoins, analyse des pratiques actuelles et identification des points de blocage.',
  },
  {
    title: '2. Diagnostic terrain',
    description: 'Visite, observations agronomiques et validation des données pour bâtir une stratégie réaliste.',
  },
  {
    title: '3. Recommandations',
    description: 'Définition d’un plan opérationnel avec des priorités, indicateurs et supports d’exécution.',
  },
  {
    title: '4. Suivi',
    description: 'Suivi périodique, ajustements et conseil continu pour sécuriser les résultats sur le long terme.',
  },
];

const outcomes = [
  'Optimisation des rendements et de la rentabilité',
  'Meilleure gestion des ressources naturelles et des intrants',
  'Renforcement des compétences des producteurs et équipes',
  'Décision plus rapide grâce à un accompagnement expert',
];

function ConseilAgricol() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-emerald-100 bg-cipresa-50 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <Badge variant="success" className="mb-4">
              Service premium
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl lg:text-5xl">
              Conseil agricole pour des exploitations plus performantes
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              CIPRESA accompagne les agriculteurs, producteurs, coopératives et entreprises agricoles dans la mise en place de solutions concrètes, durables et adaptées au contexte africain.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-cipresa-700">+150</div>
              <div className="text-sm text-slate-600">Producteurs accompagnés</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-cipresa-700">4 étapes</div>
              <div className="text-sm text-slate-600">Méthode simple et structuré</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold text-cipresa-700">100%</div>
              <div className="text-sm text-slate-600">Accompagnement orienté résultat</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cipresa-50 text-cipresa-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-950">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.description}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Notre méthode de travail</h2>
          <div className="mt-6 space-y-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-cipresa-700">{step.title}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-[#118708] p-6 text-white sm:p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <HandHelping className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-semibold">Ce que vous gagnez</h2>
          <ul className="mt-5 space-y-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-sm leading-7 text-slate-100">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge variant="info" className="mb-3">
              Accompagnement sur mesure
            </Badge>
            <h2 className="text-2xl font-semibold text-slate-950">Besoin d’un conseil agricole concret ?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Nous mettons à votre disposition une équipe de spécialistes pour vous aider à mieux piloter votre activité, sécuriser vos performances et accélérer votre croissance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-cipresa-600 text-white hover:bg-cipresa-700">
                Demander un conseil
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Voir nos autres services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConseilAgricol;