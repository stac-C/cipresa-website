import Link from 'next/link';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formationTracks = [
  'Gestion de l’exploitation agricole',
  'Agriculture durable et résilience climatique',
  'Culture maraîchère et optimisation des rendements',
  'Gestion de projet et renforcement d’équipe',
];

function Formations() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cipresa-50 text-cipresa-700">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-950">Nos parcours de formation</h2>
        <div className="mt-5 space-y-3">
          {formationTracks.map((track) => (
            <div key={track} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cipresa-700" />
              <p className="text-sm leading-7 text-slate-700">{track}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-900 to-slate-900 p-6 text-white">
        <h2 className="text-2xl font-semibold">Formations pensées pour votre contexte</h2>
        <p className="mt-3 text-sm leading-7 text-slate-200">
          Nous concevons des parcours réalistes et immédiatement applicables, avec des contenus adaptés à votre niveau, votre secteur et vos objectifs de transformation.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact">
            <Button size="lg" className="bg-white text-cipresa-800 hover:bg-slate-100">
              Demander une session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Formations;