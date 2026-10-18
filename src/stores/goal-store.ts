import { create } from 'zustand';
import { Goal, GoalFilters, GoalPriority, GoalStatus, GoalTimeframe } from '@/types';
import { goals as initialGoals } from '@/data/dummy-data';
import { generateId, calculatePercentage, getDaysRemaining } from '@/lib/utils';

interface GoalState {
  goals: Goal[];
  filters: GoalFilters;

  // Actions
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  contributeToGoal: (id: string, amount: number) => void;
  setFilters: (filters: Partial<GoalFilters>) => void;
  resetFilters: () => void;

  // Computed
  getFilteredGoals: () => Goal[];
  getGoalProgress: (goal: Goal) => number;
  getActiveGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  getTotalSaved: () => number;
  getTotalTarget: () => number;
}

const defaultFilters: GoalFilters = {};

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: initialGoals,
  filters: defaultFilters,

  addGoal: (goal) => {
    const newGoal: Goal = {
      ...goal,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      goals: [...state.goals, newGoal],
    }));
  },

  updateGoal: (id, updates) => {
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
      ),
    }));
  },

  deleteGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    }));
  },

  contributeToGoal: (id, amount) => {
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== id) return g;
        const newAmount = g.currentAmount + amount;
        const isCompleted = newAmount >= g.targetAmount;
        return {
          ...g,
          currentAmount: Math.min(newAmount, g.targetAmount),
          status: isCompleted ? 'completed' : g.status,
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

  getFilteredGoals: () => {
    const { goals, filters } = get();
    let filtered = [...goals];

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((g) => filters.status!.includes(g.status));
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter((g) => filters.priority!.includes(g.priority));
    }

    if (filters.timeframe && filters.timeframe.length > 0) {
      filtered = filtered.filter((g) => filters.timeframe!.includes(g.timeframe));
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((g) => filters.category!.includes(g.category));
    }

    // Sort by priority (high first) then by target date
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
    });
  },

  getGoalProgress: (goal) => {
    return calculatePercentage(goal.currentAmount, goal.targetAmount);
  },

  getActiveGoals: () => {
    const { goals } = get();
    return goals.filter((g) => g.status === 'active');
  },

  getCompletedGoals: () => {
    const { goals } = get();
    return goals.filter((g) => g.status === 'completed');
  },

  getTotalSaved: () => {
    const { goals } = get();
    return goals
      .filter((g) => g.status === 'active')
      .reduce((sum, g) => sum + g.currentAmount, 0);
  },

  getTotalTarget: () => {
    const { goals } = get();
    return goals
      .filter((g) => g.status === 'active')
      .reduce((sum, g) => sum + g.targetAmount, 0);
  },
}));
