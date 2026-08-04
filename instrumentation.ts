export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const isLocalDev = process.env.NODE_ENV !== 'production';

  if (!dsn || isLocalDev) {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
