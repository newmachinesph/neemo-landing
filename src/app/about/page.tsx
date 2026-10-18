'use client';

import {
  HeartIcon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

const values = [
  {
    icon: HeartIcon,
    title: 'Compassion',
    description: 'We genuinely care about every Filipino\'s financial wellbeing. Your success is our success.',
    color: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
  },
  {
    icon: LightBulbIcon,
    title: 'Accessibility',
    description: 'Financial tools should be free and easy to use for everyone, regardless of income level.',
    color: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: GlobeAsiaAustraliaIcon,
    title: 'Community',
    description: 'Built by Filipinos, for Filipinos. We understand Paluwagan, 13th month pay, and the way you manage money.',
    color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Privacy First',
    description: 'Your financial data is sacred. We never sell it and you control what you share.',
    color: 'bg-[#fce4e8] dark:bg-[#b91c4a]/20 text-[#9b1b3c] dark:text-[#f58560]',
  },
];

const milestones = [
  {
    year: '2026',
    title: 'The Idea',
    description: 'Neemo started as a side project to help friends track their 13th month pay, Paluwagan groups, and Christmas budgets.',
  },
  {
    year: '2026',
    title: 'Building the App',
    description: 'Built the full-featured app with budgets, goals, bills, net worth tracking, and 12 Filipino-specific features including SSS, PhilHealth, and Pag-IBIG calculators.',
  },
  {
    year: '2026',
    title: 'OFW & Gov Tools',
    description: 'Added OFW remittance tracking, Utang manager, cash flow forecasting, what-if scenarios, and the Mini App platform.',
  },
  {
    year: '2026',
    title: 'Launch & Beyond',
    description: 'Launched publicly with 104+ features built specifically for Filipinos, including AI-powered voice input, receipt scanning, smart categorization, and a growing Mini App marketplace.',
  },
];

const stats = [
  { value: '104+', label: 'Features Built' },
  { value: '21', label: 'Filipino Features' },
  { value: '100%', label: 'Free Forever' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-full mb-6 border border-[#f9d0d8] dark:border-[#f58560]/30">
            <GlobeAsiaAustraliaIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560]" />
            <span className="text-sm font-medium text-[#831530] dark:text-[#f58560]">Made for Filipinos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Empowering Every Filipino&apos;s Financial Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
            Neemo was born from a simple belief: everyone deserves access to tools that help them achieve financial freedom, regardless of their starting point.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white/5 border-y border-gray-100 dark:border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#9b1b3c] to-[#f58560] bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-white/70">
              From a simple idea to 104+ features built specifically for Filipino financial life.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 dark:text-white/70 space-y-6">
            <p>
              Neemo started when we noticed something frustrating: all the popular budgeting apps were designed for Western users. They didn&apos;t understand 13th month pay, didn&apos;t account for remittances, and had no concept of Paluwagan or the communal approach Filipinos take to finances.
            </p>
            <p>
              So we built something different. Not a translated American finance app, but a tool designed from scratch around how Filipinos actually handle money — complete with Paluwagan management, Utang tracking, OFW remittance logs, and government contribution calculators for SSS, PhilHealth, and Pag-IBIG.
            </p>
            <p>
              Today, Neemo has 104+ features including cash flow forecasting, emergency fund tracking, what-if scenarios, savings challenges, credit card optimization, and a Mini App platform. Everything runs locally on your phone — your data never touches our servers. And it&apos;s 100% free.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 sm:mb-20">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d14570] via-[#b91c4a] to-[#f58560] dark:from-[#b91c4a]/50 dark:via-[#b91c4a]/30 dark:to-[#f58560]/50 transform md:-translate-x-1/2"></div>
            <div className="space-y-12 sm:space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.title}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 w-5 h-5 bg-[#9b1b3c] dark:bg-[#f58560] rounded-full transform -translate-x-1/2 mt-2 shadow-lg shadow-[#b91c4a]/40 ring-4 ring-white dark:ring-[#2f0a18]"></div>
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`bg-gray-50 dark:bg-white/[0.06] rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:border-[#f58560]/30 ${index % 2 === 0 ? 'md:ml-auto' : ''} max-w-lg`}>
                      <span className="inline-block px-4 py-1.5 bg-[#fce4e8] dark:bg-[#f58560]/15 text-[#831530] dark:text-[#f58560] text-sm font-semibold rounded-full mb-4">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-white/70 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-white/70">
              The principles that guide everything we do at Neemo.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 p-6 bg-white dark:bg-white/[0.06] rounded-2xl border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:border-[#f58560]/30">
                <div className={`flex items-center justify-center w-12 h-12 ${value.color} rounded-xl flex-shrink-0`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{value.title}</h3>
                  <p className="text-gray-600 dark:text-white/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fce4e8] dark:bg-[#f58560]/20 rounded-2xl mb-6">
            <SparklesIcon className="w-8 h-8 text-[#9b1b3c] dark:text-[#f58560]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-white/70 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            To make financial freedom accessible to every Filipino through forward-looking tools, smart financial insights, and features built for the way Filipinos actually manage money.
          </p>
          <CTAButton href="/contact" size="lg">
            Get Early Access
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
