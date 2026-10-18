import { create } from 'zustand';
import { BudgetCategory, Subcategory, BudgetFilters, BudgetPeriod, BudgetStatus } from '@/types';
import { budgets as initialBudgets } from '@/data/dummy-data';
import { generateId, getBudgetStatus, calculatePercentage } from '@/lib/utils';

interface BudgetState {
  budgets: BudgetCategory[];
  filters: BudgetFilters;

  // Actions
  addBudget: (budget: Omit<BudgetCategory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBudget: (id: string, budget: Partial<BudgetCategory>) => void;
  deleteBudget: (id: string) => void;
  addSubcategory: (budgetId: string, subcategory: Omit<Subcategory, 'id'>) => void;
  updateSubcategory: (budgetId: string, subcategoryId: string, updates: Partial<Subcategory>) => void;
  deleteSubcategory: (budgetId: string, subcategoryId: string) => void;
  setFilters: (filters: Partial<BudgetFilters>) => void;
  resetFilters: () => void;

  // Computed
  getFilteredBudgets: () => BudgetCategory[];
  getTotalBudget: () => number;
  getTotalSpent: () => number;
  getBudgetStatus: (budget: BudgetCategory) => BudgetStatus;
  getOverBudgetCategories: () => BudgetCategory[];
}

const defaultFilters: BudgetFilters = {};

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: initialBudgets,
  filters: defaultFilters,

  addBudget: (budget) => {
    const newBudget: BudgetCategory = {
      ...budget,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      budgets: [...state.budgets, newBudget],
    }));
  },

  updateBudget: (id, updates) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
      ),
    }));
  },

  deleteBudget: (id) => {
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }));
  },

  addSubcategory: (budgetId, subcategory) => {
    const newSubcategory: Subcategory = {
      ...subcategory,
      id: generateId(),
    };
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === budgetId
          ? {
              ...b,
              subcategories: [...b.subcategories, newSubcategory],
              updatedAt: new Date().toISOString(),
            }
          : b
      ),
    }));
  },

  updateSubcategory: (budgetId, subcategoryId, updates) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === budgetId
          ? {
              ...b,
              subcategories: b.subcategories.map((s) =>
                s.id === subcategoryId ? { ...s, ...updates } : s
              ),
              updatedAt: new Date().toISOString(),
            }
          : b
      ),
    }));
  },

  deleteSubcategory: (budgetId, subcategoryId) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === budgetId
          ? {
              ...b,
              subcategories: b.subcategories.filter((s) => s.id !== subcategoryId),
              updatedAt: new Date().toISOString(),
            }
          : b
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

  getFilteredBudgets: () => {
    const { budgets, filters } = get();
    let filtered = [...budgets];

    if (filters.period && filters.period.length > 0) {
      filtered = filtered.filter((b) => filters.period!.includes(b.period));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((b) => {
        const status = getBudgetStatus(b.spentAmount, b.budgetAmount);
        return filters.status!.includes(status);
      });
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((b) => filters.category!.includes(b.name));
    }

    return filtered;
  },

  getTotalBudget: () => {
    const { budgets } = get();
    return budgets.reduce((sum, b) => sum + b.budgetAmount, 0);
  },

  getTotalSpent: () => {
    const { budgets } = get();
    return budgets.reduce((sum, b) => sum + b.spentAmount, 0);
  },

  getBudgetStatus: (budget) => {
    return getBudgetStatus(budget.spentAmount, budget.budgetAmount);
  },

  getOverBudgetCategories: () => {
    const { budgets } = get();
    return budgets.filter((b) => b.spentAmount > b.budgetAmount);
  },
}));
