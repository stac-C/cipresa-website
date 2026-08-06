import type { Metadata } from 'next';
import { cn } from '@/lib/utils/cn';
import { Providers } from '@/components/providers';
import { ShellContent } from '@/components/layout/shell-content';
import { NavigationProgress } from '@/components/layout/navigation-progress';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'CIPRESA Consulting - Agriculture au Cameroun et en Afrique',
    template: '%s | CIPRESA Consulting',
  },
  description: 'Leader agricole camerounais proposant des formations en ligne, semences, matériel agricole, projets, irrigation et maintenance pour réussir dans l\'agriculture et l\'élevage en Afrique.',
  keywords: ['agriculture', 'Cameroun', 'formation agricole', 'semences', 'matériel agricole', 'CIPRESA', 'Afrique', 'agri-tech', 'e-learning'],
  authors: [{ name: 'CIPRESA Consulting' }],
  creator: 'CIPRESA Consulting',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CIPRESA Consulting',
    title: 'CIPRESA Consulting - Agriculture au Cameroun et en Afrique',
    description: 'Formations agricoles en ligne, vente de semences et matériel agricole de qualité.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIPRESA Consulting',
    description: 'Leader agricole camerounais - Formations, semences et matériel agricole.',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  icons: { icon: '/favicon.ico', apple: '/icons/icon-192x192.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#118708" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (['localhost', '127.0.0.1'].includes(location.hostname) && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations()
                  .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
                  .then(() => window.caches ? caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))) : undefined)
                  .catch(() => {});
              }
            `,
          }}
        />
      </head>
      <body className={cn('font-sans min-h-screen bg-white dark:bg-gray-950')} suppressHydrationWarning>
        <Providers>
          <NavigationProgress />
          <ShellContent>{children}</ShellContent>
        </Providers>
      </body>
    </html>
  );
}
