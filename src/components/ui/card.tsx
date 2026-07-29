'use client';

import { cn } from '@/lib/utils/cn';
import { AnimatedCard } from '@/components/animations/motion-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  as?: 'div' | 'article';
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true, glass = false, as = 'div' }) => {
  const Component = as === 'article' ? 'article' : 'div';

  if (hover) {
    return (
      <AnimatedCard className={cn(
        'rounded-xl overflow-hidden bg-white dark:bg-[#16271b] border border-[#e8f5e9] dark:border-[#27452b] shadow-[0_10px_30px_rgba(17,135,8,0.07)] transition-all duration-300 hover:shadow-[0_12px_34px_rgba(17,135,8,0.12)]',
        glass && 'glass-card',
        className
      )}>
        {children}
      </AnimatedCard>
    );
  }

  return (
    <Component className={cn(
      'rounded-xl overflow-hidden bg-white dark:bg-[#16271b] border border-[#e8f5e9] dark:border-[#27452b] shadow-[0_10px_30px_rgba(17,135,8,0.07)]',
      glass && 'glass-card',
      className
    )}>
      {children}
    </Component>
  );
};

export const CardImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  aspect?: 'video' | 'square' | 'portrait';
}> = ({ src, alt, className, aspect = 'video' }) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div className={cn('relative overflow-hidden bg-[#f4fdf5] dark:bg-[#16271b]', aspectClasses[aspect], className)}>
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('p-4', className)}>
    {children}
  </div>
);

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700', className)} />
);
