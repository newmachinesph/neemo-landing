'use client';

import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/70">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-white/[0.06] rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-10">
            <div className="prose prose-gray dark:prose-invert max-w-none">

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment to Your Privacy</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  At Neemo, we believe your financial data is sacred. We built this app with a privacy-first approach,
                  meaning your data stays on your device and under your control. We don&apos;t need to know who you are to help
                  you manage your finances better.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data We Collect</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-100 dark:border-green-500/20">
                    <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">Data stored locally on your device:</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-1">
                      <li>Your transaction records and expense logs</li>
                      <li>Budget categories and limits you set</li>
                      <li>Financial goals and progress</li>
                      <li>App preferences and settings</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Data you choose to share (optional):</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-1">
                      <li>Email address (only if you create an account)</li>
                      <li>Public profile information for community features</li>
                      <li>Anonymous statistics for leaderboards</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Data</h2>
                <ul className="space-y-3 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[#9b1b3c] dark:text-[#f58560] font-bold">1.</span>
                    <span><strong className="text-gray-900 dark:text-white">Local Processing:</strong> All financial calculations and insights happen on your device. We don&apos;t process your financial data on our servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#9b1b3c] dark:text-[#f58560] font-bold">2.</span>
                    <span><strong className="text-gray-900 dark:text-white">Optional Sync:</strong> If you enable cloud backup, your encrypted data is stored securely and can only be decrypted by you.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#9b1b3c] dark:text-[#f58560] font-bold">3.</span>
                    <span><strong className="text-gray-900 dark:text-white">Community Features:</strong> Participation in challenges, leaderboards, or mentorship is entirely optional and only uses the information you explicitly share.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Don&apos;t Do</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Sell your data to advertisers',
                    'Share data with third parties',
                    'Track your location',
                    'Read your messages or contacts',
                    'Store your bank credentials',
                    'Use your data for targeted ads',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-500/20">
                      <span className="text-red-600 dark:text-red-400 text-lg">✕</span>
                      <span className="text-gray-700 dark:text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
                <p className="text-gray-600 dark:text-white/70 mb-4">You have complete control over your data:</p>
                <ul className="space-y-2 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span><strong className="text-gray-900 dark:text-white">Access:</strong> View all data we have about you anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span><strong className="text-gray-900 dark:text-white">Export:</strong> Download your data in common formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span><strong className="text-gray-900 dark:text-white">Delete:</strong> Remove your data and account permanently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span><strong className="text-gray-900 dark:text-white">Opt-out:</strong> Disable any optional data sharing at any time</span>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  Your financial data is stored locally on your device using industry-standard encryption. If you choose
                  to enable cloud sync, your data is encrypted before leaving your device using keys that only you control.
                  We cannot access your financial data even if we wanted to.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  Neemo is designed for users 13 years and older. We do not knowingly collect personal information from
                  children under 13. If you believe a child has provided us with personal information, please contact us.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any significant changes through
                  the app or via email if you have an account. The latest version will always be available on this page.
                </p>
              </div>

              <div className="p-6 bg-[#f58560]/10 dark:bg-[#f58560]/15 rounded-xl border border-[#f58560]/30">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Questions?</h2>
                <p className="text-gray-600 dark:text-white/70 mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, we&apos;re here to help.
                </p>
                <CTAButton href="/contact">
                  Contact Us
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
