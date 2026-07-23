'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/cart-store';
import { removeWishlistItem } from '@/lib/actions/wishlist';
import type { WishlistDetailRow } from '@/lib/data/wishlist';

interface WishlistItemDisplay {
  entryId: string;
  href: string;
  image: string;
  title: string;
  subtitle: string;
  price: number | null;
  currency: string;
  addToCart?: { id: string; type: 'course' | 'product'; itemId: string; name: string; price: number; quantity: number; image: string };
}

function toDisplay(row: WishlistDetailRow): WishlistItemDisplay {
  if (row.itemType === 'course') {
    const price = row.course.salePrice ?? row.course.price;
    return {
      entryId: row.id,
      href: `/course/${row.course.slug}`,
      image: row.course.thumbnail,
      title: row.course.title,
      subtitle: row.course.category.name,
      price,
      currency: row.course.currency,
      addToCart: price > 0
        ? { id: `course-${row.course.id}`, type: 'course', itemId: row.course.id, name: row.course.title, price, quantity: 1, image: row.course.thumbnail }
        : undefined,
    };
  }
  if (row.itemType === 'product') {
    const price = row.product.salePrice ?? row.product.price;
    return {
      entryId: row.id,
      href: `/product/${row.product.slug}`,
      image: row.product.images[0] ?? '',
      title: row.product.name,
      subtitle: row.product.category.name,
      price,
      currency: row.product.currency,
      addToCart: { id: `product-${row.product.id}-base`, type: 'product', itemId: row.product.id, name: row.product.name, price, quantity: 1, image: row.product.images[0] ?? '' },
    };
  }
  return {
    entryId: row.id,
    href: `/plant/${row.plant.slug}`,
    image: row.plant.images[0] ?? '',
    title: row.plant.commonName,
    subtitle: row.plant.category.name,
    price: row.plant.price > 0 ? row.plant.price : null,
    currency: row.plant.currency,
  };
}

export function WishlistView({ items }: { items: WishlistDetailRow[] }) {
  const [rows, setRows] = useState(items.map(toDisplay));
  const [isPending, startTransition] = useTransition();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleRemove = (entryId: string) => {
    setRemovingId(entryId);
    startTransition(async () => {
      try {
        await removeWishlistItem(entryId);
        setRows((prev) => prev.filter((r) => r.entryId !== entryId));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
      } finally {
        setRemovingId(null);
      }
    });
  };

  if (rows.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-4">Votre liste de souhaits est vide.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/courses"><Button size="sm">Explorer les formations</Button></Link>
          <Link href="/marketplace"><Button size="sm" variant="outline">Voir la boutique</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((item) => (
        <Card key={item.entryId} className="flex flex-col">
          <Link href={item.href} className="block aspect-video bg-cover bg-center bg-gray-100 dark:bg-gray-800" style={{ backgroundImage: `url(${item.image})` }} />
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-xs text-gray-500">{item.subtitle}</p>
            <Link href={item.href} className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-cipresa-600 transition-colors">
              {item.title}
            </Link>
            <div className="mt-2 mb-3">
              {item.price !== null ? (
                <span className="text-sm font-bold text-cipresa-600">{formatCurrency(item.price, item.currency)}</span>
              ) : (
                <span className="text-sm text-gray-400">Prix sur demande</span>
              )}
            </div>
            <div className="mt-auto flex items-center gap-2">
              {item.addToCart ? (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    addItem(item.addToCart!);
                    toast.success('Ajouté au panier !');
                  }}
                >
                  <ShoppingCart className="w-4 h-4" /> Ajouter au panier
                </Button>
              ) : (
                <Link href={item.href} className="flex-1">
                  <Button size="sm" fullWidth variant="outline"><MessageCircle className="w-4 h-4" /> Voir la fiche</Button>
                </Link>
              )}
              <button
                onClick={() => handleRemove(item.entryId)}
                disabled={isPending && removingId === item.entryId}
                className="p-2 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Retirer de la liste de souhaits"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
