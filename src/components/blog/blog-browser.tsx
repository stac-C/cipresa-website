'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { formatDate } from '@/lib/utils/format';
import type { BlogPost } from '@/types';

export function BlogBrowser({ posts }: { posts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
    return ['Toutes', ...unique];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'Toutes' || post.category === activeCategory;
      const matchesQuery = !q || post.title.toLowerCase().includes(q) || post.category.toLowerCase().includes(q) || post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-[#118708] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge variant="success" className="mb-4">Ressources & conseils</Badge>
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Blog agricole CIPRESA</h1>
              <p className="mx-auto mb-8 max-w-3xl text-white/60 leading-8">
                Retrouvez des articles pratiques, des analyses agricoles, des conseils d’experts et des bonnes pratiques pour renforcer la performance, la durabilité et la résilience de vos exploitations.
              </p>
              <div className="mx-auto mb-8 grid max-w-4xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{posts.length}</div>
                  <div className="text-sm text-white/70">Articles publiés</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Agriculture</div>
                  <div className="text-sm text-white/70">Conseils concrets</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Afrique</div>
                  <div className="text-sm text-white/70">Contextes locaux</div>
                </div>
              </div>
              <div className="relative mx-auto max-w-md">
                <Search className="absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none ring-0 transition focus:border-cipresa-500 focus:bg-white/15 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-cipresa-100 bg-cipresa-50/60 p-6">
              <p className="mb-2 text-sm font-semibold text-cipresa-700">Pourquoi suivre le blog CIPRESA ?</p>
              <h2 className="text-2xl font-bold text-slate-900">Des contenus pour pas seulement lire, mais agir.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Chaque article combine les besoins du terrain, les méthodes d’accompagnement et les leviers de performance agricoles à l’échelle des exploitations africaines.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-slate-900">Filtres rapides</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${activeCategory === category ? 'bg-cipresa-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aucun article trouvé</h3>
            </div>
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <CardImage src={post.image} alt={post.title} aspect="video" />
                      <CardContent className="flex flex-1 flex-col p-5">
                        <Badge variant="info" size="sm" className="mb-3 self-start">{post.category}</Badge>
                        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-cipresa-600 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="mb-4 flex-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between gap-3 text-xs text-gray-400">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />  {post.readTime}</span>
                          </div>
                          <span className="text-cipresa-500 transition-transform group-hover:translate-x-1"><ArrowRight className="w-4 h-4" /></span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

