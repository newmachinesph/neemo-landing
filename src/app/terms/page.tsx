'use client';

import Link from 'next/link';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Neemo</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your use of Neemo, a personal finance management application.
                  By using Neemo, you agree to these Terms. Please read them carefully.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  By accessing or using Neemo, you agree to be bound by these Terms and our Privacy Policy.
                  If you do not agree to these Terms, please do not use our service.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-4">
                  Neemo is a personal finance management tool designed for Filipinos. Our services include:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Budget tracking and management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Expense logging and categorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Financial goal setting and tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Filipino-specific features (Paluwagan, 13th Month, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Community features and challenges (optional)</span>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. User Accounts</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-4">
                  Creating an account is optional. You can use most Neemo features without an account.
                  If you choose to create an account:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>You must provide accurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>You are responsible for maintaining your account security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>You must be at least 13 years old</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>One account per person</span>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Acceptable Use</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-4">
                  You agree to use Neemo only for lawful purposes. You may not:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Use the service for illegal activities',
                    'Attempt to access other users\' data',
                    'Interfere with the service\'s operation',
                    'Upload malicious content or code',
                    'Impersonate others or spread misinformation',
                    'Use bots or automated systems',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-500/20">
                      <span className="text-red-600 dark:text-red-400 text-lg">✕</span>
                      <span className="text-gray-700 dark:text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Community Guidelines</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-4">
                  If you participate in community features (challenges, forums, mentorship), you agree to:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Treat other users with respect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Not share financial advice unless qualified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Report inappropriate behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9b1b3c] dark:text-[#f58560]">•</span>
                    <span>Not spam or harass other users</span>
                  </li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  Neemo and its original content, features, and functionality are owned by Neemo and are protected
                  by copyright, trademark, and other intellectual property laws. You retain ownership of your personal
                  data and content you create within the app.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Disclaimer</h2>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl border border-yellow-200 dark:border-yellow-500/20">
                  <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                    <strong className="text-yellow-800 dark:text-yellow-400">Important:</strong> Neemo is a budgeting
                    and tracking tool, not a financial advisor. We do not provide investment advice, tax advice, or any
                    form of professional financial guidance. Always consult with qualified professionals for important
                    financial decisions.
                  </p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  Neemo is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages
                  arising from your use of the service, including but not limited to financial losses, data loss, or
                  decisions made based on information in the app.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Service Availability</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  We strive to keep Neemo available 24/7, but we cannot guarantee uninterrupted service. We may
                  modify, suspend, or discontinue features at any time. Since your data is stored locally, you can
                  always access your offline data even without internet connectivity.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Termination</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  You can stop using Neemo at any time. We may terminate or suspend your access for violations of
                  these Terms. Upon termination, your locally stored data remains on your device. You can export your
                  data before deleting the app.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  We may update these Terms from time to time. Significant changes will be communicated through the app.
                  Continued use of Neemo after changes constitutes acceptance of the new Terms.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Governing Law</h2>
                <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                  These Terms are governed by the laws of the Republic of the Philippines. Any disputes shall be resolved
                  in the courts of Metro Manila, Philippines.
                </p>
              </div>

              <div className="p-6 bg-[#f58560]/10 dark:bg-[#f58560]/15 rounded-xl border border-[#f58560]/30">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Questions About These Terms?</h2>
                <p className="text-gray-600 dark:text-white/70 mb-4">
                  If you have any questions about these Terms of Service, please reach out to us.
                </p>
                <div className="flex flex-wrap gap-3">
                  <CTAButton href="/contact">
                    Contact Us
                  </CTAButton>
                  <CTAButton href="/privacy" variant="secondary" arrow={false}>
                    Privacy Policy
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
