'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  bg?: 'white' | 'muted' | 'dark';
  className?: string;
  id?: string;
}

const bgStyles = {
  white: '',
  muted: 'bg-gray-50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5',
  dark: 'relative overflow-hidden',
};

export function Section({ children, bg = 'white', className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-24 px-4 sm:px-6 lg:px-8',
        bgStyles[bg],
        className
      )}
    >
      {bg === 'dark' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#3d0a1e] to-[#2f0a18]" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f58560]/8 rounded-full blur-[120px]" />
          </div>
        </>
      )}
      <div className={cn('max-w-3xl mx-auto', bg === 'dark' && 'relative z-10')}>
        {children}
      </div>
    </section>
  );
}
