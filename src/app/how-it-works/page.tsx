'use client';

import {
  UserPlusIcon,
  FlagIcon,
  ChartBarIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

const steps = [
  {
    number: '01',
    title: 'Create Your Free Account',
    description: 'Sign up in seconds - no credit card required. Just your email and a password to get started on your journey.',
    icon: UserPlusIcon,
    color: 'bg-[#fce4e8] dark:bg-[#b91c4a]/20 text-[#9b1b3c] dark:text-[#f58560]',
    features: [
      'Free forever - no hidden fees',
      'No credit card required',
      'Personalized setup: pick your employment type, accounts, and budget style',
    ],
  },
  {
    number: '02',
    title: 'Set Your Financial Goals',
    description: 'Tell us what you want to achieve. Emergency fund? Debt payoff? Dream vacation? We\'ll help you get there.',
    icon: FlagIcon,
    color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    features: [
      'Personalized goal recommendations',
      'Smart milestones and timelines',
      '21 Filipino-specific features (13th month, Paluwagan, salary net pay, and more)',
      'Wishlist for big purchases with priority tracking',
    ],
  },
  {
    number: '03',
    title: 'Track Your Progress Daily',
    description: 'Log your expenses, stay within budget, and watch your savings grow. Smart alerts keep you on track automatically.',
    icon: ChartBarIcon,
    color: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    features: [
      'Easy expense logging with categories and notes',
      'Budget alerts at 80% and 100% thresholds',
      'Today\'s spending card and cash flow forecast',
      'Earn streaks, badges, and level up as you go',
    ],
  },
  {
    number: '04',
    title: 'See Your Future',
    description: 'Watch your financial forecast update in real time. Know exactly when you\'ll hit every goal — debt-free, first million, freedom.',
    icon: SparklesIcon,
    color: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    features: [
      'Personalized financial forecasting',
      'What-if scenario planning',
      'True cost analysis for every purchase',
      'AI Coach with personalized money tips',
    ],
  },
];

const benefits = [
  {
    icon: DevicePhoneMobileIcon,
    title: 'Built for Mobile',
    description: 'Designed as a native mobile app for the best experience on your phone.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Privacy First',
    description: 'Your data stays private. Control exactly what you share.',
  },
  {
    icon: SparklesIcon,
    title: 'Smart Insights',
    description: 'Spending breakdowns, forecasts, and alerts tailored to you.',
  },
  {
    icon: ChartBarIcon,
    title: 'Forward-Looking',
    description: 'See when you\'ll reach your goals, not just where money went.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How Neemo Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/70 mb-8">
            Your journey to financial freedom in 4 simple steps. No complicated setup, no hidden fees - just results.
          </p>
          <CTAButton href="/contact" size="lg">
            Start Your Journey
          </CTAButton>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold text-gray-200 dark:text-white/10">{step.number}</span>
                    <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${step.color}`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-white/70 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560] flex-shrink-0" />
                        <span className="text-gray-700 dark:text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Visual */}
                <div className="flex-1">
                  <div className={`aspect-square max-w-sm mx-auto rounded-2xl ${step.color} bg-opacity-30 dark:bg-opacity-20 flex items-center justify-center`}>
                    <step.icon className="w-32 h-32 opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Neemo?</h2>
            <p className="text-lg text-gray-600 dark:text-white/70">
              Built specifically for Filipinos, with features that understand your needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white dark:bg-white/[0.06] rounded-xl p-6 border border-gray-200 dark:border-white/10 transition-all duration-300 hover:border-[#f58560]/30">
                <div className="flex items-center justify-center w-12 h-12 bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6 text-[#9b1b3c] dark:text-[#f58560]" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/70 mb-8">
            Join thousands of Filipinos who have already started their journey to financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/contact" size="lg">
              Get Early Access
            </CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg" arrow={false}>
              Explore Features
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
