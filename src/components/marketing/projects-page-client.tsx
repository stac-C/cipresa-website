'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, ImageIcon, Leaf, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pillars = [
  'Conception de projets alignés sur les ressources et les réalités du terrain.',
  'Mise en œuvre structurée avec suivi des livrables et des indicateurs de performance.',
  'Accompagnement des acteurs pour sécuriser la rentabilité et la durabilité des initiatives.',
  'Coordination multi-parties pour un projet plus fluide, plus fiable et plus impactant.',
];

const testimonialsImages = [
  { src: '/images/testimonials/user1.jpg', title: 'Témoignage 1', description: 'Un accompagnement qui transforme un projet en trajectoire exploitable.' },
  { src: '/images/testimonials/user2.jpg', title: 'Témoignage 2', description: 'Une meilleure organisation du travail et une meilleure lisibilité des résultats.' },
  { src: '/images/testimonials/user3.jpg', title: 'Témoignage 3', description: 'Des recommandations concrètes, adaptées au contexte local et au rythme de l’exploitation.' },
  { src: '/images/testimonials/user4.jpg', title: 'Témoignage 4', description: 'Une approche plus cadrée, plus durable et plus rassurante pour l’équipe.' },
];

const plantImages = [
  { src: '/images/plants/avocado-tree.jpg', title: 'Culture fruitière', description: 'Porte-greffe et arbre fruitier : un appui sur la qualité de production.' },
  { src: '/images/plants/maize.jpg', title: 'Maïs', description: 'Des choix techniques qui améliorent la performance productive.' },
  { src: '/images/plants/tomato.jpg', title: 'Tomate', description: 'Des modèles de culture plus robustes et plus orientés rendement.' },
];

export function ProjectsPageClient() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
        className="rounded-[28px] border border-emerald-100 bg-cipresa-50 p-6 sm:p-8 lg:p-10"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge variant="success" className="mb-4">
              Projets agricoles
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
              Des projets agricoles pensés pour aller du terrain à la performance
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              CIPRESA accompagne les porteurs de projets agricoles dans leur conception, leur mise en œuvre et leur suivi afin de maximiser les chances de réussite structurée.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[24px] border border-dashed border-cipresa-200 bg-white/80 p-4 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center rounded-[20px] bg-cipresa-50 text-center text-slate-600">
                <div className="space-y-2">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cipresa-700 shadow-sm">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Illustration du projet</p>
                  <p className="max-w-[10rem] text-xs leading-6 text-slate-500">Zone image prête pour une vue terrain, un plan ou un chantier agricole.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-[24px] border border-dashed border-cipresa-200 bg-white/80 p-4 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center rounded-[20px] bg-[#fff8ef] text-center text-slate-600">
                <div className="space-y-2">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Projet en action</p>
                  <p className="max-w-[10rem] text-xs leading-6 text-slate-500">Deuxième zone animée pour une mise en scène du chantier ou du parcellaire.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2">
        {pillars.map((item) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-cipresa-700">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Références visuelles</p>
            <p className="text-xs text-slate-500">Témoignages et cultures déjà présentes dans la plateforme</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonialsImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.05, ease: 'easeOut' }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900">{image.title}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4">
            {plantImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: index * 0.06, ease: 'easeOut' }}
                className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 md:grid-cols-[140px_1fr]"
              >
                <div className="relative h-36 md:h-full">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900">{image.title}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-cipresa-700">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-950">Vous avez un projet agricole à lancer ou renforcer ?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Nous vous aidons à concevoir un projet réaliste, fiable et orienté résultats, avec un support sur la mise en œuvre et le suivi.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-cipresa-600 text-white hover:bg-cipresa-700">
                Discuss initiale
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Voir nos services
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
