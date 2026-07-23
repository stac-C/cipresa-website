'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Clock, Star, Play, Grid3X3, List, ArrowRight, X, BookOpen } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { Course, CourseCategory } from '@/types';

const levels = [
  { value: 'all', label: 'Tous niveaux' },
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
];

const levelLabels: Record<string, string> = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé', all: 'Tous niveaux' };

const sortOptions = [
  { value: 'popular', label: 'Plus populaires' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
];

interface CoursesBrowserProps {
  courses: Course[];
  categories: CourseCategory[];
  initialCategory: string | null;
}

export function CoursesBrowser({ courses, categories, initialCategory }: CoursesBrowserProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const selectCategory = (slug: string | null) => {
    setSelectedCategory(slug);
    router.replace(slug ? `/courses?category=${slug}` : '/courses', { scroll: false });
  };

  const filtered = useMemo(() => {
    const result = courses.filter((c) => {
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.tags.some((t) => t.includes(searchQuery.toLowerCase()))) return false;
      if (selectedCategory && c.category.slug !== selectedCategory) return false;
      if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;
      return true;
    });

    switch (sortBy) {
      case 'newest': return [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating);
      default: return [...result].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [];
  if (selectedCategory) {
    const cat = categories.find((c) => c.slug === selectedCategory);
    activeFilters.push({ key: 'category', label: cat?.name || selectedCategory, onRemove: () => selectCategory(null) });
  }
  if (selectedLevel !== 'all') {
    const lvl = levels.find((l) => l.value === selectedLevel);
    activeFilters.push({ key: 'level', label: lvl?.label || selectedLevel, onRemove: () => setSelectedLevel('all') });
  }

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge variant="success" className="mb-4">Formations</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Catalogue de formations</h1>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Des formations agricoles pour développer vos compétences
              </p>
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cipresa-500 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="sticky top-16 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => selectCategory(null)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  !selectedCategory ? 'bg-cipresa-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5',
                    selectedCategory === cat.slug ? 'bg-cipresa-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {activeFilters.map((f) => (
                <span key={f.key} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-700 dark:text-cipresa-300 text-sm font-medium">
                  {f.label}
                  <button onClick={f.onRemove} className="hover:bg-cipresa-100 dark:hover:bg-cipresa-900/50 rounded-full p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button onClick={() => { selectCategory(null); setSelectedLevel('all'); }} className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-1">
                Tout effacer
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">{filtered.length} cours trouvés</p>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {(['grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      'p-1.5 rounded-md transition-all',
                      viewMode === mode ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                    title={mode === 'grid' ? 'Vue grille' : 'Vue liste'}
                  >
                    {mode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                  </button>
                ))}
              </div>
              {['popular', 'newest', 'price-asc', 'price-desc', 'rating'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                    sortBy === opt ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {sortOptions.find((o) => o.value === opt)?.label}
                </button>
              ))}
            </div>
          </div>

          <StaggerContainer className={cn('gap-6', viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4')}>
            {filtered.map((course) => (
              <StaggerItem key={course.id}>
                <Link href={`/course/${course.slug}`} className="group block">
                  <Card className={cn('h-full', viewMode === 'list' && 'flex flex-row')}>
                    <div className={cn('relative overflow-hidden', viewMode === 'list' ? 'w-48 flex-shrink-0' : '')}>
                      <CardImage src={course.thumbnail} alt={course.title} aspect="video" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                          <Play className="w-6 h-6 text-cipresa-600 ml-0.5" />
                        </div>
                      </div>
                      {course.price === 0 && <Badge variant="success" size="sm" className="absolute top-3 left-3">Gratuit</Badge>}
                    </div>
                    <CardContent className={cn('flex-1 flex flex-col', viewMode === 'list' && 'py-3')}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-medium text-cipresa-600 dark:text-cipresa-400 bg-cipresa-50 dark:bg-cipresa-950/50 px-2 py-0.5 rounded">{course.category.name}</span>
                        <span className="text-[11px] text-gray-400">{levelLabels[course.level]}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cipresa-600 transition-colors text-sm">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cipresa-400 to-cipresa-600 flex items-center justify-center text-[8px] text-white font-bold">
                          {course.instructor.fullName.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-500">{course.instructor.fullName}</span>
                      </div>
                      <StarRating rating={course.rating} totalReviews={course.totalReviews} size={12} />
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.totalLessons} leçons</span>
                      </div>
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50 dark:border-gray-800">
                        <span className="text-base font-bold text-cipresa-600">{course.price === 0 ? 'Gratuit' : formatCurrency(course.price, course.currency)}</span>
                        <span className="text-xs text-gray-400 group-hover:text-cipresa-500 transition-colors flex items-center gap-1">Voir plus <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucun cours trouvé</h3>
              <p className="text-gray-500 mb-4">Essayez de modifier vos filtres de recherche</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); selectCategory(null); setSelectedLevel('all'); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
