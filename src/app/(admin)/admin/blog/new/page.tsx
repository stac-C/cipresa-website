import { AdminShell } from '@/components/admin/admin-shell';
import { BlogForm } from '@/components/admin/blog-form';
import { createBlogPost } from '@/lib/actions/admin/blog';

export default function NewBlogPostPage() {
  return (
    <AdminShell>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nouvel article</h1>
      <BlogForm action={createBlogPost} />
    </AdminShell>
  );
}
