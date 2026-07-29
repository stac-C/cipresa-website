'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variants = {
  primary: 'bg-[#118708] text-white hover:bg-[#0f7606] shadow-[0_10px_30px_rgba(17,135,8,0.18)] hover:shadow-[0_12px_34px_rgba(17,135,8,0.24)]',
  secondary: 'bg-[#0f7606] text-white border border-[#0f7606] hover:bg-[#0d6a05]',
  outline: 'border border-[#118708] text-[#118708] bg-white hover:bg-[#ecf7ed] hover:border-[#0f7606]',
  ghost: 'text-[#118708] bg-transparent hover:bg-[#ecf7ed] hover:text-[#0f7606]',
  danger: 'bg-[#0f7606] text-white hover:bg-[#0d6a05]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
  xl: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon: Icon, iconPosition = 'left', fullWidth, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(
          'inline-flex min-h-10 items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cipresa-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60 gap-2',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
        {children}
        {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
