import type { ReactNode } from 'react';

export function PageContentWrapper({
  title,
  intro,
  contentPanel = true,
  children,
}: {
  title?: string;
  intro?: string;
  contentPanel?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      {title || intro ? (
        <section className="agri-panel rounded-[2px] bg-[#f8fff8] p-8 shadow-[0_20px_70px_-30px_rgba(17,135,8,0.18)] sm:p-10">
          {title ? <h1 className="text-3xl font-semibold text-[#16331a] sm:text-4xl">{title}</h1> : null}
          {intro ? <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4f6b4f]">{intro}</p> : null}
        </section>
      ) : null}

      {contentPanel ? (
        <section className="agri-panel rounded-[2px] bg-white/95 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          {children}
        </section>
      ) : (
        children
      )}

    </div>
  );
}
