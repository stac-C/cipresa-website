import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { BookOpen, Users, Shield, Zap } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de CIPRESA Consulting SARL et informations juridiques de la plateforme.',
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

const aspects = [
  {
    title: 'Contenu et propriété',
    description: 'Tous les contenus sont protégés par les droits d\'auteur et ne peuvent être reproduits sans permission.',
    icon: BookOpen,
    image: '/images/categories/perennial.jpg',
  },
  {
    title: 'Responsabilités utilisateur',
    description: 'Vous êtes responsable de vos actions et de respecter les règles de la plateforme.',
    icon: Users,
    image: '/images/categories/livestock.jpg',
  },
  {
    title: 'Sécurité et respect',
    description: 'Nous appliquons des mesures strictes contre le contenu interdit et les abus.',
    icon: Shield,
    image: '/images/categories/tools.jpg',
  },
  {
    title: 'Évolution des conditions',
    description: 'Ces conditions peuvent être mises à jour et nous vous informerons des changements.',
    icon: Zap,
    image: '/images/categories/vegetable.jpg',
  },
];

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="pt-20">
        <div className="relative overflow-hidden bg-cipresa-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_35%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="info" className="bg-white/10 text-white border-white/10">Legal</Badge>
                <h1 className="text-4xl sm:text-5xl font-bold">Mentions légales</h1>
                <p className="max-w-2xl text-white/70 text-lg leading-relaxed">
                  Retrouvez toutes les informations légales nécessaires pour utiliser la plateforme CIPRESA en toute confiance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/privacy"><Button size="lg">Voir la confidentialité</Button></Link>
                  <Link href="/contact"><Button variant="secondary" size="lg">Nous contacter</Button></Link>
                </div>
              </div>
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl shadow-cipresa-950/40">
                <Image
                  src="/images/hero/market-hero.jpg"
                  alt="Mentions légales CIPRESA"
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
                  Nos mentions légales expliquent clairement l\'usage des services, les responsabilités et la protection des utilisateurs.
                </p>
              </div>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {aspects.map((aspect) => {
                  const Icon = aspect.icon;
                  return (
                    <StaggerItem key={aspect.title}>
                      <Card className="h-full border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
                        <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-200">
                          <Image
                            src={aspect.image}
                            alt={aspect.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-cipresa-500 flex items-center justify-center text-white shadow-lg">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <CardContent className="flex-1 flex flex-col p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{aspect.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed flex-1">{aspect.description}</p>
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
                  alt="Éditeur et hébergement"
                  width={640}
                  height={520}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 640px"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Éditeur et hébergement</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  CIPRESA Consulting SARL est l\'éditeur du site. Notre hébergeur assure un service performant, sécurisé et conforme.
                </p>
                <ul className="space-y-3 text-gray-600">
                  {[
                    'Conformité RGPD et protection des données',
                    'Infrastructure sécurisée et sauvegardée',
                    'Support technique dédié',
                    'Audits de sécurité réguliers',
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
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Propriété intellectuelle</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Les contenus du site sont protégés et ne peuvent être reproduits sans autorisation expresse.
                </p>
                <div className="space-y-3 text-gray-600">
                  {[
                    'Reproduction interdite sans permission',
                    'Utilisation à des fins personnelles seulement',
                    'Droits d\'auteur préservés',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cipresa-500 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg h-64 sm:h-80 lg:h-auto">
                <Image
                  src="/images/categories/tools.jpg"
                  alt="Propriété intellectuelle"
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Responsabilités</h2>
              <StaggerContainer className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Garanties limitées', desc: 'CIPRESA fait son maximum pour assurer la fiabilité.' },
                  { title: 'Limitations', desc: 'Nous ne pouvons garantir l\'absence totale d\'erreurs.' },
                  { title: 'Services en l\'état', desc: 'Les services sont fournis sans garantie implicite.' },
                  { title: 'Indemnisation', desc: 'L\'utilisateur indemnise CIPRESA en cas de litige lié à ses usages.' },
                ].map((item) => (
                  <StaggerItem key={item.title}>
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow h-full">
                      <CardContent className="space-y-3 p-6">
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
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
                    Retrouvez les principales sections de la plateforme pour poursuivre votre visite en toute simplicité.
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
            <div className="rounded-2xl sm:rounded-[2rem] bg-[#118708] p-8 sm:p-12 lg:p-16 text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4">Une question juridique ?</h2>
              <p className="mx-auto max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                Contactez-nous pour toute question sur l\'utilisation du site, les mentions légales ou la protection de vos droits.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact"><Button size="lg">Contactez-nous</Button></Link>
                <Link href="/privacy"><Button variant="secondary" size="lg">Voir la confidentialité</Button></Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}
