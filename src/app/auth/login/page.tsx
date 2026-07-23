'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInWithPassword } from '@/lib/auth/actions';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Veuillez renseigner votre email et votre mot de passe.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithPassword(form.email, form.password);
      toast.success('Connexion réussie !');
      // A hard navigation, not router.push(), because the destination is
      // often a protected route (e.g. /dashboard) that the client Router
      // Cache may have already cached as "redirect to /auth/login" from
      // before this session existed — router.push()+router.refresh() can
      // silently replay that stale redirect instead of re-checking with
      // the now-valid session. A full navigation always hits middleware fresh.
      const nextPath = searchParams?.get('next') ?? '/dashboard';
      window.location.href = nextPath;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Identifiants incorrects.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <Image
              src="/images/logo.png"
              alt="CIPRESA Consulting"
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Content de vous revoir</h1>
          <p className="text-gray-500 mb-8">Connectez-vous pour accéder à votre espace</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input label="Email" type="email" placeholder="votre@email.com" icon={Mail}
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className="relative">
              <Input label="Mot de passe" type={showPassword ? 'text' : 'password'} placeholder="Votre mot de passe" icon={Lock}
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-cipresa-500 focus:ring-cipresa-500" />
                <span className="text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
              </label>
              <Link href="/auth/forgot-password" className="text-cipresa-600 hover:text-cipresa-700 font-medium">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" icon={ArrowRight} iconPosition="right" loading={isSubmitting}>
              Se connecter
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-white dark:bg-gray-950 text-sm text-gray-500">ou continuer avec</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" fullWidth icon={Chrome} iconPosition="left" type="button"
              onClick={() => toast('Connexion Google bientôt disponible', { icon: '🔜' })}>Google</Button>
            <Button variant="outline" fullWidth type="button"
              onClick={() => toast('Connexion Mobile Money bientôt disponible', { icon: '🔜' })}>Mobile Money</Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Pas encore de compte ? <Link href="/auth/register" className="text-cipresa-600 hover:text-cipresa-700 font-semibold">S'inscrire</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-cipresa-900 to-gray-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="relative text-center max-w-md">
          <Leaf className="w-20 h-20 text-cipresa-400/40 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Bienvenue sur CIPRESA</h2>
          <p className="text-white/60">Accédez à des formations agricoles de qualité, achetez des semences certifiées et suivez votre progression.</p>
        </div>
      </div>
    </div>
  );
}
