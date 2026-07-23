'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Target, Eye, Heart, Users, Award, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { teamMembers, testimonials, stats } from '@/lib/utils/data';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <Badge variant="success" className="mb-4">À propos</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Leader agricole camerounais</h1>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Depuis notre création, nous accompagnons les agriculteurs africains vers une agriculture moderne, durable et rentable.
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre histoire</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>CIPRESA Consulting est né de la vision de transformer l'agriculture africaine en combinant expertise locale, technologies modernes et formation de qualité.</p>
                <p>Basé à Yaoundé, Cameroun, nous sommes devenus une référence dans le conseil agricole, la fourniture d'intrants de qualité et la formation des agriculteurs à travers toute l'Afrique.</p>
                <p>Notre équipe d'experts agronomes et de formateurs passionnés travaille chaque jour pour offrir aux agriculteurs les outils et les connaissances nécessaires pour réussir.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10+', label: 'Années d\'expertise' },
                  { value: '2500+', label: 'Étudiants formés' },
                  { value: '85+', label: 'Produits disponibles' },
                  { value: '360h+', label: 'Formations' },
                ].map((s) => (
                  <div key={s.label} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold text-cipresa-600 mb-1">{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Target, title: 'Notre mission', desc: 'Former et équiper les agriculteurs africains avec des solutions agricoles modernes, durables et rentables pour assurer la sécurité alimentaire du continent.' },
              { icon: Eye, title: 'Notre vision', desc: 'Devenir le leader africain de l\'agri-tech éducative en créant un écosystème où chaque agriculteur a accès aux connaissances et aux ressources nécessaires pour prospérer.' },
              { icon: Heart, title: 'Nos valeurs', desc: 'Excellence, intégrité, innovation, durabilité et impact communautaire sont au cœur de chacune de nos actions.' },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <Card className="p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-7 h-7 text-cipresa-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre équipe</h2>
              <p className="text-gray-500">Des experts passionnés au service de l'agriculture africaine</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <StaggerItem key={member.id}>
                  <Card className="text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cipresa-400 to-cipresa-600 mx-auto mb-5 flex items-center justify-center text-white text-3xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-cipresa-600 dark:text-cipresa-400 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-cipresa-900 to-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.05]" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-4">Prêt à collaborer avec nous ?</h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">
                  Contactez-nous pour discuter de vos besoins agricoles et découvrir comment nous pouvons vous aider.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact"><Button size="lg" className="bg-white text-cipresa-700 hover:bg-gray-100">Nous contacter</Button></Link>
                  <Link href="/courses"><Button variant="secondary" size="lg">Explorer nos formations</Button></Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
