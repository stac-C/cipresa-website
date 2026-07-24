'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CourseCategoryPageTemplateProps = {
  title: string;
  intro: string;
  outcomes: string[];
  level?: string;
  imageTitle?: string;
  imageDescription?: string;
};

export default function CourseCategoryPageTemplate({
  title,
  intro,
  outcomes,
  level = 'Niveau intermédiaire',
  imageTitle = 'Illustration de la formation',
  imageDescription = 'Zone d’image prête à recevoir une photographie de cours, d’un champ ou d’une démonstration pratique.',
}: CourseCategoryPageTemplateProps) {
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
        className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cipresa-50 p-6 sm:p-8 lg:p-10"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge variant="success" className="mb-4">
              Formation CIPRESA
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{intro}</p>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {level}
            </div>
          </div>

          <motion.div
            animate={isMounted && !reduceMotion ? { y: [0, -6, 0] } : {}}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-[24px] border border-dashed border-cipresa-200 bg-white/80 p-5 shadow-sm"
          >
            <div className="flex h-52 items-center justify-center rounded-[20px] bg-gradient-to-br from-cipresa-50 to-emerald-50 text-center text-slate-600">
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-cipresa-700 shadow-sm">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{imageTitle}</p>
                <p className="max-w-xs text-xs leading-6 text-slate-500">{imageDescription}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2">
        {outcomes.map((item) => (
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
            <h2 className="text-2xl font-semibold text-slate-950">Vous souhaitez vous inscrire ou obtenir plus d’informations ?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Notre équipe vous aide à choisir le bon parcours selon votre niveau, vos objectifs et votre contexte professionnel.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-cipresa-600 text-white hover:bg-cipresa-700">
                Contacter un conseiller
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                Retour au catalogue
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
