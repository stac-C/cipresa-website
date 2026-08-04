'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Share2, ChevronLeft, Check, Minus, Plus, Truck, Shield, Phone, Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { submitReview } from '@/lib/actions/courses';
import { toggleWishlistItem } from '@/lib/actions/wishlist';
import type { Product, Review } from '@/types';

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  initialIsWishlisted: boolean;
}

export function ProductDetailView({ product, reviews, initialIsWishlisted }: ProductDetailViewProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?next=/product/${product.slug}`);
      return;
    }
    setIsTogglingWishlist(true);
    const previous = isWishlisted;
    setIsWishlisted(!previous);
    try {
      const saved = await toggleWishlistItem('product', product.id);
      setIsWishlisted(saved);
      toast.success(saved ? 'Ajouté à vos favoris' : 'Retiré de vos favoris');
    } catch (err) {
      setIsWishlisted(previous);
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const variant = selectedVariant ? product.variants.find((v) => v.id === selectedVariant) : null;
  const currentPrice = variant?.price || product.salePrice || product.price;
  const currentStock = variant?.stock ?? product.stock;

  const handleAddToCart = () => {
    addItem({ id: `product-${product.id}-${selectedVariant ?? 'base'}`, type: 'product', itemId: product.id, name: product.name, price: currentPrice, quantity, image: product.images[0] });
    setIsAdding(true);
    toast.success(`${quantity} × ${product.name} ajouté au panier`, {
      duration: 2500,
      position: 'top-center',
      style: { borderRadius: '12px', padding: '12px 16px', fontSize: '14px' },
    });
    setTimeout(() => setIsAdding(false), 1400);
  };

  return (
    <PageTransition>
      <div className="pt-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cipresa-700 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Retour à la boutique
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left" className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.images[selectedImage] || product.images[0]})` }}
                />
                {product.salePrice && <Badge variant="error" size="md" className="absolute top-4 left-4">Promo</Badge>}
                {product.featured && <Badge variant="warning" size="md" className="absolute top-4 right-4">Meilleure vente</Badge>}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-cipresa-600' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                    </button>
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <div>
                <Badge variant="warning">{product.category.name}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-2">{product.name}</h1>
                <StarRating rating={product.rating} showValue totalReviews={product.totalReviews} size={16} />
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

              <div className="flex items-baseline gap-3">
                {product.salePrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold text-cipresa-700">{formatCurrency(product.salePrice, product.currency)}</span>
                    <span className="text-xl text-gray-400 line-through">{formatCurrency(product.price, product.currency)}</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-cipresa-700">{formatCurrency(currentPrice, product.currency)}</span>
                )}
                <span className="text-gray-400">/{product.unit}</span>
              </div>

              <div className={cn('flex items-center gap-2 text-sm', currentStock > 0 ? 'text-cipresa-600' : 'text-red-500')}>
                <div className={cn('w-2 h-2 rounded-full', currentStock > 0 ? 'bg-cipresa-500' : 'bg-red-500')} />
                {currentStock > 0 ? `${currentStock} en stock` : 'Rupture de stock'}
              </div>

              {product.variants.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Variétés</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVariant(v.id); setQuantity(1); }}
                        className={cn(
                          'px-4 py-2.5 rounded-lg border text-sm font-medium transition-all',
                          selectedVariant === v.id
                            ? 'border-cipresa-600 bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-700 dark:text-cipresa-300'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cipresa-300'
                        )}
                      >
                        {v.name} - {formatCurrency(v.price, product.currency)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quantité</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))} className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className={cn(
                      'w-full shadow-none transition-all duration-300',
                      isAdding ? 'bg-cipresa-600 hover:bg-cipresa-700 text-white' : 'bg-cipresa-600 hover:bg-cipresa-700 text-white'
                    )}
                    onClick={handleAddToCart}
                    disabled={isAdding || currentStock === 0}
                  >
                    <AnimatePresence mode="wait">
                      {isAdding ? (
                        <motion.span key="check" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
                          <Check className="w-5 h-5" /> Ajouté
                        </motion.span>
                      ) : (
                        <motion.span key="cart" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5" /> {currentStock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn('w-14', isWishlisted && 'border-red-400 text-red-500')}
                  title="Ajouter aux favoris"
                  loading={isTogglingWishlist}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={Share2}
                  className="w-14"
                  title="Partager"
                  onClick={() => {
                    navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {});
                    if (!navigator.share) {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Lien copié !');
                    }
                  }}
                />
              </div>

              <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Truck className="w-5 h-5 text-cipresa-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Livraison partout au Cameroun</p>
                    <p className="text-xs">Sous 24h à 72h selon votre localisation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5 text-cipresa-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Paiement Mobile Money</p>
                    <p className="text-xs">MTN Mobile Money & Orange Money acceptés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <Shield className="w-5 h-5 text-cipresa-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Produits certifiés</p>
                    <p className="text-xs">Garantie de qualité et satisfaction</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Stock', value: `${currentStock} ${product.unit}(s)` },
                  { label: 'Variété', value: variant?.name || 'Standard' },
                  { label: 'Note', value: `${product.rating}/5` },
                  { label: 'Référence', value: `CIP-${product.id.slice(0, 8)}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="max-w-2xl mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Avis clients ({reviews.length})</h2>
            <ProductReviewForm productId={product.id} isAuthenticated={isAuthenticated} />
            <div className="space-y-4 mt-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-cipresa-100 dark:bg-cipresa-950/50 flex items-center justify-center text-cipresa-700 text-sm font-bold flex-shrink-0">
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
              {reviews.length === 0 && <p className="text-sm text-gray-500 text-center py-8">Aucun avis pour le moment.</p>}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function ProductReviewForm({ productId, isAuthenticated }: { productId: string; isAuthenticated: boolean }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthenticated) {
    return (
      <p className="text-gray-500 text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <Link href="/auth/login" className="text-cipresa-700 hover:underline font-medium">Connectez-vous</Link> pour laisser un avis.
      </p>
    );
  }

  if (submitted) {
    return <p className="text-sm text-cipresa-600 bg-cipresa-50 dark:bg-cipresa-950/30 rounded-xl p-4">Merci pour votre avis ! Il sera visible après modération.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitReview({ targetId: productId, targetType: 'product', rating, comment });
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)}>
            <Star className={cn('w-6 h-6', n <= rating ? 'fill-cipresa-500 text-cipresa-500' : 'text-gray-300 dark:text-gray-600')} />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Partagez votre expérience avec ce produit..."
        rows={3}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cipresa-500"
      />
      <Button type="submit" size="sm" loading={isSubmitting} className="bg-cipresa-600 hover:bg-cipresa-700">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publier'}
      </Button>
    </form>
  );
}
