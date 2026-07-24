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
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge variant="success" className="mb-4">Ressources & conseils</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Blog agricole CIPRESA</h1>
              <p className="text-white/60 max-w-3xl mx-auto mb-8 leading-8">
                Retrouvez des articles pratiques, des analyses agricoles, des conseils d’experts et des bonnes pratiques pour renforcer la performance, la durabilité et la résilience de vos exploitations.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 max-w-4xl mx-auto mb-8">
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
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cipresa-500 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-cipresa-100 bg-cipresa-50/60 p-6">
              <p className="mb-2 text-sm font-semibold text-cipresa-700">Pourquoi suivre le blog CIPRESA ?</p>
              <h2 className="text-2xl font-bold text-slate-900">Des contenus pour pas seulement lire, mais agir.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Chaque article combine les besoins du terrain, les méthodes d’accompagnement et les leviers de performance agricoles à l’échelle des exploitations africaines.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
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
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aucun article trouvé</h3>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <Card className="h-full flex flex-col">
                      <CardImage src={post.image} alt={post.title} aspect="video" />
                      <CardContent className="flex-1 flex flex-col">
                        <Badge variant="info" size="sm" className="mb-3 self-start">{post.category}</Badge>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cipresa-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                          </div>
                          <span className="text-cipresa-500 group-hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></span>
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
