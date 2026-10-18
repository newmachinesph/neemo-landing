'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'getting-started', name: 'Getting Started' },
  { id: 'features', name: 'Features' },
  { id: 'privacy', name: 'Privacy & Security' },
  { id: 'billing', name: 'Billing' },
];

const faqs = [
  {
    category: 'getting-started',
    question: 'Is Neemo really free?',
    answer: 'Yes! Neemo is completely free to use. We believe everyone deserves access to financial tools. There are no hidden fees, no premium tiers, and no credit card required.',
  },
  {
    category: 'getting-started',
    question: 'How do I create an account?',
    answer: 'Creating an account is simple! Just open the app and go through a quick onboarding process where you set your name, employment type, and financial preferences. The whole process takes less than 2 minutes.',
  },
  {
    category: 'getting-started',
    question: 'Do I need to connect my bank account?',
    answer: 'No! Neemo is fully manual — you log your own expenses and income. This means no bank login required, no credentials shared, and complete control over your data. Many users prefer this approach for better spending awareness.',
  },
  {
    category: 'getting-started',
    question: 'Is Neemo available outside the Philippines?',
    answer: 'While Neemo is designed specifically for Filipinos with features like 13th month pay tracking, Paluwagan management, and SSS/PhilHealth/Pag-IBIG calculators, anyone can use it! You can set your preferred currency during onboarding.',
  },
  {
    category: 'features',
    question: 'What Filipino-specific features does Neemo have?',
    answer: 'Neemo has 21 Filipino features: Paluwagan Manager, Hulugan Tracker, 13th Month Planner, Aguinaldo Tracker, OFW Remittance Manager, Fiesta Planner, Balikbayan Tracker, Noche Buena Planner, Utang Manager, SSS Calculator, PhilHealth Calculator, Pag-IBIG & MP2 Calculator, Tax Calculator, Salary Net Pay Calculator, Holiday Pay Calculator, Tuition & Education Planner, Cooperative Tracker, Life Event Planner (weddings, debuts, baptisms), Domestic Padala Tracker, Balik-Eskwela Planner, and Freelancer Tax Dashboard.',
  },
  {
    category: 'features',
    question: 'What AI-powered features does Neemo have?',
    answer: 'Neemo includes 8 AI-powered features: Voice Input (log expenses by speaking), Receipt & Doc Scanning (snap a photo to auto-extract amounts), AI Chat Assistant (ask about your finances in plain language), Auto-Categorization (AI learns your patterns), SMS & Notification Parsing (auto-log from GCash, Maya, and bank texts), Budget Suggestions (AI recommends optimal budgets), Expense Predictions (forecast upcoming costs), Savings Autopilot (optimal savings amounts), Smart Money Tips (daily personalized advice), and AI Financial Coach (step-by-step guidance to hit your goals).',
  },
  {
    category: 'features',
    question: 'Does Neemo have gamification features?',
    answer: 'Yes! Neemo makes saving money fun with a full gamification system: Savings Streaks (build daily streaks), Achievement Badges (earn badges for milestones like first ₱10K), Community Leaderboards (compete with friends), Money Challenges (monthly community challenges), Financial Milestones (confetti celebrations), Savings Quests (multi-step missions), Level System (Newbie to Money Master), and a Rewards Store where you can redeem points for premium themes and badges.',
  },
  {
    category: 'features',
    question: 'Can I use Neemo with my partner or family?',
    answer: 'Absolutely! Neemo has Couple Mode for sharing budgets and goals with your partner, Shared Goals for group savings with friends or family, Kids Allowance for teaching children money management, Shared Household Budgets for tracking family finances together, and Accountability Circles where small groups (5-15 people) can motivate each other toward financial goals.',
  },
  {
    category: 'features',
    question: 'How does the Cash Flow Forecast work?',
    answer: 'Neemo provides a 7-day cash flow forecast with a visual chart on your home screen. It shows your projected balance with a color-coded status indicator (green = healthy, yellow = caution, red = danger) along with your Safe to Spend amount and projected end-of-month balance.',
  },
  {
    category: 'features',
    question: 'Can I track 13th month pay and bonuses?',
    answer: 'Absolutely! Neemo has a dedicated 13th Month Planner where you can plan and allocate your year-end bonus before it arrives. Set aside portions for savings, debts, gifts, and holiday spending so you make the most of it.',
  },
  {
    category: 'features',
    question: 'What is Paluwagan tracking?',
    answer: 'Paluwagan is a traditional Filipino group savings system. Neemo has a full Paluwagan Manager where you can track members, schedule rounds, set contribution amounts, assign payout slots, and see the status of each member. Everything you need to manage your group in one place.',
  },
  {
    category: 'features',
    question: 'What are Mini Apps?',
    answer: 'Mini Apps are lightweight tools you can install from the Neemo app marketplace. They run in a sandboxed environment with a permissions system — each Mini App only accesses the data you approve. The first available Mini App is Turo, a car rental expense tracker.',
  },
  {
    category: 'features',
    question: 'Can I track my subscriptions?',
    answer: 'Yes! Neemo tracks all your recurring subscriptions — Netflix, Spotify, gym, cloud storage, and more. You can see your total monthly subscription cost, get renewal reminders, and manage billing cycles from the Insights tab.',
  },
  {
    category: 'features',
    question: 'Can I manage my debit and credit cards?',
    answer: 'Absolutely. You can add debit, credit, and prepaid cards with details like credit limits, statement cut dates, and payment due dates. Neemo tracks card-linked spending and outstanding balances so you never miss a payment.',
  },
  {
    category: 'features',
    question: 'How does the Utang Manager work?',
    answer: 'The Utang Manager tracks debts on both sides — money you owe and money owed to you. Each entry has payment history, status tracking (pending, partial, paid), notes, and contact info. No more awkward "should I follow up?" moments.',
  },
  {
    category: 'features',
    question: 'What government calculators are included?',
    answer: 'Neemo includes full calculators for SSS (all 38 salary brackets with current rates, employer and employee shares), PhilHealth (premium calculation by salary bracket), Pag-IBIG (monthly contributions and MP2 savings growth), and Income Tax (current brackets with withholding tax computation).',
  },
  {
    category: 'features',
    question: 'Can Neemo calculate my net pay and holiday pay?',
    answer: 'Yes! The Salary Net Pay Calculator shows your exact take-home pay after SSS, PhilHealth, Pag-IBIG, and tax deductions. The Holiday Pay Calculator computes overtime, night differential, regular holiday, special holiday, and rest day pay using current DOLE rates.',
  },
  {
    category: 'features',
    question: 'Does Neemo help with education expenses?',
    answer: 'Absolutely. The Tuition & Education Planner lets you plan school fees, uniforms, supplies, and daily allowances for multiple children per semester. The Balik-Eskwela Planner is a dedicated back-to-school budget tool for June enrollment. You can also track domestic padala sent to family for school support.',
  },
  {
    category: 'features',
    question: 'Can I track my investments and digital bank savings?',
    answer: 'Yes! The Investment Portfolio Tracker monitors UITFs, mutual funds, GInvest, and COL Financial holdings in one dashboard. The Digital Bank Rate Optimizer compares savings rates across Seabank, Maya, Tonik, CIMB, and more so you always know where to park your money for the best return.',
  },
  {
    category: 'privacy',
    question: 'Is my financial data safe?',
    answer: 'Your financial data is stored locally on your phone. Neemo uses a local-first architecture — your transactions, budgets, and goals are kept on-device and are never sent to our servers for analytics or advertising. Account authentication is handled securely, but your financial data stays with you.',
  },
  {
    category: 'privacy',
    question: 'Can I lock the app?',
    answer: 'Yes! You can set up a 6-digit PIN or enable biometric authentication (Face ID or fingerprint) to lock Neemo. Choose an auto-lock timeout — immediate, 30 seconds, 1 minute, or 5 minutes — so the app locks automatically when you step away.',
  },
  {
    category: 'privacy',
    question: 'Can I hide my balances?',
    answer: 'Yes! Neemo has a one-tap "Hide Balances" feature that masks all monetary amounts across the entire app. Perfect for checking your finances in public without revealing your numbers. Just tap the eye icon on the home screen.',
  },
  {
    category: 'privacy',
    question: 'Can I export or delete my data?',
    answer: 'Yes. You can export all your financial data to CSV or PDF at any time from the Profile screen. You can also reset your entire account, which erases all data from your device. Since data is stored locally, there\'s nothing on our servers to delete.',
  },
  {
    category: 'privacy',
    question: 'Do you share data with advertisers?',
    answer: 'No, never. We don\'t have ads, and your data never leaves your phone. There is nothing to share because we never have access to your financial information in the first place.',
  },
  {
    category: 'billing',
    question: 'Will Neemo ever become paid?',
    answer: 'Our core features will always be free. We believe financial tools should be accessible to everyone. In the future, we may offer optional premium features, but the essential budgeting, tracking, and Filipino-specific features will remain free forever.',
  },
  {
    category: 'billing',
    question: 'How can I support Neemo?',
    answer: 'If you love Neemo and want to support our mission, you can help by spreading the word, leaving reviews, and inviting friends. Every bit of support helps us keep the service free for everyone.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
            Find answers to common questions about Neemo. Can't find what you're looking for? Contact us!
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560] focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10 sticky top-16 bg-white/80 dark:bg-[#2f0a18]/80 backdrop-blur-md z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#f58560] text-[#2f0a18]'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-white/50 mb-4">No questions found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a] font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-white/[0.06]"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === `${index}` ? null : `${index}`)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 dark:text-white/50 flex-shrink-0 transition-transform ${
                        openQuestion === `${index}` ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openQuestion === `${index}` && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-gray-600 dark:text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-white/70 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <CTAButton href="/contact">
            Contact Us
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
