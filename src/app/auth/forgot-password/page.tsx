'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Leaf, Mail, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestPasswordReset } from '@/lib/auth/actions';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez renseigner votre email.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <Image src="/images/logo.png" alt="CIPRESA Consulting" width={150} height={60} className="h-12 w-auto object-contain" priority />
          </Link>

          {isSent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cipresa-100 dark:bg-cipresa-900/30 flex items-center justify-center mx-auto mb-6">
                <MailCheck className="w-8 h-8 text-cipresa-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vérifiez votre boîte mail</h1>
              <p className="text-gray-500 mb-8">
                Si un compte existe pour <strong>{email}</strong>, un lien de réinitialisation vient de lui être envoyé.
              </p>
              <Link href="/auth/login" className="text-cipresa-600 hover:text-cipresa-700 font-semibold text-sm">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-cipresa-600 mb-6">
                <ChevronLeft className="w-4 h-4" /> Retour
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mot de passe oublié</h1>
              <p className="text-gray-500 mb-8">Entrez votre email pour recevoir un lien de réinitialisation.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input label="Email" type="email" placeholder="votre@email.com" icon={Mail}
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" fullWidth size="lg" icon={ArrowRight} iconPosition="right" loading={isSubmitting}>
                  Envoyer le lien
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-cipresa-900 to-gray-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="relative text-center max-w-md">
          <Leaf className="w-20 h-20 text-cipresa-400/40 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">CIPRESA</h2>
          <p className="text-white/60">Formations agricoles, semences certifiées et accompagnement personnalisé.</p>
        </div>
      </div>
    </div>
  );
}
