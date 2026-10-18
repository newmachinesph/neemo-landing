'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    ArrowPathIcon,
    CheckCircleIcon,
    XMarkIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface BudgetCategory {
    id: string;
    name: string;
    icon: string;
    allocated: number;
    spent: number;
    rolloverAmount: number; // Amount rolled over from last month
    rolloverEnabled: boolean;
}

interface BudgetRolloverProps {
    categories?: BudgetCategory[];
    month?: string;
    onUpdateCategories?: (categories: BudgetCategory[]) => void;
    className?: string;
}

const defaultCategories: BudgetCategory[] = [
    { id: '1', name: 'Food', icon: '🍔', allocated: 15000, spent: 12500, rolloverAmount: 2500, rolloverEnabled: true },
    { id: '2', name: 'Transport', icon: '🚗', allocated: 5000, spent: 4200, rolloverAmount: 800, rolloverEnabled: true },
    { id: '3', name: 'Shopping', icon: '🛍️', allocated: 8000, spent: 9500, rolloverAmount: -1500, rolloverEnabled: true },
    { id: '4', name: 'Entertainment', icon: '🎬', allocated: 3000, spent: 1800, rolloverAmount: 1200, rolloverEnabled: true },
    { id: '5', name: 'Bills', icon: '📄', allocated: 10000, spent: 9800, rolloverAmount: 0, rolloverEnabled: false },
    { id: '6', name: 'Groceries', icon: '🛒', allocated: 8000, spent: 7200, rolloverAmount: 800, rolloverEnabled: true },
];

export function BudgetRollover({
    categories: initialCategories,
    month = 'January 2025',
    onUpdateCategories,
    className,
}: BudgetRolloverProps) {
    const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories || defaultCategories);
    const [showConfirm, setShowConfirm] = useState(false);

    // Toggle rollover for a category
    const toggleRollover = (id: string) => {
        const updated = categories.map(c =>
            c.id === id ? { ...c, rolloverEnabled: !c.rolloverEnabled } : c
        );
        setCategories(updated);
        onUpdateCategories?.(updated);
    };

    // Calculate totals
    const totalRollover = categories
        .filter(c => c.rolloverEnabled && c.rolloverAmount > 0)
        .reduce((sum, c) => sum + c.rolloverAmount, 0);

    const totalOverspent = categories
        .filter(c => c.rolloverEnabled && c.rolloverAmount < 0)
        .reduce((sum, c) => sum + Math.abs(c.rolloverAmount), 0);

    const netRollover = totalRollover - totalOverspent;
    const enabledCount = categories.filter(c => c.rolloverEnabled).length;

    // Apply rollover
    const applyRollover = () => {
        const updated = categories.map(c => {
            if (!c.rolloverEnabled) return c;

            // Add rollover to next month's allocation
            return {
                ...c,
                allocated: c.allocated + c.rolloverAmount,
                rolloverAmount: 0,
                spent: 0, // Reset for new month
            };
        });
        setCategories(updated);
        onUpdateCategories?.(updated);
        setShowConfirm(false);
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                            <ArrowPathIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Rollover</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Carry unused budget to next month</p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{month}</span>
                </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">{formatCurrency(totalRollover)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Unspent</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">{formatCurrency(totalOverspent)}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Overspent</p>
                    </div>
                    <div>
                        <p className={cn(
                            'text-lg font-bold',
                            netRollover >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400'
                        )}>
                            {netRollover >= 0 ? '+' : ''}{formatCurrency(netRollover)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Net Rollover</p>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-72 overflow-y-auto">
                {categories.map((category) => {
                    const remaining = category.allocated - category.spent;
                    const isOverspent = remaining < 0;

                    return (
                        <div key={category.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Toggle */}
                                <button
                                    onClick={() => toggleRollover(category.id)}
                                    className={cn(
                                        'w-10 h-6 rounded-full transition-colors relative flex-shrink-0',
                                        category.rolloverEnabled ? 'bg-teal-500' : 'bg-gray-300 dark:bg-slate-600'
                                    )}
                                >
                                    <div
                                        className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform shadow"
                                        style={{ transform: category.rolloverEnabled ? 'translateX(18px)' : 'translateX(2px)' }}
                                    />
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{category.icon}</span>
                                    <div>
                                        <p className={cn(
                                            'text-sm font-medium',
                                            category.rolloverEnabled ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                                        )}>
                                            {category.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className={cn(
                                    'text-sm font-bold',
                                    !category.rolloverEnabled
                                        ? 'text-gray-400 dark:text-gray-500'
                                        : isOverspent
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                )}>
                                    {isOverspent ? '-' : '+'}{formatCurrency(Math.abs(remaining))}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {isOverspent ? 'to deduct' : 'to carry'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Action */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                {!showConfirm ? (
                    <button
                        onClick={() => setShowConfirm(true)}
                        disabled={enabledCount === 0}
                        className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center gap-2"
                    >
                        <ArrowPathIcon className="w-5 h-5" />
                        Apply Rollover to Next Month
                    </button>
                ) : (
                    <div className="space-y-3 animate-fade-in">
                        <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                            <p className="text-sm text-teal-700 dark:text-teal-400">
                                This will add <strong>{formatCurrency(netRollover)}</strong> to your next month's budget
                                across {enabledCount} categories.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={applyRollover}
                                className="flex-1 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg flex items-center justify-center gap-1"
                            >
                                <CheckCircleIcon className="w-5 h-5" />
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
