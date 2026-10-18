'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: { icon?: ReactNode; text: string };
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function SectionHeading({ badge, title, subtitle, align = 'center', dark }: SectionHeadingProps) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5 }}
      className={cn('mb-12', align === 'center' && 'text-center')}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-[#831530] dark:text-[#f58560] bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-full">
          {badge.icon}
          {badge.text}
        </div>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-bold mb-3',
          dark ? 'text-white' : 'text-gray-900 dark:text-white'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg',
            dark ? 'text-white/50' : 'text-gray-500 dark:text-white/50'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
