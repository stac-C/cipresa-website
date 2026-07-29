'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Leaf, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';
import { signUpWithPassword } from '@/lib/auth/actions';

function getPasswordStrength(pw: string): { score: number; label: string; color: string; checks: { label: string; pass: boolean }[] } {
  const checks = [
    { label: '8 caractères minimum', pass: pw.length >= 8 },
    { label: 'Une lettre majuscule', pass: /[A-Z]/.test(pw) },
    { label: 'Une lettre minuscule', pass: /[a-z]/.test(pw) },
    { label: 'Un chiffre', pass: /\d/.test(pw) },
  ];
  const score = checks.filter(c => c.pass).length;
  const labels = ['', 'Faible', 'Moyen', 'Bon', 'Fort'];
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-cipresa-500'];
  return { score, label: labels[score], color: colors[score], checks };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  const validate = (field: string, value: string) => {
    const errs: Record<string, string> = {};
    if (field === 'fullName' && !value.trim()) errs.fullName = 'Nom requis';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = 'Email invalide';
    if (field === 'phone' && value && !/^\+?[\d\s]{6,}$/.test(value)) errs.phone = 'Numéro invalide';
    if (field === 'password' && value.length < 8) errs.password = 'Minimum 8 caractères';
    return errs;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, ...validate(field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = {
      ...validate('fullName', form.fullName),
      ...validate('email', form.email),
      ...validate('phone', form.phone),
      ...validate('password', form.password),
    };
    setErrors(allErrors);
    setTouched({ fullName: true, email: true, phone: true, password: true });
    if (Object.keys(allErrors).length > 0) return;
    if (!acceptedTerms) {
      setFormError('Veuillez accepter les conditions d\'utilisation.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    try {
      await signUpWithPassword({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.phone || undefined,
      });
      toast.success('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
      router.push('/auth/login');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-[#118708] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="relative text-center max-w-md">
          <Leaf className="w-20 h-20 text-cipresa-400/40 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Rejoignez CIPRESA</h2>
          <p className="text-white/60">Créez votre compte et accédez à des formations de qualité, des produits certifiés et un accompagnement personnalisé.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <Image
              src="/images/logo.png"
              alt="CIPRESA Consulting"
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Créer un compte</h1>
          <p className="text-gray-500 mb-6">Rejoignez la communauté CIPRESA</p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <Input label="Nom complet" placeholder="Votre nom" icon={User}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                onBlur={() => handleBlur('fullName', form.fullName)}
              />
              {touched.fullName && errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <Input label="Email" type="email" placeholder="votre@email.com" icon={Mail}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onBlur={() => handleBlur('email', form.email)}
              />
              {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Input label="Téléphone" type="tel" placeholder="+237 6XX XXX XXX" icon={Phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onBlur={() => handleBlur('phone', form.phone)}
              />
              {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="relative">
              <Input label="Mot de passe" type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 caractères" icon={Lock}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onBlur={() => handleBlur('password', form.password)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {form.password.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all duration-300', strength.color)} style={{ width: `${(strength.score / 4) * 100}%` }} />
                  </div>
                  <span className={cn('text-xs font-medium', strength.score <= 1 ? 'text-red-500' : strength.score === 2 ? 'text-orange-500' : strength.score === 3 ? 'text-yellow-600' : 'text-cipresa-600')}>
                    {strength.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {strength.checks.map((check) => (
                    <div key={check.label} className="flex items-center gap-1.5 text-xs">
                      {check.pass
                        ? <CheckCircle className="w-3 h-3 text-cipresa-500" />
                        : <XCircle className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                      }
                      <span className={check.pass ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-start gap-2 cursor-pointer text-sm">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-cipresa-500 focus:ring-cipresa-500"
                checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
              <span className="text-gray-500">J'accepte les <Link href="/terms" className="text-cipresa-600 hover:underline">conditions d'utilisation</Link> et la <Link href="/privacy" className="text-cipresa-600 hover:underline">politique de confidentialité</Link></span>
            </label>

            {formError && <p className="text-sm text-red-500">{formError}</p>}

            <Button type="submit" fullWidth size="lg" icon={ArrowRight} iconPosition="right" className="mt-2" loading={isSubmitting}>
              Créer mon compte
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà membre ? <Link href="/auth/login" className="text-cipresa-600 hover:text-cipresa-700 font-semibold">Se connecter</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
