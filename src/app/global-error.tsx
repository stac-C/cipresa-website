'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import './globals.css';

export default function GlobalError({
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
    <html lang="fr">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900">
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white/90 p-8 text-center shadow-[0_30px_90px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#118708] text-white shadow-lg shadow-[#118708]/20">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#118708]">Service momentanément indisponible</p>
            <h1 className="mb-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
              L’application a besoin d’un instant
            </h1>
            <p className="mx-auto mb-8 max-w-lg text-base leading-7 text-slate-600">
              Une erreur a interrompu le chargement de l’interface. Vous pouvez réessayer tout de suite ou revenir à l’accueil.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#118708] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0f7606]"
              >
                <RefreshCw className="h-5 w-5" />
                Réessayer
              </button>
              <Link
                href="/"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-[#118708] hover:text-[#118708]"
              >
                Retour à l’accueil
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
