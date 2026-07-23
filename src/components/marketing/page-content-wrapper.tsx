import type { ReactNode } from 'react';

export function PageContentWrapper({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      {title || intro ? (
        <section className="rounded-[28px] border border-slate-200/80 bg-white/95 p-8 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.25)] sm:p-10">
          {title ? <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1> : null}
          {intro ? <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{intro}</p> : null}
        </section>
      ) : null}

      <section className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-[0_25px_90px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8 lg:p-10">
        {children}
      </section>

      <section className="rounded-[32px] border border-emerald-100 bg-gradient-to-br from-cipresa-950 via-cipresa-900 to-slate-900 p-8 text-white shadow-[0_20px_80px_-30px_rgba(15,23,42,0.7)] sm:p-10 lg:p-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Uniformité visuelle</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Un rendu cohérent pour l’ensemble de la plateforme</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
            Chaque page conserve son contenu métier tout en bénéficiant d’un design moderne, aéré et facile à lire.
          </p>
        </div>
      </section>
    </div>
  );
}
