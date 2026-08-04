import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isLocalDev = process.env.NODE_ENV !== 'production';

if (dsn && !isLocalDev) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
  });
}
