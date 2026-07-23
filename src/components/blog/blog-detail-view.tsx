'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, Share2, Tag, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';
import { formatDate } from '@/lib/utils/format';
import type { BlogPost } from '@/types';

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">{trimmed.slice(4)}</h3>;
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{trimmed.slice(3)}</h2>;
    }
    if (trimmed.startsWith('- **')) {
      const match = trimmed.match(/- \*\*(.+?)\*\*(?:: (.+))?/);
      if (match) {
        return (
          <li key={i} className="text-gray-600 dark:text-gray-300 mb-1.5 ml-6 list-disc">
            <span className="font-semibold text-gray-900 dark:text-white">{match[1]}</span>
            {match[2] && <> : {match[2]}</>}
          </li>
        );
      }
      return <li key={i} className="text-gray-600 dark:text-gray-300 mb-1.5 ml-6 list-disc">{trimmed.slice(2)}</li>;
    }
    if (trimmed.startsWith('- ')) {
      return <li key={i} className="text-gray-600 dark:text-gray-300 mb-1.5 ml-6 list-disc">{trimmed.slice(2)}</li>;
    }
    if (/^\d\. /.test(trimmed)) {
      return <li key={i} className="text-gray-600 dark:text-gray-300 mb-1.5 ml-6 list-decimal">{trimmed.slice(3)}</li>;
    }
    return <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{trimmed}</p>;
  });
}

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  return (
    <PageTransition>
      <article>
        <div className="relative h-[50vh] min-h-[320px] bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${post.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
          <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-4">
                <ChevronLeft className="w-4 h-4" /> Retour au blog
              </Link>
              <Badge variant="info" size="md" className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.publishedAt, 'long')}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            <AnimatedSection>
              <div className="prose prose-lg max-w-none">{renderContent(post.content)}</div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Lien copié !', { duration: 2000, position: 'top-center' });
                  }}
                >
                  <Share2 className="w-4 h-4" /> Partager
                </Button>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Articles similaires</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                        <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 h-full hover:shadow-lg transition-all duration-300">
                          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${rp.image})` }} />
                          <div className="p-4">
                            <Badge variant="info" size="sm" className="mb-2">{rp.category}</Badge>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-cipresa-600 transition-colors">{rp.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(rp.publishedAt)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>

            <aside className="space-y-6">
              <AnimatedSection delay={0.1} className="sticky top-28">
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">À propos de l&apos;auteur</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-cipresa-500 flex items-center justify-center text-white font-bold text-sm">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{post.author}</p>
                      <p className="text-xs text-gray-500">Expert CIPRESA</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Expert chez CIPRESA Consulting, dédié à la formation et l&apos;accompagnement des agriculteurs pour une agriculture performante et durable en Afrique.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-cipresa-600 to-blue-800 text-white">
                  <h3 className="font-bold text-lg mb-2">Devenir membre CIPRESA</h3>
                  <p className="text-sm text-white/80 mb-4">Accédez à toutes nos formations, ressources et conseils d&apos;experts.</p>
                  <Link href="/auth/register">
                    <Button fullWidth className="bg-white text-cipresa-700 hover:bg-gray-100 shadow-none">S&apos;inscrire gratuitement</Button>
                  </Link>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
