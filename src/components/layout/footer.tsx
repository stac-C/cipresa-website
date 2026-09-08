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
    <footer className="relative overflow-hidden bg-[#0b3f0b] text-white" aria-label="Pied de page du site CIPRESA Consulting">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/agriculture-hero.jpg"
          alt="Champ agricole"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7, 35, 7, 0.2)_0%,rgba(16, 135, 8, 0.16)_45%,rgba(16, 135, 8, 0.04)_100%)]" />
      </div>

      <div className="relative z-10 border-b border-emerald-200/20 bg-[#0b3f0b]/95">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-100 sm:flex">
              <Handshake className="h-9 w-9 text-emerald-100" />
            </span>
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.24em] text-emerald-100">Agriculture durable</p>
              <h2 className="text-[24px] font-black leading-tight sm:text-[30px] text-white">Vous avez un projet agricole ? Parlons-en.</h2>
              <p className="text-[13px] font-medium text-emerald-50/90">Nos experts sont à votre écoute pour transformer vos idées en succès durable, avec une solution adaptée à votre fermet.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://wa.me/237656184596" className="inline-flex h-11 w-full items-center justify-center rounded-[6px] bg-white px-6 text-[13px] font-black text-[#0b3f0b] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-emerald-50 sm:w-[196px]">
              Discuter sur WhatsApp
            </a>
            <Link href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-[6px] border border-white/20 bg-white/10 px-6 text-[13px] font-black text-emerald-50 transition hover:bg-white/20 sm:w-[196px]">
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
                <p style={{ width: '140px' }} className="text-[10px] font-medium leading-relaxed text-emerald-50/80 max-w-[150px]">
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
                  {/* <a href="https://www.linkedin.com/company/cipresa-consulting" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn de CIPRESA" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 hover:bg-white/20">
                    <Linkedin className="h-4 w-4" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-emerald-200/20 lg:grid-cols-4 lg:border-x lg:px-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-3 text-[13px] font-black uppercase tracking-[0.12em] text-emerald-100">{column.title}</h3>
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
                        className="text-[12px] font-medium text-emerald-50/80 hover:text-white"
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
            <h3 className="mb-4 text-[13px] font-black uppercase tracking-[0.12em] text-emerald-100">Contactez-nous</h3>
            <ul className="space-y-3 text-[12px] font-medium text-emerald-50/80">
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

        <div className="mt-7 flex flex-col gap-3 border-t border-emerald-200/20 pt-4 text-[11px] font-medium text-emerald-100/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 CIPRESA Consulting SARL - Tous droits reserves.</p>
          <div className="flex flex-wrap gap-5 text-emerald-50/80">
            <Link href="/terms" className="hover:text-white">Mentions legales</Link>
            <Link href="/privacy" className="hover:text-white">Politique de confidentialite</Link>
            <Link href="/terms" className="hover:text-white">Conditions d utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
