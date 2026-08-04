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
        <section className="agri-panel rounded-[28px] bg-[#f8fff8] p-8 shadow-[0_20px_70px_-30px_rgba(17,135,8,0.18)] sm:p-10">
          {title ? <h1 className="text-3xl font-semibold text-[#16331a] sm:text-4xl">{title}</h1> : null}
          {intro ? <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4f6b4f]">{intro}</p> : null}
        </section>
      ) : null}

      <section className="agri-panel rounded-[32px] bg-white/95 p-6 shadow-[0_25px_90px_-30px_rgba(17,135,8,0.16)] backdrop-blur-sm sm:p-8 lg:p-10">
        {children}
      </section>

      <section className="agri-hero rounded-[32px] p-8 text-white shadow-[0_20px_80px_-30px_rgba(17,135,8,0.35)] sm:p-10 lg:p-12">
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
