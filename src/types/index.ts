// ============================================
// FINTR - Personal Finance Tracker Types
// ============================================

// Account Types
export type AccountType = 'checking' | 'savings' | 'credit_card' | 'cash' | 'investment' | 'digital_wallet';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  icon?: string;
  color?: string;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Transaction Types
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  subcategory?: string;
  accountId: string;
  toAccountId?: string; // For transfers
  date: string;
  notes?: string;
  isRecurring?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Budget Types
export type BudgetPeriod = 'monthly' | 'quarterly' | 'annual';
export type BudgetStatus = 'on_track' | 'warning' | 'over_budget' | 'under_budget';

export interface Subcategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon?: string;
  color: string;
  budgetAmount: number;
  spentAmount: number;
  period: BudgetPeriod;
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
}

// Goal Types
export type GoalPriority = 'high' | 'medium' | 'low';
export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled';
export type GoalTimeframe = 'short_term' | 'medium_term' | 'long_term';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  targetDate: string;
  category: string;
  priority: GoalPriority;
  status: GoalStatus;
  timeframe: GoalTimeframe;
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

// Investment Types
export type InvestmentType = 'stock' | 'mutual_fund' | 'etf' | 'bond' | 'crypto' | 'real_estate' | 'savings' | 'retirement' | 'other';
export type RiskLevel = 'low' | 'medium' | 'high';
export type InvestmentStatus = 'active' | 'sold' | 'matured';

export interface InvestmentTransaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'interest';
  amount: number;
  units?: number;
  date: string;
  notes?: string;
}

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  institution?: string;
  purchaseDate: string;
  maturityDate?: string;
  initialValue: number;
  currentValue: number;
  units?: number;
  risk: RiskLevel;
  status: InvestmentStatus;
  transactions: InvestmentTransaction[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Loan Types
export type LoanType = 'personal' | 'mortgage' | 'auto' | 'student' | 'credit_card' | 'business' | 'other';
export type LoanStatus = 'active' | 'paid_off' | 'defaulted';

export interface LoanPayment {
  id: string;
  amount: number;
  principal: number;
  interest: number;
  date: string;
  notes?: string;
}

export interface Loan {
  id: string;
  name: string;
  type: LoanType;
  lender: string;
  originalAmount: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  payments: LoanPayment[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'goal' | 'investment';
  icon?: string;
  color?: string;
  subcategories?: string[];
}

// Settings Types
export interface CurrencySettings {
  code: string;
  symbol: string;
  position: 'before' | 'after';
  decimalSeparator: string;
  thousandSeparator: string;
  decimals: number;
}

export interface AppSettings {
  currency: CurrencySettings;
  dateFormat: string;
  startOfWeek: 'sunday' | 'monday';
  defaultAccountId?: string;
  theme: 'light' | 'dark' | 'system';
}

// Dashboard/Insights Types
export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface FinancialScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  factors: {
    savingsRate: number;
    debtToIncome: number;
    emergencyFund: number;
    investmentDiversity: number;
    budgetAdherence: number;
  };
}

// Filter Types
export interface DateRange {
  start: string;
  end: string;
}

export interface TransactionFilters {
  type?: TransactionType[];
  category?: string[];
  accountId?: string[];
  dateRange?: DateRange;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

export interface BudgetFilters {
  period?: BudgetPeriod[];
  status?: BudgetStatus[];
  category?: string[];
}

export interface GoalFilters {
  status?: GoalStatus[];
  priority?: GoalPriority[];
  timeframe?: GoalTimeframe[];
  category?: string[];
}

export interface InvestmentFilters {
  type?: InvestmentType[];
  risk?: RiskLevel[];
  status?: InvestmentStatus[];
  performance?: 'positive' | 'negative' | 'all';
}

export interface LoanFilters {
  type?: LoanType[];
  status?: LoanStatus[];
}

// ============================================
// AI Coach Types
// ============================================
export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface CoachSuggestion {
  id: string;
  type: 'savings' | 'budget' | 'goal' | 'bill' | 'general';
  title: string;
  description: string;
  impact?: string;
  actionText?: string;
}

// ============================================
// Bill Reminder Types
// ============================================
export type BillFrequency = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annual';
export type BillStatus = 'upcoming' | 'due_soon' | 'overdue' | 'paid';

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  frequency: BillFrequency;
  category: string;
  accountId?: string;
  autoPay: boolean;
  status: BillStatus;
  reminderDays: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Goal Timeline Types
// ============================================
export interface GoalTimeline {
  goalId: string;
  estimatedCompletionDate: string;
  monthsRemaining: number;
  requiredMonthlySavings: number;
  currentMonthlySavings: number;
  onTrack: boolean;
  suggestions: GoalAccelerationSuggestion[];
}

export interface GoalAccelerationSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  timeReduction: string;
}

// ============================================
// Recurring Transaction Types
// ============================================
export type RecurringFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually';

export interface RecurringTransaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: string;
  subcategory?: string;
  accountId: string;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  nextDueDate: string;
  lastProcessedDate?: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Budget Alert Types
// ============================================
export type AlertType = 'budget_warning' | 'budget_exceeded' | 'bill_due' | 'bill_overdue' | 'goal_milestone' | 'savings_tip';
export type AlertPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  relatedId?: string;
  isRead: boolean;
  isDismissed: boolean;
  createdAt: string;
  expiresAt?: string;
}

