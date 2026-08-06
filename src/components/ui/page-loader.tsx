'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export type PageLoaderVariant =
  | 'courseGrid'
  | 'productGrid'
  | 'plantGrid'
  | 'dashboard'
  | 'table'
  | 'detail'
  | 'blogList'
  | 'pathList';

const skeletonSizes: Record<PageLoaderVariant, number> = {
  courseGrid: 8,
  productGrid: 8,
  plantGrid: 6,
  dashboard: 4,
  table: 6,
  detail: 1,
  blogList: 5,
  pathList: 5,
};

const variantClasses: Record<PageLoaderVariant, string> = {
  courseGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  productGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  plantGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  dashboard: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  table: 'grid-cols-1',
  detail: 'grid-cols-1 gap-6',
  blogList: 'grid-cols-1 gap-5',
  pathList: 'grid-cols-1 md:grid-cols-2 gap-5',
};

const labelByVariant: Record<PageLoaderVariant, string> = {
  courseGrid: 'Chargement des formations...',
  productGrid: 'Chargement des produits...',
  plantGrid: 'Chargement des plantes...',
  dashboard: 'Préparation de votre tableau de bord...',
  table: 'Chargement des données...',
  detail: 'Préparation de la page...',
  blogList: 'Chargement des articles...',
  pathList: 'Chargement des parcours...',
};

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl bg-slate-200/80 dark:bg-slate-800', className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 shimmer" />
    </div>
  );
}

export function PageLoader({ variant, label }: { variant: PageLoaderVariant; label?: string }) {
  const count = skeletonSizes[variant];
  const items = Array.from({ length: count });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="min-h-[360px] px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 rounded-[32px] border border-cipresa-200 bg-white/90 p-6 shadow-[0_12px_38px_rgba(17,99,181,0.08)] dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mb-4 h-6 w-64 rounded-full bg-slate-200 dark:bg-slate-800" />
            <p className="text-sm text-slate-500 dark:text-slate-400">{label ?? labelByVariant[variant]}</p>
          </div>

          <div className={cn('grid gap-6', variantClasses[variant])}>
            {items.map((_, index) => {
              if (variant === 'courseGrid' || variant === 'productGrid' || variant === 'plantGrid') {
                return (
                  <div key={index} className="space-y-4 rounded-[28px] border border-slate-200/60 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                    <SkeletonBlock className="h-44 rounded-[24px]" />
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-4 w-1/2" />
                    <div className="flex items-center gap-3">
                      <SkeletonBlock className="h-9 w-9 rounded-full" />
                      <SkeletonBlock className="h-4 w-24 rounded-full" />
                    </div>
                  </div>
                );
              }

              if (variant === 'dashboard') {
                return (
                  <div key={index} className="rounded-[28px] border border-slate-200/60 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                    <SkeletonBlock className="h-8 w-28 mb-4" />
                    <SkeletonBlock className="h-10 w-full mb-3" />
                    <SkeletonBlock className="h-3 w-2/3" />
                  </div>
                );
              }

              if (variant === 'table') {
                return (
                  <div key={index} className="flex items-center gap-4 rounded-[24px] border border-slate-200/60 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                    <SkeletonBlock className="h-12 w-12 rounded-2xl" />
                    <div className="flex-1 space-y-3">
                      <SkeletonBlock className="h-4 w-3/4" />
                      <SkeletonBlock className="h-3 w-1/2" />
                    </div>
                    <SkeletonBlock className="h-8 w-20 rounded-full" />
                  </div>
                );
              }

              if (variant === 'detail') {
                return (
                  <div key={index} className="rounded-[32px] border border-slate-200/60 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                    <SkeletonBlock className="h-8 w-3/4 mb-4" />
                    <SkeletonBlock className="h-52 rounded-[28px] mb-5" />
                    <SkeletonBlock className="h-4 w-5/6 mb-3" />
                    <SkeletonBlock className="h-4 w-2/3 mb-3" />
                    <SkeletonBlock className="h-16 rounded-[20px]" />
                  </div>
                );
              }

              if (variant === 'blogList' || variant === 'pathList') {
                return (
                  <div key={index} className="space-y-3 rounded-[28px] border border-slate-200/60 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                    <SkeletonBlock className="h-5 w-3/4" />
                    <SkeletonBlock className="h-4 w-2/3" />
                    <SkeletonBlock className="h-4 w-1/2" />
                  </div>
                );
              }

              return <div key={index} />;
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
