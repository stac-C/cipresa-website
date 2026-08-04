import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'border border-[#d8efd8] bg-[#f8fdf8] text-[#118708] dark:border-[#27452b] dark:bg-[#172817] dark:text-[#f2f8ef]',
  success: 'border border-[#bfe8bf] bg-[#f4fdf5] text-[#118708] dark:border-[#2d5d2f] dark:bg-[#16311a] dark:text-[#e8f8e7]',
  warning: 'border border-[#f4e0b7] bg-[#fffaf0] text-[#935001] dark:border-[#5b3d2a] dark:bg-[#2a1b12] dark:text-[#f7e8d8]',
  error: 'border border-[#d8efd8] bg-[#f8fdf8] text-[#118708] dark:border-[#27452b] dark:bg-[#172817] dark:text-[#f2f8ef]',
  info: 'border border-[#d7ebd7] bg-[#fbfefb] text-[#118708] dark:border-[#27452b] dark:bg-[#172817] dark:text-[#e8f8e7]',
  premium: 'border border-[#f4e0b7] bg-[#fffaf0] text-[#935001] dark:border-[#5b3d2a] dark:bg-[#2a1b12] dark:text-[#f7e8d8]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'md', className }) => (
  <span className={cn('inline-flex items-center font-medium rounded-full', variantStyles[variant], sizes[size], className)}>
    {children}
  </span>
);
