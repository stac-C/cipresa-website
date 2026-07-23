'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageTransition, AnimatedSection } from '@/components/animations/motion-components';

const contactInfo = [
  { icon: Phone, label: 'Téléphone', value: '+237 658 184 596', href: 'tel:+237658184596' },
  { icon: Mail, label: 'Email', value: 'cipresaconsulting@gmail.com', href: 'mailto:cipresaconsulting@gmail.com' },
  { icon: MapPin, label: 'Adresse', value: 'Yaoundé, Cameroun' },
  { icon: Clock, label: 'Horaires', value: 'Lun - Ven: 8h00 - 18h00' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <Badge variant="success" className="mb-4">Contact</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contactez-nous</h1>
              <p className="text-white/60 max-w-2xl mx-auto">Une question, un projet agricole ? Notre équipe est là pour vous accompagner.</p>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Nom complet" placeholder="Votre nom" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                  <Input label="Email" type="email" placeholder="votre@email.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                </div>
                <Input label="Sujet" placeholder="Sujet de votre message" value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} />
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Votre message..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cipresa-500 focus:border-transparent resize-none"
                  />
                </div>
                <Button type="submit" size="lg" icon={Send} iconPosition="right">
                  Envoyer le message
                </Button>
              </form>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Nos coordonnées</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-10 h-10 rounded-xl bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-cipresa-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-gray-900 dark:text-white hover:text-cipresa-600 transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cipresa-50 to-blue-50 dark:from-cipresa-950/50 dark:to-gray-900 border border-cipresa-100 dark:border-cipresa-900">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-cipresa-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Assistant virtuel</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Notre assistant IA est disponible 24h/24 pour répondre à vos questions sur nos formations et produits.
                </p>
                <Button variant="outline" size="sm" icon={MessageCircle} iconPosition="left">Discuter maintenant</Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
