import { create } from 'zustand';
import { Transaction, TransactionFilters, TransactionType } from '@/types';
import { transactions as initialTransactions } from '@/data/dummy-data';
import { generateId } from '@/lib/utils';

interface TransactionState {
  transactions: Transaction[];
  filters: TransactionFilters;

  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;

  // Computed
  getFilteredTransactions: () => Transaction[];
  getTotalByType: (type: TransactionType) => number;
  getTransactionsByCategory: () => Record<string, number>;
}

const defaultFilters: TransactionFilters = {};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: initialTransactions,
  filters: defaultFilters,

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },

  updateTransaction: (id, updates) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      ),
    }));
  },

  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
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

  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    let filtered = [...transactions];

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((t) => filters.type!.includes(t.type));
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((t) => filters.category!.includes(t.category));
    }

    if (filters.accountId && filters.accountId.length > 0) {
      filtered = filtered.filter((t) => filters.accountId!.includes(t.accountId));
    }

    if (filters.dateRange) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter((t) => {
        const date = new Date(t.date);
        return date >= start && date <= end;
      });
    }

    if (filters.minAmount !== undefined) {
      filtered = filtered.filter((t) => t.amount >= filters.minAmount!);
    }

    if (filters.maxAmount !== undefined) {
      filtered = filtered.filter((t) => t.amount <= filters.maxAmount!);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term) ||
          (t.notes && t.notes.toLowerCase().includes(term))
      );
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getTotalByType: (type) => {
    const { transactions } = get();
    return transactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTransactionsByCategory: () => {
    const { transactions } = get();
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
  },
}));
