'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-16">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white/90 p-8 text-center shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#118708] text-white shadow-lg shadow-[#118708]/20">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#118708]">Petit incident</p>
        <h1 className="mb-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Une petite interruption s’est produite
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-base leading-7 text-slate-600">
          Nous avons rencontré un souci inattendu pendant le chargement de cette page. Vous pouvez réessayer dans un instant ou reprendre votre navigation depuis l’accueil.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset} icon={RefreshCw}>
            Réessayer
          </Button>
          <Link href="/">
            <Button type="button" variant="outline" icon={ArrowRight} iconPosition="right">
              Retour à l’accueil
            </Button>
          </Link>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-500">
          Si le problème persiste, vous pouvez aussi nous contacter depuis la page de contact.
        </div>
      </div>
    </div>
  );
}
