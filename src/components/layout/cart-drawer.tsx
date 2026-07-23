'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/lib/store/ui-store';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';

export const CartDrawer = () => {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Panier">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-cipresa-500" />
                  <h2 className="text-lg font-bold">Mon panier</h2>
                  <span className="text-sm text-gray-500">({items.length})</span>
                </div>
                <button onClick={toggleCart} aria-label="Fermer le panier" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Votre panier est vide</h3>
                  <p className="text-sm text-gray-500 mb-6">Explorez nos cours et produits agricoles</p>
                  <Link href="/courses" onClick={toggleCart}>
                    <Button>Découvrir nos formations</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 60, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, x: 60, height: 0 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                          className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 group overflow-hidden">
                        <div className="w-20 h-16 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{item.name}</p>
                          <p className="text-sm text-cipresa-600 font-semibold mt-1">{formatCurrency(item.price)}</p>
                          {item.type === 'product' && (
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Réduire la quantité de ${item.name}`} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Augmenter la quantité de ${item.name}`} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label={`Retirer ${item.name} du panier`} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Sous-total</span>
                      <span className="text-lg font-bold">{formatCurrency(getTotal())}</span>
                    </div>
                    <Link href="/checkout" onClick={toggleCart}>
                      <Button fullWidth size="lg" icon={ArrowRight} iconPosition="right">
                        Commander
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
