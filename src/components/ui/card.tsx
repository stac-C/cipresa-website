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
        'rounded-xl overflow-hidden bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm transition-shadow duration-300 hover:shadow-md',
        glass && 'glass-card',
        className
      )}>
        {children}
      </AnimatedCard>
    );
  }

  return (
    <Component className={cn(
      'rounded-xl overflow-hidden bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 shadow-sm',
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
    <div className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800', aspectClasses[aspect], className)}>
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
