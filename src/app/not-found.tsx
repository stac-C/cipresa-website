'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-16">
        <div className="relative w-full max-w-2xl rounded-[32px] border border-slate-200/80 bg-white/90 p-8 text-center shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
          <AnimatedSection direction="scale">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#118708] shadow-lg shadow-[#118708]/20"
            >
              <Search className="h-9 w-9 text-white" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#118708]"
            >
              Erreur 404
            </motion.p>
            <h1 className="mb-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Cette page n’est plus à l’endroit attendu
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-slate-600">
              Le contenu a peut-être été déplacé ou supprimé. Vous pouvez reprendre votre navigation depuis l’accueil ou consulter directement nos formations, notre boutique ou notre page de contact.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Link href="/">
                <Button icon={Home} size="lg">
                  Retour à l’accueil
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" icon={ArrowRight} iconPosition="right" size="lg">
                  Voir les formations
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <Link href="/courses" className="transition-colors hover:text-[#118708]">
                Formations
              </Link>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <Link href="/marketplace" className="transition-colors hover:text-[#118708]">
                Boutique
              </Link>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <Link href="/contact" className="transition-colors hover:text-[#118708]">
                Contact
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
