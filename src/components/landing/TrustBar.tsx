'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface TrustBarProps {
  items: string[];
  dark?: boolean;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function TrustBar({ items, dark }: TrustBarProps) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.4, delay: 0.4 }}
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs',
        dark ? 'text-white/30' : 'text-gray-400 dark:text-white/40'
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <CheckCircleIcon className="w-3.5 h-3.5" />
          {item}
        </span>
      ))}
    </motion.div>
  );
}
