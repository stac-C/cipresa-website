'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Facebook, Handshake, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Liens rapides',
    links: ['Accueil', 'Formations', 'Boutique', 'Services', 'Projets', 'Ressources', 'A propos', 'Contact'],
  },
  {
    title: 'Formations',
    links: ['Culture annuelle', 'Culture maraichere', 'Culture perenne', 'Formation elevage', 'Gestion de projet agricoles', 'Certifications'],
  },
  {
    title: 'Boutique',
    links: ['Semences', 'Plants fruitiers', 'Intrants & Engrais', 'Equipements', 'Irrigation', 'Kits & Outils'],
  },
  {
    title: 'Services',
    links: ['Conseil agricole', 'Etudes de faisabilite', 'Projets cle en main', 'Suivi & Evaluation', 'Formation sur mesure', 'Maintenance'],
  },
];

export const Footer = () => {
  const router = useRouter();
  const prefetchRoute = (href: string) => {
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    try {
      router.prefetch(href);
    } catch {
      // Next.js may not support prefetch in all environments.
    }
  };

  const linkMap: Record<string, string> = {
    'Accueil': '/',
    'Formations': '/courses',
    'Boutique': '/marketplace',
    'Services': '/services',
    'Projets': '/projects',
    'Ressources': '/encyclopedia',
    'A propos': '/about',
    'Contact': '/contact',

    // Formations
    'Culture annuelle': '/courses/culture-annuelle',
    'Culture maraichere': '/courses/culture-maraichere',
    'Culture perenne': '/courses/culture-perenne',
    'Formation elevage': '/courses/formation-elevage',
    'Gestion de projet agricoles': '/courses/gestion-projet-agricoles',
    'Certifications': '/courses/certifications',

    // Boutique
    'Semences': '/marketplace/semences',
    'Plants fruitiers': '/marketplace/plants-fruitiers',
    'Intrants & Engrais': '/marketplace/intrants-engrais',
    'Equipements': '/marketplace/equipements',
    'Irrigation': '/marketplace/irrigation',
    'Kits & Outils': '/marketplace/kits-outils',

    // Services
    'Conseil agricole': '/services/conseil-agricole',
    'Etudes de faisabilite': '/services/etudes-de-faisabilite',
    'Projets cle en main': '/services/projets-cle-en-main',
    'Suivi & Evaluation': '/services/suivi-evaluation',
    'Formation sur mesure': '/services/formation-sur-mesure',
    'Maintenance': '/services/maintenance',
  };
  return (
    <footer className="relative overflow-hidden bg-cipresa-950 text-white" aria-label="Pied de page du site CIPRESA Consulting">
      <div className="absolute inset-0">
        <Image src="/images/hero/agriculture-hero.jpg" alt="Champ agricole" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-cipresa-950/95 via-cipresa-950/80 to-cipresa-900/80" />
      </div>

      <div className="relative z-10 border-b border-cipresa-700 bg-cipresa-950/95">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cipresa-200/20 bg-cipresa-500/10 text-cipresa-100 sm:flex">
              <Handshake className="h-9 w-9 text-cipresa-200" />
            </span>
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.24em] text-cipresa-300">Agriculture durable</p>
              <h2 className="text-[24px] font-black leading-tight sm:text-[30px] text-white">Vous avez un projet agricole ? Parlons-en.</h2>
              <p className="text-[13px] font-medium text-cipresa-200/90">Nos experts sont à votre écoute pour transformer vos idées en succès durable, avec une solution adaptée à votre fermet.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/237656184596" className="rounded-[6px] bg-cipresa-500 px-6 py-3 text-[13px] font-black text-white shadow-button hover:bg-cipresa-600 transition">
              Discuter sur WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-[6px] border border-cipresa-500 bg-transparent px-6 py-3 text-[13px] font-black text-cipresa-100 hover:bg-cipresa-500/10 transition">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_4fr_1.25fr]">
          <div>
            <div className="mb-4 flex items-start gap-4">
              <Image src="/images/logo.png" alt="CIPRESA Consulting" width={160} height={70} className="h-12 w-auto brightness-0 invert" />
              <div>
                <p style={{ width: '140px' }} className="text-[10px] font-medium leading-relaxed text-cipresa-100/75 max-w-[150px]">
                  CIPRESA Consulting SARL accompagne les acteurs agricoles en Afrique, de la formation à la mise en marche, pour une agriculture moderne et rentable.
                </p>
                <div className="mt-3 flex items-center gap-3" aria-label="Réseaux sociaux">
                  <a href="https://www.facebook.com/cipresaconsulting" target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook de CIPRESA" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 hover:bg-white/20">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="https://www.instagram.com/cipresaconsulting" target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram de CIPRESA" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 hover:bg-white/20">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://www.youtube.com/@cipresaconsulting" target="_blank" rel="noreferrer" title="YouTube" aria-label="YouTube de CIPRESA" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 hover:bg-white/20">
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/cipresa-consulting" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn de CIPRESA" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 hover:bg-white/20">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-cipresa-700/50 lg:grid-cols-4 lg:border-x lg:px-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 text-[13px] font-black uppercase tracking-[0.12em] text-cipresa-200">{column.title}</h3>
                <ul className="space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={linkMap[link] ?? '#'}
                        aria-label={`Aller à ${link}`}
                        onMouseEnter={() => {
                          const href = linkMap[link];
                          if (href) prefetchRoute(href);
                        }}
                        onTouchStart={() => {
                          const href = linkMap[link];
                          if (href) prefetchRoute(href);
                        }}
                        className="text-[12px] font-medium text-cipresa-100/75 hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-[13px] font-black uppercase tracking-[0.12em] text-cipresa-200">Contactez-nous</h3>
            <ul className="space-y-3 text-[12px] font-medium text-cipresa-100/75">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-cipresa-200" />
                <a href="https://www.google.com/maps/search/?api=1&query=Yaounde+Carrefour+Nkomayos" target="_blank" rel="noreferrer" className="hover:text-white">
                  Yaounde, Carrefour Nkomayos
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-cipresa-200" />
                <a href="tel:+237656184596" className="hover:text-white">+237 6 56 18 45 96</a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-cipresa-200" />
                <a href="tel:+237696164060" className="hover:text-white">+237 6 96 16 40 60</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-cipresa-200" />
                <a href="mailto:cipresaconsulting@gmail.com" className="hover:text-white">cipresaconsulting@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-cipresa-200" />
                <a href="https://cipresaconsulting.com" target="_blank" rel="noreferrer" className="hover:text-white">https://cipresaconsulting.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-cipresa-700/30 pt-4 text-[11px] font-medium text-cipresa-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 CIPRESA Consulting SARL - Tous droits reserves.</p>
          <div className="flex flex-wrap gap-5 text-cipresa-100/75">
            <Link href="/terms" className="hover:text-white">Mentions legales</Link>
            <Link href="/privacy" className="hover:text-white">Politique de confidentialite</Link>
            <Link href="/terms" className="hover:text-white">Conditions d utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
