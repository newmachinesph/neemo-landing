'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#2f0a18] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/neemo-logo.png" alt="Neemo" width={32} height={32} className="rounded-xl" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Neemo</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-white/60">
              Your Filipino path to financial freedom.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 dark:text-white/60 hover:text-[#9b1b3c] dark:hover:text-[#f58560] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-white/50">
            &copy; {new Date().getFullYear()} Neemo. Made with ❤️ for Filipinos.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
