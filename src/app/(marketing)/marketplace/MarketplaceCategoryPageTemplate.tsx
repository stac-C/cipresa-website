'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ImageIcon, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type MarketplaceCategoryPageTemplateProps = {
  title: string;
  intro: string;
  highlights: string[];
  imageTitle?: string;
  imageDescription?: string;
  secondaryImageTitle?: string;
  secondaryImageDescription?: string;
};

export default function MarketplaceCategoryPageTemplate({
  title,
  intro,
  highlights,
  imageTitle = 'Image produit',
  imageDescription = 'Zone d’image prête à accueillir une photographie métier pour mettre en avant les produits.',
  secondaryImageTitle = 'Démonstration visuelle',
  secondaryImageDescription = 'Deuxième zone animée pour présenter un usage, un rendu terrain ou un pack produit.',
}: MarketplaceCategoryPageTemplateProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  return (
    <div className="space-y-8">
      <motion.section
        initial={isMounted ? { opacity: 0, y: 14 } : false}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
        className="rounded-[28px] border border-emerald-100 bg-cipresa-50 p-6 sm:p-8 lg:p-10"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge variant="success" className="mb-4">
              Boutique agricole
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{intro}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              animate={isMounted && !reduceMotion ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[24px] border border-dashed border-cipresa-200 bg-white/80 p-4 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center rounded-[20px] bg-cipresa-50 text-center text-slate-600">
                <div className="space-y-2">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cipresa-700 shadow-sm">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{imageTitle}</p>
                  <p className="max-w-[10rem] text-xs leading-6 text-slate-500">{imageDescription}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={isMounted && !reduceMotion ? { y: [0, 8, 0] } : {}}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[24px] border border-dashed border-cipresa-200 bg-white/80 p-4 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center rounded-[20px] bg-[#fff8ef] text-center text-slate-600">
                <div className="space-y-2">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{secondaryImageTitle}</p>
                  <p className="max-w-[10rem] text-xs leading-6 text-slate-500">{secondaryImageDescription}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <motion.article
            key={item}
            initial={isMounted ? { opacity: 0, y: 10 } : false}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-cipresa-700" />
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <motion.section
        initial={isMounted ? { opacity: 0, y: 12 } : false}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Trouver le bon produit pour votre exploitation</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Notre marketplace vous aide à sélectionner rapidement les produits adaptés à vos besoins, votre culture et votre niveau d’exploitation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-cipresa-600 text-white hover:bg-cipresa-700">
                Commander ou demander un conseil
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" size="lg">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
