import { PageContentWrapper } from '@/components/marketing/page-content-wrapper';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50/80 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageContentWrapper title="Catalogue de formations" intro="Retrouvez nos parcours de formation structurés pour vous aider à acquérir des compétences agricoles concrètes et opérationnelles.">
          {children}
        </PageContentWrapper>
      </div>
    </div>
  );
}
