'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggleCompact } from '@/components/ui/theme-toggle';
import {
  HomeIcon,
  BanknotesIcon,
  FlagIcon,
  ChartBarIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  BellAlertIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  CalculatorIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  DocumentChartBarIcon,
  GiftIcon,
  ShoppingCartIcon,
  CubeIcon,
  CalendarDaysIcon,
  FireIcon,
  DevicePhoneMobileIcon,
  CameraIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  TruckIcon,
  UsersIcon,
  IdentificationIcon,
  PlusCircleIcon,
  DocumentDuplicateIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Navigation item type
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Section type
interface NavSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: NavItem[];
}

// Primary items (always visible)
const primaryItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'AI Coach', href: '/dashboard/coach', icon: ChatBubbleLeftRightIcon },
];

// Collapsible sections
const sections: NavSection[] = [
  {
    id: 'money',
    name: 'Money Management',
    icon: '💰',
    color: 'blue',
    items: [
      { name: 'Budget', href: '/dashboard/budget', icon: BanknotesIcon },
      { name: 'Goals', href: '/dashboard/goals', icon: FlagIcon },
      { name: 'Bills', href: '/dashboard/bills', icon: BellAlertIcon },
      { name: 'Recurring', href: '/dashboard/recurring', icon: ArrowPathIcon },
      { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowsRightLeftIcon },
      { name: 'Investments', href: '/dashboard/investments', icon: ChartBarIcon },
      { name: 'Loans', href: '/dashboard/loans', icon: CreditCardIcon },
      { name: 'Debt Payoff', href: '/dashboard/debt-payoff', icon: ScaleIcon },
      { name: 'Split Expenses', href: '/dashboard/split', icon: UserGroupIcon },
    ],
  },
  {
    id: 'smart',
    name: 'Smart Features',
    icon: '🤖',
    color: 'purple',
    items: [
      { name: 'Smart Insights', href: '/dashboard/smart-insights', icon: SparklesIcon },
      { name: 'Budget AI', href: '/dashboard/budget-ai', icon: SparklesIcon },
      { name: 'Predictions', href: '/dashboard/predictions', icon: ChartBarIcon },
      { name: 'Receipt Scanner', href: '/dashboard/receipt-scanner', icon: CameraIcon },
      { name: 'SMS Parser', href: '/dashboard/sms-parser', icon: DevicePhoneMobileIcon },
      { name: 'Bill Negotiator', href: '/dashboard/bill-negotiator', icon: WrenchScrewdriverIcon },
    ],
  },
  {
    id: 'filipino',
    name: 'Filipino Features',
    icon: '🇵🇭',
    color: 'green',
    items: [
      { name: 'Paluwagan', href: '/dashboard/paluwagan', icon: UserGroupIcon },
      { name: 'Remittance', href: '/dashboard/padala', icon: PaperAirplaneIcon },
      { name: '13th Month', href: '/dashboard/thirteenth-month', icon: CalculatorIcon },
      { name: 'Gov Benefits', href: '/dashboard/gov-benefits', icon: BuildingLibraryIcon },
      { name: 'Hulugan', href: '/dashboard/hulugan', icon: CreditCardIcon },
      { name: 'Fiesta Planner', href: '/dashboard/fiesta', icon: CalendarDaysIcon },
      { name: 'Sari-Sari Mode', href: '/dashboard/sari-sari', icon: ShoppingCartIcon },
      { name: 'Balikbayan Box', href: '/dashboard/balikbayan', icon: CubeIcon },
      { name: 'Aguinaldo', href: '/dashboard/aguinaldo', icon: GiftIcon },
      { name: 'OFW Mode', href: '/dashboard/ofw-mode', icon: GlobeAltIcon },
      { name: 'Digital Piggy Bank', href: '/dashboard/alkansya', icon: BanknotesIcon },
      { name: 'Paluwagan Manager', href: '/dashboard/paluwagan-manager', icon: UsersIcon },
      { name: 'Commute Calculator', href: '/dashboard/transpo-calculator', icon: TruckIcon },
    ],
  },
  {
    id: 'social',
    name: 'Social',
    icon: '👥',
    color: 'pink',
    items: [
      { name: 'Partners', href: '/dashboard/partners', icon: HeartIcon },
      { name: 'Support Circles', href: '/dashboard/circles', icon: UserGroupIcon },
      { name: 'Team Challenges', href: '/dashboard/team-challenges', icon: UsersIcon },
      { name: 'Mentorship', href: '/dashboard/mentorship', icon: AcademicCapIcon },
      { name: 'Shared Goals', href: '/dashboard/shared-goals', icon: HeartIcon },
      { name: 'Family Budget', href: '/dashboard/family-budget', icon: UserGroupIcon },
      { name: 'Couple Mode', href: '/dashboard/couple-mode', icon: HeartIcon },
      { name: 'Kids Allowance', href: '/dashboard/kids-allowance', icon: AcademicCapIcon },
      { name: 'Utang Manager', href: '/dashboard/utang-manager', icon: UsersIcon },
    ],
  },
  {
    id: 'gamification',
    name: 'Gamification',
    icon: '🎮',
    color: 'orange',
    items: [
      { name: 'Achievements', href: '/dashboard/achievements', icon: TrophyIcon },
      { name: 'Challenges', href: '/dashboard/challenges', icon: FireIcon },
      { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: TrophyIcon },
      { name: 'Milestones', href: '/dashboard/milestones', icon: FlagIcon },
      { name: 'Savings Quests', href: '/dashboard/savings-quests', icon: FlagIcon },
      { name: 'Health Score', href: '/dashboard/financial-health', icon: HeartIcon },
    ],
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: '📈',
    color: 'indigo',
    items: [
      { name: 'Monthly Report', href: '/dashboard/reports/monthly', icon: DocumentChartBarIcon },
      { name: 'Year Review', href: '/dashboard/reports/year', icon: DocumentChartBarIcon },
      { name: 'Annual Report', href: '/dashboard/reports/annual', icon: DocumentChartBarIcon },
      { name: 'Tax Helper', href: '/dashboard/tax-helper', icon: CalculatorIcon },
      { name: 'Net Worth', href: '/dashboard/net-worth', icon: ChartBarIcon },
      { name: 'Lifestyle Inflation', href: '/dashboard/lifestyle-inflation', icon: ArrowTrendingUpIcon },
      { name: 'Insights', href: '/dashboard/insights', icon: ChartPieIcon },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: '🛠️',
    color: 'cyan',
    items: [
      { name: 'PCA Calculator', href: '/dashboard/pca-calculator', icon: CalculatorIcon },
      { name: 'MP2 Tracker', href: '/dashboard/mp2-tracker', icon: BuildingLibraryIcon },
      { name: 'SSS Tracker', href: '/dashboard/sss-tracker', icon: IdentificationIcon },
      { name: 'Loan Comparison', href: '/dashboard/loan-comparison', icon: ScaleIcon },
      { name: 'Credit Card Optimizer', href: '/dashboard/credit-card-optimizer', icon: CreditCardIcon },
      { name: 'Multi-Currency', href: '/dashboard/currency', icon: CurrencyDollarIcon },
      { name: 'Quick Add', href: '/dashboard/quick-add', icon: PlusCircleIcon },
      { name: 'Templates', href: '/dashboard/templates', icon: DocumentDuplicateIcon },
      { name: 'Budget Rollover', href: '/dashboard/budget-rollover', icon: ArrowPathIcon },
      { name: 'Bill Calendar', href: '/dashboard/bill-calendar', icon: CalendarDaysIcon },
      { name: 'Import', href: '/dashboard/import', icon: ArrowUpTrayIcon },
      { name: 'Export', href: '/dashboard/export', icon: ArrowDownTrayIcon },
    ],
  },
];

// Default favorites (can be customized by user later)
const defaultFavorites = [
  '/dashboard/budget',
  '/dashboard/goals',
  '/dashboard/transactions',
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Collapsible Section Component
function CollapsibleSection({
  section,
  isExpanded,
  onToggle,
  pathname,
  onClose,
}: {
  section: NavSection;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
  onClose: () => void;
}) {
  const hasActiveItem = section.items.some((item) => pathname === item.href);

  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          hasActiveItem
            ? 'bg-[#f58560]/15 dark:bg-[#f58560]/10 text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{section.icon}</span>
          <span>{section.name}</span>
        </div>
        <ChevronDownIcon
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isExpanded ? 'rotate-180' : ''
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pl-4 space-y-0.5 pt-1">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150',
                  isActive
                    ? 'bg-[#f58560]/20 text-[#9b1b3c] dark:text-[#f58560] font-medium'
                    : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'w-4 h-4 flex-shrink-0',
                    isActive ? 'text-[#9b1b3c] dark:text-[#f58560]' : 'text-gray-400 dark:text-white/40'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites] = useState<string[]>(defaultFavorites);

  // Toggle section expand/collapse
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Get all items for search
  const allItems = sections.flatMap((section) =>
    section.items.map((item) => ({ ...item, section }))
  );

  // Filter items based on search
  const filteredItems = searchQuery
    ? allItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Get favorite items
  const favoriteItems = allItems.filter((item) => favorites.includes(item.href));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gradient-to-b dark:from-[#4a0d24] dark:to-[#3d0a1e] border-r border-gray-200 dark:border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-white/10 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#b91c4a] to-[#f58560] rounded-xl shadow-lg shadow-[#b91c4a]/25">
              <span className="text-lg font-bold text-[#2f0a18]">₱</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Neemo</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3 border-b border-gray-100 dark:border-white/10">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f58560]/50 focus:border-[#f58560] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {/* Search Results */}
          {searchQuery && (
            <div className="mb-4">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider">
                Search Results ({filteredItems.length})
              </p>
              {filteredItems.length === 0 ? (
                <p className="px-3 text-sm text-gray-500 dark:text-white/50">No results found</p>
              ) : (
                filteredItems.slice(0, 8).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        onClose();
                        setSearchQuery('');
                      }}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150',
                        isActive
                          ? 'bg-[#f58560]/20 text-[#9b1b3c] dark:text-[#f58560] font-medium'
                          : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10'
                      )}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-white/40" />
                      <span>{item.name}</span>
                      <span className="text-xs text-gray-400 dark:text-white/40 ml-auto">{item.section.icon}</span>
                    </Link>
                  );
                })
              )}
            </div>
          )}

          {/* Regular Navigation (hidden during search) */}
          {!searchQuery && (
            <>
              {/* Primary Items */}
              <div className="space-y-0.5">
                {primaryItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                        isActive
                          ? 'bg-[#f58560]/20 dark:bg-[#f58560]/15 text-[#9b1b3c] dark:text-[#f58560] shadow-sm'
                          : 'text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'w-5 h-5 flex-shrink-0',
                          isActive ? 'text-[#9b1b3c] dark:text-[#f58560]' : 'text-gray-400 dark:text-white/50'
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Favorites */}
              {favoriteItems.length > 0 && (
                <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/10">
                  <p className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                    <StarIconSolid className="w-3 h-3 text-[#f58560]" />
                    Favorites
                  </p>
                  <div className="space-y-0.5">
                    {favoriteItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150',
                            isActive
                              ? 'bg-[#f58560]/20 text-[#9b1b3c] dark:text-[#f58560] font-medium'
                              : 'text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/10'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'w-4 h-4 flex-shrink-0',
                              isActive ? 'text-[#9b1b3c] dark:text-[#f58560]' : 'text-gray-400 dark:text-white/40'
                            )}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Collapsible Sections */}
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/10 space-y-1">
                {sections.map((section) => (
                  <CollapsibleSection
                    key={section.id}
                    section={section}
                    isExpanded={expandedSections.includes(section.id)}
                    onToggle={() => toggleSection(section.id)}
                    pathname={pathname}
                    onClose={onClose}
                  />
                ))}
              </div>

              {/* Settings */}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10">
                <Link
                  href="/dashboard/settings"
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    pathname === '/dashboard/settings'
                      ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'
                  )}
                >
                  <Cog6ToothIcon className="w-5 h-5 text-gray-400 dark:text-white/50" />
                  Settings
                </Link>
                <Link
                  href="/dashboard/settings/privacy"
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    pathname === '/dashboard/settings/privacy'
                      ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'
                  )}
                >
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400 dark:text-white/50" />
                  Privacy
                </Link>
              </div>
            </>
          )}
        </nav>

        {/* User profile / bottom section */}
        <div className="p-3 border-t border-gray-200 dark:border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f58560] to-[#b91c4a] shadow-lg shadow-[#f58560]/25">
              <span className="text-sm font-semibold text-[#2f0a18]">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-white/50 truncate">john@example.com</p>
            </div>
            <ThemeToggleCompact />
          </div>
        </div>
      </aside>
    </>
  );
}
