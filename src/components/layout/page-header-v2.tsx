'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface PageHeaderV2Props {
  title: string;
  backHref?: string;
  rightAction?: ReactNode;
  subtitle?: string;
  showBack?: boolean;
}

export function PageHeaderV2({
  title,
  backHref = '/dashboard-v2',
  rightAction,
  subtitle,
  showBack = true,
}: PageHeaderV2Props) {
  return (
    <div className="sticky top-0 z-40 bg-gradient-to-br from-[#4a0d24] via-[#33081a] to-[#2f0a18] text-white">
      <div
        className="px-4 pt-4 pb-4"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <Link
                href={backHref}
                className="p-2 -ml-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors active:scale-95"
              >
                <ArrowLeftIcon className="w-5 h-5 text-white" />
              </Link>
            )}
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-white/50 text-xs mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {rightAction && (
            <div className="flex items-center gap-2">
              {rightAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
