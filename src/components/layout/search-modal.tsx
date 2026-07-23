'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, TrendingUp, Clock, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/lib/store/ui-store';
import { searchCatalog, getTrendingCourses, type SearchResultItem, type SearchResults } from '@/lib/actions/search';

const recentSearches = ['Culture de tomate', 'Avocatier', 'Élevage poulets', 'Engrais'];
const EMPTY_RESULTS: SearchResults = { courses: [], products: [], plants: [] };

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-cipresa-100 dark:bg-cipresa-900/50 text-cipresa-700 dark:text-cipresa-300 rounded-sm px-0.5">{part}</mark>
          : part
      )}
    </>
  );
}

export const SearchModal = () => {
  const { isSearchOpen, toggleSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
  const [trending, setTrending] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      getTrendingCourses().then(setTrending).catch(() => {});
    } else {
      setQuery('');
      setResults(EMPTY_RESULTS);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) toggleSearch();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggleSearch(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(EMPTY_RESULTS);
      return;
    }
    const timeout = setTimeout(() => {
      searchCatalog(query).then(setResults).catch(() => setResults(EMPTY_RESULTS));
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const totalResults = results.courses.length + results.products.length + results.plants.length;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Recherche">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleSearch}
          />
          <div className="absolute top-0 left-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="max-w-3xl mx-auto mt-20 px-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <label htmlFor="global-search-input" className="sr-only">Rechercher des cours, produits, plantes</label>
                  <input
                    id="global-search-input"
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher des cours, produits, plantes..."
                    className="w-full pl-12 pr-24 py-5 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {query && (
                      <button onClick={() => setQuery('')} aria-label="Effacer la recherche" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <X className="w-4 h-5 text-gray-400" />
                      </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      Esc
                    </kbd>
                  </div>
                </div>

                {query.length < 2 ? (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="pt-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Recherches récentes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:bg-cipresa-50 hover:text-cipresa-600 dark:hover:bg-cipresa-950/50 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {trending.length > 0 && (
                      <div className="pt-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5" /> Tendance
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {trending.map((c) => (
                            <Link key={c.id} href={`/course/${c.slug}`} onClick={toggleSearch} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <div className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${c.image})` }} />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{c.title}</p>
                                <p className="text-xs text-gray-500">{c.meta}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : totalResults > 0 ? (
                  <div className="border-t border-gray-100 dark:border-gray-800 max-h-96 overflow-y-auto">
                    {results.courses.length > 0 && (
                      <div className="p-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Cours ({results.courses.length})</h3>
                        {results.courses.map((c) => (
                          <Link key={c.id} href={`/course/${c.slug}`} onClick={toggleSearch} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className="w-14 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${c.image})` }} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                <HighlightText text={c.title} query={query} />
                              </p>
                              <p className="text-xs text-gray-500">{c.meta}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-cipresa-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                        <Link href={`/courses`} onClick={toggleSearch} className="flex items-center justify-center gap-2 px-3 py-2 mt-2 text-sm text-cipresa-600 hover:text-cipresa-700 font-medium rounded-lg hover:bg-cipresa-50 dark:hover:bg-cipresa-950/50 transition-colors">
                          Voir tous les cours <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                    {results.products.length > 0 && (
                      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Produits ({results.products.length})</h3>
                        {results.products.map((p) => (
                          <Link key={p.id} href={`/product/${p.slug}`} onClick={toggleSearch} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <div className="w-14 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${p.image})` }} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                <HighlightText text={p.title} query={query} />
                              </p>
                              <p className="text-xs text-gray-500">{p.meta}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-cipresa-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                        <Link href={`/marketplace`} onClick={toggleSearch} className="flex items-center justify-center gap-2 px-3 py-2 mt-2 text-sm text-cipresa-600 hover:text-cipresa-700 font-medium rounded-lg hover:bg-cipresa-50 dark:hover:bg-cipresa-950/50 transition-colors">
                          Voir tous les produits <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                    {results.plants.length > 0 && (
                      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Plantes ({results.plants.length})</h3>
                        {results.plants.map((p) => (
                          <Link key={p.id} href={`/plant/${p.slug}`} onClick={toggleSearch} className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                            <Leaf className="w-8 h-8 text-cipresa-500 ml-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                <HighlightText text={p.title} query={query} />
                              </p>
                              <p className="text-xs text-gray-500 italic">{p.meta}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-cipresa-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                        <Link href={`/encyclopedia`} onClick={toggleSearch} className="flex items-center justify-center gap-2 px-3 py-2 mt-2 text-sm text-cipresa-600 hover:text-cipresa-700 font-medium rounded-lg hover:bg-cipresa-50 dark:hover:bg-cipresa-950/50 transition-colors">
                          Voir toutes les plantes <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : query.length >= 2 && (
                  <div className="px-6 py-12 text-center border-t border-gray-100 dark:border-gray-800">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Aucun résultat pour &quot;{query}&quot;</p>
                    <p className="text-sm text-gray-400 mt-1">Essayez d&apos;autres termes de recherche</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
