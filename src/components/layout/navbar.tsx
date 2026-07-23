'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, ShoppingCart, User, ChevronDown,
  GraduationCap, BookOpen,
  LogOut, Heart,
  Wheat, LeafyGreen, TreePalm, Tractor, ClipboardList,
  Gift, Video, Sprout, FlaskConical, Wrench, Droplets,
  ShoppingBag, Flame, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useScroll } from '@/lib/hooks/use-scroll';
import { useUIStore } from '@/lib/store/ui-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { useCartStore } from '@/lib/store/cart-store';
import { signOut } from '@/lib/auth/actions';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/layout/notification-bell';

interface MegaMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const formationsItems: MegaMenuItem[] = [
  { label: 'Culture annuelle', href: '/courses?category=culture-annuelle', icon: <Wheat className="w-4 h-4" /> },
  { label: 'Culture maraîchère', href: '/courses?category=culture-maraichere', icon: <LeafyGreen className="w-4 h-4" /> },
  { label: 'Culture pérenne', href: '/courses?category=culture-perenne', icon: <TreePalm className="w-4 h-4" /> },
  { label: 'Formation élevage', href: '/courses?category=formation-elevage', icon: <Tractor className="w-4 h-4" /> },
  { label: 'Gestion de projet', href: '/courses?category=gestion-projet-agricoles', icon: <ClipboardList className="w-4 h-4" /> },
];

