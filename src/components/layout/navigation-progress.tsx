'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show progress briefly when the pathname changes
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 160);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return visible ? (
    <div className="fixed inset-x-0 top-0 z-[9999] pointer-events-none animate-[navigation-progress-in_160ms_ease-out]">
      <div className="h-1 overflow-hidden bg-transparent">
        <div className="h-full w-[92%] animate-[navigation-progress-width_900ms_ease-out] bg-gradient-to-r from-[#1f63b5] via-[#3b82f6] to-[#f59e0b] shadow-lg" />
      </div>
    </div>
  ) : null;
}
