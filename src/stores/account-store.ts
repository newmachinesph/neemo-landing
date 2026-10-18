import { create } from 'zustand';
import { Account, AccountType } from '@/types';
import { accounts as initialAccounts } from '@/data/dummy-data';
import { generateId } from '@/lib/utils';

interface AccountState {
  accounts: Account[];

  // Actions
  addAccount: (account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  setDefaultAccount: (id: string) => void;
  updateBalance: (id: string, amount: number) => void;

  // Computed
  getAccountById: (id: string) => Account | undefined;
  getDefaultAccount: () => Account | undefined;
  getTotalBalance: () => number;
  getAccountsByType: (type: AccountType) => Account[];
  getTotalAssets: () => number;
  getTotalLiabilities: () => number;
  getNetWorth: () => number;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: initialAccounts,

  addAccount: (account) => {
    const newAccount: Account = {
      ...account,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      accounts: [...state.accounts, newAccount],
    }));
  },

  updateAccount: (id, updates) => {
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
      ),
    }));
  },

  deleteAccount: (id) => {
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
    }));
  },

  setDefaultAccount: (id) => {
    set((state) => ({
      accounts: state.accounts.map((a) => ({
        ...a,
        isDefault: a.id === id,
        updatedAt: a.id === id ? new Date().toISOString() : a.updatedAt,
      })),
    }));
  },

  updateBalance: (id, amount) => {
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === id
          ? { ...a, balance: a.balance + amount, updatedAt: new Date().toISOString() }
          : a
      ),
    }));
  },

  getAccountById: (id) => {
    return get().accounts.find((a) => a.id === id);
  },

  getDefaultAccount: () => {
    return get().accounts.find((a) => a.isDefault);
  },

  getTotalBalance: () => {
    return get().accounts.reduce((sum, a) => sum + a.balance, 0);
  },

  getAccountsByType: (type) => {
    return get().accounts.filter((a) => a.type === type);
  },

  getTotalAssets: () => {
    return get().accounts
      .filter((a) => a.balance > 0)
      .reduce((sum, a) => sum + a.balance, 0);
  },

  getTotalLiabilities: () => {
    return Math.abs(
      get().accounts
        .filter((a) => a.balance < 0)
        .reduce((sum, a) => sum + a.balance, 0)
    );
  },

  getNetWorth: () => {
    return get().accounts.reduce((sum, a) => sum + a.balance, 0);
  },
}));
