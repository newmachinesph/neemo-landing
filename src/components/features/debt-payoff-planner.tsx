'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    ScaleIcon,
    ArrowTrendingDownIcon,
    ChartBarIcon,
    SparklesIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

interface Debt {
    id: string;
    name: string;
    balance: number;
    interestRate: number; // Annual percentage
    minimumPayment: number;
    type: 'credit_card' | 'loan' | 'hulugan' | 'utang' | 'other';
}

interface DebtPayoffPlannerProps {
    debts?: Debt[];
    monthlyBudget?: number;
    onUpdateDebts?: (debts: Debt[]) => void;
    className?: string;
}

type Strategy = 'avalanche' | 'snowball';

// Default sample debts for Filipino context
const defaultDebts: Debt[] = [
    { id: '1', name: 'BDO Credit Card', balance: 45000, interestRate: 36, minimumPayment: 1500, type: 'credit_card' },
    { id: '2', name: 'Hulugan (TV)', balance: 15000, interestRate: 0, minimumPayment: 2500, type: 'hulugan' },
    { id: '3', name: 'SSS Salary Loan', balance: 30000, interestRate: 10, minimumPayment: 1800, type: 'loan' },
];

export function DebtPayoffPlanner({
    debts: initialDebts,
    monthlyBudget: initialBudget = 10000,
    onUpdateDebts,
    className,
}: DebtPayoffPlannerProps) {
    const [debts, setDebts] = useState<Debt[]>(initialDebts || defaultDebts);
    const [monthlyBudget, setMonthlyBudget] = useState(initialBudget);
    const [strategy, setStrategy] = useState<Strategy>('avalanche');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newDebt, setNewDebt] = useState<Partial<Debt>>({
        name: '',
        balance: 0,
        interestRate: 0,
        minimumPayment: 0,
        type: 'loan',
    });

    // Calculate payoff plan
    const payoffPlan = useMemo(() => {
        if (debts.length === 0) return null;

        const totalMinimum = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
        const extraPayment = Math.max(0, monthlyBudget - totalMinimum);
        const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

        // Sort debts based on strategy
        const sortedDebts = [...debts].sort((a, b) => {
            if (strategy === 'avalanche') {
                return b.interestRate - a.interestRate; // Highest interest first
            }
            return a.balance - b.balance; // Lowest balance first (snowball)
        });

        // Simulate payoff
        let months = 0;
        let totalInterest = 0;
        const payoffOrder: { name: string; months: number }[] = [];
        const runningDebts = sortedDebts.map(d => ({ ...d }));

        while (runningDebts.some(d => d.balance > 0) && months < 360) {
            months++;
            let extraThisMonth = extraPayment;

            for (const debt of runningDebts) {
                if (debt.balance <= 0) continue;

                // Add monthly interest
                const monthlyRate = debt.interestRate / 100 / 12;
                const interest = debt.balance * monthlyRate;
                totalInterest += interest;
                debt.balance += interest;

                // Apply payment
                let payment = debt.minimumPayment;
                if (runningDebts.filter(d => d.balance > 0)[0]?.id === debt.id) {
                    payment += extraThisMonth;
                    extraThisMonth = 0;
                }

                debt.balance = Math.max(0, debt.balance - payment);

                if (debt.balance <= 0 && !payoffOrder.find(p => p.name === debt.name)) {
                    payoffOrder.push({ name: debt.name, months });
                }
            }
        }

        const totalPayoffMonths = months;
        const yearsToPayoff = Math.floor(months / 12);
        const remainingMonths = months % 12;

        return {
            totalDebt,
            totalMinimum,
            extraPayment,
            totalInterest: Math.round(totalInterest),
            totalPayoffMonths,
            yearsToPayoff,
            remainingMonths,
            payoffOrder,
            sortedDebts,
        };
    }, [debts, monthlyBudget, strategy]);

    // Add new debt
    const addDebt = () => {
        if (!newDebt.name || !newDebt.balance) return;

        const debt: Debt = {
            id: `debt-${Date.now()}`,
            name: newDebt.name,
            balance: newDebt.balance,
            interestRate: newDebt.interestRate || 0,
            minimumPayment: newDebt.minimumPayment || 0,
            type: newDebt.type as Debt['type'] || 'other',
        };

        const updated = [...debts, debt];
        setDebts(updated);
        onUpdateDebts?.(updated);
        setNewDebt({ name: '', balance: 0, interestRate: 0, minimumPayment: 0, type: 'loan' });
        setShowAddForm(false);
    };

    // Remove debt
    const removeDebt = (id: string) => {
        const updated = debts.filter(d => d.id !== id);
        setDebts(updated);
        onUpdateDebts?.(updated);
    };

    const debtTypeLabels: Record<string, string> = {
        credit_card: 'Credit Card',
        loan: 'Loan',
        hulugan: 'Hulugan',
        utang: 'Utang',
        other: 'Other',
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <ScaleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Debt Payoff Planner</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Snowball vs Avalanche strategy</p>
                    </div>
                </div>
            </div>

            {/* Strategy Toggle */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex gap-2">
                    <button
                        onClick={() => setStrategy('avalanche')}
                        className={cn(
                            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                            strategy === 'avalanche'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 ring-2 ring-red-500'
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                        )}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ArrowTrendingDownIcon className="w-4 h-4" />
                            Avalanche
                        </span>
                        <span className="text-xs opacity-75 block mt-0.5">Highest interest first</span>
                    </button>
                    <button
                        onClick={() => setStrategy('snowball')}
                        className={cn(
                            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                            strategy === 'snowball'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500'
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                        )}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <SparklesIcon className="w-4 h-4" />
                            Snowball
                        </span>
                        <span className="text-xs opacity-75 block mt-0.5">Smallest balance first</span>
                    </button>
                </div>
            </div>

            {/* Monthly Budget */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Debt Budget
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                    <input
                        type="number"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(parseInt(e.target.value) || 0)}
                        className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Debts List */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-64 overflow-y-auto">
                {payoffPlan?.sortedDebts.map((debt, index) => (
                    <div key={debt.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <span className="text-xs font-bold text-red-600 dark:text-red-400">{index + 1}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{debt.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {debt.interestRate}% APR • Min: {formatCurrency(debt.minimumPayment)}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">{formatCurrency(debt.balance)}</p>
                            <button
                                onClick={() => removeDebt(debt.id)}
                                className="text-xs text-gray-400 hover:text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Debt Button */}
            {!showAddForm && (
                <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                        + Add Debt
                    </button>
                </div>
            )}

            {/* Add Debt Form */}
            {showAddForm && (
                <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-3 bg-gray-50 dark:bg-slate-700/50">
                    <input
                        type="text"
                        placeholder="Debt name"
                        value={newDebt.name}
                        onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₱</span>
                            <input
                                type="number"
                                placeholder="Balance"
                                value={newDebt.balance || ''}
                                onChange={(e) => setNewDebt({ ...newDebt, balance: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-6 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Interest %"
                                value={newDebt.interestRate || ''}
                                onChange={(e) => setNewDebt({ ...newDebt, interestRate: parseFloat(e.target.value) || 0 })}
                                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowAddForm(false)} className="flex-1 py-2 text-sm bg-gray-200 dark:bg-slate-600 rounded-lg">
                            Cancel
                        </button>
                        <button onClick={addDebt} className="flex-1 py-2 text-sm text-white bg-red-500 rounded-lg">
                            Add
                        </button>
                    </div>
                </div>
            )}

            {/* Payoff Summary */}
            {payoffPlan && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-t border-gray-100 dark:border-slate-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {payoffPlan.yearsToPayoff}y {payoffPlan.remainingMonths}m
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Time to debt-free</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(payoffPlan.totalInterest)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total interest</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Payoff Order:</p>
                        <div className="flex flex-wrap gap-1">
                            {payoffPlan.payoffOrder.map((item, i) => (
                                <span key={i} className="px-2 py-1 text-xs bg-white dark:bg-slate-800 rounded shadow-sm">
                                    {i + 1}. {item.name} ({item.months}mo)
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
