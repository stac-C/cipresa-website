import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { Lock, Shield, Database, Eye } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de CIPRESA Consulting SARL pour la protection des données personnelles.',
};

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/courses', label: 'Formations' },
  { href: '/marketplace', label: 'Boutique' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projets' },
  { href: '/encyclopedia', label: 'Ressources' },
  { href: '/about', label: 'A propos' },
  { href: '/contact', label: 'Contact' },
];

const principles = [
  {
    title: 'Collecte minimale',
    description: 'Nous recueillons uniquement les informations nécessaires au fonctionnement de la plateforme.',
    icon: Database,
    image: '/images/categories/project.jpg',
  },
  {
    title: 'Utilisation transparente',
    description: 'Chaque information est utilisée pour améliorer votre expérience et sécuriser vos échanges.',
    icon: Eye,
    image: '/images/categories/irrigation.jpg',
  },
  {
    title: 'Partage limité',
    description: 'Nous ne vendons pas vos données et nous partageons uniquement avec des partenaires fiables.',
    icon: Lock,
    image: '/images/categories/seeds.jpg',
  },
  {
    title: 'Sécurité renforcée',
    description: 'Vos données sont protégées par des mesures techniques et organisationnelles adaptées.',
    icon: Shield,
    image: '/images/categories/inputs.jpg',
  },
];

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <div className="relative overflow-hidden bg-cipresa-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,left,_var(--tw-gradient-stops))] from-cipresa-600/20 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <AnimatedSection className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="info" className="bg-white/10 text-white border-white/10">Confidentialité</Badge>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Votre confiance, notre priorité</h1>
                <p className="max-w-2xl text-white/70 text-lg leading-relaxed">
                  Chez CIPRESA, nous protégeons vos informations avec une attention maximale. Cette politique décrit comment nous collectons, stockons et utilisons vos données.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact"><Button size="lg">Nous contacter</Button></Link>
                  <Link href="/about"><Button variant="secondary" size="lg">En savoir plus</Button></Link>
                </div>
              </div>
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl shadow-cipresa-950/40">
                <Image
                  src="/images/hero/agriculture-hero.jpg"
                  alt="Protection des données agricoles"
                  width={760}
                  height={520}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 760px"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20 sm:space-y-24">
          <AnimatedSection>
            <div className="space-y-8 sm:space-y-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Principes clés</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Nous appliquons des principes stricts pour garantir la confidentialité, la sécurité et la transparence de vos données personnelles.
                </p>
              </div>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <StaggerItem key={principle.title}>
                      <Card className="h-full border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
                        <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-200">
                          <Image
                            src={principle.image}
                            alt={principle.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-cipresa-500 flex items-center justify-center text-white shadow-lg">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <CardContent className="flex-1 flex flex-col p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{principle.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed flex-1">{principle.description}</p>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg h-64 sm:h-80 lg:h-auto">
                <Image
                  src="/images/hero/training-hero.jpg"
                  alt="Confidentialité des formations"
                  width={640}
                  height={520}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Données collectées</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Nous traitons uniquement les informations indispensables pour gérer vos comptes, commandes, formations et préférences.
                </p>
                <ul className="space-y-3 text-gray-600">
                  {[
                    'Adresses email et identifiants',
                    'Historique des commandes et achats',
                    'Préférences de navigation et centres d\'intérêt',
                    'Interactions avec notre service client',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-cipresa-500 font-bold text-lg mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Partage et hébergement</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Les données sont partagées uniquement avec des partenaires de confiance pour l\'hébergement, le paiement et les services.
                </p>
                <div className="space-y-3 text-gray-600">
                  {[
                    'Hébergement sécurisé et conforme',
                    'Paiements protégés par SSL',
                    'Aucun transfert sans autorisation',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cipresa-500 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                  Nous appliquons des procédures de sécurité strictes pour protéger vos informations.
                </p>
              </div>
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg h-64 sm:h-80 lg:h-auto">
                <Image
                  src="/images/categories/inputs.jpg"
                  alt="Partage et hébergement sécurisé"
                  width={640}
                  height={520}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Vos droits</h2>
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Droit d\'accès', desc: 'Consultez vos données personnelles.' },
                  { title: 'Droit de rectification', desc: 'Corrigez les informations inexactes.' },
                  { title: 'Droit à l\'oubli', desc: 'Demandez la suppression de vos données.' },
                  { title: 'Droit à la portabilité', desc: 'Exportez vos données dans un format standard.' },
                ].map((right) => (
                  <StaggerItem key={right.title}>
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow h-full">
                      <CardContent className="space-y-3 p-6">
                        <h4 className="text-lg font-semibold text-gray-900">{right.title}</h4>
                        <p className="text-gray-600 text-sm">{right.desc}</p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl sm:rounded-[2rem] border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Liens rapides</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Retrouvez rapidement les principales sections de la plateforme pour poursuivre votre navigation.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs sm:text-sm font-medium text-gray-700 transition hover:border-cipresa-500 hover:bg-cipresa-50/70 text-center leading-tight">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center">
            <div className="rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-cipresa-900 to-gray-900 p-8 sm:p-12 lg:p-16 text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4">Besoin d\'aide ?</h2>
              <p className="mx-auto max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                Contactez notre équipe pour toute question relative à vos données ou à la gestion de votre compte sur CIPRESA.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact"><Button size="lg">Contactez-nous</Button></Link>
                <Link href="/about"><Button variant="secondary" size="lg">Découvrir CIPRESA</Button></Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
