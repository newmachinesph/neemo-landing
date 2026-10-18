import { create } from 'zustand';
import { Loan, LoanFilters, LoanPayment, LoanType, LoanStatus } from '@/types';
import { loans as initialLoans } from '@/data/dummy-data';
import { generateId, calculatePercentage, getMonthsRemaining } from '@/lib/utils';

interface LoanState {
  loans: Loan[];
  filters: LoanFilters;

  // Actions
  addLoan: (loan: Omit<Loan, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLoan: (id: string, loan: Partial<Loan>) => void;
  deleteLoan: (id: string) => void;
  addPayment: (loanId: string, payment: Omit<LoanPayment, 'id'>) => void;
  setFilters: (filters: Partial<LoanFilters>) => void;
  resetFilters: () => void;

  // Computed
  getFilteredLoans: () => Loan[];
  getTotalDebt: () => number;
  getTotalMonthlyPayment: () => number;
  getLoanProgress: (loan: Loan) => number;
  getActiveLoans: () => Loan[];
  getTotalInterestPaid: (loan: Loan) => number;
  getAverageInterestRate: () => number;
}

const defaultFilters: LoanFilters = {};

export const useLoanStore = create<LoanState>((set, get) => ({
  loans: initialLoans,
  filters: defaultFilters,

  addLoan: (loan) => {
    const newLoan: Loan = {
      ...loan,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      loans: [...state.loans, newLoan],
    }));
  },

  updateLoan: (id, updates) => {
    set((state) => ({
      loans: state.loans.map((l) =>
        l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
      ),
    }));
  },

  deleteLoan: (id) => {
    set((state) => ({
      loans: state.loans.filter((l) => l.id !== id),
    }));
  },

  addPayment: (loanId, payment) => {
    const newPayment: LoanPayment = {
      ...payment,
      id: generateId(),
    };
    set((state) => ({
      loans: state.loans.map((l) => {
        if (l.id !== loanId) return l;
        const newBalance = l.remainingBalance - payment.principal;
        return {
          ...l,
          payments: [...l.payments, newPayment],
          remainingBalance: Math.max(0, newBalance),
          status: newBalance <= 0 ? 'paid_off' : l.status,
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  getFilteredLoans: () => {
    const { loans, filters } = get();
    let filtered = [...loans];

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((l) => filters.type!.includes(l.type));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((l) => filters.status!.includes(l.status));
    }

    // Sort by remaining balance (highest first)
    return filtered.sort((a, b) => b.remainingBalance - a.remainingBalance);
  },

  getTotalDebt: () => {
    const { loans } = get();
    return loans
      .filter((l) => l.status === 'active')
      .reduce((sum, l) => sum + l.remainingBalance, 0);
  },

  getTotalMonthlyPayment: () => {
    const { loans } = get();
    return loans
      .filter((l) => l.status === 'active')
      .reduce((sum, l) => sum + l.monthlyPayment, 0);
  },

  getLoanProgress: (loan) => {
    const paid = loan.originalAmount - loan.remainingBalance;
    return calculatePercentage(paid, loan.originalAmount);
  },

  getActiveLoans: () => {
    const { loans } = get();
    return loans.filter((l) => l.status === 'active');
  },

  getTotalInterestPaid: (loan) => {
    return loan.payments.reduce((sum, p) => sum + p.interest, 0);
  },

  getAverageInterestRate: () => {
    const { loans } = get();
    const activeLoans = loans.filter((l) => l.status === 'active');
    if (activeLoans.length === 0) return 0;
    const totalRate = activeLoans.reduce((sum, l) => sum + l.interestRate, 0);
    return totalRate / activeLoans.length;
  },
}));
