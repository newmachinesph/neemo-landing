'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  BanknotesIcon,
  SparklesIcon,
  TrophyIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  BellIcon,
  HomeIcon,
  WalletIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface MockupScreen {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

const PhoneFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Phone outer frame */}
    <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl shadow-black/30">
      {/* Phone inner bezel */}
      <div className="relative bg-gray-950 rounded-[2.5rem] overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-black w-28 h-7 rounded-b-3xl flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-800" />
          <div className="w-12 h-3 rounded-full bg-gray-800" />
        </div>

        {/* Screen content */}
        <div className="relative w-[280px] h-[580px] overflow-hidden bg-[#2f0a18]">
          {children}
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-700 rounded-l-lg" />
      <div className="absolute -left-1 top-36 w-1 h-12 bg-gray-700 rounded-l-lg" />
      <div className="absolute -left-1 top-52 w-1 h-12 bg-gray-700 rounded-l-lg" />
      <div className="absolute -right-1 top-32 w-1 h-16 bg-gray-700 rounded-r-lg" />
    </div>
  </div>
);

const BottomNav = () => (
  <div className="absolute bottom-0 left-0 right-0 bg-[#3d0a1e]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
    <div className="flex items-center justify-around">
      <div className="flex flex-col items-center gap-1">
        <HomeIcon className="w-5 h-5 text-[#f58560]" />
        <span className="text-[10px] text-[#f58560] font-medium">Home</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <WalletIcon className="w-5 h-5 text-white/50" />
        <span className="text-[10px] text-white/50">Wallet</span>
      </div>
      <div className="relative -mt-6">
        <div className="w-12 h-12 rounded-2xl bg-[#f58560] flex items-center justify-center shadow-lg shadow-[#f58560]/30">
          <PlusIcon className="w-6 h-6 text-[#2f0a18]" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ChartBarIcon className="w-5 h-5 text-white/50" />
        <span className="text-[10px] text-white/50">Stats</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Cog6ToothIcon className="w-5 h-5 text-white/50" />
        <span className="text-[10px] text-white/50">Settings</span>
      </div>
    </div>
  </div>
);

