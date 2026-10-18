'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

const variants = {
  primary:
    'text-[#2f0a18] bg-[#f58560] hover:bg-[#f79b7a] shadow-lg shadow-[#f58560]/25 hover:-translate-y-0.5',
  secondary:
    'text-gray-700 dark:text-white bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10',
  dark:
    'text-[#2f0a18] bg-[#f58560] hover:bg-[#f79b7a]',
};

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  children,
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {arrow && <ArrowRightIcon className="w-4 h-4" />}
    </Link>
  );
}
