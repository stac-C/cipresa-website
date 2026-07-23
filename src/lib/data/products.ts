import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Product, ProductCategory, ProductVariant } from '@/types';

interface ProductCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
}

interface ProductVariantRow {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  images: string[];
  price: number;
  sale_price: number | null;
  currency: string;
  stock: number;
  unit: string | null;
  featured: boolean;
  is_published: boolean;
  rating: number;
  total_reviews: number;
  tags: string[];
  created_at: string;
  category: ProductCategoryRow;
  product_variants: ProductVariantRow[];
}

function mapCategory(row: ProductCategoryRow): ProductCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    icon: row.icon ?? '',
    image: row.image ?? '',
    count: 0,
  };
}

function mapVariant(row: ProductVariantRow): ProductVariant {
  return { id: row.id, name: row.name, price: Number(row.price), stock: row.stock, attributes: row.attributes ?? {} };
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    shortDescription: row.short_description ?? '',
    images: row.images ?? [],
    category: mapCategory(row.category),
    price: Number(row.price),
    salePrice: row.sale_price !== null ? Number(row.sale_price) : undefined,
    currency: row.currency,
    stock: row.stock,
    unit: row.unit ?? 'unité',
    variants: (row.product_variants ?? []).map(mapVariant),
    featured: row.featured,
    isPublished: row.is_published,
    rating: Number(row.rating),
    totalReviews: row.total_reviews,
    tags: row.tags ?? [],
    createdAt: row.created_at,
  };
}

const PRODUCT_SELECT = '*, category:product_categories(*), product_variants(*)';

export async function getPublishedProducts(): Promise<Product[]> {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_published', true)
    .eq('featured', true)
    .limit(limit);
  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).in('id', ids);
  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

// Cached per-request — see getCourseBySlug in courses.ts for why.
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error || !data) return null;
  return mapProduct(data as unknown as ProductRow);
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const supabase = supabaseAdmin;
  const { data, error } = await supabase.from('product_categories').select('*').order('display_order');
  if (error || !data) return [];
  return (data as ProductCategoryRow[]).map(mapCategory);
}

// ==================== Admin (service role — bypasses is_published filter) ====================

export async function getAllProductsForAdmin(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select(PRODUCT_SELECT)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as unknown as ProductRow[]).map(mapProduct);
}

export async function getProductByIdForAdmin(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin.from('products').select(PRODUCT_SELECT).eq('id', id).single();
  if (error || !data) return null;
  return mapProduct(data as unknown as ProductRow);
}
