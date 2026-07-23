'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Play, Clock, Users, Star, ChevronDown,
  Award, BookOpen, CheckCircle, Globe, Download,
  Share2, Heart, ShoppingCart, FileText, MessageCircle,
  ChevronLeft, PlayCircle, Lock, Shield, BarChart3, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { Card } from '@/components/ui/card';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { useProgressStore } from '@/lib/store/progress-store';
import { useCartStore } from '@/lib/store/cart-store';
import { cn } from '@/lib/utils/cn';
import { enrollInFreeCourse, submitReview } from '@/lib/actions/courses';
import { toggleWishlistItem } from '@/lib/actions/wishlist';
import type { Course, Review, Section } from '@/types';

const faqData = [
  { q: 'Quels sont les prérequis pour ce cours ?', a: 'Aucun prérequis spécifique. Le cours est conçu pour les débutants comme pour les professionnels souhaitant approfondir leurs connaissances.' },
  { q: 'Comment accéder au cours après achat ?', a: 'L\'accès est immédiat après paiement. Vous retrouverez le cours dans votre tableau de bord, section Mes formations.' },
  { q: 'Le certificat est-il reconnu ?', a: 'Oui, le certificat CIPRESA atteste de vos compétences et est reconnu par nos partenaires institutionnels.' },
  { q: 'Puis-je télécharger les ressources ?', a: 'Oui, toutes les ressources complémentaires (PDF, fiches techniques) sont téléchargeables depuis la plateforme.' },
];

const levelLabels: Record<Course['level'], string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  all: 'Tous niveaux',
};

interface CourseDetailViewProps {
  course: Course;
  sections: Section[];
  reviews: Review[];
  isAuthenticated: boolean;
  isEntitled: boolean;
  completedLessonIds: string[];
  initialIsWishlisted: boolean;
}

