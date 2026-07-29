'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, ShoppingBag, Heart,
  BarChart3, Settings, LogOut, Menu, X,
} from 'lucide-react';
import { PageTransition } from '@/components/animations/motion-components';
import { NotificationBell } from '@/components/layout/notification-bell';
import { cn } from '@/lib/utils/cn';
import { useAuthStore } from '@/lib/store/auth-store';
import { signOut } from '@/lib/auth/actions';
import { getInitials } from '@/lib/utils/format';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
  { icon: BookOpen, label: 'Mes cours', href: '/dashboard/my-courses' },
  { icon: ShoppingBag, label: 'Mes commandes', href: '/dashboard/orders' },
  { icon: Heart, label: 'Liste de souhaits', href: '/dashboard/wishlist' },
  { icon: BarChart3, label: 'Analytiques', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
];

const pageTitles: Record<string, string> = {
  '/dashboard': 'Tableau de bord',
  '/dashboard/my-courses': 'Mes cours',
  '/dashboard/orders': 'Mes commandes',
  '/dashboard/wishlist': 'Liste de souhaits',
  '/dashboard/analytics': 'Analytiques',
  '/dashboard/settings': 'Paramètres',
  '/dashboard/certificates': 'Mes certificats',
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const title = pageTitles[pathname] ?? 'Tableau de bord';
  const isHome = pathname === '/dashboard';

  const sidebarProfile = (onClose?: () => void) => (
    <>
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-cipresa-600 flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
          {getInitials(user?.fullName || 'Utilisateur')}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{user?.fullName || 'Utilisateur'}</p>
          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-md bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-600 dark:text-cipresa-400 text-[11px] font-medium capitalize">
            {user?.role || 'Étudiant'}
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.label} href={link.href} onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-cipresa-50 dark:bg-cipresa-950/50 text-cipresa-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}>
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={() => signOut()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all w-full mt-2">
        <LogOut className="w-5 h-5" /> Déconnexion
      </button>
    </>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950 lg:flex">
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={cn(
        'fixed top-16 left-0 z-50 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 transition-transform duration-300 lg:hidden flex flex-col',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <button onClick={() => setMobileMenuOpen(false)} className="self-end p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-2">
          <X className="w-4 h-4" />
        </button>
        {sidebarProfile(() => setMobileMenuOpen(false))}
      </aside>

      <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
        {sidebarProfile()}
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                {isHome && (
                  <p className="text-sm text-gray-500">Bienvenue{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}</p>
                )}
              </div>
            </div>
            <NotificationBell />
          </div>

          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  );
}
