'use client';

import { useState, createContext, useContext, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  variant: 'default' | 'pill' | 'underline';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  variant?: 'default' | 'pill' | 'underline';
  onValueChange?: (value: string) => void;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, variant = 'default', onValueChange, className, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleTabChange = (tab: string) => {
      setActiveTab(tab);
      onValueChange?.(tab);
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, variant }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsList must be used within Tabs');

    const variantStyles = {
      default: 'bg-gray-100 dark:bg-white/10 p-1 rounded-xl',
      pill: 'bg-gray-100 dark:bg-white/10 p-1.5 rounded-full',
      underline: 'border-b border-gray-200 dark:border-white/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1',
          variantStyles[context.variant],
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.activeTab === value;

    const variantStyles = {
      default: {
        base: 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        active: 'bg-white dark:bg-[#f58560] text-gray-900 dark:text-[#2f0a18] shadow-sm',
        inactive: 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white',
      },
      pill: {
        base: 'px-5 py-2 text-sm font-medium rounded-full transition-all duration-200',
        active: 'bg-[#f58560] text-[#2f0a18] shadow-[0_4px_20px_rgba(245,133,96,0.3)]',
        inactive: 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10',
      },
      underline: {
        base: 'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all duration-200',
        active: 'border-[#f58560] text-gray-900 dark:text-white',
        inactive: 'border-transparent text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70 hover:border-gray-300',
      },
    };

    const styles = variantStyles[context.variant];

    return (
      <button
        ref={ref}
        onClick={() => context.setActiveTab(value)}
        className={cn(
          styles.base,
          isActive ? styles.active : styles.inactive,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    if (context.activeTab !== value) return null;

    return (
      <div
        ref={ref}
        className={cn('animate-fade-in mt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