export function CourseDetailView({
  course,
  sections,
  reviews,
  isAuthenticated,
  isEntitled,
  completedLessonIds,
  initialIsWishlisted,
}: CourseDetailViewProps) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>(sections[0] ? [sections[0].id] : []);
  const [activeTab, setActiveTab] = useState('content');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const hydrate = useProgressStore((s) => s.hydrate);
  const isCompleted = useProgressStore((s) => s.isCompleted);
  const completedCount = useProgressStore((s) => s.getCompletedCount(course.id));
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    hydrate(course.id, completedLessonIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);

  const allLessons = sections.flatMap((s) => s.lessons);
  const totalLessons = allLessons.length;
  const firstLessonId = allLessons[0]?.id;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handlePrimaryAction = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?next=/course/${course.slug}`);
      return;
    }
    if (isEntitled) {
      router.push(`/course/${course.slug}/learn${firstLessonId ? `?lesson=${firstLessonId}` : ''}`);
      return;
    }
    if (course.price === 0) {
      setIsEnrolling(true);
      try {
        await enrollInFreeCourse(course.id);
        toast.success('Inscription confirmée !');
        router.push(`/course/${course.slug}/learn${firstLessonId ? `?lesson=${firstLessonId}` : ''}`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
      } finally {
        setIsEnrolling(false);
      }
      return;
    }
    addItem({
      id: `course-${course.id}`,
      type: 'course',
      itemId: course.id,
      name: course.title,
      price: course.salePrice ?? course.price,
      quantity: 1,
      image: course.thumbnail,
    });
    toast.success('Ajouté au panier !');
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?next=/course/${course.slug}`);
      return;
    }
    setIsTogglingWishlist(true);
    const previous = isWishlisted;
    setIsWishlisted(!previous);
    try {
      const saved = await toggleWishlistItem('course', course.id);
      setIsWishlisted(saved);
      toast.success(saved ? 'Ajouté à vos favoris' : 'Retiré de vos favoris');
    } catch (err) {
      setIsWishlisted(previous);
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const primaryLabel = !isAuthenticated
    ? 'Se connecter pour commencer'
    : isEntitled
      ? 'Continuer le cours'
      : course.price === 0
        ? 'Commencer le cours'
        : 'Ajouter au panier';

  return (
    <PageTransition>
      <div className="pt-16">
        <div className="bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> Retour aux formations
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 pb-12">
              <div className="lg:col-span-2 space-y-6">
                <AnimatedSection>
                  <Badge variant="success">{course.category.name}</Badge>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">{course.title}</h1>
                  <p className="text-white/70 text-lg mb-6">{course.shortDescription}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <StarRating rating={course.rating} showValue totalReviews={course.totalReviews} className="text-white" />
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.totalStudents} étudiants</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">{levelLabels[course.level]}</span>
                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {course.language}</span>
                  </div>
                </AnimatedSection>

                <div className="lg:hidden">
                  <div className="rounded-xl overflow-hidden bg-gray-800 border border-white/10 aspect-video flex items-center justify-center relative group cursor-pointer"
                    style={{ backgroundImage: `url(${course.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative text-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-cipresa-600 ml-1" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">Voir la bande-annonce</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cipresa-400 to-cipresa-600 flex items-center justify-center text-white font-bold">
                    {course.instructor.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{course.instructor.fullName}</p>
                    <p className="text-white/60 text-sm">{course.instructor.title}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Share2}
                    iconPosition="left"
                    className="ml-auto"
                    onClick={() => {
                      navigator.share?.({ title: course.title, url: window.location.href }).catch(() => {});
                      if (!navigator.share) {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success('Lien copié !');
                      }
                    }}
                  >
                    Partager
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="rounded-xl overflow-hidden bg-gray-800 border border-white/10">
                    <div className="aspect-video relative group cursor-pointer"
                      style={{ backgroundImage: `url(${course.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-cipresa-600 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4 bg-gray-900">
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white">{course.price === 0 ? 'Gratuit' : formatCurrency(course.salePrice ?? course.price, course.currency)}</p>
                        {course.salePrice && <p className="text-white/50 line-through text-sm">{formatCurrency(course.price, course.currency)}</p>}
                      </div>
                      <Button fullWidth size="lg" onClick={handlePrimaryAction} loading={isEnrolling}>
                        {!isEnrolling && (isEntitled ? <PlayCircle className="w-5 h-5" /> : course.price === 0 ? <Play className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />)}
                        {primaryLabel}
                      </Button>
                      <Button
                        fullWidth
                        variant="secondary"
                        size="lg"
                        loading={isTogglingWishlist}
                        onClick={handleToggleWishlist}
                        className={cn(isWishlisted && 'text-red-400')}
                      >
                        <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                        {isWishlisted ? 'Dans vos favoris' : 'Ajouter aux favoris'}
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-cipresa-300 bg-cipresa-950/50 rounded-lg px-3 py-2">
                        <Shield className="w-3.5 h-3.5" /> Paiement sécurisé & Satisfaction garantie
                      </div>
                      <div className="space-y-3 text-sm text-white/60">
                        <div className="flex items-center justify-between"><span><FileText className="w-4 h-4 inline mr-2" />Leçons</span><span>{totalLessons}</span></div>
                        <div className="flex items-center justify-between"><span><Clock className="w-4 h-4 inline mr-2" />Durée</span><span>{course.duration}</span></div>
                        <div className="flex items-center justify-between"><span><Award className="w-4 h-4 inline mr-2" />Certificat</span><span>Oui</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:hidden mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <p className="text-2xl font-bold">{course.price === 0 ? 'Gratuit' : formatCurrency(course.salePrice ?? course.price, course.currency)}</p>
            <Button fullWidth size="lg" onClick={handlePrimaryAction} loading={isEnrolling}>
              {!isEnrolling && (isEntitled ? <PlayCircle className="w-5 h-5" /> : course.price === 0 ? <Play className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />)}
              {primaryLabel}
            </Button>
          </div>

          <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 overflow-x-auto">
            {[
              { id: 'content', label: 'Contenu' },
              { id: 'reviews', label: `Avis (${reviews.length})` },
              { id: 'instructor', label: 'Formateur' },
              { id: 'faq', label: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  activeTab === tab.id ? 'bg-white dark:bg-gray-700 shadow-sm text-cipresa-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ce que vous apprendrez</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-cipresa-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contenu du cours</h2>
                  <p className="text-sm text-gray-500 mb-4">{totalLessons} leçons</p>

                  {isEntitled && (
                    <div className="mb-6 p-4 rounded-xl bg-cipresa-50 dark:bg-cipresa-950/30 border border-cipresa-100 dark:border-cipresa-900">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-cipresa-700 dark:text-cipresa-300 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" /> Ma progression
                        </span>
                        <span className="text-sm font-bold text-cipresa-600">{progressPct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-cipresa-200 dark:bg-cipresa-900 overflow-hidden">
                        <div className="h-full rounded-full bg-cipresa-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
                      </div>
                      <p className="text-xs text-cipresa-600 dark:text-cipresa-400 mt-1.5">{completedCount}/{totalLessons} leçons complétées</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id} className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <div className="flex items-center gap-3">
                            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', expandedSections.includes(section.id) && 'rotate-180')} />
                            <span className="font-semibold text-sm">{section.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{section.lessons.length} leçons</span>
                        </button>
                        {expandedSections.includes(section.id) && (
                          <div className="border-t border-gray-100 dark:border-gray-800">
                            {section.lessons.map((lesson) => {
                              const completed = isEntitled && isCompleted(course.id, lesson.id);
                              const accessible = lesson.isPreview || isEntitled;
                              const rowClassName = cn(
                                'flex items-center gap-3 p-3 ml-4 border-b border-gray-50 dark:border-gray-800/50 last:border-0',
                                accessible ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors' : ''
                              );
                              const rowContent = (
                                <>
                                  {completed ? (
                                    <CheckCircle className="w-4 h-4 text-cipresa-500" />
                                  ) : lesson.isPreview ? (
                                    <PlayCircle className="w-4 h-4 text-cipresa-500" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className={cn(
                                    'flex-1 text-sm',
                                    completed ? 'text-cipresa-600 line-through' : 'text-gray-700 dark:text-gray-200'
                                  )}>
                                    {lesson.title}
                                  </span>
                                  {lesson.isPreview && !isEntitled && <Badge variant="success" size="sm">Aperçu</Badge>}
                                  {completed && <Badge variant="success" size="sm">Fait</Badge>}
                                  <span className="text-xs text-gray-400">{lesson.videoDuration}</span>
                                </>
                              );
                              return accessible ? (
                                <Link key={lesson.id} href={`/course/${course.slug}/learn?lesson=${lesson.id}`} className={rowClassName}>
                                  {rowContent}
                                </Link>
                              ) : (
                                <div key={lesson.id} className={rowClassName}>
                                  {rowContent}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                    {sections.length === 0 && (
                      <p className="text-sm text-gray-500 py-8 text-center">Le contenu de ce cours sera bientôt disponible.</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <Card className="p-5">
                    <h3 className="font-semibold mb-4 text-sm">Ce cours inclut</h3>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-3"><Play className="w-4 h-4 text-cipresa-500" /> {course.totalHours}h de vidéo</div>
                      <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-cipresa-500" /> {totalLessons} leçons</div>
                      <div className="flex items-center gap-3"><Download className="w-4 h-4 text-cipresa-500" /> Ressources téléchargeables</div>
                      <div className="flex items-center gap-3"><Award className="w-4 h-4 text-cipresa-500" /> Certificat de fin</div>
                      <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-cipresa-500" /> Accès à la communauté</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab course={course} reviews={reviews} isAuthenticated={isAuthenticated} isEntitled={isEntitled} />
          )}

          {activeTab === 'instructor' && (
            <div className="max-w-3xl">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cipresa-400 to-cipresa-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {course.instructor.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{course.instructor.fullName}</h2>
                  <p className="text-gray-500">{course.instructor.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.instructor.totalCourses} cours</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.instructor.totalStudents} étudiants</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {course.instructor.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.instructor.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.instructor.expertise.map((exp) => (
                  <span key={exp} className="px-3 py-1 rounded-lg bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-700 dark:text-cipresa-300 text-sm">{exp}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="max-w-3xl space-y-3">
              {faqData.map((item, idx) => (
                <details key={idx} className="group rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{item.q}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

function ReviewsTab({
  course,
  reviews,
  isAuthenticated,
  isEntitled,
}: {
  course: Course;
  reviews: Review[];
  isAuthenticated: boolean;
  isEntitled: boolean;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitReview({ targetId: course.id, targetType: 'course', rating, comment });
      setSubmitted(true);
      toast.success('Merci pour votre avis ! Il sera visible après modération.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-8 mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-cipresa-600">{course.rating.toFixed(1)}</div>
          <StarRating rating={course.rating} size={16} className="justify-center mt-2" />
          <p className="text-sm text-gray-500 mt-1">{course.totalReviews} avis</p>
        </div>
      </div>

      {isEntitled && !submitted && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
          <p className="text-sm font-semibold">Laisser un avis</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)}>
                <Star className={cn('w-6 h-6', n <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600')} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cipresa-500"
          />
          <Button type="submit" size="sm" loading={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publier'}
          </Button>
        </form>
      )}

      {!isAuthenticated && (
        <p className="text-gray-500 text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-8">
          <Link href="/auth/login" className="text-cipresa-600 hover:underline font-medium">Connectez-vous</Link> pour publier un avis.
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="w-9 h-9 rounded-full bg-cipresa-100 dark:bg-cipresa-950/50 flex items-center justify-center text-cipresa-600 text-sm font-bold flex-shrink-0">
              {review.userName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{review.userName}</p>
                <span className="text-xs text-gray-400">{formatDate(review.createdAt, 'short')}</span>
              </div>
              <StarRating rating={review.rating} size={12} className="my-1" />
              <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">Aucun avis pour le moment.</p>
        )}
      </div>
    </div>
  );
}
