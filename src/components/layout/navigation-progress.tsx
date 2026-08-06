'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="fixed inset-x-0 top-0 z-[9999] pointer-events-none"
        >
          <div className="h-1 overflow-hidden bg-transparent">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: visible ? '92%' : '100%' }}
              transition={{ ease: 'easeOut', duration: visible ? 0.9 : 0.18 }}
              className="h-full bg-gradient-to-r from-[#1f63b5] via-[#3b82f6] to-[#f59e0b] shadow-lg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
