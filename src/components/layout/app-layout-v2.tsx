'use client';

import { useState, ReactNode } from 'react';
import { BottomNavV2 } from './bottom-nav-v2';
import { SidebarV2 } from './sidebar-v2';

interface AppLayoutV2Props {
  children: ReactNode;
  onAddClick?: () => void;
}

export function AppLayoutV2({ children, onAddClick }: AppLayoutV2Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-[#fdf2f4]/30 dark:from-[#2f0a18] dark:via-[#33081a] dark:to-[#2f0a18] flex flex-col">
      {/* Main Content Area */}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          paddingBottom: 'calc(6rem + env(safe-area-inset-bottom))',
        }}
      >
        {children}
      </main>

      {/* Sidebar (slides from right) */}
      <SidebarV2
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Floating Bottom Navigation */}
      <BottomNavV2
        onMenuClick={() => setSidebarOpen(true)}
        onAddClick={handleAddClick}
      />
    </div>
  );
}
