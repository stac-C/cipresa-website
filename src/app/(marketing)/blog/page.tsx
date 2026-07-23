import type { Metadata } from 'next';
import { getPublishedBlogPosts } from '@/lib/data/blog';
import { BlogBrowser } from '@/components/blog/blog-browser';

export const metadata: Metadata = {
  title: 'Blog agricole',
  description: 'Actualités, conseils et guides pour une agriculture performante et durable en Afrique.',
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  return <BlogBrowser posts={posts} />;
}
