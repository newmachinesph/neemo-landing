'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    HomeIcon,
    BanknotesIcon,
    PlusIcon,
    FlagIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    BanknotesIcon as BanknotesIconSolid,
    PlusIcon as PlusIconSolid,
    FlagIcon as FlagIconSolid,
    UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';

const navItems = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: HomeIcon,
        activeIcon: HomeIconSolid,
    },
    {
        name: 'Budget',
        href: '/dashboard/budget',
        icon: BanknotesIcon,
        activeIcon: BanknotesIconSolid,
    },
    {
        name: 'Add',
        href: '/dashboard/quick-add',
        icon: PlusIcon,
        activeIcon: PlusIconSolid,
        isAction: true,
    },
    {
        name: 'Goals',
        href: '/dashboard/goals',
        icon: FlagIcon,
        activeIcon: FlagIconSolid,
    },
    {
        name: 'Profile',
        href: '/dashboard/settings',
        icon: UserIcon,
        activeIcon: UserIconSolid,
    },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 dark:bg-[#2f0a18]/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = isActive ? item.activeIcon : item.icon;

                    if (item.isAction) {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center justify-center -mt-6 transition-transform active:scale-95"
                            >
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f58560] shadow-lg shadow-[#f58560]/40 animate-glow-pulse">
                                    <Icon className="w-7 h-7 text-[#2f0a18]" />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[60px] transition-all duration-200 active:scale-95',
                                isActive
                                    ? 'text-[#9b1b3c] dark:text-[#f58560]'
                                    : 'text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white/70'
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className={cn(
                                'text-xs font-medium',
                                isActive && 'font-semibold'
                            )}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