const StatusBar = () => (
  <div className="absolute top-0 left-0 right-0 pt-10 px-6 pb-2 flex items-center justify-between text-white/70 text-xs z-10">
    <span className="font-medium">9:41</span>
    <div className="flex items-center gap-1">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.33 4.67L18 9.57V20H6V9.57l5.67-4.9.66.58zm0-2.67L2 10.5V22h20V10.5L12.33 2z"/>
      </svg>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
      </svg>
      <div className="flex items-center gap-0.5">
        <div className="w-6 h-3 border border-white/50 rounded-sm flex items-center p-0.5">
          <div className="h-full w-4/5 bg-[#f58560] rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

// Dashboard Screen
const DashboardScreen = () => (
  <div className="h-full pt-14 pb-20 px-4 overflow-hidden">
    <StatusBar />

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-white/50 text-xs">Good morning,</p>
        <h2 className="text-white font-bold text-lg">Juan!</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
          <FireIcon className="w-3 h-3 text-orange-400" />
          <span className="text-orange-400 text-[10px] font-bold">15</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <BellIcon className="w-4 h-4 text-white/70" />
        </div>
      </div>
    </div>

    {/* Balance Card */}
    <div className="bg-gradient-to-br from-[#f58560]/20 to-[#b91c4a]/10 rounded-2xl p-4 border border-[#f58560]/20 mb-4">
      <p className="text-white/50 text-xs mb-1">Total Balance</p>
      <h3 className="text-[#f58560] font-bold text-2xl mb-3">₱127,650.00</h3>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
          <ArrowTrendingUpIcon className="w-3 h-3 text-green-400" />
          <span className="text-green-400 text-[10px] font-medium">+12.5%</span>
        </div>
        <span className="text-white/40 text-[10px]">vs last month</span>
      </div>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
            <ArrowTrendingUpIcon className="w-3 h-3 text-green-400" />
          </div>
          <span className="text-white/50 text-[10px]">Income</span>
        </div>
        <p className="text-green-400 font-bold text-sm">₱110,000</p>
      </div>
      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
            <BanknotesIcon className="w-3 h-3 text-red-400" />
          </div>
          <span className="text-white/50 text-[10px]">Expenses</span>
        </div>
        <p className="text-red-400 font-bold text-sm">₱51,349</p>
      </div>
    </div>

    {/* Recent Transactions */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold text-sm">Recent Transactions</h4>
        <span className="text-[#f58560] text-[10px] font-medium">See all</span>
      </div>
      <div className="space-y-2">
        {[
          { icon: '🛒', name: 'Grocery Store', amount: '-₱2,450', category: 'Food', time: '2h ago' },
          { icon: '⚡', name: 'Meralco Bill', amount: '-₱3,200', category: 'Utilities', time: '1d ago' },
          { icon: '💼', name: 'Salary Deposit', amount: '+₱55,000', category: 'Income', time: '3d ago', positive: true },
        ].map((tx, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
              {tx.icon}
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-medium">{tx.name}</p>
              <p className="text-white/40 text-[10px]">{tx.category} • {tx.time}</p>
            </div>
            <p className={`text-xs font-bold ${tx.positive ? 'text-green-400' : 'text-white'}`}>{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>

    <BottomNav />
  </div>
);

// Goals Screen
const GoalsScreen = () => (
  <div className="h-full pt-14 pb-20 px-4 overflow-hidden">
    <StatusBar />

    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-white font-bold text-lg">My Goals</h2>
      <div className="w-8 h-8 rounded-xl bg-[#f58560]/20 flex items-center justify-center">
        <PlusIcon className="w-4 h-4 text-[#f58560]" />
      </div>
    </div>

    {/* Goals List */}
    <div className="space-y-3">
      {[
        { icon: '🏝️', name: 'Boracay Trip', current: 35000, target: 50000, color: 'from-blue-500 to-cyan-400', percent: 70 },
        { icon: '🚗', name: 'New Car Fund', current: 180000, target: 500000, color: 'from-amber-500 to-orange-400', percent: 36 },
        { icon: '🏠', name: 'House Down Payment', current: 250000, target: 1000000, color: 'from-purple-500 to-pink-400', percent: 25 },
        { icon: '💰', name: 'Emergency Fund', current: 90000, target: 100000, color: 'from-green-500 to-emerald-400', percent: 90 },
      ].map((goal, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl">
              {goal.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm">{goal.name}</h4>
              <p className="text-white/40 text-[10px]">
                ₱{goal.current.toLocaleString()} / ₱{goal.target.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[#f58560] font-bold text-sm">{goal.percent}%</span>
            </div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${goal.percent}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>

    <BottomNav />
  </div>
);

// AI Insights Screen
const AIInsightsScreen = () => (
  <div className="h-full pt-14 pb-20 px-4 overflow-hidden">
    <StatusBar />

    {/* Header */}
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
        <SparklesIcon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-white font-bold text-lg">AI Insights</h2>
        <p className="text-white/40 text-[10px]">Personalized for you</p>
      </div>
    </div>

    {/* Insights Cards */}
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-500/20 to-violet-500/10 rounded-2xl p-4 border border-purple-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/30 flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Spending Alert</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              You&apos;ve spent 40% more on food delivery this month. Consider cooking at home to save ₱3,500.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl p-4 border border-green-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
            <CheckCircleIcon className="w-4 h-4 text-green-300" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Great Progress!</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Your savings rate is 53% — that&apos;s top 5% among Neemo users! Keep it up!
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-2xl p-4 border border-amber-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center flex-shrink-0">
            <TrophyIcon className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Goal Prediction</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              At your current pace, you&apos;ll reach your Boracay Trip goal by March 15!
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-2xl p-4 border border-blue-500/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center flex-shrink-0">
            <BanknotesIcon className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Bill Reminder</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Your PLDT bill (₱1,899) is due in 3 days. Tap to schedule payment.
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    <BottomNav />
  </div>
);

// Filipino Features Screen
const FilipinoFeaturesScreen = () => (
  <div className="h-full pt-14 pb-20 px-4 overflow-hidden">
    <StatusBar />

    {/* Header */}
    <div className="flex items-center gap-3 mb-5">
      <span className="text-2xl">🇵🇭</span>
      <div>
        <h2 className="text-white font-bold text-lg">Filipino Features</h2>
        <p className="text-white/40 text-[10px]">Made for your lifestyle</p>
      </div>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { icon: '🤝', name: 'Paluwagan', desc: 'Track groups' },
        { icon: '📱', name: 'Hulugan', desc: 'Installments' },
        { icon: '🎄', name: '13th Month', desc: 'Bonus planner' },
        { icon: '✈️', name: 'OFW Mode', desc: 'Remittances' },
        { icon: '📝', name: 'Utang', desc: 'Debt tracker' },
        { icon: '🏥', name: 'Gov Benefits', desc: 'SSS & more' },
      ].map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-[#f58560]/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl mb-2">
            {feature.icon}
          </div>
          <h4 className="text-white font-semibold text-xs">{feature.name}</h4>
          <p className="text-white/40 text-[10px]">{feature.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Active Paluwagan */}
    <div className="mt-4 bg-gradient-to-br from-[#f58560]/10 to-[#b91c4a]/5 rounded-2xl p-4 border border-[#f58560]/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold text-sm">Active Paluwagan</h4>
        <ChevronRightIcon className="w-4 h-4 text-white/40" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#f58560]/20 flex items-center justify-center text-lg">
          🤝
        </div>
        <div className="flex-1">
          <p className="text-white text-xs font-medium">Office Savings Group</p>
          <p className="text-white/40 text-[10px]">₱5,000/week • 12 members</p>
        </div>
        <div className="px-2 py-1 bg-green-500/20 rounded-full">
          <span className="text-green-400 text-[10px] font-medium">Week 8/12</span>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
);

// Achievements Screen
const AchievementsScreen = () => (
  <div className="h-full pt-14 pb-20 px-4 overflow-hidden">
    <StatusBar />

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <TrophyIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">Achievements</h2>
          <p className="text-white/40 text-[10px]">12 of 50 unlocked</p>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
        <div className="flex items-center justify-center gap-1 mb-1">
          <FireIcon className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400 font-bold text-lg">15</span>
        </div>
        <p className="text-white/40 text-[10px]">Day Streak</p>
      </div>
      <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
        <div className="text-[#f58560] font-bold text-lg mb-1">2,450</div>
        <p className="text-white/40 text-[10px]">Points</p>
      </div>
      <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
        <div className="text-purple-400 font-bold text-lg mb-1">#847</div>
        <p className="text-white/40 text-[10px]">Rank</p>
      </div>
    </div>

    {/* Recent Achievements */}
    <div className="mb-3">
      <h4 className="text-white font-semibold text-sm mb-3">Recent Unlocks</h4>
      <div className="space-y-2">
        {[
          { icon: '🔥', name: 'Streak Master', desc: '7-day tracking streak', rarity: 'Rare' },
          { icon: '💰', name: 'First Saver', desc: 'Saved first ₱10,000', rarity: 'Common' },
          { icon: '🎯', name: 'Goal Getter', desc: 'Completed first goal', rarity: 'Common' },
        ].map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 flex items-center justify-center text-xl">
              {badge.icon}
            </div>
            <div className="flex-1">
              <h5 className="text-white font-semibold text-xs">{badge.name}</h5>
              <p className="text-white/40 text-[10px]">{badge.desc}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
              badge.rarity === 'Rare'
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-white/10 text-white/50'
            }`}>
              {badge.rarity}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Locked Preview */}
    <div>
      <h4 className="text-white font-semibold text-sm mb-3">Up Next</h4>
      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 opacity-60">
        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl grayscale">
          🏆
        </div>
        <div className="flex-1">
          <h5 className="text-white font-semibold text-xs">Budget Boss</h5>
          <p className="text-white/40 text-[10px]">Stay under budget for 3 months</p>
        </div>
        <span className="text-white/30 text-[10px]">2/3 months</span>
      </div>
    </div>

    <BottomNav />
  </div>
);

const screens: MockupScreen[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'See your complete financial picture at a glance',
    content: <DashboardScreen />,
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'Track your savings goals with visual progress',
    content: <GoalsScreen />,
  },
  {
    id: 'insights',
    title: 'AI Insights',
    description: 'Get personalized tips powered by AI',
    content: <AIInsightsScreen />,
  },
  {
    id: 'filipino',
    title: 'Filipino Features',
    description: 'Paluwagan, Hulugan, OFW mode & more',
    content: <FilipinoFeaturesScreen />,
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Earn badges and compete with friends',
    content: <AchievementsScreen />,
  },
];

export default function MobileMockups() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-[#831530] dark:text-[#f58560] bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-full uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            App Preview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Beautiful on{' '}
            <span className="bg-gradient-to-r from-[#9b1b3c] to-[#f58560] bg-clip-text text-transparent">
              Every Screen
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
            A clean, intuitive interface that makes managing your money a joy, not a chore.
          </p>
        </motion.div>

        {/* Mobile Mockup Display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Feature Selector - Left side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full lg:w-auto order-2 lg:order-1"
          >
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {screens.map((screen, index) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(index)}
                  className={`flex-shrink-0 lg:flex-shrink text-left px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] lg:min-w-[240px] ${
                    activeScreen === index
                      ? 'bg-[#f58560]/20 border-[#f58560]/50 border-2'
                      : 'bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#f58560]/30'
                  }`}
                >
                  <h4 className={`font-semibold text-sm mb-0.5 transition-colors ${
                    activeScreen === index
                      ? 'text-[#9b1b3c] dark:text-[#f58560]'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {screen.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-white/50 hidden lg:block">
                    {screen.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Phone Mockup - Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f58560]/30 via-[#d4365e]/20 to-[#f58560]/30 rounded-[4rem] blur-3xl opacity-40 scale-110" />

            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {screens[activeScreen].content}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </motion.div>

          {/* Feature Highlights - Right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full lg:w-64 order-3 hidden lg:block"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#fce4e8] dark:bg-[#b91c4a]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4 text-[#9b1b3c] dark:text-[#d4365e]" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-gray-900 dark:text-white">Works Offline</h5>
                  <p className="text-xs text-gray-500 dark:text-white/50">Track anywhere, anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-gray-900 dark:text-white">AI-Powered</h5>
                  <p className="text-xs text-gray-500 dark:text-white/50">Smart insights daily</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <TrophyIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-gray-900 dark:text-white">Gamified</h5>
                  <p className="text-xs text-gray-500 dark:text-white/50">Stay motivated always</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-10 lg:hidden"
        >
          {[
            { icon: <CheckCircleIcon className="w-4 h-4" />, text: 'Works Offline' },
            { icon: <SparklesIcon className="w-4 h-4" />, text: 'AI-Powered' },
            { icon: <TrophyIcon className="w-4 h-4" />, text: 'Gamified' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 text-sm"
            >
              <span className="text-[#9b1b3c] dark:text-[#f58560]">{item.icon}</span>
              <span className="text-gray-700 dark:text-white/70 font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
