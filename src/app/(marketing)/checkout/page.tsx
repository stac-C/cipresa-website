'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Trash2, MapPin, User,
  Package, BookOpen, Truck, Shield, CreditCard, Check,
  ChevronLeft, ArrowRight, Minus, Plus, Loader2, AlertTriangle, Smartphone,
  XCircle, HelpCircle, RotateCcw, MessageCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';
import { useCartStore } from '@/lib/store/cart-store';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { createOrderAndInitiatePayment } from '@/lib/actions/checkout';
import { classifyPaymentFailure, type PaymentFailureInfo } from '@/lib/payments/failure-reasons';

type Step = 'form' | 'waiting' | 'success' | 'failed' | 'timeout';

const PAYMENT_POLL_TIMEOUT_MS = 2 * 60 * 1000;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failureInfo, setFailureInfo] = useState<PaymentFailureInfo | null>(null);
  const orderIdRef = useRef<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    mobileMoneyOperator: 'MTN_MOMO' as 'MTN_MOMO' | 'ORANGE_MONEY',
    address: '',
    city: '',
    notes: '',
  });

  const courses = items.filter((i) => i.type === 'course');
  const products = items.filter((i) => i.type === 'product');
  const total = getTotal();

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const pollPaymentStatus = (orderId: string) => {
    const pollStartedAt = Date.now();
    pollRef.current = setInterval(async () => {
      // Nokash's own error-handling guide says an ambiguous initiate response
      // ("platform misbehaving") must not be treated as a definite failure —
      // the payin may still go through server-side. So we keep polling
      // instead of showing "failed", but cap it: if nothing resolves within
      // this window (no webhook, no confirmable status), stop and tell the
      // customer we couldn't confirm rather than spinning forever.
      if (Date.now() - pollStartedAt > PAYMENT_POLL_TIMEOUT_MS) {
        if (pollRef.current) clearInterval(pollRef.current);
        setStep('timeout');
        return;
      }
      try {
        const res = await fetch(`/api/payments/nokash/status?orderId=${orderId}`);
        const data = await res.json();
        if (data.status === 'paid') {
          if (pollRef.current) clearInterval(pollRef.current);
          clearCart();
          setStep('success');
        } else if (data.status === 'failed') {
          if (pollRef.current) clearInterval(pollRef.current);
          setFailureInfo(classifyPaymentFailure(data.message));
          setStep('failed');
        }
      } catch {
        // transient network error — keep polling, next tick will retry
      }
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const outcome = await createOrderAndInitiatePayment({
        items: items.map((i) => ({ type: i.type, itemId: i.itemId, quantity: i.quantity })),
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        mobileMoneyOperator: form.mobileMoneyOperator,
        address: form.address || undefined,
        city: form.city || undefined,
        notes: form.notes || undefined,
      });
      orderIdRef.current = outcome.orderId;
      if (!outcome.requiresPayment) {
        clearCart();
        setStep('success');
      } else if (outcome.paymentFailed) {
        setFailureInfo(classifyPaymentFailure(outcome.failureReason));
        setStep('failed');
      } else {
        setStep('waiting');
        pollPaymentStatus(outcome.orderId);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'waiting') {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
          <div className="max-w-lg mx-auto px-4 py-20 text-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-cipresa-100 dark:bg-cipresa-900/30 flex items-center justify-center mx-auto mb-6"
            >
              <Smartphone className="w-10 h-10 text-cipresa-600" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-3">Confirmez sur votre téléphone</h1>
            <p className="text-gray-500 mb-2">
              Une demande de paiement {form.mobileMoneyOperator === 'ORANGE_MONEY' ? 'Orange Money' : 'MTN Mobile Money'} a été envoyée au <strong>{form.phone}</strong>.
            </p>
            <p className="text-gray-400 text-sm">Approuvez la demande sur votre téléphone pour finaliser la commande.</p>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" /> En attente de confirmation...
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (step === 'timeout') {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
          <div className="max-w-lg mx-auto px-4 py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-cipresa-50 dark:bg-cipresa-950/30 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-cipresa-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Confirmation en attente</h1>
            <p className="text-gray-500 mb-2">
              Nous n&apos;avons pas pu confirmer votre paiement immédiatement. Si vous avez été débité, votre commande sera validée automatiquement dès réception de la confirmation.
            </p>
            <p className="text-gray-400 text-sm mb-8">Consultez vos commandes dans quelques minutes, ou contactez-nous si rien n&apos;apparaît.</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Link href="/dashboard/orders">
                <Button variant="outline">Mes commandes</Button>
              </Link>
              <Link href="/contact">
                <Button>Nous contacter</Button>
              </Link>
            </div>
            {orderIdRef.current && (
              <p className="text-center text-xs text-gray-400">
                Référence de commande : <span className="font-mono text-gray-500 dark:text-gray-400">{orderIdRef.current.slice(0, 8).toUpperCase()}</span> — mentionnez-la si vous contactez le support.
              </p>
            )}
          </div>
        </div>
      </PageTransition>
    );
  }

  if (step === 'failed') {
    const info = failureInfo ?? classifyPaymentFailure();
    const orderRef = orderIdRef.current ? orderIdRef.current.slice(0, 8).toUpperCase() : null;
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
          <div className="max-w-lg mx-auto px-4 py-16">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-6"
              >
                <XCircle className="w-10 h-10 text-red-500" />
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">{info.title}</h1>
              <p className="text-gray-500">{info.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cipresa-500" /> Que faire maintenant ?
              </h2>
              <ol className="space-y-3">
                {info.steps.map((stepText, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-600 dark:text-cipresa-400 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {stepText}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <Button
                fullWidth
                onClick={() => {
                  setFailureInfo(null);
                  setStep('form');
                }}
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Réessayer le paiement
                </span>
              </Button>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" fullWidth>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Contacter le support
                  </span>
                </Button>
              </Link>
            </div>

            {orderRef && (
              <p className="text-center text-xs text-gray-400">
                Référence de commande : <span className="font-mono text-gray-500 dark:text-gray-400">{orderRef}</span> — mentionnez-la si vous contactez le support.
              </p>
            )}
          </div>
        </div>
      </PageTransition>
    );
  }

  if (step === 'success') {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
          <div className="max-w-lg mx-auto px-4 py-20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-cipresa-100 dark:bg-cipresa-900/30 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-cipresa-600" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-3">Commande confirmée !</h1>
            <p className="text-gray-500 mb-2">
              Merci <strong>{form.fullName}</strong>, votre commande a été reçue avec succès.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Un email de confirmation sera envoyé à <strong>{form.email}</strong>.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline">Mon tableau de bord</Button>
              </Link>
              <Link href="/courses">
                <Button>Explorer nos formations</Button>
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
          <div className="max-w-lg mx-auto px-4 py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
            <p className="text-gray-500 mb-6">Ajoutez des cours ou des produits avant de commander.</p>
            <Link href="/courses">
              <Button>Découvrir nos formations</Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cipresa-600 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Retour au panier
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-7 h-7 text-cipresa-500" />
            <h1 className="text-2xl font-bold">Finaliser la commande</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                      <User className="w-5 h-5 text-cipresa-500" /> Informations personnelles
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                          placeholder="jean@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {products.length > 0 && (
                  <AnimatedSection direction="up" delay={0.2}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                      <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-cipresa-500" /> Adresse de livraison
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Adresse</label>
                          <input
                            type="text"
                            value={form.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                            placeholder="Quartier, rue, numéro"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Ville</label>
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => updateField('city', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                            placeholder="Yaoundé"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes</label>
                          <input
                            type="text"
                            value={form.notes}
                            onChange={(e) => updateField('notes', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                            placeholder="Instructions particulières"
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                <AnimatedSection direction="up" delay={0.3}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-cipresa-500" /> Mode de paiement
                    </h2>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {(
                        [
                          { value: 'MTN_MOMO', label: 'MTN Mobile Money' },
                          { value: 'ORANGE_MONEY', label: 'Orange Money' },
                        ] as const
                      ).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, mobileMoneyOperator: option.value }))}
                          className={cn(
                            'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                            form.mobileMoneyOperator === option.value
                              ? 'border-cipresa-500 bg-cipresa-50 dark:bg-cipresa-950/40 text-cipresa-700 dark:text-cipresa-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Numéro {form.mobileMoneyOperator === 'ORANGE_MONEY' ? 'Orange Money' : 'MTN Mobile Money'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all"
                        placeholder="2376XXXXXXXX"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                      <Shield className="w-5 h-5 text-cipresa-500 flex-shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Paiement {form.mobileMoneyOperator === 'ORANGE_MONEY' ? 'Orange Money' : 'MTN Mobile Money'} sécurisé via Nokash. Vous recevrez une demande de confirmation sur votre téléphone.
                      </p>
                    </div>
                    {errorMessage && <p className="text-sm text-red-500 mt-3">{errorMessage}</p>}
                  </div>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-2">
                <AnimatedSection direction="up" delay={0.15} className="sticky top-28">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-semibold mb-5">Récapitulatif</h2>

                    {courses.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Formations ({courses.length})
                        </p>
                        <div className="space-y-2">
                          {courses.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                              <div className="w-12 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <p className="text-xs text-cipresa-600 font-semibold">{formatCurrency(item.price)}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {products.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5" /> Produits ({products.length})
                        </p>
                        <div className="space-y-2">
                          {products.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                              <div className="w-12 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.image})` }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <p className="text-xs text-cipresa-600 font-semibold">{formatCurrency(item.price)}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Sous-total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      {products.length > 0 && (
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Livraison</span>
                          <span className="text-cipresa-600 font-medium">Gratuit</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-cipresa-600">{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      className="mt-6"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      {!isSubmitting && (
                        <span className="flex items-center gap-2">
                          Passer la commande <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Paiement sécurisé via Nokash</span>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
