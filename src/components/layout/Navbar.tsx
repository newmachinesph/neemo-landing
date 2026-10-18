'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  BookOpenIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { ThemeToggleCompact } from '@/components/ui/theme-toggle';
import { CTAButton } from '@/components/landing';

const navLinks = [
  { href: '/how-it-works', label: 'How It Works', icon: BookOpenIcon },
  { href: '/features', label: 'Features', icon: ChartBarIcon },
  { href: '/about', label: 'About', icon: InformationCircleIcon },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-[#2f0a18]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/neemo-logo.png" alt="Neemo" width={36} height={36} className="rounded-xl" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Neemo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-[#9b1b3c] dark:text-[#f58560]'
                      : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggleCompact />
              <CTAButton href="/contact" size="sm">
                Get Early Access
              </CTAButton>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggleCompact />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-16 left-0 right-0 z-50 bg-white dark:bg-[#2f0a18] border-b border-gray-200 dark:border-white/10 shadow-xl md:hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          pathname === link.href
                            ? 'bg-[#f58560]/10 text-[#9b1b3c] dark:text-[#f58560]'
                            : 'text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <div className="my-4 border-t border-gray-200 dark:border-white/10" />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <CTAButton href="/contact" className="w-full justify-center">
                    Get Early Access
                  </CTAButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
