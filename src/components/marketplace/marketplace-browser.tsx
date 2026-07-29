'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { Card, CardImage, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { Product, ProductCategory } from '@/types';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Plus populaires' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
];

const ITEMS_PER_PAGE = 8;

interface MarketplaceBrowserProps {
  products: Product[];
  categories: ProductCategory[];
}

export function MarketplaceBrowser({ products, categories }: MarketplaceBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [showInStock, setShowInStock] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.tags.some((t) => t.includes(searchQuery.toLowerCase()))) return false;
      if (selectedCategory && p.category.slug !== selectedCategory) return false;
      if (showInStock && p.stock <= 0) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating);
      default: return [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [products, searchQuery, selectedCategory, sortBy, showInStock]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-[#118708] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge variant="warning" className="mb-4">Boutique</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Boutique agricole</h1>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Semences, plants, intrants et équipements pour une agriculture productive
              </p>
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text" placeholder="Rechercher un produit..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button onClick={() => setSelectedCategory(null)} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all', !selectedCategory ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200')}>Tous</button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5', selectedCategory === cat.slug ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200')}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">{filtered.length} produits</p>
              <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
                <input type="checkbox" checked={showInStock} onChange={() => setShowInStock(!showInStock)} className="rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
                En stock
              </label>
            </div>
            <div className="flex items-center gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                    sortBy === opt.value ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
            {paginated.map((product) => (
              <StaggerItem key={product.id}>
                <Link href={`/product/${product.slug}`} className="group block">
                  <Card className="h-full flex flex-col">
                    <div className="relative">
                      <CardImage src={product.images[0]} alt={product.name} aspect="square" />
                      {product.featured && <Badge variant="warning" size="sm" className="absolute top-3 left-3">Meilleure vente</Badge>}
                      {product.salePrice && <Badge variant="error" size="sm" className="absolute top-3 right-3">Promo</Badge>}
                      {product.stock <= 10 && product.stock > 0 && (
                        <Badge variant="info" size="sm" className="absolute bottom-3 left-3">Plus que {product.stock}</Badge>
                      )}
                    </div>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">{product.category.name}</p>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors text-sm">{product.name}</h3>
                      <StarRating rating={product.rating} totalReviews={product.totalReviews} size={13} />
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <div>
                          {product.salePrice ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-base font-bold text-amber-600">{formatCurrency(product.salePrice, product.currency)}</span>
                              <span className="text-xs text-gray-400 line-through">{formatCurrency(product.price, product.currency)}</span>
                            </div>
                          ) : (
                            <span className="text-base font-bold text-amber-600">{formatCurrency(product.price, product.currency)}</span>
                          )}
                          <span className="text-xs text-gray-400">/{product.unit}</span>
                          <p className={cn('text-[10px] mt-0.5', product.stock > 0 ? 'text-cipresa-600' : 'text-red-500')}>
                            {product.stock > 0 ? 'En stock' : 'Rupture'}
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                          <ShoppingBag className="w-4 h-4 text-amber-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {hasMore && (
            <div className="text-center pb-16">
              <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
                Voir plus de produits ({filtered.length - paginated.length} restants)
              </Button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500 mb-4">Essayez de modifier vos filtres</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory(null); setShowInStock(false); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
