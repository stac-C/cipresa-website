import { PageContentWrapper } from '@/components/marketing/page-content-wrapper';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50/80 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageContentWrapper title="Services professionnels" intro="Nos services sont présentés avec une structure claire et un style uniforme pour faciliter la lecture et l’action.">
          {children}
        </PageContentWrapper>
      </div>
    </div>
  );
}
