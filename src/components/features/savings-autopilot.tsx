'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    SparklesIcon,
    ArrowPathIcon,
    BanknotesIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

interface AutopilotRule {
    id: string;
    name: string;
    trigger: 'payday' | 'weekly' | 'monthly' | 'when_surplus';
    action: 'transfer_percent' | 'transfer_fixed' | 'round_up';
    amount: number; // Percentage or fixed amount
    destination: string; // Goal name or account
    isActive: boolean;
}

interface SavingsAutopilotProps {
    rules?: AutopilotRule[];
    monthlySalary?: number;
    onUpdateRules?: (rules: AutopilotRule[]) => void;
    className?: string;
}

const defaultRules: AutopilotRule[] = [
    { id: '1', name: 'Payday Savings', trigger: 'payday', action: 'transfer_percent', amount: 20, destination: 'Emergency Fund', isActive: true },
    { id: '2', name: 'Weekly Investment', trigger: 'weekly', action: 'transfer_fixed', amount: 500, destination: 'MP2 Fund', isActive: false },
    { id: '3', name: 'Round-up Savings', trigger: 'when_surplus', action: 'round_up', amount: 100, destination: 'Travel Fund', isActive: false },
];

const triggerLabels: Record<string, { label: string; description: string }> = {
    payday: { label: 'Every Payday', description: 'Auto-save when salary comes in' },
    weekly: { label: 'Weekly', description: 'Save every Sunday' },
    monthly: { label: 'Monthly', description: 'Save on the 1st of each month' },
    when_surplus: { label: 'When Surplus', description: 'Save extra when budget is under' },
};

const actionLabels: Record<string, string> = {
    transfer_percent: '% of income',
    transfer_fixed: 'Fixed amount',
    round_up: 'Round up spare change',
};

export function SavingsAutopilot({
    rules: initialRules,
    monthlySalary = 35000,
    onUpdateRules,
    className,
}: SavingsAutopilotProps) {
    const [rules, setRules] = useState<AutopilotRule[]>(initialRules || defaultRules);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRule, setNewRule] = useState<Partial<AutopilotRule>>({
        name: '',
        trigger: 'payday',
        action: 'transfer_percent',
        amount: 10,
        destination: '',
    });

    // Toggle rule active state
    const toggleRule = (id: string) => {
        const updated = rules.map(r =>
            r.id === id ? { ...r, isActive: !r.isActive } : r
        );
        setRules(updated);
        onUpdateRules?.(updated);
    };

    // Delete rule
    const deleteRule = (id: string) => {
        const updated = rules.filter(r => r.id !== id);
        setRules(updated);
        onUpdateRules?.(updated);
    };

    // Add new rule
    const addRule = () => {
        if (!newRule.name || !newRule.destination) return;

        const rule: AutopilotRule = {
            id: `rule-${Date.now()}`,
            name: newRule.name,
            trigger: newRule.trigger || 'payday',
            action: newRule.action || 'transfer_percent',
            amount: newRule.amount || 10,
            destination: newRule.destination,
            isActive: true,
        };

        const updated = [...rules, rule];
        setRules(updated);
        onUpdateRules?.(updated);
        setNewRule({ name: '', trigger: 'payday', action: 'transfer_percent', amount: 10, destination: '' });
        setShowAddForm(false);
    };

    // Calculate projected monthly savings
    const projectedSavings = rules
        .filter(r => r.isActive)
        .reduce((sum, rule) => {
            if (rule.action === 'transfer_percent') {
                return sum + (monthlySalary * (rule.amount / 100));
            }
            if (rule.action === 'transfer_fixed') {
                const multiplier = rule.trigger === 'weekly' ? 4 : rule.trigger === 'payday' ? 2 : 1;
                return sum + (rule.amount * multiplier);
            }
            return sum + 200; // Estimate for round-up
        }, 0);

    const activeRules = rules.filter(r => r.isActive).length;

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <SparklesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Autopilot</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activeRules} active rules • ~{formatCurrency(projectedSavings)}/mo
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add Rule
                    </button>
                </div>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 space-y-3 animate-fade-in">
                    <input
                        type="text"
                        placeholder="Rule name (e.g., Payday Savings)"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={newRule.trigger}
                            onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value as AutopilotRule['trigger'] })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        >
                            {Object.entries(triggerLabels).map(([value, { label }]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                        <select
                            value={newRule.action}
                            onChange={(e) => setNewRule({ ...newRule, action: e.target.value as AutopilotRule['action'] })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        >
                            {Object.entries(actionLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            {newRule.action === 'transfer_fixed' && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                            )}
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newRule.amount || ''}
                                onChange={(e) => setNewRule({ ...newRule, amount: parseFloat(e.target.value) || 0 })}
                                className={cn(
                                    'w-full pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white',
                                    newRule.action === 'transfer_fixed' ? 'pl-7' : 'pl-3'
                                )}
                            />
                            {newRule.action === 'transfer_percent' && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Destination (e.g., Emergency Fund)"
                            value={newRule.destination}
                            onChange={(e) => setNewRule({ ...newRule, destination: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addRule}
                            disabled={!newRule.name || !newRule.destination}
                            className="flex-1 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 disabled:bg-gray-300"
                        >
                            Add Rule
                        </button>
                    </div>
                </div>
            )}

            {/* Rules List */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-80 overflow-y-auto">
                {rules.map((rule) => (
                    <div
                        key={rule.id}
                        className={cn(
                            'p-4 transition-colors',
                            rule.isActive ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-800/50'
                        )}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                {/* Toggle */}
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={cn(
                                        'mt-0.5 w-10 h-6 rounded-full transition-colors relative flex-shrink-0',
                                        rule.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-slate-600'
                                    )}
                                >
                                    <div
                                        className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform shadow"
                                        style={{ transform: rule.isActive ? 'translateX(18px)' : 'translateX(2px)' }}
                                    />
                                </button>

                                <div>
                                    <p className={cn(
                                        'text-sm font-medium',
                                        rule.isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                                    )}>
                                        {rule.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {triggerLabels[rule.trigger].label} →{' '}
                                        {rule.action === 'transfer_percent' && `${rule.amount}%`}
                                        {rule.action === 'transfer_fixed' && formatCurrency(rule.amount)}
                                        {rule.action === 'round_up' && 'Round up'}
                                        {' '}→ {rule.destination}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteRule(rule.id)}
                                className="text-xs text-gray-400 hover:text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Projected Monthly Savings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Based on active rules</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(projectedSavings)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {((projectedSavings / monthlySalary) * 100).toFixed(0)}% of income
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
