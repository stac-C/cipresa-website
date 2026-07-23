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

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
  }, [posts, searchQuery]);

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge variant="success" className="mb-4">Blog</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Blog agricole</h1>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Actualités, conseils et guides pour une agriculture performante
              </p>
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
