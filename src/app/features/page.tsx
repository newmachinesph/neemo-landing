'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  BanknotesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  BoltIcon,
  CalendarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeSlashIcon,
  HeartIcon,
  CalculatorIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FlagIcon,
  FingerPrintIcon,
  LightBulbIcon,
  MicrophoneIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
  StarIcon,
  TagIcon,
  WalletIcon,
  TrophyIcon,
  FireIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  ArrowPathIcon,
  ScaleIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  HomeIcon,
  SignalIcon,
  BeakerIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';

type FeatureCategory = 'all' | 'core' | 'filipino' | 'smart' | 'ai' | 'gamification' | 'social' | 'reports' | 'tools';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: typeof SparklesIcon | string;
  category: FeatureCategory;
  isPremium?: boolean;
}

const features: Feature[] = [
  // Core Features
  { id: 'expense-tracking', name: 'Expense Tracking', description: 'Log every peso with detailed categorization, notes, and photos. Track across multiple accounts with income, expense, and transfer types.', icon: BanknotesIcon, category: 'core' },
  { id: 'budget-creation', name: 'Budget Management', description: 'Set monthly budgets by category with real-time progress bars, utilization dashboard, threshold alerts at 80% and 100%, and a comprehensive overview of top spending categories.', icon: WalletIcon, category: 'core' },
  { id: 'income-tracking', name: 'Income Tracking', description: 'Track all income sources — salary, freelance, side hustle, and passive income — with full category and account assignment.', icon: CurrencyDollarIcon, category: 'core' },
  { id: 'goal-setting', name: 'Goal-Based Savings', description: 'Create visual savings goals with target amounts, deadlines, and contribution tracking. Watch your progress with animated bars.', icon: FlagIcon, category: 'core' },
  { id: 'net-worth', name: 'Net Worth Tracking', description: 'See your complete financial picture across all accounts, assets, and liabilities. Track how your net worth changes over months and years with a visual trend line.', icon: ChartBarIcon, category: 'core' },
  { id: 'bill-reminders', name: 'Bill Reminders & Calendar', description: 'Visual timeline of all upcoming bills sorted by urgency, with smart reminders 3 days before, 1 day before, and on due day. Never miss a payment again.', icon: CalendarIcon, category: 'core' },
  { id: 'recurring-transactions', name: 'Recurring Transactions', description: 'Set up recurring expenses and income with flexible frequencies — weekly, biweekly, monthly, quarterly, or yearly.', icon: ClockIcon, category: 'core' },
  { id: 'multi-account', name: 'Multi-Account Support', description: 'Manage bank accounts, e-wallets (GCash, Maya), credit cards, cash, and more — all in one dashboard with individual balances.', icon: CreditCardIcon, category: 'core' },
  { id: 'safe-to-spend', name: 'Safe to Spend', description: 'Know exactly how much you can safely spend after upcoming bills, savings goals, and budget limits. Color-coded status indicator.', icon: ShieldCheckIcon, category: 'core' },
  { id: 'cash-flow-forecast', name: 'Cash Flow Forecast', description: '7-day visual forecast chart showing projected balances. Green/yellow/red health status with Safe to Spend and projected end-of-month balance based on your spending patterns.', icon: PresentationChartLineIcon, category: 'core' },
  { id: 'emergency-fund', name: 'Emergency Fund Tracker', description: 'Dedicated card tracking your emergency fund progress — current amount vs. target based on your monthly expenses.', icon: ShieldCheckIcon, category: 'core' },
  { id: 'subscription-tracking', name: 'Subscription Tracking', description: 'Track all your subscriptions in one place. See total monthly cost, get renewal reminders, and manage billing cycles.', icon: ClockIcon, category: 'core' },
  { id: 'card-management', name: 'Card Management', description: 'Manage debit, credit, and prepaid cards with credit limits, statement cut dates, due dates, and card-linked spending tracking.', icon: CreditCardIcon, category: 'core' },
  { id: 'wishlist', name: 'Wishlist & Shopping Goals', description: 'Plan big purchases with target amounts, priority levels, and notes. Track what you want and when you can afford it.', icon: StarIcon, category: 'core' },
  { id: 'manual-assets', name: 'Manual Asset Tracking', description: 'Add property, vehicles, and valuables to your net worth for a complete financial picture.', icon: ChartBarIcon, category: 'core' },
  { id: 'transaction-search', name: 'Smart Search', description: 'Find any transaction instantly with powerful search and filters by date, category, account, and amount.', icon: DocumentTextIcon, category: 'core' },

  // Filipino-Specific Features
  { id: 'paluwagan', name: 'Paluwagan Manager', description: 'Full group savings manager with member tracking, round scheduling, contribution amounts, payout slots, and per-member status.', icon: '🤝', category: 'filipino' },
  { id: 'hulugan', name: 'Hulugan Tracker', description: 'Monitor installment payments for phones, appliances, and motorcycles. Track remaining balance, monthly amounts, and completion dates.', icon: '📱', category: 'filipino' },
  { id: '13th-month', name: '13th Month Planner', description: 'Plan and allocate your year-end bonus before it arrives. Set aside portions for savings, debts, gifts, and holiday spending.', icon: '🎄', category: 'filipino' },
  { id: 'aguinaldo', name: 'Aguinaldo Tracker', description: 'Track Christmas money received and given throughout the holiday season. Keep a running total and stay within your gifting budget.', icon: '🧧', category: 'filipino' },
  { id: 'ofw-mode', name: 'OFW Remittance Manager', description: 'Full remittance tracking with multi-currency support, recipient management, remittance method logging, and exchange rate recording.', icon: '✈️', category: 'filipino' },
  { id: 'fiesta', name: 'Fiesta Planner', description: 'Budget for town fiestas and family celebrations in advance. Track contributions and expenses for each event.', icon: '🎉', category: 'filipino' },
  { id: 'balikbayan', name: 'Balikbayan Tracker', description: 'Plan spending for when OFWs come home for vacation. Budget for pasalubong, outings, and family expenses.', icon: '🏠', category: 'filipino' },
  { id: 'utang', name: 'Utang Manager', description: 'Complete debt tracking — money you owe and money owed to you. Payment history, status tracking (pending/partial/paid), and contact info.', icon: '📝', category: 'filipino' },
  { id: 'sss', name: 'SSS Calculator', description: 'Full contribution calculator with all 38 salary brackets and current rates. Calculate employer and employee shares instantly.', icon: '🏥', category: 'filipino' },
  { id: 'philhealth', name: 'PhilHealth Calculator', description: 'Calculate PhilHealth premiums based on your salary bracket. Track monthly contributions with current premium rates.', icon: '💊', category: 'filipino' },
  { id: 'pagibig', name: 'Pag-IBIG & MP2 Calculator', description: 'Monitor Pag-IBIG contributions and calculate MP2 savings growth. Estimate long-term benefits with current rates.', icon: '🏦', category: 'filipino' },
  { id: 'tax-calculator', name: 'Tax Calculator', description: 'Philippine income tax calculator with current brackets. Compute withholding tax, track quarterly filings, and see annual projections.', icon: '📋', category: 'filipino' },

  // Smart Features (built-in intelligence)
  { id: 'spending-insights', name: 'Spending Insights & Analysis', description: 'Visual spending breakdowns by category, account, and time period. Deep dive with trends over time, percentage breakdowns, and charts showing exactly where your money goes.', icon: LightBulbIcon, category: 'smart' },
  { id: 'today-spending', name: "Today's Spending", description: "At-a-glance card showing today's total spending and transaction count. Stay aware of your daily spending habits.", icon: BanknotesIcon, category: 'smart' },
  { id: 'what-if-scenarios', name: 'What-If Scenarios', description: 'Test big financial decisions before committing. See how a new expense or income change affects your goals and timeline.', icon: CalculatorIcon, category: 'smart' },
  { id: 'smart-notifications', name: 'Smart Notifications', description: 'In-app notification center with bill reminders, budget alerts at 80% and 100%, and recurring transaction notices.', icon: BoltIcon, category: 'smart' },
  { id: 'auto-categorization', name: 'Auto-Categorization', description: 'AI learns your spending patterns and tags transactions automatically — food, transpo, bills, load, and more. Less typing, more accuracy over time.', icon: SparklesIcon, category: 'smart' },
  { id: 'sms-parsing', name: 'SMS & Notification Parsing', description: 'Auto-reads GCash, Maya, and bank SMS confirmations to log transactions without manual entry. The fastest way to track every peso.', icon: DevicePhoneMobileIcon, category: 'smart' },
  { id: 'kuripot-score', name: 'Kuripot Score', description: 'Your monthly spending health score — gamified. See how well you stuck to your budgets, hit savings goals, and avoided impulse buys. Share your score with friends.', icon: StarIcon, category: 'smart' },
  { id: 'spending-anomaly-alerts', name: 'Spending Anomaly Alerts', description: '"You spent 3x more on food this week vs. your average." Neemo spots unusual patterns and flags them before they become problems.', icon: ExclamationTriangleIcon, category: 'smart' },

  // AI-Powered Input
  { id: 'voice-input', name: 'Voice Input', description: 'Say "Spent 350 on Grab Food" and Neemo logs it instantly — amount, category, and date parsed automatically from natural speech.', icon: MicrophoneIcon, category: 'ai' },
  { id: 'receipt-scan', name: 'Receipt & Doc Scan', description: 'Snap a photo of any receipt, bill, or payslip. Neemo extracts totals, line items, and dates automatically — no typing needed.', icon: DocumentTextIcon, category: 'ai' },
  { id: 'ai-chat', name: 'AI Chat Assistant', description: 'Ask Neemo anything about your finances in plain language. "How much did I spend on food this month?" — get instant, conversational answers.', icon: ChatBubbleLeftRightIcon, category: 'ai' },

  // Social Features
  { id: 'shared-budgets', name: 'Shared Household Budgets', description: 'Track finances together with your partner or family. Shared categories, combined spending views, and household-level budget tracking.', icon: UserGroupIcon, category: 'social' },
  { id: 'split-expenses', name: 'Split Expenses', description: 'Split bills with friends after group outings, trips, or shared purchases — built-in, no separate app needed. Track who owes what.', icon: '✂️', category: 'social' },

  // Reports & Analytics
  { id: 'monthly-report', name: 'Monthly Reports', description: 'Detailed monthly breakdowns of income, expenses, and savings with category-level analysis.', icon: DocumentTextIcon, category: 'reports' },

  // Tools & Utilities
  { id: 'data-export', name: 'Data Export', description: 'Export your financial data to CSV or PDF anytime. Full control over your information.', icon: '📤', category: 'tools' },
  { id: 'offline-mode', name: 'Offline Mode', description: 'Full functionality without internet. All data stored locally on your device for speed and privacy.', icon: DevicePhoneMobileIcon, category: 'tools' },
  { id: 'miniapp-platform', name: 'Mini App Platform', description: 'Extend Neemo with Mini Apps including Turo (car rental tracker) and more. Sandboxed with a permissions system.', icon: Squares2X2Icon, category: 'tools' },
  { id: 'app-security', name: 'App Lock & Biometrics', description: 'Lock Neemo with a 6-digit PIN or Face ID/fingerprint. Auto-lock timeout options: immediate, 30 sec, 1 min, or 5 min.', icon: FingerPrintIcon, category: 'tools' },
  { id: 'custom-categories', name: 'Custom Categories & Tags', description: 'Create your own expense and income categories, subcategories, payees, and color-coded tags for personalized tracking.', icon: TagIcon, category: 'tools' },
  { id: 'theme-system', name: 'Theme System', description: 'Choose between Light, Dark, or System theme. Personalize the app appearance to match your preference.', icon: SparklesIcon, category: 'tools' },
  { id: 'hide-balances', name: 'Hide Balances', description: 'One-tap privacy mode to mask all monetary amounts across the entire app. Perfect for checking finances in public.', icon: EyeSlashIcon, category: 'tools' },

  // Additional Features (implemented in mobile)
  { id: 'savings-challenges', name: 'Savings Challenges', description: 'Gamified savings with the 52-Week Challenge, 50-Peso Daily Challenge, and 100-Daily Challenge. Visual progress grids to keep you motivated.', icon: StarIcon, category: 'core' },
  { id: 'transaction-templates', name: 'Transaction Templates', description: 'Save frequent transactions as templates for one-tap entry. Auto-fills amount, category, merchant, and account for your most common expenses.', icon: DocumentTextIcon, category: 'tools' },
  { id: 'credit-card-optimizer', name: 'Credit Card Optimizer', description: 'Analyzes your credit cards, calculates debt payoff priorities using the avalanche method, and shows monthly interest to help you pay off debt faster.', icon: CreditCardIcon, category: 'tools' },
  { id: 'currency-converter', name: 'Currency Converter', description: 'Multi-currency conversion with 22 supported currencies including PHP, USD, SGD, AED, and more. See exchange rates and 7-day trends at a glance.', icon: CurrencyDollarIcon, category: 'tools' },
  { id: 'loan-calculator', name: 'Loan Calculator', description: 'Full amortization calculator with quick-fill from your accounts. See monthly payment, total interest, and complete payment schedule.', icon: CalculatorIcon, category: 'tools' },
  { id: 'noche-buena', name: 'Noche Buena Planner', description: 'Plan your Christmas dinner budget and shopping list. Track 8 traditional items with purchase status so nothing gets forgotten.', icon: '🎄', category: 'filipino' },
  { id: 'accountability-partners', name: 'Accountability Partners', description: 'Link a partner to your financial goals and track check-in streaks. Stay consistent with someone who keeps you accountable.', icon: UserGroupIcon, category: 'social' },
  { id: 'lifestyle-inflation-tracker', name: 'Lifestyle Inflation Tracker', description: 'Detects month-over-month spending creep across categories. Know when your lifestyle is quietly outpacing your income.', icon: ExclamationTriangleIcon, category: 'smart' },
  { id: 'year-review', name: 'Year in Review', description: 'Annual financial summary showing total earned, total spent, savings rate, top categories, and year-over-year progress.', icon: PresentationChartLineIcon, category: 'reports' },
  { id: 'true-cost-analysis', name: 'True Cost Analysis', description: 'See the real price of any purchase — lost compound growth over 10 years, days added to your debt, and how much it delays your financial freedom.', icon: CalculatorIcon, category: 'smart' },

  // AI & Smart (new)
  { id: 'budget-suggestions', name: 'Budget Suggestions', description: 'AI recommends optimal budget amounts for each category based on your income, spending history, and financial goals.', icon: SparklesIcon, category: 'ai' },
  { id: 'expense-predictions', name: 'Expense Predictions', description: 'Predict your monthly expenses before they happen. Neemo analyzes your patterns to forecast upcoming costs so you can plan ahead.', icon: PresentationChartLineIcon, category: 'ai' },
  { id: 'savings-autopilot', name: 'Savings Autopilot', description: 'AI suggests the optimal amount to save each payday based on your cash flow, upcoming bills, and goal deadlines — so you save the most without going short.', icon: RocketLaunchIcon, category: 'ai' },
  { id: 'smart-money-tips', name: 'Smart Money Tips', description: 'Daily personalized tips based on your actual spending patterns. Not generic advice — real suggestions tailored to your financial habits.', icon: LightBulbIcon, category: 'ai' },
  { id: 'ai-coach', name: 'AI Financial Coach', description: 'Your personal financial coach that analyzes your spending, identifies areas for improvement, and gives actionable step-by-step guidance to hit your goals faster.', icon: AcademicCapIcon, category: 'ai' },

  // Gamification
  { id: 'savings-streaks', name: 'Savings Streaks', description: 'Build daily streaks by logging transactions and staying within budget. The longer your streak, the higher your Kuripot Score multiplier.', icon: FireIcon, category: 'gamification' },
  { id: 'achievement-badges', name: 'Achievement Badges', description: 'Earn badges for financial milestones — first ₱10K saved, 30-day budget streak, debt-free status, and more. Collect them all and show off your progress.', icon: TrophyIcon, category: 'gamification' },
  { id: 'community-leaderboards', name: 'Community Leaderboards', description: 'Compete with friends and the Neemo community on savings goals, Kuripot Scores, and challenge completions. See where you rank.', icon: ChartBarIcon, category: 'gamification' },
  { id: 'money-challenges', name: 'Money Challenges', description: 'Join monthly savings challenges with the community. No-Spend Weekends, ₱500 Challenge, Tipid Month — push yourself with structured goals.', icon: FlagIcon, category: 'gamification' },
  { id: 'financial-milestones', name: 'Financial Milestones', description: 'Celebrate hitting major savings milestones with confetti animations and shareable cards. First ₱100K, emergency fund complete, debt-free — every win counts.', icon: StarIcon, category: 'gamification' },
  { id: 'savings-quests', name: 'Savings Quests', description: 'Complete fun, structured quests to build better money habits. Multi-step missions like "Budget Boss" and "Debt Destroyer" guide you to financial wins.', icon: RocketLaunchIcon, category: 'gamification' },
  { id: 'level-system', name: 'Level System', description: 'Level up your financial skills from Newbie to Money Master. Earn XP for logging transactions, hitting budgets, and completing challenges.', icon: ArrowTrendingUpIcon, category: 'gamification' },
  { id: 'rewards-store', name: 'Rewards Store', description: 'Redeem earned points for premium themes, exclusive badges, and special features. Your good financial habits literally pay off.', icon: GiftIcon, category: 'gamification' },

  // Social (new)
  { id: 'couple-mode', name: 'Couple Mode', description: 'Share budgets and goals with your partner. See combined spending, split household expenses, and plan finances together in one shared view.', icon: HeartIcon, category: 'social' },
  { id: 'shared-goals', name: 'Shared Goals', description: 'Create group savings goals with friends or family. Pool contributions, track everyone\'s progress, and reach goals together — perfect for trips, gifts, or events.', icon: UserGroupIcon, category: 'social' },
  { id: 'kids-allowance', name: 'Kids Allowance', description: 'Teach kids money management by tracking their allowance, spending, and savings goals. Build financial literacy early with a simple, kid-friendly view.', icon: AcademicCapIcon, category: 'social' },
  { id: 'accountability-circles', name: 'Accountability Circles', description: 'Join small groups (5-15 people) focused on specific financial goals like debt payoff, emergency funds, or saving for a house. Stay motivated together.', icon: UserGroupIcon, category: 'social' },

  // Reports (new)
  { id: 'category-analysis', name: 'Category Analysis', description: 'Deep dive into spending by category with trends over time, percentage breakdowns, and month-over-month comparisons to spot where your money really goes.', icon: ChartBarIcon, category: 'reports' },
  { id: 'net-worth-timeline', name: 'Net Worth Timeline', description: 'Dedicated visual timeline showing how your net worth has changed over months and years. See the trend line and celebrate upward momentum.', icon: PresentationChartLineIcon, category: 'reports' },
  { id: 'tax-helper', name: 'Tax Helper', description: 'Export organized income and expense data formatted for tax filing. Categorized summaries make it easy for your accountant or for DIY filing.', icon: DocumentTextIcon, category: 'reports' },

  // Tools (new)
  { id: 'emergency-fund-calculator', name: 'Emergency Fund Calculator', description: 'Calculate your ideal emergency fund size based on monthly expenses, dependents, and job stability. Know exactly how much safety net you need.', icon: CalculatorIcon, category: 'tools' },
  { id: 'bill-calendar', name: 'Bill Calendar', description: 'Visual monthly calendar showing all upcoming bills and due dates at a glance. Color-coded by urgency so you always know what\'s coming.', icon: CalendarIcon, category: 'tools' },
  { id: 'budget-rollover', name: 'Budget Rollover', description: 'Didn\'t use your full grocery budget this month? Roll the unused amount to next month automatically. Flexible budgeting that rewards discipline.', icon: ArrowPathIcon, category: 'tools' },
  { id: 'commute-tracker', name: 'Commute Tracker', description: 'Track daily transportation expenses — jeepney, MRT, Grab, gas — and see your weekly and monthly commute costs. Find ways to save on your daily travel.', icon: MapPinIcon, category: 'tools' },
  { id: 'debt-payoff-planner', name: 'Debt Payoff Planner', description: 'Plan your debt payoff with avalanche (highest interest first) or snowball (smallest balance first) strategies. See your debt-free date and total interest saved.', icon: ScaleIcon, category: 'tools' },
  { id: 'alkansya-digital', name: 'Alkansya Digital', description: 'Digital piggy bank for micro-savings. Toss spare change from rounded-up transactions or set daily auto-save amounts. Watch your alkansya grow over time.', icon: '🐷', category: 'tools' },
  { id: 'transpo-calculator', name: 'Transpo Calculator', description: 'Calculate your daily, weekly, and monthly transportation costs. Compare routes and methods to find the most cost-effective way to get around.', icon: CalculatorIcon, category: 'tools' },
  { id: 'loan-comparison', name: 'Loan Comparison', description: 'Compare different loan options side by side — interest rates, monthly payments, total cost, and terms. Make the smartest borrowing decision.', icon: ScaleIcon, category: 'tools' },
  { id: 'draggable-dashboard', name: 'Customizable Dashboard', description: 'Drag and rearrange dashboard widgets to build your perfect home screen. Put what matters most front and center — your finances, your layout.', icon: Squares2X2Icon, category: 'tools' },
  { id: 'mp2-tracker', name: 'MP2 Tracker', description: 'Dedicated tracker for Pag-IBIG MP2 savings. Log contributions, track dividend growth, and project your MP2 balance over 5 years with current rates.', icon: '🏦', category: 'tools' },

  // Filipino Finance Essentials (new)
  { id: 'salary-net-pay', name: 'Salary Net Pay Calculator', description: 'Input your gross salary and instantly see your take-home pay after SSS, PhilHealth, Pag-IBIG, and income tax deductions. Supports monthly and semi-monthly pay periods.', icon: '💰', category: 'filipino' },
  { id: 'holiday-pay-calculator', name: 'Holiday Pay Calculator', description: 'Compute overtime, night differential, regular holiday, special holiday, and rest day pay using current DOLE rates. Know exactly what you\'re owed every holiday.', icon: '📅', category: 'filipino' },
  { id: 'digital-bank-optimizer', name: 'Digital Bank Rate Optimizer', description: 'Compare savings interest rates across Seabank, Maya, Tonik, CIMB, GCash, ING, and more. See where to park your money for the highest return.', icon: BuildingOfficeIcon, category: 'smart' },
  { id: 'tuition-planner', name: 'Tuition & Education Planner', description: 'Plan school fees, uniforms, supplies, and daily allowances for multiple children per semester. Track enrollment deadlines and payment schedules.', icon: AcademicCapIcon, category: 'filipino' },
  { id: 'side-hustle-dashboard', name: 'Side Hustle Dashboard', description: 'Track multiple income streams — online selling, freelancing, Grab driving, buy & sell — in one view. See which hustles earn the most and track expenses per hustle.', icon: BriefcaseIcon, category: 'core' },
  { id: 'investment-portfolio', name: 'Investment Portfolio Tracker', description: 'Track UITFs, mutual funds, GInvest, COL Financial, and digital bank time deposits in one dashboard. See total portfolio value and allocation breakdown.', icon: PresentationChartLineIcon, category: 'core' },
  { id: 'cooperative-tracker', name: 'Cooperative Tracker', description: 'Track your coop share capital, loan balances, and dividend payouts. Millions of Filipinos are coop members — finally a tool that tracks it all.', icon: UserGroupIcon, category: 'filipino' },
  { id: 'life-event-planner', name: 'Life Event Planner', description: 'Budget for weddings, debuts, baptisms, and graduations with detailed line items. Track RSVPs, vendor payments, and contributions in one place.', icon: '💍', category: 'filipino' },
  { id: 'domestic-padala', name: 'Domestic Padala Tracker', description: 'Track money sent to family within the Philippines via GCash, Maya, Cebuana, Palawan Express, or bank transfer. See total sent per recipient per month.', icon: '📨', category: 'filipino' },
  { id: 'tingi-tracker', name: 'Tingi Tracker', description: 'Track small daily purchases — kape, load, merienda, pamasahe — that seem tiny but add up fast. See your real daily spend and find hidden savings.', icon: '🪙', category: 'smart' },
  { id: 'balik-eskwela', name: 'Balik-Eskwela Planner', description: 'Dedicated back-to-school budget planner for June opening. Track school supplies, uniforms, enrollment fees, and baon per child.', icon: '🎒', category: 'filipino' },
  { id: 'insurance-hmo-tracker', name: 'Insurance & HMO Tracker', description: 'Track premium payments, renewal dates, and coverage details for life insurance and HMO plans. Never miss a renewal or lapse your coverage.', icon: ShieldCheckIcon, category: 'core' },
  { id: 'load-data-budget', name: 'Load & Data Budget', description: 'Track prepaid mobile load and data spending. Set a monthly load budget, see usage trends, and find the most cost-effective promos.', icon: SignalIcon, category: 'tools' },
  { id: 'freelancer-tax', name: 'Freelancer Tax Dashboard', description: 'Quarterly percentage tax computation, BIR filing reminders, and deductible expense tracking for freelancers, VAs, and independent contractors.', icon: DocumentTextIcon, category: 'filipino' },
  { id: 'utility-analyzer', name: 'Utility Bill Analyzer', description: 'Track Meralco, water, and internet bills over time. Spot trends, compare month-over-month changes, and get alerts when bills spike unexpectedly.', icon: BoltIcon, category: 'smart' },
];

