'use client';

import { Fragment, useId, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  CloudSun,
  GraduationCap,
  Handshake,
  Heart,
  Leaf,
  MapPin,
  PlayCircle,
  Quote,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  Tractor,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { toggleWishlistItem } from '@/lib/actions/wishlist';
import { Button } from '@/components/ui/button';
import type { Course, CourseCategory, Product } from '@/types';

const services = [
  {
    icon: GraduationCap,
    title: 'Formation agricole',
    text: 'Parcours courts, cas pratiques et certifications pour progresser vite.',
    details: ['Cours en ligne', 'Mentorat terrain', 'Certification'],
    href: '/courses',
  },
  {
    icon: Leaf,
    title: 'Semences & intrants',
    text: 'Des produits selectionnes pour les conditions de production locales.',
    details: ['Semences hybrides', 'Plants fruitiers', 'Engrais bio'],
    href: '/marketplace',
  },
  {
    icon: Wrench,
    title: 'Equipement & services',
    text: 'Outillage, irrigation et assistance pour fiabiliser les operations.',
    details: ['Outillage', 'Irrigation', 'Maintenance'],
    href: '/services',
  },
  {
    icon: BookOpenText,
    title: 'Projets & expertise',
    text: 'Etudes, modeles economiques et suivi pour transformer une idee en ferme rentable.',
    details: ['Etudes de faisabilite', 'Projets cle en main', 'Suivi-evaluation'],
    href: '/contact',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Experts terrain',
    text: 'Une equipe agricole presente sur le terrain pour valider chaque recommandation.',
  },
  {
    icon: Handshake,
    title: 'Accompagnement clair',
    text: 'Des plans d action adaptes a votre niveau, votre budget et votre calendrier.',
  },
  {
    icon: Tractor,
    title: 'Pratiques modernes',
    text: 'Technologies, donnees et methodes durables pour ameliorer les rendements.',
  },
  {
    icon: CloudSun,
    title: 'Climat africain',
    text: 'Des solutions pensees pour la chaleur, la saisonnalite et les sols locaux.',
  },
  {
    icon: TrendingUp,
    title: 'Marche inclus',
    text: 'Un accompagnement qui va de la production a la commercialisation.',
  },
];

const process = [
  ['01', 'Diagnostic', 'Nous cadrons vos objectifs, vos contraintes et vos opportunites.'],
  ['02', 'Plan', 'Nous construisons un parcours, un panier ou une feuille de route projet.'],
  ['03', 'Execution', 'Vous passez a l action avec des ressources, produits et experts disponibles.'],
  ['04', 'Suivi', 'Les resultats sont mesures, optimises et documentes dans le temps.'],
];

const testimonials = [
  {
    name: 'Jean Paul Mbarga',
    role: 'Agriculteur - Bafoussam, Cameroun',
    avatar: '/images/testimonials/user1.jpg',
    text: 'Grace a CIPRESA, j ai ameliore mes rendements de 60% en culture du mais et je peux acceder a de nouveaux marches.',
  },
  {
    name: 'Aissatou Diallo',
    role: 'Entrepreneure Agricole - Bamako, Mali',
    avatar: '/images/testimonials/user2.jpg',
    text: 'La formation m a permis de structurer mon projet et d obtenir un financement. Aujourd hui, mon exploitation prospere.',
  },
  {
    name: 'Kouadio Yao',
    role: 'Producteur de cacao - Divo, Cote d Ivoire',
    avatar: '/images/testimonials/user3.jpg',
    text: 'Un accompagnement professionnel de bout en bout. CIPRESA est un veritable partenaire de croissance.',
  },
];

const courseBadges = ['Populaire', 'Pratique', 'Nouveau', 'Tendance'];
const productBadges = ['En stock', 'Populaire', 'Nouveau', 'Promo'];

const viewport = { once: true, margin: '-80px' };

const sectionReveal = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const itemReveal = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

// Word-by-word "mask reveal" for the hero headline: each word slides up out
// of a clipped wrapper. Inherits hidden/visible from the parent stagger
// container above it, so it still respects that container's own delay.
const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const headlineWord = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Real (non-neutered) fade-up used for section headers and the Services
// cards below — itemReveal/sectionReveal elsewhere in this file were
// deliberately zeroed out to a no-op, so this is kept separate rather than
// re-enabling motion site-wide as a side effect of this change.
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const serviceCardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const servicesSectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const springUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20, delay: i * 0.12 },
  }),
};

