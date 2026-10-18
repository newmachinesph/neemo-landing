'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  EyeSlashIcon,
  FingerPrintIcon,
  ClockIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { Section, TrustBar } from '@/components/landing';
import { subscribeNewsletter } from '@/actions/newsletter';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const goals = [
  { question: 'When will I be debt-free?', answer: 'March 2028', icon: '🔓' },
  { question: 'When can I afford a house?', answer: 'November 2030', icon: '🏠' },
  { question: 'When can I quit my job?', answer: 'August 2035', icon: '✌️' },
];

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [heroMessage, setHeroMessage] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ctaMessage, setCtaMessage] = useState('');
  const [activeGoal, setActiveGoal] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#2f0a18] overflow-hidden">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f58560]/10 dark:bg-[#f58560]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-[#9b1b3c] dark:text-[#f58560] mb-4"
          >
            Personal Finance App for Filipinos
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6"
          >
            You&apos;re not bad with money.{' '}
            <span className="bg-gradient-to-r from-[#9b1b3c] to-[#f58560] bg-clip-text text-transparent">
              You just need the right tool.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-500 dark:text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Neemo gives every financial goal a date &mdash; not &ldquo;someday,&rdquo;
            but an actual month and year. So you stop waiting and start planning.
          </motion.p>

          <motion.form
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={async (e) => {
              e.preventDefault();
              setHeroStatus('loading');
              const result = await subscribeNewsletter(email, 'landing_hero');
              setHeroStatus(result.success ? 'success' : 'error');
              setHeroMessage(result.message);
              if (result.success) setEmail('');
            }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 h-12 px-4 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-white/[0.08] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#f58560] focus:ring-2 focus:ring-[#f58560]/20 text-sm"
              aria-label="Email address for early access"
              required
            />
            <button
              type="submit"
              disabled={heroStatus === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 text-[#2f0a18] bg-[#f58560] hover:bg-[#f79b7a] shadow-lg shadow-[#f58560]/25 hover:-translate-y-0.5 h-12 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {heroStatus === 'loading' ? 'Submitting...' : 'Get Early Access'}
            </button>
          </motion.form>

          {heroMessage && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm mt-3 ${heroStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}
            >
              {heroMessage}
            </motion.p>
          )}

          <TrustBar items={['No bank login needed', 'Data stays on your phone', '100% free forever']} />
        </div>
      </section>

      {/* ─── Sound Familiar? ─── */}
      <Section bg="muted">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Sound familiar?
          </h2>

          <div className="space-y-4">
            {[
              {
                text: '\u201CPayday tomorrow!\u201D \u2192 10 days later \u2192 \u201CWhere did it all go?\u201D',
                sub: 'Every. Single. Month.',
              },
              {
                text: '\u201CI have a spreadsheet, I promise.\u201D \u2014 Last edited: 3 months ago.',
                sub: 'We\u2019ve all been there.',
              },
              {
                text: '\u201CI downloaded a budget app.\u201D \u2014 Deleted after 2 weeks.',
                sub: 'Because it wasn\u2019t built for the way you handle money.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
              >
                <p className="text-gray-900 dark:text-white font-medium mb-1">{item.text}</p>
                <p className="text-sm text-gray-400 dark:text-white/40">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ─── The One Question: Kailan? ─── */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Neemo answers one question:{' '}
            <span className="text-[#9b1b3c] dark:text-[#f58560]">&ldquo;When?&rdquo;</span>
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 dark:text-white/50 mb-10"
          >
            Tap a question. Get a date. That simple.
          </motion.p>

          <div className="space-y-3 mb-8">
            {goals.map((goal, i) => (
              <motion.button
                key={i}
                {...fadeUp}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => setActiveGoal(i)}
                className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-xl border-2 text-left transition-all ${
                  activeGoal === i
                    ? 'border-[#f58560] bg-[#fdf2f4] dark:bg-[#f58560]/10'
                    : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:border-gray-200 dark:hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{goal.icon}</span>
                  <span className={`font-medium ${activeGoal === i ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-white/60'}`}>
                    {goal.question}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  {activeGoal === i && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#9b1b3c] to-[#f58560] bg-clip-text text-transparent"
                    >
                      {goal.answer}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm text-gray-400 dark:text-white/30"
          >
            Dates update automatically every time you check in.
          </motion.p>
        </div>
      </Section>

      {/* ─── 30-Second Check-in ─── */}
      <Section bg="muted" id="how-it-works">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4"
          >
            Once a month. Thirty seconds. Done.
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 dark:text-white/50 text-center mb-10"
          >
            No receipts. No categorizing. No daily logging.
            Just confirm your balances and Neemo handles all the calculations.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#f58560] animate-pulse" />
              <span className="text-xs font-medium text-[#9b1b3c] dark:text-[#f58560]">Monthly Check-in</span>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { account: 'BDO Savings', balance: '₱127,650' },
                { account: 'GCash', balance: '₱3,200' },
                { account: 'Credit Card', balance: '-₱18,500' },
              ].map((acc, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                  <span className="text-sm text-gray-600 dark:text-white/60">{acc.account}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">{acc.balance}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-white/30">Neemo recalculates all your goal dates</span>
              <div className="flex items-center gap-1 text-xs font-medium text-[#9b1b3c] dark:text-[#f58560]">
                <ClockIcon className="w-3.5 h-3.5" />
                ~30 sec
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── Smart Input ─── */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Log expenses{' '}
              <span className="text-[#9b1b3c] dark:text-[#f58560]">your way</span>.
            </h2>
            <p className="text-gray-500 dark:text-white/50 max-w-lg mx-auto">
              No more tedious manual entry. Talk to Neemo, snap a photo,
              or just chat &mdash; it understands you.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: MicrophoneIcon,
                title: 'Voice Input',
                desc: 'Just say "Spent 350 on Grab Food" and Neemo logs it instantly — amount, category, and date, all hands-free.',
                demo: (
                  <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-medium text-red-500 uppercase tracking-wider">Listening...</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-white/60 italic">
                      &ldquo;Nag-Grab Food ako, 350 pesos&rdquo;
                    </p>
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 dark:text-white/30">Food &middot; Today</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">₱350</span>
                    </div>
                  </div>
                ),
              },
              {
                icon: DocumentTextIcon,
                title: 'Receipt & Doc Scan',
                desc: 'Snap a receipt, bill, or payslip. Neemo extracts the totals, items, and dates automatically — no typing needed.',
                demo: (
                  <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                        <DocumentTextIcon className="w-3 h-3 text-gray-400 dark:text-white/40" />
                      </div>
                      <span className="text-[10px] font-medium text-[#9b1b3c] dark:text-[#f58560]">Receipt scanned</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { item: 'SM Supermarket', amount: '₱1,247' },
                        { item: 'Mercury Drug', amount: '₱385' },
                      ].map((r) => (
                        <div key={r.item} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 dark:text-white/50">{r.item}</span>
                          <span className="text-xs font-semibold text-gray-900 dark:text-white">{r.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                icon: ChatBubbleLeftRightIcon,
                title: 'AI Chat',
                desc: 'Ask Neemo anything about your money. "How much did I spend on food this month?" — it answers in plain language.',
                demo: (
                  <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/5 space-y-2">
                    <div className="flex justify-end">
                      <div className="px-2.5 py-1.5 rounded-xl bg-[#f58560]/15 text-[10px] text-gray-700 dark:text-white/80 max-w-[85%]">
                        Kaya ko ba bumili ng PS5?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-white/[0.08] border border-gray-100 dark:border-white/5 text-[10px] text-gray-600 dark:text-white/60 max-w-[85%]">
                        You can, but it pushes your EF goal by 3 months. Want me to simulate it?
                      </div>
                    </div>
                  </div>
                ),
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#fce4e8] dark:bg-[#f58560]/10 rounded-xl">
                    <feature.icon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560]" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{feature.desc}</p>
                {feature.demo}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Smart Automation ─── */}
      <Section bg="muted">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Neemo{' '}
              <span className="text-[#9b1b3c] dark:text-[#f58560]">learns your habits</span>.
            </h2>
            <p className="text-gray-500 dark:text-white/50 max-w-lg mx-auto">
              The more you use it, the smarter it gets. Less manual work, more
              automatic insights.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                icon: SparklesIcon,
                title: 'Auto-Categorization',
                desc: 'AI learns your spending patterns and tags transactions automatically — food, transpo, bills, load, and more.',
                tag: 'AI',
              },
              {
                icon: DevicePhoneMobileIcon,
                title: 'SMS & Notification Parsing',
                desc: 'Auto-reads GCash, Maya, and bank SMS confirmations to log transactions instantly. No manual entry needed.',
                tag: 'Killer Feature',
              },
              {
                icon: ExclamationTriangleIcon,
                title: 'Spending Anomaly Alerts',
                desc: '"You spent 3x more on food this week vs. your average." Neemo spots unusual patterns before they become problems.',
                tag: 'Smart',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex gap-4 p-4 sm:p-5 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── What-If Engine ─── */}
      <Section id="scenarios">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4"
          >
            Test big decisions before you commit.
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 dark:text-white/50 text-center mb-10"
          >
            Before you commit to a car, career change, or baby &mdash;
            ask Neemo what happens to your goals.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 overflow-hidden"
          >
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-400 dark:text-white/40 mb-2">What if...</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                I buy a ₱120K motorcycle on installment?
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Monthly cash flow', value: '-₱4,800/mo' },
                  { label: 'Emergency fund goal', value: 'Delayed 8 months' },
                  { label: 'Freedom timeline', value: 'Pushed to 2037' },
                ].map((impact, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5 text-center">
                    <div className="text-xs text-gray-400 dark:text-white/40 mb-1">{impact.label}</div>
                    <div className="text-sm font-bold text-red-500">{impact.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-center mt-4 text-xs text-gray-400 dark:text-white/30">
                Decide with open eyes &mdash; not just your gut.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── True Cost ─── */}
      <Section bg="muted">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Every peso has a{' '}
              <span className="text-[#9b1b3c] dark:text-[#f58560]">hidden price tag</span>.
            </h2>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 dark:text-white/50 mb-10"
          >
            That ₱90K phone isn&rsquo;t just ₱90K. Neemo shows you what it actually costs
            in time, compound growth, and delayed goals.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10"
          >
            <div className="text-left mb-5">
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 font-medium">
                True Cost Analysis
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3">iPhone 16 Pro Max</h3>
              <p className="text-sm text-gray-400 dark:text-white/40">Sticker price: ₱89,990</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Lost compound growth (10 yrs)', value: '₱247K' },
                { label: 'Days added to your debt', value: '+127 days' },
                { label: 'Freedom delayed by', value: '7 months' },
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/5 text-center">
                  <div className="text-xs text-gray-400 dark:text-white/40 mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-red-500">{stat.value}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 dark:text-white/30 mt-4">
              We&apos;re not saying don&apos;t buy it. We&apos;re just saying &mdash; now you know.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ─── Kuripot Score ─── */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How kuripot are you?{' '}
              <span className="text-[#9b1b3c] dark:text-[#f58560]">Find out monthly.</span>
            </h2>
            <p className="text-gray-500 dark:text-white/50 max-w-lg mx-auto">
              Your Kuripot Score measures how well you stuck to your budgets,
              hit savings goals, and resisted impulse buys. The higher the score,
              the more kuripot you are. Wear it with pride.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-28 h-28 rounded-2xl bg-gradient-to-br from-[#9b1b3c] to-[#f58560] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">87</div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider font-medium">Kuripot Score</div>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 font-semibold">
                    +12 vs last month
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Budget discipline', value: '92%', color: 'bg-green-500' },
                    { label: 'Savings consistency', value: '85%', color: 'bg-emerald-500' },
                    { label: 'Impulse control', value: '78%', color: 'bg-yellow-500' },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-white/40 w-32 text-left">{metric.label}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${metric.color} rounded-full`} style={{ width: metric.value }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-white/70 w-8">{metric.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-white/30 mt-3">
                  Share your score &mdash; challenge your barkada to be more kuripot.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── Built for Filipino Money ─── */}
      <Section id="filipino-features">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
            <span className="text-3xl mb-3 block">🇵🇭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Designed around how Filipinos actually handle money.
            </h2>
            <p className="text-gray-500 dark:text-white/50">
              This isn&apos;t a translated American finance app. Built from scratch
              for the real Filipino financial life.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                icon: '🤝',
                name: 'Paluwagan Manager',
                desc: 'Full group savings tracking — members, rounds, payout slots, contribution amounts, and per-member status. Never lose track of whose turn it is.',
              },
              {
                icon: '📱',
                name: 'Hulugan Tracker',
                desc: 'Monitor every installment — phones, appliances, motorcycles. See remaining balance, monthly amounts, and completion dates at a glance.',
              },
              {
                icon: '🎄',
                name: '13th Month Planner',
                desc: 'Plan your bonus before it arrives. Allocate portions to savings, debts, gifts, and holiday spending — not as an afterthought.',
              },
              {
                icon: '✈️',
                name: 'OFW Remittance Manager',
                desc: 'Full remittance screen with multi-currency support, recipient tracking, method logging, and exchange rate recording. Know exactly where every peso goes.',
              },
              {
                icon: '📝',
                name: 'Utang Manager',
                desc: 'Complete debt tracking — money you owe and money owed to you. Payment history, status (pending/partial/paid), and contact info for each entry.',
              },
              {
                icon: '🏥',
                name: 'SSS, PhilHealth, Pag-IBIG',
                desc: 'Full calculators with current rates and all salary brackets. Calculate SSS (38 brackets), PhilHealth premiums, Pag-IBIG contributions, and MP2 growth.',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                name: 'Shared Household Budget',
                desc: 'Track finances together with your partner or family. Shared categories, combined spending views, and household-level budget tracking.',
              },
              {
                icon: '✂️',
                name: 'Split Expenses',
                desc: 'Split bills with friends after group outings, trips, or shared purchases — built-in, no separate app needed. Track who owes what.',
              },
              {
                icon: '💰',
                name: 'Salary Net Pay Calculator',
                desc: 'Input gross salary → see exact take-home after SSS, PhilHealth, Pag-IBIG, and tax. Supports monthly and semi-monthly.',
              },
              {
                icon: '📅',
                name: 'Holiday Pay Calculator',
                desc: 'Compute overtime, night diff, regular holiday, special holiday, and rest day pay using current DOLE rates.',
              },
              {
                icon: '🎒',
                name: 'Balik-Eskwela Planner',
                desc: 'Back-to-school budget planner — track supplies, uniforms, enrollment fees, and baon per child for June opening.',
              },
              {
                icon: '💍',
                name: 'Life Event Planner',
                desc: 'Budget for weddings, debuts, baptisms, and graduations with line items, vendor payments, and contribution tracking.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.name}
                {...fadeUp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{feature.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{feature.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{feature.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── More Tools ─── */}
      <Section bg="muted">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Even more tools{' '}
              <span className="text-[#9b1b3c] dark:text-[#f58560]">built in</span>.
            </h2>
            <p className="text-gray-500 dark:text-white/50">
              Beyond budgets and goals, Neemo packs tools that make
              managing your money faster and smarter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                icon: '🏆',
                name: 'Savings Challenges',
                desc: '52-Week, 50-Peso Daily, and 100-Daily challenges with visual progress grids to keep you motivated.',
              },
              {
                icon: '💳',
                name: 'Credit Card Optimizer',
                desc: 'Analyzes your cards, calculates payoff priority using the avalanche method, and shows monthly interest.',
              },
              {
                icon: '💱',
                name: 'Currency Converter',
                desc: '22 currencies with live rates and 7-day trends. Perfect for OFWs and online shoppers.',
              },
              {
                icon: '🏦',
                name: 'Loan Calculator',
                desc: 'Full amortization calculator — see monthly payment, total interest, and complete schedule.',
              },
              {
                icon: '📋',
                name: 'Transaction Templates',
                desc: 'Save your frequent expenses as templates for one-tap logging. Auto-fills everything.',
              },
              {
                icon: '📊',
                name: 'Lifestyle Inflation Tracker',
                desc: 'Spots month-over-month spending creep so you know when your lifestyle outpaces your income.',
              },
              {
                icon: '📅',
                name: 'Year in Review',
                desc: 'Annual summary of everything — total earned, spent, saved, and your year-over-year progress.',
              },
              {
                icon: '🤝',
                name: 'Accountability Partners',
                desc: 'Link a partner to your goals and track check-in streaks. Stay consistent together.',
              },
              {
                icon: '🎄',
                name: 'Noche Buena Planner',
                desc: 'Christmas dinner budget and shopping list with purchase tracking — so nothing gets forgotten.',
              },
              {
                icon: '🔥',
                name: 'Streaks, Badges & Levels',
                desc: 'Build daily streaks, earn achievement badges, level up from Newbie to Money Master, and compete on leaderboards.',
              },
              {
                icon: '🤖',
                name: 'AI Financial Coach',
                desc: 'Personalized coaching that analyzes your spending and gives step-by-step guidance to hit your goals faster.',
              },
              {
                icon: '💑',
                name: 'Couple Mode',
                desc: 'Share budgets and goals with your partner. See combined spending and plan finances together.',
              },
              {
                icon: '🐷',
                name: 'Alkansya Digital',
                desc: 'Digital piggy bank for micro-savings. Round up transactions or auto-save daily and watch your alkansya grow.',
              },
              {
                icon: '🏦',
                name: 'Digital Bank Rate Optimizer',
                desc: 'Compare savings rates across Seabank, Maya, Tonik, CIMB, and more. Park your money where it earns the most.',
              },
              {
                icon: '📈',
                name: 'Investment Portfolio Tracker',
                desc: 'Track UITFs, mutual funds, GInvest, COL Financial, and time deposits in one dashboard.',
              },
              {
                icon: '💼',
                name: 'Side Hustle Dashboard',
                desc: 'Track multiple income streams — online selling, freelancing, Grab driving. See which hustle earns the most.',
              },
              {
                icon: '🪙',
                name: 'Tingi Tracker',
                desc: 'Track small daily purchases that add up fast — kape, load, merienda, pamasahe. Find hidden savings.',
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                {...fadeUp}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex gap-3 p-4 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{tool.name}</span>
                  <span className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">{tool.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Privacy ─── */}
      <Section bg="muted" id="privacy">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            We can&apos;t see your data. By design.
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-gray-500 dark:text-white/50 mb-10 max-w-lg mx-auto"
          >
            No bank login. No cloud sync required. Your financial data
            is stored on your phone only &mdash; never on our servers.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheckIcon, title: 'No Bank Sync', desc: 'Your credentials stay with you' },
              { icon: DevicePhoneMobileIcon, title: 'On-Device Only', desc: 'Data never leaves your phone' },
              { icon: EyeSlashIcon, title: 'Local-First', desc: 'Your financial data stays on your device' },
              { icon: FingerPrintIcon, title: 'App Lock', desc: 'PIN or biometric lock with auto-timeout' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/5"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-[#fce4e8] dark:bg-[#f58560]/10 rounded-xl">
                  <item.icon className="w-6 h-6 text-[#9b1b3c] dark:text-[#f58560]" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</div>
                <div className="text-sm text-gray-500 dark:text-white/50">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Final CTA ─── */}
      <Section bg="dark" className="py-20 sm:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stop saying &ldquo;someday.&rdquo;
              <br />
              <span className="text-[#f58560]">Find out exactly when.</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
              When will you be debt-free? When can you afford a house?
              Neemo gives you the date &mdash; not just motivation.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCtaStatus('loading');
                const result = await subscribeNewsletter(ctaEmail, 'landing_cta');
                setCtaStatus(result.success ? 'success' : 'error');
                setCtaMessage(result.message);
                if (result.success) setCtaEmail('');
              }}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
                className="w-full sm:flex-1 h-12 px-4 rounded-xl border border-white/15 bg-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-[#f58560] focus:ring-2 focus:ring-[#f58560]/20 text-sm"
                aria-label="Email address for early access"
                required
              />
              <button
                type="submit"
                disabled={ctaStatus === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 text-[#2f0a18] bg-[#f58560] hover:bg-[#f79b7a] h-12 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ctaStatus === 'loading' ? 'Submitting...' : 'Get Early Access'}
              </button>
            </form>

            {ctaMessage && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm mt-3 ${ctaStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {ctaMessage}
              </motion.p>
            )}

            <TrustBar items={['Free forever', 'No credit card', '2 minutes to set up']} dark />
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
