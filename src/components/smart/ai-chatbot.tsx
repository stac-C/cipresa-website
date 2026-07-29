'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialBotMessage: Message = {
  id: '0',
  text: '🌱 Bonjour ! Je suis l\'assistant agricole CIPRESA. Je peux vous aider à choisir une formation, trouver des produits, ou répondre à vos questions sur l\'agriculture. Comment puis-je vous aider ?',
  isBot: true,
  timestamp: new Date(),
};

const quickReplies = [
  'Quelles formations proposez-vous ?',
  'Comment acheter des semences ?',
  'Prix des plants d\'avocatier',
  'Contactez un expert',
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-cipresa-600 text-white shadow-xl shadow-cipresa-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200',
          isOpen && 'hidden'
        )}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-cipresa-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Assistant CIPRESA</p>
                  <p className="text-xs text-white/70">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex gap-2', msg.isBot ? '' : 'flex-row-reverse')}>
                  <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1', msg.isBot ? 'bg-cipresa-100 dark:bg-cipresa-950' : 'bg-gray-200 dark:bg-gray-800')}>
                    {msg.isBot ? <Bot className="w-4 h-4 text-cipresa-600" /> : <User className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className={cn('max-w-[80%] p-3 rounded-2xl text-sm', msg.isBot ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-tl-sm' : 'bg-cipresa-500 text-white rounded-tr-sm')}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => handleSend(qr)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:border-cipresa-300 hover:text-cipresa-600 transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cipresa-500 focus:border-transparent"
                />
                <button type="submit" className="w-10 h-10 rounded-xl bg-cipresa-500 text-white flex items-center justify-center hover:bg-cipresa-600 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function getBotResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('formation') || q.includes('cours') || q.includes('apprendre')) {
    return 'Nous proposons des formations en 🌾 culture annuelle, 🥬 maraîchage, 🌴 cultures pérennes, 🐄 élevage, et 📋 gestion de projet. Rendez-vous sur notre page Formations pour explorer le catalogue complet !';
  }
  if (q.includes('semence') || q.includes('graine') || q.includes('acheter')) {
    return '🛒 Vous pouvez acheter nos semences et plants directement sur notre boutique en ligne. Nous livrons dans tout le Cameroun. Les prix commencent à 500 CFA. Visitez notre page Boutique !';
  }
  if (q.includes('avocat') || q.includes('avocatier')) {
    return '🥑 Nos plants d\'avocatier sont disponibles en plusieurs variétés : Hickson (1500 CFA), Both 7 (2000 CFA). Production en 2-3 ans, adaptés au climat camerounais. Parfait pour l\'export !';
  }
  if (q.includes('contact') || q.includes('expert') || q.includes('conseil')) {
    return '📞 Vous pouvez nous joindre au +237 658 184 596 ou par email à cipresaconsulting@gmail.com. Notre équipe d\'experts est à votre disposition du lundi au vendredi, 8h-18h.';
  }
  if (q.includes('prix') || q.includes('tarif') || q.includes('coûte')) {
    return '💰 Nos cours gratuits sont accessibles sans frais. Les cours premium commencent à 100 CFA. Pour les produits, les prix varient selon les articles. Consultez notre catalogue pour plus de détails !';
  }
  if (q.includes('livraison') || q.includes('transport') || q.includes('delai')) {
    return '🚚 Nous livrons à Yaoundé et dans toutes les régions du Cameroun. Les délais varient de 24h à 72h selon votre localisation. Le paiement Mobile Money (MTN/Orange) est accepté.';
  }
  return 'Merci pour votre question ! 🤝 Pour mieux vous aider, contactez notre équipe au +237 658 184 596 ou explorez nos formations et produits sur notre site. Que puis-je vous dire d\'autre ?';
}
