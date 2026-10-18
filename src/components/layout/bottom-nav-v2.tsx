'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  QrCodeIcon,
  Squares2X2Icon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
} from '@heroicons/react/24/solid';

interface BottomNavV2Props {
  onMenuClick: () => void;
  onAddClick: () => void;
}

const navItems = [
  {
    name: 'Home',
    href: '/dashboard-v2',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: 'Activity',
    href: '/dashboard-v2/transactions',
    icon: ArrowsRightLeftIcon,
    activeIcon: ArrowsRightLeftIcon,
  },
  {
    name: 'Scan',
    href: '#',
    icon: QrCodeIcon,
    activeIcon: QrCodeIcon,
    isAction: true,
  },
  {
    name: 'Services',
    href: '/dashboard-v2/services',
    icon: Squares2X2Icon,
    activeIcon: Squares2X2IconSolid,
  },
  {
    name: 'Profile',
    href: '/dashboard-v2/profile',
    icon: Bars3Icon,
    activeIcon: Bars3Icon,
    isMenu: true,
  },
];

export function BottomNavV2({ onMenuClick, onAddClick }: BottomNavV2Props) {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-3"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      {/* Floating Nav Container */}
      <nav className="mx-auto max-w-md bg-[#2f0a18] backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 border border-white/5">
        <div className="flex items-center justify-around h-[68px] px-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/dashboard-v2' && pathname?.startsWith('/dashboard-v2'));
            const Icon = isActive ? item.activeIcon : item.icon;

            // Central Scan Button - Like Maya/GCash
            if (item.isAction) {
              return (
                <button
                  key={item.name}
                  onClick={onAddClick}
                  className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95"
                >
                  <div className="flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-[#f58560] shadow-lg shadow-[#f58560]/40 border-[3px] border-[#2f0a18]">
                    <Icon className="w-6 h-6 text-[#2f0a18]" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-medium text-[#f58560] mt-1">{item.name}</span>
                </button>
              );
            }

            // Profile/Menu Button - Now links to profile page
            if (item.isMenu) {
              const menuIsActive = pathname === item.href || pathname?.startsWith('/dashboard-v2/profile') || pathname?.startsWith('/dashboard-v2/settings');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[52px] transition-all duration-200 active:scale-95 rounded-xl',
                    menuIsActive
                      ? 'text-[#f58560]'
                      : 'text-white/40 hover:text-white/70'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className={cn('text-[10px] font-medium', menuIsActive && 'font-semibold')}>{item.name}</span>
                </Link>
              );
            }

            // Regular Nav Items
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[52px] transition-all duration-200 active:scale-95 rounded-xl',
                  isActive
                    ? 'text-[#f58560]'
                    : 'text-white/40 hover:text-white/70'
                )}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={cn('text-[10px] font-medium', isActive && 'font-semibold')}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