const cardHoverSpring = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 350, damping: 15 },
  },
};

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function SectionHead({
  eyebrow,
  title,
  text,
  link,
  href,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  link?: string;
  href?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerReveal}
      className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-cipresa-200 bg-cipresa-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cipresa-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h2 variants={fadeUp} className="font-display text-lg font-black leading-tight text-gray-950 sm:text-2xl">
          {title}
        </motion.h2>
        {text ? (
          <motion.p variants={fadeUp} className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
            {text}
          </motion.p>
        ) : null}
      </div>
      {link && href ? (
        <motion.div variants={fadeUp}>
          <Link
            href={href}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-cipresa-200 bg-cipresa-600 px-3.5 py-2 text-xs font-black text-white shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:bg-cipresa-700 hover:border-cipresa-700"
          >
            {link}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function CoverImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  if (!src) {
    return <div className={cn('bg-cipresa-100', className)} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={cn('object-cover', className)} />;
}

/** Slow-rotating "seal" badge: a circular photo ringed by looping text, with a
 * sparkle accent overlapping the edge — the brand-mark equivalent of the
 * reference design's spinning "let's explore more" seal. */
function SpinBadge({ image, label }: { image: string; label: string }) {
  const pathId = useId();
  const loopText = `${label} • `.repeat(3);

  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      <div className="absolute inset-0 animate-[spin_11s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
          <text fontSize="7" fontWeight="800" letterSpacing="0.5" className="fill-white/75 uppercase">
            <textPath href={`#${pathId}`}>{loopText}</textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-[15px] overflow-hidden rounded-full border-2 border-white/25">
        <Image src={image} alt="" fill sizes="112px" className="object-cover" />
      </div>
      <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-africa-dawn text-cipresa-950 shadow-lg ring-4 ring-cipresa-950">
        <Sparkles className="h-4 w-4" />
      </span>
    </div>
  );
}

interface HomeViewProps {
  courses: Course[];
  products: Product[];
  categories: CourseCategory[];
  initialWishlistedProductIds: string[];
}

export function HomeView({ courses, products, categories, initialWishlistedProductIds }: HomeViewProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [wishlisted, setWishlisted] = useState(new Set(initialWishlistedProductIds));

  useEffect(() => {
    if (!isAuthenticated || initialWishlistedProductIds.length > 0) return;

    let cancelled = false;
    fetch('/api/wishlist')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data.productIds)) {
          setWishlisted(new Set(data.productIds));
        }
      })
      .catch(() => {
        // Keep the existing state if the wishlist endpoint is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, initialWishlistedProductIds.length]);

  // Spotlight card in the "Cultivez votre projet ici" banner — real product,
  // real discount when one exists, instead of a hardcoded promo claim.
  const spotlightProduct = products[0];
  const spotlightDiscount =
    spotlightProduct?.salePrice && spotlightProduct.price > 0
      ? Math.round((1 - spotlightProduct.salePrice / spotlightProduct.price) * 100)
      : null;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: `product-${product.id}-base`,
      type: 'product',
      itemId: product.id,
      name: product.name,
      price: product.salePrice ?? product.price,
      quantity: 1,
      image: product.images[0] ?? '',
    });
    toast.success('Ajoute au panier !');
  };

  const handleToggleWishlist = async (product: Product) => {
    if (!isAuthenticated) {
      router.push('/auth/login?next=/');
      return;
    }
    const wasWishlisted = wishlisted.has(product.id);
    setWishlisted((prev) => {
      const next = new Set(prev);
      if (wasWishlisted) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
    try {
      const saved = await toggleWishlistItem('product', product.id);
      setWishlisted((prev) => {
        const next = new Set(prev);
        if (saved) next.add(product.id);
        else next.delete(product.id);
        return next;
      });
      toast.success(saved ? 'Ajoute a vos favoris' : 'Retire de vos favoris');
    } catch (err) {
      setWishlisted((prev) => {
        const next = new Set(prev);
        if (wasWishlisted) next.add(product.id);
        else next.delete(product.id);
        return next;
      });
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  return (
    <div className="home-reference bg-white text-gray-900">
      <section className="relative isolate overflow-hidden bg-slate-950 pt-[58px]">
        <Image
          src="/images/banner image.png"
          alt="Agriculture intelligente - CIPRESA Consulting"
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center opacity-60"
        />
        <div className="leaflet-pattern absolute inset-0 z-[1] opacity-30" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-58px)] max-w-[1200px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }}
            className="relative max-w-[680px] font-[var(--font-poppins)]"
          >
            <motion.h1
              variants={headlineContainer}
              aria-label="La plateforme qui transforme vos projets agricoles en resultats mesurables."
              className="relative max-w-[620px] text-2xl font-extrabold leading-[1.18] tracking-normal text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl"
            >
              {'La plateforme qui transforme vos projets agricoles en resultats mesurables.'.split(' ').map((word, i, words) => (
                <Fragment key={i}>
                  <span aria-hidden="true" className="inline-block overflow-hidden pb-1 align-top">
                    <motion.span variants={headlineWord} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && ' '}
                </Fragment>
              ))}
            </motion.h1>
            <motion.p variants={itemReveal} className="relative mt-3 max-w-[540px] text-sm font-medium leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-base">
              Formez-vous, achetez les bons intrants et faites accompagner vos projets par des experts qui comprennent les realites agricoles africaines.
            </motion.p>
            <motion.div variants={itemReveal} className="relative mt-5 flex flex-wrap gap-2.5">
              <Link href="/courses">
                <Button size="sm" className="min-h-0 rounded-full px-4 py-2 text-sm font-semibold shadow-[0_12px_28px_rgba(31,99,181,0.32)] sm:px-5 sm:py-2.5">
                  Commencer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="sm" className="min-h-0 rounded-full px-4 py-2 text-sm font-semibold sm:px-5 sm:py-2.5">
                  <PlayCircle className="h-4 w-4" />
                  Explorer les services
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={staggerReveal} className="relative mt-6 grid max-w-[640px] grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4">
              {[
                { icon: GraduationCap, value: 360, suffix: 'h+', label: 'formations' },
                { icon: Users, value: 20, suffix: 'K+', label: 'apprenants' },
                { icon: BriefcaseBusiness, value: 500, suffix: '+', label: 'projets suivis' },
                { icon: MapPin, value: 2, suffix: ' pays', label: 'presence active' },
              ].map(({ icon: Icon, value, suffix, label }) => (
                <motion.div
                  key={label}
                  variants={itemReveal}
                  className="rounded-xl bg-cipresa-950/55 px-3 py-2.5 transition-all hover:-translate-y-1 hover:bg-cipresa-900/65"
                >
                  <Icon className="h-3.5 w-3.5 text-africa-dawn" />
                  <strong className="mt-1.5 block text-base font-extrabold leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] sm:text-lg">
                    <CountUp value={value} suffix={suffix} />
                  </strong>
                  <span className="mt-1 block text-xs font-medium text-white/75 sm:text-sm">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      <motion.section className="relative overflow-hidden bg-slate-950" initial={false} whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(246,177,61,0.16),transparent_36%),radial-gradient(circle_at_88%_85%,rgba(31,99,181,0.22),transparent_38%)]" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
          <svg
            viewBox="0 0 60 70"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(52%)] top-[150px] hidden h-20 w-20 rotate-[8deg] text-white/40 lg:block"
          >
            <motion.path
              d="M6 4c10 4 22 10 24 22 2 12-10 18-18 14-6-3-8-10-3-14 6-5 16-3 20 4 5 8 2 18-6 24-3 2-7 4-10 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M4 44l-4 8 9-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            />
          </svg>
          <motion.div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start" variants={staggerReveal}>
            <motion.div custom={0} variants={springUp}>
              <motion.h2
                className="font-display text-2xl font-black uppercase leading-[0.98] text-white sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Cultivez
                <br />
                Votre projet
                <br />
                <span className="text-africa-dawn">Ici</span>
              </motion.h2>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.25 }}
                viewport={{ once: true }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-black text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white hover:text-cipresa-950"
              >
                <Link href="/courses" className="flex items-center gap-2">
                  Commencer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.span>
            </motion.div>
            <motion.div custom={1} variants={springUp} className="flex items-start justify-between gap-6 lg:pt-3">
              <p className="max-w-sm text-xs font-semibold leading-relaxed text-white/70">
                Plus de 360 heures de formation et des dizaines d intrants selectionnes, avec un accompagnement terrain a chaque etape de votre projet agricole.
              </p>
              <SpinBadge image="/images/instructors/marie.jpg" label="CIPRESA" />
            </motion.div>
          </motion.div>

          <motion.div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.3fr_1.3fr]" variants={staggerReveal}>
            {spotlightProduct && (
              <motion.div custom={0} variants={springUp}>
                <motion.div variants={cardHoverSpring} initial="rest" whileHover="hover" className="h-full">
                  <Link
                    href={`/product/${spotlightProduct.slug}`}
                    className="group flex h-full min-h-[210px] flex-col overflow-hidden rounded-xl bg-white/5"
                  >
                    <div className="relative flex-1 overflow-hidden">
                      <CoverImage
                        src={spotlightProduct.images[0] ?? ''}
                        alt={spotlightProduct.name}
                        sizes="20vw"
                        className="transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
                      <strong className="text-xs font-black uppercase leading-tight text-white font-[family-name:var(--font-poppins)]">{spotlightProduct.name}</strong>
                      <motion.span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
                        whileHover={{ x: 3, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            <motion.div custom={1} variants={springUp}>
              <motion.div
                className="relative min-h-[240px] overflow-hidden rounded-xl sm:min-h-[280px]"
                variants={cardHoverSpring}
                initial="rest"
                whileHover="hover"
              >
                <Image
                  src="/images/hero/agriculture-hero.jpg"
                  alt="Agriculteurs accompagnes sur le terrain"
                  fill
                  sizes="35vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-cipresa-950/85" />
                <motion.div
                  className="absolute -right-6 -top-6 h-14 w-14 rotate-45 bg-africa-dawn"
                  animate={{ rotate: [45, 55, 45] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cipresa-950 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 text-africa-dawn" />
                  {spotlightDiscount ? `-${spotlightDiscount}%` : 'Nouveau'}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-black leading-tight text-white sm:text-sm font-[family-name:var(--font-poppins)]">Accompagnement terrain</p>
                  <Link href="/services" className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-africa-dawn hover:underline font-[family-name:var(--font-poppins)]">
                    Decouvrir
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            <motion.div custom={2} variants={springUp}>
              <motion.div
                className="relative flex min-h-[240px] flex-col overflow-visible rounded-xl border border-white/12 bg-white/8 p-4 sm:min-h-[280px]"
                variants={cardHoverSpring}
                initial="rest"
                whileHover="hover"
              >
                <motion.span
                  className="absolute right-4 top-4 text-3xl font-black leading-none text-white/10"
                  animate={{ rotate: [0, 8, -4, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="font-[family-name:var(--font-poppins)]">03</span>
                </motion.span>
                <h3 className="relative max-w-[75%] font-display text-sm font-black leading-tight text-white font-[family-name:var(--font-poppins)]">
                  Assistez a nos webinaires terrain
                </h3>
                <p className="relative mt-2 max-w-[75%] text-[11px] font-medium leading-relaxed text-white/65 font-[family-name:var(--font-poppins)]">
                  Sessions en direct avec des experts CIPRESA pour poser vos questions et voir les bonnes pratiques en situation reelle.
                </p>
                <Link href="/events" className="group relative mt-auto inline-flex items-center gap-3 text-xs font-black text-white font-[family-name:var(--font-poppins)]">
                  <motion.span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-cipresa-950"
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    <PlayCircle className="h-4 w-4" />
                  </motion.span>
                  Voir les webinaires
                </Link>
                <motion.div
                  className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 overflow-hidden rounded-full border-4 border-cipresa-950 shadow-xl sm:h-32 sm:w-32"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/images/plants/tomato.jpg"
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                    style={{ objectPosition: '88% 82%' }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative overflow-hidden bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={servicesSectionReveal}
      >
        <div className="absolute inset-0 bg-dot" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="Services"
            title="Tout ce qu il faut pour lancer, produire et vendre."
            text="La page d accueil devient un tableau de decision: choisissez une action, comprenez la valeur, puis avancez vers le bon espace."
            link="Voir les services"
            href="/services"
          />
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" variants={staggerReveal}>
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={serviceCardReveal}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Link
                  href={service.href}
                  className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-card transition-shadow duration-300 hover:border-cipresa-200 hover:shadow-card-hover"
                >
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-cipresa-600 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cipresa-700 text-white shadow-button transition-all duration-500 ease-out group-hover:rotate-6 group-hover:scale-110">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-black leading-tight text-gray-950">{service.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">{service.text}</p>
                  <ul className="mt-3 space-y-1.5">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                        <Check className="h-3.5 w-3.5 shrink-0 text-africa-savanna" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-black text-cipresa-700">
                    Explorer <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden bg-cipresa-50" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="Categories"
            title="Trouvez vite le bon sujet agricole."
            text="Des entrees visuelles pour orienter les visiteurs vers les formations les plus pertinentes."
            link="Toutes les formations"
            href="/courses"
          />
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" variants={staggerReveal}>
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemReveal}>
                <Link
                  href={`/courses?category=${category.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-cipresa-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative h-36 overflow-hidden">
                    <CoverImage src={category.image} alt={category.name} sizes="20vw" className="transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cipresa-950/80 via-cipresa-950/35 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-cipresa-100/95 px-3 py-1 text-xs font-black text-cipresa-900 backdrop-blur-sm">
                      {category.count} cours
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <strong className="text-xs font-black leading-tight text-cipresa-950 sm:text-sm">{category.name}</strong>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cipresa-50 text-cipresa-700 transition-transform group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
            {categories.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">Categories bientot disponibles.</p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative bg-cipresa-50" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="Formations"
            title="Des cours populaires qui menent a l action."
            text="Chaque carte donne rapidement le niveau de confiance: duree, lecons, avis et prix."
            link="Voir tous les cours"
            href="/courses"
          />
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerReveal}>
            {courses.map((course, index) => (
              <motion.div key={course.id} variants={itemReveal}>
                <Link href={`/course/${course.slug}`} className="group card-shine block h-full overflow-hidden rounded-2xl border border-cipresa-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="relative h-44 overflow-hidden">
                    <CoverImage src={course.thumbnail} alt={course.title} sizes="25vw" className="transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cipresa-950/80 via-cipresa-950/50 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-cipresa-600 px-3 py-1 text-[11px] font-black text-white shadow-sm">
                      {courseBadges[index] ?? 'Populaire'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="min-h-[36px] text-xs font-black leading-tight text-cipresa-950 transition-colors group-hover:text-cipresa-700 sm:text-sm">{course.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-cipresa-700">
                      <ShieldCheck className="h-4 w-4 text-cipresa-600" />
                      {course.instructor.fullName}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-cipresa-600 text-cipresa-600" />
                        ))}
                        <span className="ml-1.5 text-[11px] text-cipresa-700">({course.totalReviews})</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cipresa-700">
                        <Timer className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-cipresa-100 px-3 py-2">
                      <span className="text-xs font-bold text-cipresa-700">{course.totalLessons} lecons</span>
                      <strong className="text-xs font-black text-cipresa-900 sm:text-sm">
                        {course.price === 0 ? 'Gratuit' : formatCurrency(course.salePrice ?? course.price, course.currency)}
                      </strong>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {courses.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-cipresa-700">Formations bientot disponibles.</p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden bg-slate-950 text-white" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(246,177,61,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(91,159,245,0.16),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-africa-dawn">
              <ClipboardCheck className="h-4 w-4" />
              Methode CIPRESA
            </span>
            <h2 className="mt-4 font-display text-xl font-black leading-tight sm:text-2xl">Un parcours lisible de la decision au rendement.</h2>
            <p className="mt-3 text-xs font-semibold leading-relaxed text-white/75 sm:text-sm">
              Les visiteurs comprennent immediatement comment CIPRESA travaille: diagnostiquer, planifier, executer puis mesurer.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {['Conseil', 'Formation', 'Intrants', 'Suivi'].map((label) => (
                <span key={label} className="rounded-xl border border-white/12 bg-white/10 px-3 py-2.5 text-xs font-black text-white/90 backdrop-blur-md">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <motion.div className="grid gap-4 sm:grid-cols-2" variants={staggerReveal}>
            {process.map(([number, title, text], index) => (
              <motion.div
                key={number}
                variants={itemReveal}
                className={cn(
                  'relative overflow-hidden rounded-xl border border-white/12 bg-white/10 p-4 shadow-glass backdrop-blur-md',
                  index % 2 === 1 && 'sm:translate-y-8'
                )}
              >
                <span className="text-4xl font-black leading-none text-white/10">{number}</span>
                <ClipboardCheck className="absolute right-4 top-4 h-6 w-6 text-africa-dawn" />
                <h3 className="mt-3 font-display text-sm font-black text-white">{title}</h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-white/70">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative bg-slate-50" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="absolute inset-0 bg-dot" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="Boutique"
            title="Des produits utiles, visibles et faciles a ajouter au panier."
            text="Les interactions principales restent directes: consulter, aimer, acheter."
            link="Voir la boutique"
            href="/marketplace"
          />
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerReveal}>
            {products.map((product, index) => {
              const isWishlisted = wishlisted.has(product.id);
              return (
                <motion.article key={product.id} variants={itemReveal} className="group card-shine flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <Link href={`/product/${product.slug}`} className="relative block h-44 overflow-hidden">
                    <CoverImage src={product.images[0] ?? ''} alt={product.name} sizes="25vw" className="transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50" />
                    <span className="absolute left-3 top-3 rounded-full bg-africa-savanna px-3 py-1 text-[11px] font-black text-white shadow-sm">
                      {productBadges[index] ?? 'Populaire'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleWishlist(product);
                      }}
                      className={cn(
                        'absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:text-africa-savanna',
                        isWishlisted ? 'text-red-500' : 'text-gray-600'
                      )}
                      aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
                    </button>
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="min-h-[36px] text-xs font-black leading-tight text-gray-950 transition-colors hover:text-cipresa-700 sm:text-sm">{product.name}</h3>
                    </Link>
                    <div className="mt-3 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star key={star} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      ))}
                      <span className="ml-1.5 text-[11px] text-muted-foreground">({product.totalReviews})</span>
                    </div>
                    <strong className="mt-3 block text-sm font-black text-africa-savanna">
                      {formatCurrency(product.salePrice ?? product.price, product.currency)}{' '}
                      <span className="text-xs font-bold text-gray-600">/ {product.unit}</span>
                    </strong>
                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cipresa-700 text-xs font-black text-white shadow-button transition-all hover:-translate-y-0.5 hover:bg-cipresa-800 hover:shadow-button-hover"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
            {products.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">Produits bientot disponibles.</p>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative border-y border-gray-200 bg-white" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="Pourquoi CIPRESA"
            title="Une experience concue pour inspirer confiance rapidement."
            text="Les preuves, les services et les appels a l action restent visibles sans surcharger l ecran."
          />
          <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" variants={staggerReveal}>
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={itemReveal} className="rounded-xl border border-gray-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-cipresa-800 shadow-sm">
                  <benefit.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-sm font-black leading-tight text-gray-950">{benefit.title}</h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative overflow-hidden bg-white" initial="hidden" whileInView="visible" viewport={viewport} variants={sectionReveal}>
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <SectionHead eyebrow="Temoignages" title="Des producteurs et entrepreneurs avancent avec CIPRESA." />
          <motion.div className="grid gap-6 md:grid-cols-3" variants={staggerReveal}>
            {testimonials.map((item) => (
              <motion.article key={item.name} variants={itemReveal} className="relative min-h-[210px] rounded-xl border border-gray-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <Quote className="h-8 w-8 fill-cipresa-600/10 text-cipresa-600/30" />
                <p className="mt-3 text-xs font-medium italic leading-relaxed text-gray-600 sm:text-sm">{item.text}</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image src={item.avatar} alt={item.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover ring-2 ring-cipresa-100" />
                  <div>
                    <strong className="block text-xs font-black text-gray-950 sm:text-sm">{item.name}</strong>
                    <span className="text-xs font-medium text-muted-foreground">{item.role}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
