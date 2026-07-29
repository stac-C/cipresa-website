'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap, Store, Tractor, Globe,
  Users, Sprout, Droplets, Hammer, Shield, TrendingUp,
  ChevronRight, Leaf, CheckCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { stats } from '@/lib/utils/data';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Formation & Conseil',
    description: 'Plus de 360h de formations en ligne avec des experts. Conseil et accompagnement personnalisé pour vos projets agricoles.',
    details: ['Cours en ligne', 'Accompagnement terrain', 'Certification', 'Mentorat individuel'],
    color: 'from-[#118708] to-[#935001]',
    href: '/courses',
  },
  {
    icon: Store,
    title: 'Semences & Intrants',
    description: 'Semences certifiées, plants de qualité et intrants agricoles adaptés au climat africain pour des rendements optimaux.',
    details: ['Semences hybrides', 'Plants fruitiers', 'Engrais bio', 'Produits phytosanitaires'],
    color: 'from-[#FAA800] to-[#935001]',
    href: '/marketplace',
  },
  {
    icon: Tractor,
    title: 'Équipement & Services',
    description: 'Outils agricoles, systèmes d\'irrigation et services de maintenance pour moderniser votre exploitation.',
    details: ['Outillage professionnel', 'Irrigation goutte-à-goutte', 'Maintenance', 'Installation'],
    color: 'from-[#118708] to-[#FAA800]',
    href: '/marketplace',
  },
  {
    icon: Globe,
    title: 'Projets & Expertise',
    description: 'De la conception à la réalisation de projets agricoles clé en main en Afrique, avec un suivi expert.',
    details: ['Études de faisabilité', 'Projets clé en main', 'Suivi-évaluation', 'Consulting'],
    color: 'from-[#935001] to-[#118708]',
    href: '/about',
  },
];

const process = [
  { step: '01', title: 'Diagnostic', desc: 'Analyse de vos besoins et de votre exploitation agricole', icon: Leaf },
  { step: '02', title: 'Conseil', desc: 'Recommandations personnalisées adaptées à votre contexte', icon: Users },
  { step: '03', title: 'Formation', desc: 'Montée en compétences via nos formations expertes', icon: GraduationCap },
  { step: '04', title: 'Équipement', desc: 'Fourniture des intrants et équipements nécessaires', icon: Droplets },
  { step: '05', title: 'Suivi', desc: 'Accompagnement continu pour garantir votre réussite', icon: TrendingUp },
];

const engagement = [
  { icon: Shield, title: 'Qualité garantie', desc: 'Tous nos produits et formations sont certifiés et validés par nos experts agronomes.' },
  { icon: Sprout, title: 'Impact durable', desc: 'Nous promouvons des pratiques agricoles durables qui préservent l\'environnement.' },
  { icon: Hammer, title: 'Support continu', desc: 'Notre équipe reste à votre disposition pour vous accompagner dans la durée.' },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-[#118708] py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-[0.04]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimatedSection className="text-center">
              <Badge variant="success" className="mb-4">Services</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Solutions complètes pour l&apos;agriculture africaine
              </h1>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                De la formation à la mise en marché, nous accompagnons les agriculteurs à chaque étape de leur développement.
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <Link href={pillar.href}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 hover:border-transparent hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full"
                  >
                    <div className="absolute inset-0 bg-cipresa-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-12 h-12 rounded-xl bg-cipresa-600 flex items-center justify-center mb-4 shadow-sm">
                      <pillar.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{pillar.description}</p>
                    <div className="space-y-1.5">
                      {pillar.details.map((d) => (
                        <div key={d} className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-cipresa-600" />
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-cipresa-600 dark:text-cipresa-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      En savoir plus <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre approche</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Un processus en 5 étapes pour garantir votre réussite agricole
              </p>
            </AnimatedSection>
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <AnimatedSection key={item.step} delay={index * 0.1} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center mx-auto mb-4 relative z-10">
                      <item.icon className="w-7 h-7 text-cipresa-500" />
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-cipresa-200 dark:from-cipresa-800" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-cipresa-600 dark:text-cipresa-400 tracking-wider">{item.step}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi nous choisir</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Des engagements forts pour une agriculture performante et durable
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {engagement.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-7 h-7 text-cipresa-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nos chiffres clés</h2>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                    <div className="text-3xl sm:text-4xl font-bold text-cipresa-600 dark:text-cipresa-400 mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection className="text-center">
            <div className="p-12 rounded-3xl bg-[#118708] relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.05]" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-4">Prêt à transformer votre exploitation ?</h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">
                  Contactez-nous pour discuter de vos besoins et découvrir comment nos services peuvent vous aider à réussir.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-cipresa-700 hover:bg-gray-100">
                      Nous contacter
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="secondary" size="lg">
                      Explorer nos formations
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