const categories: { value: FeatureCategory; label: string; count: number }[] = [
  { value: 'all', label: 'All Features', count: features.length },
  { value: 'core', label: 'Core', count: features.filter(f => f.category === 'core').length },
  { value: 'filipino', label: 'Filipino', count: features.filter(f => f.category === 'filipino').length },
  { value: 'smart', label: 'Smart', count: features.filter(f => f.category === 'smart').length },
  { value: 'ai', label: 'AI-Powered', count: features.filter(f => f.category === 'ai').length },
  { value: 'gamification', label: 'Gamification', count: features.filter(f => f.category === 'gamification').length },
  { value: 'social', label: 'Social', count: features.filter(f => f.category === 'social').length },
  { value: 'reports', label: 'Reports', count: features.filter(f => f.category === 'reports').length },
  { value: 'tools', label: 'Tools', count: features.filter(f => f.category === 'tools').length },
];

const categoryColors: Record<FeatureCategory, { bg: string; icon: string }> = {
  all: { bg: 'from-gray-500 to-gray-600', icon: 'bg-gray-100 dark:bg-gray-500/20' },
  core: { bg: 'from-[#b91c4a] to-[#831530]', icon: 'bg-[#fce4e8] dark:bg-[#b91c4a]/20' },
  filipino: { bg: 'from-orange-500 to-amber-600', icon: 'bg-orange-100 dark:bg-orange-500/20' },
  smart: { bg: 'from-purple-500 to-violet-600', icon: 'bg-purple-100 dark:bg-purple-500/20' },
  ai: { bg: 'from-emerald-500 to-teal-600', icon: 'bg-emerald-100 dark:bg-emerald-500/20' },
  gamification: { bg: 'from-amber-500 to-yellow-600', icon: 'bg-amber-100 dark:bg-amber-500/20' },
  social: { bg: 'from-pink-500 to-rose-600', icon: 'bg-pink-100 dark:bg-pink-500/20' },
  reports: { bg: 'from-cyan-500 to-teal-600', icon: 'bg-cyan-100 dark:bg-cyan-500/20' },
  tools: { bg: 'from-yellow-500 to-orange-600', icon: 'bg-yellow-100 dark:bg-yellow-500/20' },
};

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = features.filter((feature) => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory;
    const searchMatch =
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-[#fdf2f4]/30 dark:from-[#2f0a18] dark:via-[#33081a] dark:to-[#2f0a18]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#d4365e]/15 dark:bg-[#f58560]/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-[#831530] dark:text-[#f58560] bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-full uppercase tracking-wider">
              <BoltIcon className="w-4 h-4" />
              {features.length}+ Features
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-[#9b1b3c] to-[#f58560] bg-clip-text text-transparent">
                Financial Freedom
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-white/70 mb-8">
              Powerful tools built specifically for Filipinos. From Paluwagan tracking to smart financial insights, we&apos;ve got you covered.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560]/50 focus:border-[#f58560]"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#f58560] text-[#2f0a18]'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  selectedCategory === cat.value
                    ? 'bg-[#2f0a18]/10'
                    : 'bg-gray-200 dark:bg-white/10'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-gray-400 dark:text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No features found</h3>
              <p className="text-gray-500 dark:text-white/50">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFeatures.map((feature, index) => {
                const colorStyle = categoryColors[feature.category];
                const IconComponent = typeof feature.icon === 'string' ? null : feature.icon;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="group p-5 bg-white dark:bg-white/[0.04] rounded-2xl border border-gray-100 dark:border-white/10 hover:border-[#f58560]/50 dark:hover:border-[#f58560]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl ${colorStyle.icon} flex items-center justify-center flex-shrink-0`}>
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 text-gray-700 dark:text-white" />
                        ) : (
                          <span className="text-xl">{feature.icon as string}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#9b1b3c] dark:group-hover:text-[#f58560] transition-colors truncate">
                            {feature.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Highlight Sections */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fdf2f4] via-[#fdf2f4]/50 to-white dark:from-[#4a0d24] dark:via-[#3d0a1e] dark:to-[#2f0a18]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/15 rounded-full uppercase tracking-wider">
                <span>🇵🇭</span>
                Made for Filipinos
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Features That{' '}
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Understand You
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70 mb-6">
                No other finance app gets the Filipino lifestyle like Neemo. We built features for the way you actually manage money.
              </p>
              <ul className="space-y-3">
                {[
                  'Paluwagan with member & round management',
                  '13th Month & Aguinaldo planning',
                  'OFW remittance tracking with multi-currency',
                  'SSS, PhilHealth & Pag-IBIG calculators',
                  'Utang manager with payment history',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560] flex-shrink-0" />
                    <span className="text-gray-700 dark:text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: '🤝', name: 'Paluwagan', desc: 'Full group management' },
                { icon: '📱', name: 'Hulugan', desc: 'Installment tracking' },
                { icon: '✈️', name: 'OFW Mode', desc: 'Remittance & rates' },
                { icon: '🏥', name: 'Gov Benefits', desc: 'SSS, PhilHealth, Pag-IBIG' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-white dark:bg-white/[0.06] rounded-2xl border border-gray-100 dark:border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-2xl mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-white/50">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 grid grid-cols-2 gap-4"
            >
              {[
                { icon: LightBulbIcon, name: 'Spending Insights', desc: 'Visual breakdowns' },
                { icon: PresentationChartLineIcon, name: 'Cash Flow Forecast', desc: '7-day projections' },
                { icon: CalculatorIcon, name: 'What-If Scenarios', desc: 'Test decisions' },
                { icon: BoltIcon, name: 'Smart Alerts', desc: 'Budget & bill alerts' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-white dark:bg-white/[0.06] rounded-2xl border border-gray-100 dark:border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-white/50">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15 rounded-full uppercase tracking-wider">
                <SparklesIcon className="w-4 h-4" />
                Smart Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Intelligence{' '}
                <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                  Built In
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-white/70 mb-6">
                Neemo automatically analyzes your finances to surface insights, forecast your cash flow, and alert you before problems happen.
              </p>
              <ul className="space-y-3">
                {[
                  'Visual spending breakdowns by category',
                  'Budget alerts at 80% and 100% thresholds',
                  '7-day cash flow forecast with status indicators',
                  'What-if scenario testing for big decisions',
                  'Smart bill and subscription reminders',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4a0d24] via-[#3d0a1e] to-[#2f0a18]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f58560]/20 rounded-2xl mb-6">
              <SparklesIcon className="w-8 h-8 text-[#f58560]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience All {features.length}+ Features?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join Filipinos who use Neemo to take control of their finances. It&apos;s 100% free!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="/contact" size="lg">
                Get Started Free
              </CTAButton>
              <CTAButton href="/how-it-works" variant="secondary" size="lg" arrow={false} className="text-white border-white/20 bg-white/10 hover:bg-white/15">
                See How It Works
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
