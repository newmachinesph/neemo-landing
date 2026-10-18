import {
  Account,
  Transaction,
  BudgetCategory,
  Goal,
  Investment,
  Loan,
  Category,
  MonthlyTrend,
  SpendingByCategory,
  Bill,
  ChatMessage,
  CoachSuggestion,
  GoalAccelerationSuggestion
} from '@/types';

// ============================================
// ACCOUNTS
// ============================================
export const accounts: Account[] = [
  {
    id: 'acc-1',
    name: 'BDO Savings',
    type: 'checking',
    balance: 298125.00,
    currency: 'PHP',
    color: '#3B82F6',
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'acc-2',
    name: 'BPI Savings',
    type: 'savings',
    balance: 866250.00,
    currency: 'PHP',
    color: '#10B981',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'acc-3',
    name: 'BDO Credit Card',
    type: 'credit_card',
    balance: -128740.00,
    currency: 'PHP',
    color: '#EF4444',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'acc-4',
    name: 'Cash',
    type: 'cash',
    balance: 19250.00,
    currency: 'PHP',
    color: '#F59E0B',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'acc-5',
    name: 'COL Financial',
    type: 'investment',
    balance: 2475000.00,
    currency: 'PHP',
    color: '#8B5CF6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'acc-6',
    name: 'GCash',
    type: 'digital_wallet',
    balance: 28615.00,
    currency: 'PHP',
    color: '#06B6D4',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// CATEGORIES
// ============================================
export const expenseCategories: Category[] = [
  { id: 'cat-1', name: 'Housing', type: 'expense', icon: 'home', color: '#3B82F6', subcategories: ['Rent/Mortgage', 'Utilities', 'Insurance', 'Maintenance'] },
  { id: 'cat-2', name: 'Transportation', type: 'expense', icon: 'car', color: '#10B981', subcategories: ['Gas', 'Grab/Angkas', 'Car Payment', 'Maintenance', 'Parking'] },
  { id: 'cat-3', name: 'Food & Dining', type: 'expense', icon: 'utensils', color: '#F59E0B', subcategories: ['Groceries', 'Restaurants', 'Kape', 'Fast Food'] },
  { id: 'cat-4', name: 'Entertainment', type: 'expense', icon: 'film', color: '#EC4899', subcategories: ['Streaming', 'Movies', 'Games', 'Events', 'Hobbies'] },
  { id: 'cat-5', name: 'Shopping', type: 'expense', icon: 'shopping-bag', color: '#8B5CF6', subcategories: ['Clothing', 'Electronics', 'Home Goods', 'Personal Care'] },
  { id: 'cat-6', name: 'Healthcare', type: 'expense', icon: 'heart', color: '#EF4444', subcategories: ['Doctor', 'Pharmacy', 'Dental', 'Vision', 'PhilHealth'] },
  { id: 'cat-7', name: 'Education', type: 'expense', icon: 'book', color: '#06B6D4', subcategories: ['Tuition', 'Books', 'Courses', 'Supplies'] },
  { id: 'cat-8', name: 'Personal', type: 'expense', icon: 'user', color: '#6366F1', subcategories: ['Subscriptions', 'Gym', 'Personal Care', 'Padala'] },
];

export const incomeCategories: Category[] = [
  { id: 'cat-i1', name: 'Salary', type: 'income', icon: 'briefcase', color: '#10B981' },
  { id: 'cat-i2', name: 'Freelance', type: 'income', icon: 'laptop', color: '#3B82F6' },
  { id: 'cat-i3', name: 'Investments', type: 'income', icon: 'trending-up', color: '#8B5CF6' },
  { id: 'cat-i4', name: 'Rental Income', type: 'income', icon: 'home', color: '#F59E0B' },
  { id: 'cat-i5', name: 'Side Business', type: 'income', icon: 'store', color: '#EC4899' },
  { id: 'cat-i6', name: 'Other Income', type: 'income', icon: 'plus-circle', color: '#6366F1' },
];

// ============================================
// TRANSACTIONS
// ============================================
export const transactions: Transaction[] = [
  {
    id: 'txn-1',
    type: 'income',
    amount: 85000.00,
    description: 'Monthly Salary',
    category: 'Salary',
    accountId: 'acc-1',
    date: '2024-01-15',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'txn-2',
    type: 'expense',
    amount: 25000.00,
    description: 'Monthly Condo Rent',
    category: 'Housing',
    subcategory: 'Rent/Mortgage',
    accountId: 'acc-1',
    date: '2024-01-01',
    isRecurring: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'txn-3',
    type: 'expense',
    amount: 2500.00,
    description: 'Meralco Bill',
    category: 'Housing',
    subcategory: 'Utilities',
    accountId: 'acc-1',
    date: '2024-01-05',
    isRecurring: true,
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-05T14:00:00Z',
  },
  {
    id: 'txn-4',
    type: 'expense',
    amount: 8500.00,
    description: 'SM Supermarket Groceries',
    category: 'Food & Dining',
    subcategory: 'Groceries',
    accountId: 'acc-3',
    date: '2024-01-08',
    createdAt: '2024-01-08T16:30:00Z',
    updatedAt: '2024-01-08T16:30:00Z',
  },
  {
    id: 'txn-5',
    type: 'expense',
    amount: 3500.00,
    description: 'Petron Gas',
    category: 'Transportation',
    subcategory: 'Gas',
    accountId: 'acc-3',
    date: '2024-01-10',
    createdAt: '2024-01-10T18:00:00Z',
    updatedAt: '2024-01-10T18:00:00Z',
  },
  {
    id: 'txn-6',
    type: 'expense',
    amount: 549.00,
    description: 'Netflix Subscription',
    category: 'Entertainment',
    subcategory: 'Streaming',
    accountId: 'acc-3',
    date: '2024-01-12',
    isRecurring: true,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: 'txn-7',
    type: 'expense',
    amount: 3500.00,
    description: 'Dinner at Sambokojin',
    category: 'Food & Dining',
    subcategory: 'Restaurants',
    accountId: 'acc-3',
    date: '2024-01-13',
    createdAt: '2024-01-13T20:00:00Z',
    updatedAt: '2024-01-13T20:00:00Z',
  },
  {
    id: 'txn-8',
    type: 'income',
    amount: 25000.00,
    description: 'Freelance Project Payment',
    category: 'Freelance',
    accountId: 'acc-6',
    date: '2024-01-14',
    createdAt: '2024-01-14T11:00:00Z',
    updatedAt: '2024-01-14T11:00:00Z',
  },
  {
    id: 'txn-9',
    type: 'transfer',
    amount: 20000.00,
    description: 'Transfer to BPI Savings',
    category: 'Transfer',
    accountId: 'acc-1',
    toAccountId: 'acc-2',
    date: '2024-01-15',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 'txn-10',
    type: 'expense',
    amount: 2500.00,
    description: 'Anytime Fitness Membership',
    category: 'Personal',
    subcategory: 'Gym',
    accountId: 'acc-1',
    date: '2024-01-01',
    isRecurring: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'txn-11',
    type: 'expense',
    amount: 4500.00,
    description: 'New Running Shoes - Nike',
    category: 'Shopping',
    subcategory: 'Clothing',
    accountId: 'acc-3',
    date: '2024-01-09',
    createdAt: '2024-01-09T15:00:00Z',
    updatedAt: '2024-01-09T15:00:00Z',
  },
  {
    id: 'txn-12',
    type: 'expense',
    amount: 800.00,
    description: 'Doctor Consultation - St. Lukes',
    category: 'Healthcare',
    subcategory: 'Doctor',
    accountId: 'acc-1',
    date: '2024-01-11',
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z',
  },
];

// ============================================
// BUDGETS
// ============================================
export const budgets: BudgetCategory[] = [
  {
    id: 'bud-1',
    name: 'Housing',
    icon: 'home',
    color: '#3B82F6',
    budgetAmount: 35000,
    spentAmount: 27500,
    period: 'monthly',
    subcategories: [
      { id: 'sub-1-1', name: 'Rent/Mortgage', budgetAmount: 25000, spentAmount: 25000 },
      { id: 'sub-1-2', name: 'Utilities', budgetAmount: 5000, spentAmount: 2500 },
      { id: 'sub-1-3', name: 'Insurance', budgetAmount: 3000, spentAmount: 0 },
      { id: 'sub-1-4', name: 'Maintenance', budgetAmount: 2000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-2',
    name: 'Transportation',
    icon: 'car',
    color: '#10B981',
    budgetAmount: 10000,
    spentAmount: 3500,
    period: 'monthly',
    subcategories: [
      { id: 'sub-2-1', name: 'Gas', budgetAmount: 5000, spentAmount: 3500 },
      { id: 'sub-2-2', name: 'Grab/Angkas', budgetAmount: 3000, spentAmount: 0 },
      { id: 'sub-2-3', name: 'Maintenance', budgetAmount: 2000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-3',
    name: 'Food & Dining',
    icon: 'utensils',
    color: '#F59E0B',
    budgetAmount: 15000,
    spentAmount: 12000,
    period: 'monthly',
    subcategories: [
      { id: 'sub-3-1', name: 'Groceries', budgetAmount: 8000, spentAmount: 8500 },
      { id: 'sub-3-2', name: 'Restaurants', budgetAmount: 5000, spentAmount: 3500 },
      { id: 'sub-3-3', name: 'Kape', budgetAmount: 2000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-4',
    name: 'Entertainment',
    icon: 'film',
    color: '#EC4899',
    budgetAmount: 5000,
    spentAmount: 549,
    period: 'monthly',
    subcategories: [
      { id: 'sub-4-1', name: 'Streaming', budgetAmount: 1500, spentAmount: 549 },
      { id: 'sub-4-2', name: 'Movies', budgetAmount: 1500, spentAmount: 0 },
      { id: 'sub-4-3', name: 'Hobbies', budgetAmount: 2000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-5',
    name: 'Shopping',
    icon: 'shopping-bag',
    color: '#8B5CF6',
    budgetAmount: 8000,
    spentAmount: 4500,
    period: 'monthly',
    subcategories: [
      { id: 'sub-5-1', name: 'Clothing', budgetAmount: 4000, spentAmount: 4500 },
      { id: 'sub-5-2', name: 'Electronics', budgetAmount: 2500, spentAmount: 0 },
      { id: 'sub-5-3', name: 'Home Goods', budgetAmount: 1500, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-6',
    name: 'Healthcare',
    icon: 'heart',
    color: '#EF4444',
    budgetAmount: 5000,
    spentAmount: 800,
    period: 'monthly',
    subcategories: [
      { id: 'sub-6-1', name: 'Doctor', budgetAmount: 2500, spentAmount: 800 },
      { id: 'sub-6-2', name: 'Pharmacy', budgetAmount: 1500, spentAmount: 0 },
      { id: 'sub-6-3', name: 'Dental', budgetAmount: 1000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-7',
    name: 'Personal',
    icon: 'user',
    color: '#6366F1',
    budgetAmount: 6000,
    spentAmount: 2500,
    period: 'monthly',
    subcategories: [
      { id: 'sub-7-1', name: 'Gym', budgetAmount: 3000, spentAmount: 2500 },
      { id: 'sub-7-2', name: 'Subscriptions', budgetAmount: 1500, spentAmount: 0 },
      { id: 'sub-7-3', name: 'Personal Care', budgetAmount: 1500, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bud-8',
    name: 'Savings',
    icon: 'piggy-bank',
    color: '#06B6D4',
    budgetAmount: 30000,
    spentAmount: 20000,
    period: 'monthly',
    subcategories: [
      { id: 'sub-8-1', name: 'Emergency Fund', budgetAmount: 10000, spentAmount: 10000 },
      { id: 'sub-8-2', name: 'Retirement', budgetAmount: 10000, spentAmount: 10000 },
      { id: 'sub-8-3', name: 'Investments', budgetAmount: 10000, spentAmount: 0 },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// GOALS
// ============================================
export const goals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Emergency Fund',
    description: 'Build 6 months of living expenses as emergency fund',
    targetAmount: 500000,
    currentAmount: 350000,
    startDate: '2024-01-01',
    targetDate: '2024-12-31',
    category: 'Emergency',
    priority: 'high',
    status: 'active',
    timeframe: 'medium_term',
    color: '#EF4444',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'goal-2',
    title: 'Boracay Vacation',
    description: 'Save for 1-week trip to Boracay with family',
    targetAmount: 80000,
    currentAmount: 45000,
    startDate: '2024-01-01',
    targetDate: '2024-09-01',
    category: 'Travel',
    priority: 'medium',
    status: 'active',
    timeframe: 'short_term',
    color: '#EC4899',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'goal-3',
    title: 'New MacBook Pro',
    description: 'Save for new laptop for work',
    targetAmount: 150000,
    currentAmount: 90000,
    startDate: '2024-01-01',
    targetDate: '2024-06-01',
    category: 'Electronics',
    priority: 'medium',
    status: 'active',
    timeframe: 'short_term',
    color: '#6366F1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'goal-4',
    title: 'House Down Payment',
    description: 'Save for condo/house down payment',
    targetAmount: 2000000,
    currentAmount: 500000,
    startDate: '2024-01-01',
    targetDate: '2027-01-01',
    category: 'Housing',
    priority: 'high',
    status: 'active',
    timeframe: 'long_term',
    color: '#3B82F6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'goal-5',
    title: 'Online Course',
    description: 'Professional development course - Udemy',
    targetAmount: 5000,
    currentAmount: 5000,
    startDate: '2024-01-01',
    targetDate: '2024-03-01',
    category: 'Education',
    priority: 'low',
    status: 'completed',
    timeframe: 'short_term',
    color: '#10B981',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'goal-6',
    title: 'New Car Fund',
    description: 'Save for new vehicle purchase',
    targetAmount: 800000,
    currentAmount: 150000,
    startDate: '2024-01-01',
    targetDate: '2025-12-31',
    category: 'Vehicle',
    priority: 'low',
    status: 'paused',
    timeframe: 'long_term',
    color: '#F59E0B',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// INVESTMENTS
// ============================================
export const investments: Investment[] = [
  {
    id: 'inv-1',
    name: 'SSS & Pag-IBIG',
    type: 'retirement',
    institution: 'SSS / Pag-IBIG',
    purchaseDate: '2020-01-15',
    initialValue: 500000,
    currentValue: 850000,
    risk: 'low',
    status: 'active',
    transactions: [
      { id: 'inv-t-1', type: 'buy', amount: 500000, date: '2020-01-15' },
      { id: 'inv-t-2', type: 'buy', amount: 200000, date: '2021-01-15' },
    ],
    notes: 'Government mandated retirement funds',
    createdAt: '2020-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'inv-2',
    name: 'FMETF',
    type: 'etf',
    institution: 'COL Financial',
    purchaseDate: '2022-06-01',
    initialValue: 100000,
    currentValue: 125000,
    units: 1200,
    risk: 'medium',
    status: 'active',
    transactions: [
      { id: 'inv-t-4', type: 'buy', amount: 100000, units: 1000, date: '2022-06-01' },
      { id: 'inv-t-5', type: 'dividend', amount: 5000, date: '2023-09-15' },
    ],
    createdAt: '2022-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'inv-3',
    name: 'ACEN Corp (ACEN)',
    type: 'stock',
    institution: 'COL Financial',
    purchaseDate: '2023-01-15',
    initialValue: 150000,
    currentValue: 180000,
    units: 30000,
    risk: 'medium',
    status: 'active',
    transactions: [
      { id: 'inv-t-6', type: 'buy', amount: 150000, units: 30000, date: '2023-01-15' },
      { id: 'inv-t-7', type: 'dividend', amount: 1500, date: '2023-11-15' },
    ],
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'inv-4',
    name: 'CIMB High Yield Savings',
    type: 'savings',
    institution: 'CIMB Bank',
    purchaseDate: '2023-06-01',
    initialValue: 200000,
    currentValue: 210000,
    risk: 'low',
    status: 'active',
    transactions: [
      { id: 'inv-t-8', type: 'buy', amount: 200000, date: '2023-06-01' },
      { id: 'inv-t-9', type: 'interest', amount: 10000, date: '2024-01-01' },
    ],
    notes: '5% p.a. interest',
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'inv-5',
    name: 'Bitcoin',
    type: 'crypto',
    institution: 'Coins.ph',
    purchaseDate: '2023-03-01',
    initialValue: 100000,
    currentValue: 160000,
    units: 0.04,
    risk: 'high',
    status: 'active',
    transactions: [
      { id: 'inv-t-10', type: 'buy', amount: 100000, units: 0.04, date: '2023-03-01' },
    ],
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'inv-6',
    name: 'BDO UITF Bond Fund',
    type: 'bond',
    institution: 'BDO',
    purchaseDate: '2023-09-01',
    maturityDate: '2024-09-01',
    initialValue: 250000,
    currentValue: 265000,
    risk: 'low',
    status: 'active',
    transactions: [
      { id: 'inv-t-11', type: 'buy', amount: 250000, date: '2023-09-01' },
    ],
    notes: 'BDO UITF Bond Fund',
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// LOANS
// ============================================
export const loans: Loan[] = [
  {
    id: 'loan-1',
    name: 'SSS Salary Loan',
    type: 'personal',
    lender: 'SSS',
    originalAmount: 50000,
    remainingBalance: 32000,
    interestRate: 10,
    monthlyPayment: 2200,
    startDate: '2023-01-01',
    endDate: '2025-01-01',
    status: 'active',
    payments: [
      { id: 'pay-1', amount: 2200, principal: 1800, interest: 400, date: '2024-01-01' },
      { id: 'pay-2', amount: 2200, principal: 1820, interest: 380, date: '2023-12-01' },
    ],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'loan-2',
    name: 'Car Loan',
    type: 'auto',
    lender: 'BDO Auto Loan',
    originalAmount: 800000,
    remainingBalance: 520000,
    interestRate: 6.5,
    monthlyPayment: 18000,
    startDate: '2022-03-01',
    endDate: '2027-03-01',
    status: 'active',
    payments: [
      { id: 'pay-3', amount: 18000, principal: 15200, interest: 2800, date: '2024-01-01' },
      { id: 'pay-4', amount: 18000, principal: 15100, interest: 2900, date: '2023-12-01' },
    ],
    createdAt: '2022-03-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'loan-3',
    name: 'Pag-IBIG Housing Loan',
    type: 'mortgage',
    lender: 'Pag-IBIG',
    originalAmount: 2000000,
    remainingBalance: 1800000,
    interestRate: 5.375,
    monthlyPayment: 12500,
    startDate: '2023-06-01',
    endDate: '2043-06-01',
    status: 'active',
    payments: [
      { id: 'pay-5', amount: 12500, principal: 4400, interest: 8100, date: '2024-01-01' },
      { id: 'pay-6', amount: 12500, principal: 4380, interest: 8120, date: '2023-12-01' },
    ],
    notes: 'Pag-IBIG housing loan for condo',
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'loan-4',
    name: 'Credit Card Balance',
    type: 'credit_card',
    lender: 'BDO',
    originalAmount: 150000,
    remainingBalance: 128740,
    interestRate: 24,
    monthlyPayment: 8000,
    startDate: '2023-06-01',
    endDate: '2025-06-01',
    status: 'active',
    payments: [
      { id: 'pay-7', amount: 8000, principal: 5420, interest: 2580, date: '2024-01-01' },
    ],
    notes: 'Working to pay this off ASAP',
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// MONTHLY TRENDS (Last 6 months)
// ============================================
export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Aug 2023', income: 95000, expenses: 65000, savings: 30000 },
  { month: 'Sep 2023', income: 98000, expenses: 72000, savings: 26000 },
  { month: 'Oct 2023', income: 95000, expenses: 68000, savings: 27000 },
  { month: 'Nov 2023', income: 120000, expenses: 85000, savings: 35000 },
  { month: 'Dec 2023', income: 135000, expenses: 95000, savings: 40000 },
  { month: 'Jan 2024', income: 110000, expenses: 51349, savings: 58651 },
];

// ============================================
// SPENDING BY CATEGORY
// ============================================
export const spendingByCategory: SpendingByCategory[] = [
  { category: 'Housing', amount: 27500, percentage: 53.5, color: '#3B82F6' },
  { category: 'Food & Dining', amount: 12000, percentage: 23.4, color: '#F59E0B' },
  { category: 'Shopping', amount: 4500, percentage: 8.8, color: '#8B5CF6' },
  { category: 'Transportation', amount: 3500, percentage: 6.8, color: '#10B981' },
  { category: 'Personal', amount: 2500, percentage: 4.9, color: '#6366F1' },
  { category: 'Healthcare', amount: 800, percentage: 1.6, color: '#EF4444' },
  { category: 'Entertainment', amount: 549, percentage: 1.0, color: '#EC4899' },
];

// ============================================
// FINANCIAL SUMMARY
// ============================================
export const financialSummary = {
  totalIncome: 110000,
  totalExpenses: 51349,
  netSavings: 58651,
  totalAssets: 3715240,
  totalLiabilities: 2480740,
  netWorth: 1234500,
};

// ============================================
// FINANCIAL SCORE
// ============================================
export const financialScore = {
  score: 72,
  grade: 'B' as const,
  factors: {
    savingsRate: 85, // Excellent - saving over 50% of income
    debtToIncome: 60, // Fair - some debt to manage
    emergencyFund: 75, // Good - 4+ months of expenses
    investmentDiversity: 80, // Good - diversified portfolio
    budgetAdherence: 70, // Good - mostly staying on budget
  },
};

// ============================================
// BILLS & REMINDERS
// ============================================
export const bills: Bill[] = [
  {
    id: 'bill-1',
    name: 'Monthly Condo Rent',
    amount: 25000,
    dueDate: '2024-02-01',
    frequency: 'monthly',
    category: 'Housing',
    accountId: 'acc-1',
    autoPay: true,
    status: 'upcoming',
    reminderDays: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-2',
    name: 'Meralco Bill',
    amount: 2500,
    dueDate: '2024-01-25',
    frequency: 'monthly',
    category: 'Housing',
    accountId: 'acc-1',
    autoPay: false,
    status: 'due_soon',
    reminderDays: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-3',
    name: 'PLDT Fibr Internet',
    amount: 1899,
    dueDate: '2024-01-28',
    frequency: 'monthly',
    category: 'Housing',
    accountId: 'acc-1',
    autoPay: true,
    status: 'upcoming',
    reminderDays: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-4',
    name: 'Car Insurance - FPG',
    amount: 4500,
    dueDate: '2024-01-20',
    frequency: 'monthly',
    category: 'Transportation',
    accountId: 'acc-1',
    autoPay: true,
    status: 'paid',
    reminderDays: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'bill-5',
    name: 'Netflix',
    amount: 549,
    dueDate: '2024-02-12',
    frequency: 'monthly',
    category: 'Entertainment',
    accountId: 'acc-3',
    autoPay: true,
    status: 'upcoming',
    reminderDays: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-6',
    name: 'Anytime Fitness',
    amount: 2500,
    dueDate: '2024-02-01',
    frequency: 'monthly',
    category: 'Personal',
    accountId: 'acc-1',
    autoPay: true,
    status: 'upcoming',
    reminderDays: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-7',
    name: 'SSS Loan Payment',
    amount: 2200,
    dueDate: '2024-02-01',
    frequency: 'monthly',
    category: 'Debt',
    accountId: 'acc-1',
    autoPay: false,
    status: 'upcoming',
    reminderDays: 5,
    notes: 'SSS Salary Loan',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'bill-8',
    name: 'Car Loan Payment',
    amount: 18000,
    dueDate: '2024-01-22',
    frequency: 'monthly',
    category: 'Debt',
    accountId: 'acc-1',
    autoPay: false,
    status: 'overdue',
    reminderDays: 5,
    notes: 'BDO Auto Loan',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// ============================================
// AI COACH CHAT MESSAGES
// ============================================
export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Hey Juan! I'm your personal financial coach. I've been looking at your finances and I have some great news - you're doing really well with your savings rate this month! You've saved over 50% of your income. Amazing! Is there anything specific you'd like to work on today?",
    timestamp: '2024-01-15T09:00:00Z',
    suggestions: ['Check my spending', 'Update my goals', 'Pay a bill'],
  },
  {
    id: 'msg-2',
    role: 'user',
    content: "Thanks! I want to reach my Boracay vacation goal faster. Any tips?",
    timestamp: '2024-01-15T09:02:00Z',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: "Great question! Your Boracay vacation goal needs ₱35,000 more to reach ₱80,000. At your current savings rate, you'll hit it by August 2024. But I found a few ways to get there faster:\n\n1. **Cut streaming services** - You have 3 subscriptions totaling ₱1,500/month. Keeping just Netflix saves ₱950/month.\n\n2. **Reduce kain sa labas** - You spent ₱3,500 on restaurants last week. Cooking at home 2 more nights could save ₱2,000/month.\n\n3. **GCash GSave round-ups** - Enable automatic round-ups on purchases to add ~₱1,500/month extra.\n\nWith these changes, you could reach your goal by June instead of August! Kaya yan!",
    timestamp: '2024-01-15T09:02:30Z',
    suggestions: ['Enable round-ups', 'Review subscriptions', 'Set dining budget'],
  },
];

// ============================================
// AI COACH SUGGESTIONS
// ============================================
export const coachSuggestions: CoachSuggestion[] = [
  {
    id: 'sug-1',
    type: 'savings',
    title: 'Reduce Streaming Subscriptions',
    description: 'You have 3 active streaming services. Consider keeping just your most-used one.',
    impact: 'Save ₱950/month',
    actionText: 'Review Subscriptions',
  },
  {
    id: 'sug-2',
    type: 'budget',
    title: 'Dining Budget Alert',
    description: "You've used 80% of your dining budget with 2 weeks left in the month.",
    impact: 'Stay within ₱15,000 budget',
    actionText: 'View Budget',
  },
  {
    id: 'sug-3',
    type: 'bill',
    title: 'Upcoming Bill Due',
    description: 'Your Meralco bill of ₱2,500 is due in 3 days.',
    impact: 'Avoid late fees',
    actionText: 'Pay Now',
  },
  {
    id: 'sug-4',
    type: 'goal',
    title: 'Accelerate Emergency Fund',
    description: 'Increasing monthly contribution by ₱5,000 could complete your emergency fund 2 months earlier.',
    impact: 'Reach goal by October',
    actionText: 'Adjust Goal',
  },
  {
    id: 'sug-5',
    type: 'savings',
    title: 'High Interest Alert',
    description: 'Your credit card has 24% APR. Paying ₱2,000 more monthly saves ₱8,000 in interest.',
    impact: 'Save ₱8,000/year',
    actionText: 'Adjust Payment',
  },
  {
    id: 'sug-6',
    type: 'general',
    title: 'Great Savings Rate!',
    description: "You saved 53% of your income this month. That's above the recommended 20%! Amazing!",
    impact: 'Keep it up!',
  },
];

// ============================================
// GOAL ACCELERATION SUGGESTIONS
// ============================================
export const goalAccelerationSuggestions: Record<string, GoalAccelerationSuggestion[]> = {
  'goal-1': [ // Emergency Fund
    {
      id: 'accel-1-1',
      title: 'Increase Monthly Transfer',
      description: 'Boost your automatic transfer from ₱10,000 to ₱15,000/month',
      potentialSavings: 5000,
      timeReduction: '2 months earlier',
    },
    {
      id: 'accel-1-2',
      title: 'Redirect Dining Savings',
      description: 'Cooking at home 3 more nights per week',
      potentialSavings: 4000,
      timeReduction: '1.5 months earlier',
    },
  ],
  'goal-2': [ // Boracay Vacation
    {
      id: 'accel-2-1',
      title: 'Cancel Unused Subscriptions',
      description: 'You have 2 subscriptions you rarely use',
      potentialSavings: 950,
      timeReduction: '2 weeks earlier',
    },
    {
      id: 'accel-2-2',
      title: 'Enable GCash GSave Round-Ups',
      description: 'Automatically save spare change from purchases',
      potentialSavings: 1500,
      timeReduction: '1 month earlier',
    },
    {
      id: 'accel-2-3',
      title: 'Side Gig Income',
      description: 'Dedicate freelance earnings to this goal',
      potentialSavings: 10000,
      timeReduction: '2 months earlier',
    },
  ],
  'goal-3': [ // MacBook Pro
    {
      id: 'accel-3-1',
      title: 'Sell Old Electronics',
      description: 'Your old laptop could fetch ~₱15,000 on Carousell',
      potentialSavings: 15000,
      timeReduction: '1 month earlier',
    },
    {
      id: 'accel-3-2',
      title: 'Wait for Sale',
      description: 'Apple Back to School promo could save ₱10,000',
      potentialSavings: 10000,
      timeReduction: 'Reduce target by ₱10,000',
    },
  ],
  'goal-4': [ // House Down Payment
    {
      id: 'accel-4-1',
      title: 'Maximize Pag-IBIG MP2',
      description: 'Higher dividends than regular savings',
      potentialSavings: 8000,
      timeReduction: '3 months earlier',
    },
    {
      id: 'accel-4-2',
      title: 'Refinance Car Loan',
      description: 'Could reduce monthly payment by ₱2,000',
      potentialSavings: 2000,
      timeReduction: '2 months earlier',
    },
    {
      id: 'accel-4-3',
      title: '13th Month Allocation',
      description: 'Allocate 50% of 13th month to down payment',
      potentialSavings: 42500,
      timeReduction: '4 months earlier',
    },
  ],
};

// ============================================
// SAVINGS STREAKS DATA
// ============================================
export const savingsStreakData = {
  currentStreak: 12,
  longestStreak: 28,
  totalSaved: 45000,
  streakDays: [
    { date: '2024-01-09', saved: true, amount: 500 },
    { date: '2024-01-10', saved: true, amount: 750 },
    { date: '2024-01-11', saved: true, amount: 500 },
    { date: '2024-01-12', saved: true, amount: 1000 },
    { date: '2024-01-13', saved: true, amount: 500 },
    { date: '2024-01-14', saved: true, amount: 800 },
    { date: '2024-01-15', saved: false },
  ],
};

// ============================================
// MONTHLY CHALLENGES DATA
// ============================================
export const monthlyChallenges = [
  {
    id: 'challenge-1',
    name: 'No Spend Week',
    description: 'Avoid unnecessary purchases for 7 days',
    type: 'no_spend' as const,
    icon: '🚫',
    difficulty: 'medium' as const,
    duration: 7,
    startDate: '2024-01-08',
    endDate: '2024-01-15',
    progress: { current: 5, target: 7, unit: 'days' },
    reward: '₱500 saved badge',
    isCompleted: false,
    isJoined: true,
  },
  {
    id: 'challenge-2',
    name: 'Pack Lunch Challenge',
    description: 'Bring baon to work for 5 days',
    type: 'habit' as const,
    icon: '🍱',
    difficulty: 'easy' as const,
    duration: 5,
    startDate: '2024-01-10',
    endDate: '2024-01-15',
    progress: { current: 5, target: 5, unit: 'days' },
    reward: 'Baon Master badge',
    isCompleted: true,
    isJoined: true,
  },
  {
    id: 'challenge-3',
    name: 'Coffee-Free Week',
    description: 'Skip the coffee shop for 7 days',
    type: 'no_spend' as const,
    icon: '☕',
    difficulty: 'easy' as const,
    duration: 7,
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    progress: { current: 0, target: 7, unit: 'days' },
    reward: 'Self-Control badge',
    isCompleted: false,
    isJoined: false,
  },
  {
    id: 'challenge-4',
    name: 'Budget Perfect Month',
    description: 'Stay under budget in all categories',
    type: 'budget' as const,
    icon: '🎯',
    difficulty: 'hard' as const,
    duration: 30,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: { current: 6, target: 8, unit: 'categories' },
    reward: 'Budget Ninja badge',
    isCompleted: false,
    isJoined: true,
  },
];

// ============================================
// SPENDING INSIGHTS DATA
// ============================================
export const spendingInsights = [
  {
    id: '1',
    type: 'increase' as const,
    category: 'Food & Dining',
    title: 'You spent 30% more on food this month',
    description: 'Your food expenses increased from ₱8,500 to ₱11,050. Consider meal prepping to save money.',
    change: 30,
    amount: 11050,
    icon: '🍔',
  },
  {
    id: '2',
    type: 'decrease' as const,
    category: 'Transportation',
    title: 'Great job on transportation savings!',
    description: 'You reduced transport costs by 15% this month by using public transit more.',
    change: -15,
    amount: 2500,
    icon: '🚌',
  },
  {
    id: '3',
    type: 'warning' as const,
    category: 'Entertainment',
    title: 'Entertainment budget at 85%',
    description: "You've used most of your entertainment budget with 10 days left in the month.",
    icon: '🎬',
  },
  {
    id: '4',
    type: 'achievement' as const,
    category: 'Savings',
    title: 'Savings goal on track!',
    description: "You're on pace to hit your monthly savings target. Keep it up!",
    icon: '🎯',
  },
  {
    id: '5',
    type: 'tip' as const,
    category: 'Utilities',
    title: 'Tip: Bundle your subscriptions',
    description: 'You have 5 separate streaming services. Bundling could save you ₱500/month.',
    amount: 500,
    icon: '💡',
  },
];

// ============================================
// ACHIEVEMENT BADGES DATA
// ============================================
export const achievementBadges = [
  {
    id: 'badge-1',
    name: 'First Save',
    description: 'Made your first savings deposit',
    icon: '🌱',
    category: 'savings' as const,
    rarity: 'common' as const,
    earnedAt: '2024-01-02',
    isEarned: true,
  },
  {
    id: 'badge-2',
    name: 'Budget Master',
    description: 'Stayed under budget for 3 consecutive months',
    icon: '💰',
    category: 'budgeting' as const,
    rarity: 'rare' as const,
    earnedAt: '2024-01-10',
    isEarned: true,
  },
  {
    id: 'badge-3',
    name: 'Week Warrior',
    description: 'Maintained a 7-day savings streak',
    icon: '🔥',
    category: 'streaks' as const,
    rarity: 'uncommon' as const,
    earnedAt: '2024-01-08',
    isEarned: true,
  },
  {
    id: 'badge-4',
    name: 'Debt Destroyer',
    description: 'Paid off a loan completely',
    icon: '⚔️',
    category: 'debt' as const,
    rarity: 'epic' as const,
    isEarned: false,
    progress: 65,
  },
  {
    id: 'badge-5',
    name: 'Investment Pioneer',
    description: 'Made your first investment',
    icon: '📈',
    category: 'investing' as const,
    rarity: 'uncommon' as const,
    earnedAt: '2023-06-15',
    isEarned: true,
  },
  {
    id: 'badge-6',
    name: 'Goal Crusher',
    description: 'Completed 5 financial goals',
    icon: '🎯',
    category: 'goals' as const,
    rarity: 'legendary' as const,
    isEarned: false,
    progress: 20,
  },
];

// ============================================
// FINANCIAL MILESTONES DATA
// ============================================
export const financialMilestones = [
  {
    id: 'milestone-1',
    type: 'net_worth' as const,
    title: 'First ₱100,000',
    description: 'Reached ₱100,000 net worth',
    targetAmount: 100000,
    achievedAt: '2023-03-15',
    icon: '🎉',
    isAchieved: true,
  },
  {
    id: 'milestone-2',
    type: 'net_worth' as const,
    title: 'Half Million',
    description: 'Reached ₱500,000 net worth',
    targetAmount: 500000,
    achievedAt: '2023-09-20',
    icon: '🏆',
    isAchieved: true,
  },
  {
    id: 'milestone-3',
    type: 'net_worth' as const,
    title: 'Millionaire',
    description: 'Reached ₱1,000,000 net worth',
    targetAmount: 1000000,
    achievedAt: '2024-01-05',
    icon: '👑',
    isAchieved: true,
  },
  {
    id: 'milestone-4',
    type: 'net_worth' as const,
    title: 'Double Million',
    description: 'Reach ₱2,000,000 net worth',
    targetAmount: 2000000,
    icon: '💎',
    isAchieved: false,
    currentAmount: 1234500,
  },
  {
    id: 'milestone-5',
    type: 'debt_free' as const,
    title: 'Credit Card Free',
    description: 'Pay off all credit card debt',
    icon: '🎊',
    isAchieved: false,
    currentAmount: 128740,
    targetAmount: 0,
  },
];

// ============================================
// NET WORTH TIMELINE DATA
// ============================================
export const netWorthTimeline = [
  { date: '2023-01-01', assets: 1500000, liabilities: 1800000, netWorth: -300000 },
  { date: '2023-02-01', assets: 1600000, liabilities: 1780000, netWorth: -180000 },
  { date: '2023-03-01', assets: 1750000, liabilities: 1750000, netWorth: 0 },
  { date: '2023-04-01', assets: 1850000, liabilities: 1720000, netWorth: 130000 },
  { date: '2023-05-01', assets: 1950000, liabilities: 1700000, netWorth: 250000 },
  { date: '2023-06-01', assets: 2100000, liabilities: 1680000, netWorth: 420000 },
  { date: '2023-07-01', assets: 2200000, liabilities: 1650000, netWorth: 550000 },
  { date: '2023-08-01', assets: 2350000, liabilities: 1620000, netWorth: 730000 },
  { date: '2023-09-01', assets: 2500000, liabilities: 1600000, netWorth: 900000 },
  { date: '2023-10-01', assets: 2650000, liabilities: 1580000, netWorth: 1070000 },
  { date: '2023-11-01', assets: 2800000, liabilities: 1560000, netWorth: 1240000 },
  { date: '2023-12-01', assets: 2950000, liabilities: 1540000, netWorth: 1410000 },
  { date: '2024-01-01', assets: 3715240, liabilities: 2480740, netWorth: 1234500 },
];

export const assetBreakdown = [
  { category: 'Investments', icon: '📈', amount: 2475000, change: 12.5 },
  { category: 'Savings', icon: '🏦', amount: 866250, change: 5.2 },
  { category: 'Checking', icon: '💳', amount: 298125, change: -2.1 },
  { category: 'Cash & E-Wallets', icon: '💵', amount: 47865, change: 8.3 },
];

export const liabilityBreakdown = [
  { category: 'Housing Loan', icon: '🏠', amount: 1800000, change: -1.2 },
  { category: 'Car Loan', icon: '🚗', amount: 520000, change: -3.5 },
  { category: 'Credit Card', icon: '💳', amount: 128740, change: 2.1 },
  { category: 'SSS Loan', icon: '📄', amount: 32000, change: -5.8 },
];

// ============================================
// HULUGAN (INSTALLMENT) DATA
// ============================================
export const huluganItems = [
  {
    id: 'hulugan-1',
    itemName: 'iPhone 15 Pro Max',
    store: 'Home Credit',
    totalAmount: 72990,
    paidAmount: 36495,
    monthlyPayment: 3041,
    dueDate: 15,
    startDate: '2023-07-15',
    endDate: '2025-07-15',
    remainingMonths: 18,
    status: 'active' as const,
    category: 'electronics' as const,
  },
  {
    id: 'hulugan-2',
    itemName: 'Samsung Ref',
    store: 'SM Appliance',
    totalAmount: 35000,
    paidAmount: 28000,
    monthlyPayment: 1750,
    dueDate: 20,
    startDate: '2023-03-20',
    endDate: '2024-09-20',
    remainingMonths: 8,
    status: 'active' as const,
    category: 'appliances' as const,
  },
  {
    id: 'hulugan-3',
    itemName: 'Laptop - ASUS ROG',
    store: 'PC Express',
    totalAmount: 89990,
    paidAmount: 89990,
    monthlyPayment: 3750,
    dueDate: 5,
    startDate: '2022-01-05',
    endDate: '2024-01-05',
    remainingMonths: 0,
    status: 'completed' as const,
    category: 'electronics' as const,
  },
];

// ============================================
// FIESTA PLANNER DATA
// ============================================
export const fiestaEvents = [
  {
    id: 'fiesta-1',
    name: 'Birthday Party - Mama',
    eventDate: '2024-02-14',
    venue: 'Home',
    expectedGuests: 30,
    budget: 25000,
    spent: 8500,
    items: [
      { id: 'item-1', name: 'Lechon (15kg)', amount: 7500, isPaid: true, category: 'food' as const },
      { id: 'item-2', name: 'Pancit & Lumpia', amount: 3500, isPaid: false, category: 'food' as const },
      { id: 'item-3', name: 'Birthday Cake', amount: 2500, isPaid: false, category: 'food' as const },
      { id: 'item-4', name: 'Drinks & Ice', amount: 2000, isPaid: false, category: 'beverages' as const },
      { id: 'item-5', name: 'Decorations', amount: 1500, isPaid: true, category: 'decorations' as const },
      { id: 'item-6', name: 'Giveaways', amount: 3000, isPaid: false, category: 'others' as const },
    ],
    notes: 'Mama\'s 60th birthday celebration',
  },
  {
    id: 'fiesta-2',
    name: 'Barangay Fiesta',
    eventDate: '2024-05-15',
    venue: 'Barangay Hall',
    expectedGuests: 50,
    budget: 15000,
    spent: 0,
    items: [
      { id: 'item-7', name: 'Contribution to barangay', amount: 5000, isPaid: false, category: 'others' as const },
      { id: 'item-8', name: 'Family gathering food', amount: 8000, isPaid: false, category: 'food' as const },
      { id: 'item-9', name: 'Drinks', amount: 2000, isPaid: false, category: 'beverages' as const },
    ],
    notes: 'Annual barangay fiesta',
  },
];

// ============================================
// AGUINALDO TRACKER DATA
// ============================================
export const aguinaldoData = {
  year: 2023,
  totalReceived: 35000,
  totalGiven: 12500,
  recipients: [
    { id: 'ag-1', name: 'Lola Carmen', relationship: 'grandmother', amount: 3000, type: 'given' as const },
    { id: 'ag-2', name: 'Ninong Rico', relationship: 'godparent', amount: 5000, type: 'received' as const },
    { id: 'ag-3', name: 'Ate Jenny', relationship: 'sister', amount: 2000, type: 'given' as const },
    { id: 'ag-4', name: 'Tito Boy', relationship: 'uncle', amount: 3000, type: 'received' as const },
    { id: 'ag-5', name: 'Kuya Mark', relationship: 'brother', amount: 2500, type: 'given' as const },
    { id: 'ag-6', name: 'Company Bonus', relationship: 'employer', amount: 15000, type: 'received' as const },
    { id: 'ag-7', name: 'Nephews/Nieces', relationship: 'family', amount: 5000, type: 'given' as const },
    { id: 'ag-8', name: 'Ninang Ditas', relationship: 'godparent', amount: 2000, type: 'received' as const },
    { id: 'ag-9', name: 'Lolo Pedro', relationship: 'grandfather', amount: 10000, type: 'received' as const },
  ],
};

// ============================================
// EMERGENCY FUND CALCULATOR DATA
// ============================================
export const emergencyFundConfig = {
  monthlyExpenses: 51349,
  targetMonths: 6,
  currentFund: 350000,
  city: 'Metro Manila',
};
