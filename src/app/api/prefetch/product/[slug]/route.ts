import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data/products';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return NextResponse.json({ product: null }, { status: 404 });

  return NextResponse.json({
    product: {
      id: product.id,
      slug: product.slug,
      name: product.name,
      images: product.images,
      price: product.price,
      salePrice: product.salePrice,
      currency: product.currency,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
    },
  });
}
