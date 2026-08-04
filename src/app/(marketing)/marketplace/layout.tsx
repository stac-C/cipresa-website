import { PageContentWrapper } from '@/components/marketing/page-content-wrapper';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f3fbf3] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageContentWrapper title="Boutique agricole" intro="Une marketplace structurée pour trouver semences, équipements et solutions professionnelles avec un rendu clair et cohérent.">
          {children}
        </PageContentWrapper>
      </div>
    </div>
  );
}
