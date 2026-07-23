import { MarketingPageShell } from '@/components/marketing/marketing-shell';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <MarketingPageShell>{children}</MarketingPageShell>;
}