// ============================================
// Expense Splitting Types
// ============================================
export interface SplitParticipant {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface SplitItem {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // participant id
  splitBetween: { participantId: string; amount: number; isPaid: boolean }[];
}

export interface ExpenseSplit {
  id: string;
  title: string;
  description?: string;
  totalAmount: number;
  date: string;
  category: string;
  participants: SplitParticipant[];
  items: SplitItem[];
  isSettled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Debt Payoff Planner Types
// ============================================
export type PayoffStrategy = 'avalanche' | 'snowball';

export interface DebtPayoffPlan {
  strategy: PayoffStrategy;
  extraMonthlyPayment: number;
  totalDebt: number;
  totalInterestSaved: number;
  payoffDate: string;
  monthsToPayoff: number;
  schedule: DebtPayoffScheduleItem[];
}

export interface DebtPayoffScheduleItem {
  loanId: string;
  loanName: string;
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  isPaidOff: boolean;
}

// ============================================
// Paluwagan (Filipino Rotating Savings) Types
// ============================================
export type PaluwaganStatus = 'active' | 'completed' | 'cancelled';

export interface PaluwaganMember {
  id: string;
  name: string;
  phone?: string;
  slotNumber: number;
  hasPaid: boolean[];
  hasReceived: boolean;
  receiveDate?: string;
}

export interface Paluwagan {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  totalSlots: number;
  currentRound: number;
  startDate: string;
  members: PaluwaganMember[];
  status: PaluwaganStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Padala/Remittance Types
// ============================================
export type RemittanceStatus = 'pending' | 'sent' | 'received' | 'failed';

export interface Recipient {
  id: string;
  name: string;
  relationship: string;
  phone?: string;
  email?: string;
  address?: string;
  bankAccount?: string;
  preferredChannel?: string;
}

export interface Remittance {
  id: string;
  recipientId: string;
  amount: number;
  currency: string;
  convertedAmount?: number;
  convertedCurrency?: string;
  exchangeRate?: number;
  fee: number;
  channel: string;
  referenceNumber?: string;
  status: RemittanceStatus;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 13th Month Pay Types
// ============================================
export interface ThirteenthMonthPay {
  year: number;
  monthlySalary: number;
  monthsWorked: number;
  calculatedAmount: number;
  setAsidePerMonth: number;
  totalSetAside: number;
  expectedDate: string;
  isReceived: boolean;
}

// ============================================
// Government Contributions Types (SSS, Pag-IBIG, PhilHealth)
// ============================================
export type ContributionType = 'sss' | 'pagibig' | 'philhealth';

export interface GovernmentContribution {
  id: string;
  type: ContributionType;
  employeeShare: number;
  employerShare: number;
  totalContribution: number;
  month: string;
  isPaid: boolean;
  referenceNumber?: string;
  createdAt: string;
}

export interface GovernmentBenefits {
  sss: {
    totalContributions: number;
    monthsContributed: number;
    estimatedPension?: number;
    loanEligibility?: number;
  };
  pagibig: {
    totalSavings: number;
    monthsContributed: number;
    loanEligibility?: number;
    mp2Savings?: number;
  };
  philhealth: {
    totalContributions: number;
    monthsContributed: number;
    membershipStatus: 'active' | 'inactive';
  };
}

// ============================================
// Multi-Currency Types
// ============================================
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: string;
}

export interface MultiCurrencyAccount {
  accountId: string;
  currency: string;
  balance: number;
}

// ============================================
// Theme Types
// ============================================
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeSettings {
  theme: Theme;
  accentColor?: string;
}
