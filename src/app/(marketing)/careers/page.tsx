'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, ChevronDown, Mail, Users, Target, Heart, GraduationCap, TreePalm, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

const openPositions = [
  {
    id: '1',
    title: 'Formateur en Agronomie',
    department: 'Formation',
    location: 'Yaoundé, Cameroun',
    type: 'Temps plein',
    salary: 'Competitif',
    postedAt: '2024-05-01',
    description: 'Nous recherchons un formateur passionné pour dispenser nos formations en agronomie et accompagnement technique des agriculteurs.',
    requirements: [
      'Diplôme en agronomie ou domaine connexe (Bac+5 minimum)',
      '5+ ans d\'expérience dans le conseil agricole',
      'Excellentes compétences pédagogiques et de communication',
      'Maîtrise des techniques agricoles modernes',
      'Disponible pour des déplacements terrain',
    ],
    benefits: ['Salaire compétitif', 'Formation continue', 'Véhicule de fonction', 'Téléphone professionnel'],
  },
  {
    id: '2',
    title: 'Développeur Full Stack',
    department: 'Tech & Digital',
    location: 'Yaoundé / Remote',
    type: 'Temps plein',
    salary: 'Competitif',
    postedAt: '2024-05-10',
    description: 'Renforcez notre équipe technique pour développer et maintenir notre plateforme e-learning et e-commerce.',
    requirements: [
      'Bac+5 en informatique ou équivalent',
      'Maîtrise de React, Next.js et TypeScript',
      'Expérience avec les bases de données (PostgreSQL, Supabase)',
      'Connaissance des API REST et architectures modernes',
      'Sens du travail en équipe et autonomie',
    ],
    benefits: ['Salaire compétitif', 'Travail hybride', 'Équipement high-tech', 'Formation continue'],
  },
  {
    id: '3',
    title: 'Commercial Terrain',
    department: 'Ventes & Marketing',
    location: 'Douala, Cameroun',
    type: 'Temps plein',
    salary: 'Fixe + Commissions',
    postedAt: '2024-04-15',
    description: 'Développez notre portefeuille clients et promouvez nos solutions agricoles auprès des coopératives et institutions.',
    requirements: [
      'Bac+3 en commerce ou marketing',
      '3+ ans d\'expérience dans la vente B2B',
      'Connaissance du secteur agricole',
      'Excellent relationnel et sens de la négociation',
      'Permis de conduire B',
    ],
    benefits: ['Fixe + commissions attractives', 'Véhicule de fonction', 'Téléphone + forfait', 'Primes sur objectifs'],
  },
  {
    id: '4',
    title: 'Community Manager',
    department: 'Marketing Digital',
    location: 'Yaoundé, Cameroun',
    type: 'CDD (6 mois)',
    salary: 'Competitif',
    postedAt: '2024-05-15',
    description: 'Animez notre communauté digitale et renforcez notre présence sur les réseaux sociaux.',
    requirements: [
      'Bac+3 en communication digitale',
      'Maîtrise des réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok)',
      'Créativité et sens du storytelling',
      'Capacité à produire du contenu photo/vidéo',
      'Passion pour l\'agriculture et le développement rural',
    ],
    benefits: ['Salaire compétitif', 'Travail flexible', 'Équipement professionnel', 'Formation'],
  },
];

const values = [
  { icon: Target, title: 'Impact', description: 'Nous mesurons notre succès à l\'impact positif que nous créons dans les communautés agricoles.' },
  { icon: Heart, title: 'Passion', description: 'Animés par une passion commune pour l\'agriculture et le développement de l\'Afrique.' },
  { icon: Users, title: 'Esprit d\'équipe', description: 'La collaboration et l\'entraide sont au coeur de notre culture d\'entreprise.' },
  { icon: GraduationCap, title: 'Apprentissage', description: 'Nous investissons dans la formation continue de nos collaborateurs.' },
];

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <Badge variant="success" className="mb-4">Carrières</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Rejoignez l'équipe CIPRESA</h1>
              <p className="text-white/60 max-w-2xl mx-auto">
                Contribuez à la révolution agricole africaine au sein d'une équipe passionnée et dynamique
              </p>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              CIPRESA Consulting est bien plus qu'une entreprise - nous sommes une mission. Rejoindre notre équipe, c'est contribuer à transformer l'agriculture africaine.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-center h-full hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-cipresa-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Postes ouverts</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{openPositions.length} postes disponibles</p>
              </div>
              <Link href="/contact">
                <Button variant="outline" icon={Mail} iconPosition="left">
                  Candidature spontanée
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {openPositions.map((job, idx) => (
                <motion.div
                  key={job.id}
                  layout
                  className="rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                    className="w-full flex items-start justify-between p-6 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                        <Badge variant="info" size="sm">{job.department}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      'w-5 h-5 text-gray-400 mt-1 transition-transform duration-300',
                      expandedId === job.id && 'rotate-180'
                    )} />
                  </button>

                  <AnimatePresence>
                    {expandedId === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="pt-4 space-y-6">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{job.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prérequis</h4>
                              <ul className="space-y-1.5">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                    <span className="text-cipresa-500 mt-0.5">•</span> {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Avantages</h4>
                              <div className="flex flex-wrap gap-2">
                                {job.benefits.map((b, i) => (
                                  <Badge key={i} variant="success" size="sm">{b}</Badge>
                                ))}
                              </div>
                            </div>
                            <Link href={`mailto:cipresaconsulting@gmail.com?subject=Candidature - ${job.title}`}>
                              <Button icon={ArrowRight} iconPosition="right">
                                Postuler à ce poste
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-20 p-10 rounded-2xl bg-gradient-to-br from-cipresa-600 to-blue-800 text-white text-center" delay={0.2}>
            <TreePalm className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-3">Vous ne trouvez pas le poste idéal ?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-6">
              Nous sommes toujours à la recherche de talents passionnés par l'agriculture. Envoyez-nous votre candidature spontanée.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-cipresa-700 hover:bg-gray-100 shadow-none">
                Nous contacter
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