const formationsRessources: MegaMenuItem[] = [
  { label: 'Tous les cours', href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Cours gratuits', href: '/courses?price=free', icon: <Gift className="w-4 h-4" /> },
  { label: 'Formateurs', href: '/instructors', icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Webinaires', href: '/events', icon: <Video className="w-4 h-4" /> },
];

const boutiqueItems: MegaMenuItem[] = [
  { label: 'Plantes et graines', href: '/marketplace?category=plantes-et-graines', icon: <Sprout className="w-4 h-4" /> },
  { label: 'Intrants agricoles', href: '/marketplace?category=produits-et-intrants-agricoles', icon: <FlaskConical className="w-4 h-4" /> },
  { label: 'Outils agricoles', href: '/marketplace?category=outils-agricoles', icon: <Wrench className="w-4 h-4" /> },
  { label: 'Irrigation', href: '/marketplace?category=systemes-irrigation', icon: <Droplets className="w-4 h-4" /> },
];

const boutiqueServices: MegaMenuItem[] = [
  { label: 'Tous les produits', href: '/marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Promotions', href: '/marketplace?promo=true', icon: <Flame className="w-4 h-4" /> },
  { label: 'Nouveautés', href: '/marketplace?sort=newest', icon: <Sparkles className="w-4 h-4" /> },
];

type NavLink = { href: string; label: string } | {
  label: string;
  href: string;
  columns: { title: string; items: MegaMenuItem[] }[];
  featured: { title: string; description: string; image: string; href: string };
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Accueil' },
  {
    label: 'Formations',
    href: '/courses',
    columns: [
      { title: 'Catégories', items: formationsItems },
      { title: 'Ressources', items: formationsRessources },
    ],
    featured: {
      title: 'Nouveau: Culture de Tomate',
      description: 'Formation complète de la pépinière à la récolte',
      image: '/images/courses/tomato.jpg',
      href: '/course/culture-de-tomate',
    },
  },
  {
    label: 'Boutique',
    href: '/marketplace',
    columns: [
      { title: 'Produits', items: boutiqueItems },
      { title: 'Services', items: boutiqueServices },
    ],
    featured: {
      title: 'Avocatiers en promotion',
      description: 'Plants d\'avocatier - Variétés Hickson & Both 7',
      image: '/images/products/avocado.jpg',
      href: '/product/avocat-hickson-both7',
    },
  },
  { href: '/paths', label: 'Parcours' },
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Carriere' },
  { href: '/blog', label: 'Ressources' },
  { href: '/about', label: 'A propos' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAtTop, scrollDirection } = useScroll();
  const { isMobileMenuOpen, toggleMobileMenu, toggleSearch, toggleCart } = useUIStore();
  const isAuthenticated = useAuthStore((s) => !s.isLoading && s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const cartCount = useCartStore((s) => s.items.length);
  const lastAddedAt = useCartStore((s) => s.lastAddedAt);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const isTransparentHeader = false;
  const isScrolledDown = !isAtTop && scrollDirection === 'down';
  const isVisible = scrollDirection === 'up' || isAtTop;

  const prefetchRoute = (href: string) => {
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    try {
      router.prefetch(href);
    } catch {
      // Next.js may not support prefetch in all environments.
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 border-b border-gray-100 bg-white/95 font-[var(--font-poppins)] shadow-[0_1px_10px_rgba(15,23,42,0.05)] backdrop-blur transition-all duration-500',
          isScrolledDown && !isVisible && '-translate-y-full',
          isVisible && 'translate-y-0'
        )}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex h-[60px] items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/images/logo.png"
                alt="CIPRESA Consulting"
                width={92}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                if ('columns' in link) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => {
                        setActiveMegaMenu(link.label);
                        prefetchRoute(link.href);
                      }}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                    <button className={cn(
                      'flex items-center gap-1 rounded-full px-2.5 py-2 text-[11px] font-semibold tracking-[0.01em] transition-all hover:bg-cipresa-50',
                      activeMegaMenu === link.label || isActive(link.href)
                        ? 'text-[#1f63b5]'
                        : cn(
                            'text-[#1f2937]',
                            'hover:text-[#1f63b5]'
                          )
                    )}>
                      {link.label}
                      <ChevronDown className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeMegaMenu === link.label && 'rotate-180'
                      )} />
                    </button>
                    <AnimatePresence>
                      {activeMegaMenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.12 }}
                          className="absolute left-0 top-full mt-2 w-[600px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950"
                        >
                          <div className="flex p-3 gap-3">
                            {link.columns.map((col) => (
                              <div key={col.title} className="flex-1">
                                <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">{col.title}</h3>
                                <ul className="space-y-0.5">
                                  {col.items.map((item) => (
                                    <li key={item.label}>
                                      <Link href={item.href} onMouseEnter={() => prefetchRoute(item.href)} onTouchStart={() => prefetchRoute(item.href)} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white">
                                        <span className="text-cipresa-500">{item.icon}</span>
                                        <span>{item.label}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <div className="w-44 rounded-lg overflow-hidden relative group cursor-pointer">
                              <Link href={link.featured.href} onMouseEnter={() => prefetchRoute(link.featured.href)} onTouchStart={() => prefetchRoute(link.featured.href)}>
                                <div
                                  className="w-full h-full absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                  style={{ backgroundImage: `url(${link.featured.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="relative p-3 h-full flex flex-col justify-end min-h-[160px]">
                                  <p className="text-[10px] text-cipresa-300 font-medium mb-0.5">À la une</p>
                                  <h4 className="text-white font-semibold text-sm mb-0.5">{link.featured.title}</h4>
                                  <p className="text-white/60 text-xs">{link.featured.description}</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className={cn(
                      'relative rounded-full px-2.5 py-2 text-[11px] font-semibold tracking-[0.01em] transition-all hover:bg-cipresa-50',
                      isActive(link.href)
                        ? 'bg-cipresa-50 text-[#1f63b5] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#1f63b5]'
                        : cn(
                            'text-[#1f2937]',
                            'hover:text-[#1f63b5]'
                          )
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleSearch}
                title="Rechercher"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cipresa-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button onClick={toggleCart} title="Panier" className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cipresa-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                <ShoppingCart className="w-[18px] h-[18px]" />
                <AnimatePresence mode="popLayout">
                  {cartCount > 0 && (
                    <motion.span
                      key={`${cartCount}-${lastAddedAt}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-cipresa-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-1">
                  <NotificationBell />
                  <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-cipresa-500 flex items-center justify-center text-white text-xs font-bold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden xl:block">{user?.fullName?.split(' ')[0]}</span>
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="min-h-0 rounded-full bg-gray-50 px-3 py-2 text-[10px] font-semibold">Se connecter</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="min-h-0 rounded-full bg-[#1f63b5] px-4 py-2 text-[10px] font-semibold text-white shadow-none hover:bg-[#17375f]">Commencer</Button>
                  </Link>
                </div>
              )}

              <button
                onClick={toggleMobileMenu}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cipresa-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 md:hidden"
                title="Menu"
              >
                {isMobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-16 md:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={toggleMobileMenu} />
            <div className="relative max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-gray-200 bg-white font-[var(--font-poppins)] dark:border-gray-800 dark:bg-gray-950">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  if ('columns' in link) {
                    return (
                      <div key={link.label} className="space-y-0.5">
                        <p className="px-3 py-2 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          {link.label}
                        </p>
                        {link.columns.flatMap(col => col.items).map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <span className="text-cipresa-500">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={toggleMobileMenu}
                      className={cn(
                        'block px-3 py-2.5 rounded-lg transition-colors text-sm font-medium',
                        isActive(link.href)
                          ? 'text-cipresa-600 bg-cipresa-50 dark:bg-cipresa-950/50'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <hr className="my-3 border-gray-100 dark:border-gray-800" />
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link href="/dashboard" onClick={toggleMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <User className="w-[18px] h-[18px]" /> <span className="text-sm font-medium">Mon tableau de bord</span>
                    </Link>
                    <Link href="/dashboard/wishlist" onClick={toggleMobileMenu} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <Heart className="w-[18px] h-[18px]" /> <span className="text-sm font-medium">Ma liste de souhaits</span>
                    </Link>
                    <button onClick={() => signOut()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full">
                      <LogOut className="w-[18px] h-[18px]" /> <span className="text-sm font-medium">Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-1">
                    <Link href="/auth/login" onClick={toggleMobileMenu}>
                      <Button variant="outline" fullWidth>Connexion</Button>
                    </Link>
                    <Link href="/auth/register" onClick={toggleMobileMenu}>
                      <Button fullWidth className="bg-cipresa-600 hover:bg-cipresa-700 text-white shadow-none">S'inscrire</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
