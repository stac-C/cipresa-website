import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Leaf, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const hero = {
  eyebrow: 'CIPRESA',
  title: 'Une expérience marketing claire et professionnelle',
  description:
    'Explorez nos pages avec un design uniforme, des sections structurées et des mises en forme cohérentes pour offrir un rendu plus moderne et rassurant.',
};

const highlights = [
  { icon: Leaf, label: 'Design cohérent', value: 'Harmonie' },
  { icon: ShieldCheck, label: 'Navigation fluide', value: 'Clarté' },
  { icon: TrendingUp, label: 'Expérience plus riche', value: 'Impact' },
];

export function MarketingPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5fcf6] text-[#16331a]">
      <section className="relative isolate min-h-[420px] overflow-hidden bg-[#106b07] pt-24 pb-16 text-white sm:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banner image.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,5,0.78)_0%,rgba(16,135,8,0.28)_52%,rgba(12,95,7,0.52)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#051a05]/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-emerald-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {hero.eyebrow}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50/90 sm:text-xl">
                {hero.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/15 bg-white/[0.12] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.16]">
                    <div className="flex items-center gap-2 text-emerald-200">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      <main className="marketing-main">
        <div className="marketing-panel rounded-[32px] border border-emerald-100 bg-white/95 p-6 shadow-[0_25px_90px_-30px_rgba(17,135,8,0.2)] backdrop-blur-sm sm:p-8 lg:p-10">
          {children}
        </div>
      </main>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-emerald-100 bg-[#0d5f08] p-8 text-white shadow-[0_20px_80px_-30px_rgba(17,135,8,0.35)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-emerald-100">
                <Cpu className="h-4 w-4" />
                Design professionnel
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Un style harmonisé pour chaque page marketing
              </h2>
              <p className="mt-3 text-lg leading-8 text-emerald-50/90">
                Les pages marketing présentent désormais un look plus soigné, une hiérarchie claire et un rendu plus engageant pour vos visiteurs.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-cipresa-700 transition hover:bg-emerald-50"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
