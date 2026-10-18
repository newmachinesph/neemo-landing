import { create } from 'zustand';
import { Investment, InvestmentFilters, InvestmentTransaction, InvestmentType, RiskLevel } from '@/types';
import { investments as initialInvestments } from '@/data/dummy-data';
import { generateId, calculatePercentage } from '@/lib/utils';

interface InvestmentState {
  investments: Investment[];
  filters: InvestmentFilters;
  sortBy: 'name' | 'value' | 'return' | 'date';
  sortOrder: 'asc' | 'desc';

  // Actions
  addInvestment: (investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInvestment: (id: string, investment: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
  addTransaction: (investmentId: string, transaction: Omit<InvestmentTransaction, 'id'>) => void;
  setFilters: (filters: Partial<InvestmentFilters>) => void;
  resetFilters: () => void;
  setSorting: (sortBy: 'name' | 'value' | 'return' | 'date', sortOrder?: 'asc' | 'desc') => void;

  // Computed
  getFilteredInvestments: () => Investment[];
  getTotalInvested: () => number;
  getTotalCurrentValue: () => number;
  getTotalReturn: () => number;
  getTotalReturnPercentage: () => number;
  getInvestmentsByType: () => Record<InvestmentType, number>;
  getInvestmentsByRisk: () => Record<RiskLevel, number>;
}

const defaultFilters: InvestmentFilters = {};

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  investments: initialInvestments,
  filters: defaultFilters,
  sortBy: 'value',
  sortOrder: 'desc',

  addInvestment: (investment) => {
    const newInvestment: Investment = {
      ...investment,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      investments: [...state.investments, newInvestment],
    }));
  },

  updateInvestment: (id, updates) => {
    set((state) => ({
      investments: state.investments.map((i) =>
        i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
      ),
    }));
  },

  deleteInvestment: (id) => {
    set((state) => ({
      investments: state.investments.filter((i) => i.id !== id),
    }));
  },

  addTransaction: (investmentId, transaction) => {
    const newTransaction: InvestmentTransaction = {
      ...transaction,
      id: generateId(),
    };
    set((state) => ({
      investments: state.investments.map((i) =>
        i.id === investmentId
          ? {
              ...i,
              transactions: [...i.transactions, newTransaction],
              updatedAt: new Date().toISOString(),
            }
          : i
      ),
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

  setSorting: (sortBy, sortOrder) => {
    set((state) => ({
      sortBy,
      sortOrder: sortOrder || (state.sortBy === sortBy ? (state.sortOrder === 'asc' ? 'desc' : 'asc') : 'desc'),
    }));
  },

  getFilteredInvestments: () => {
    const { investments, filters, sortBy, sortOrder } = get();
    let filtered = [...investments];

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((i) => filters.type!.includes(i.type));
    }

    if (filters.risk && filters.risk.length > 0) {
      filtered = filtered.filter((i) => filters.risk!.includes(i.risk));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((i) => filters.status!.includes(i.status));
    }

    if (filters.performance) {
      if (filters.performance === 'positive') {
        filtered = filtered.filter((i) => i.currentValue > i.initialValue);
      } else if (filters.performance === 'negative') {
        filtered = filtered.filter((i) => i.currentValue < i.initialValue);
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'value':
          comparison = a.currentValue - b.currentValue;
          break;
        case 'return':
          const returnA = a.currentValue - a.initialValue;
          const returnB = b.currentValue - b.initialValue;
          comparison = returnA - returnB;
          break;
        case 'date':
          comparison = new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  },

  getTotalInvested: () => {
    const { investments } = get();
    return investments
      .filter((i) => i.status === 'active')
      .reduce((sum, i) => sum + i.initialValue, 0);
  },

  getTotalCurrentValue: () => {
    const { investments } = get();
    return investments
      .filter((i) => i.status === 'active')
      .reduce((sum, i) => sum + i.currentValue, 0);
  },

  getTotalReturn: () => {
    const state = get();
    return state.getTotalCurrentValue() - state.getTotalInvested();
  },

  getTotalReturnPercentage: () => {
    const state = get();
    const invested = state.getTotalInvested();
    if (invested === 0) return 0;
    return ((state.getTotalCurrentValue() - invested) / invested) * 100;
  },

  getInvestmentsByType: () => {
    const { investments } = get();
    return investments
      .filter((i) => i.status === 'active')
      .reduce((acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + i.currentValue;
        return acc;
      }, {} as Record<InvestmentType, number>);
  },

  getInvestmentsByRisk: () => {
    const { investments } = get();
    return investments
      .filter((i) => i.status === 'active')
      .reduce((acc, i) => {
        acc[i.risk] = (acc[i.risk] || 0) + i.currentValue;
        return acc;
      }, {} as Record<RiskLevel, number>);
  },
}));
