'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    LightBulbIcon,
    ChartBarIcon,
    CalendarDaysIcon,
    ArrowTrendingUpIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

interface BillHistory {
    month: string;
    amount: number;
}

interface PredictedBill {
    id: string;
    name: string;
    category: string;
    icon: string;
    history: BillHistory[];
    predictedAmount: number;
    confidence: number;
    dueDate: string;
    trend: 'up' | 'down' | 'stable';
    trendPercent: number;
}

interface PredictiveBillsProps {
    bills?: PredictedBill[];
    className?: string;
}

// Sample predicted bills
const defaultBills: PredictedBill[] = [
    {
        id: '1',
        name: 'Meralco',
        category: 'electric',
        icon: '⚡',
        history: [
            { month: 'Sep', amount: 3200 },
            { month: 'Oct', amount: 3450 },
            { month: 'Nov', amount: 3800 },
            { month: 'Dec', amount: 4200 },
        ],
        predictedAmount: 4500,
        confidence: 0.85,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        trend: 'up',
        trendPercent: 7.1,
    },
    {
        id: '2',
        name: 'Maynilad',
        category: 'water',
        icon: '💧',
        history: [
            { month: 'Sep', amount: 650 },
            { month: 'Oct', amount: 720 },
            { month: 'Nov', amount: 680 },
            { month: 'Dec', amount: 700 },
        ],
        predictedAmount: 720,
        confidence: 0.78,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        trend: 'stable',
        trendPercent: 2.9,
    },
    {
        id: '3',
        name: 'PLDT Internet',
        category: 'internet',
        icon: '🌐',
        history: [
            { month: 'Sep', amount: 1899 },
            { month: 'Oct', amount: 1899 },
            { month: 'Nov', amount: 1899 },
            { month: 'Dec', amount: 1899 },
        ],
        predictedAmount: 1899,
        confidence: 0.99,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        trend: 'stable',
        trendPercent: 0,
    },
    {
        id: '4',
        name: 'Globe Postpaid',
        category: 'phone',
        icon: '📱',
        history: [
            { month: 'Sep', amount: 1200 },
            { month: 'Oct', amount: 1350 },
            { month: 'Nov', amount: 1150 },
            { month: 'Dec', amount: 1100 },
        ],
        predictedAmount: 1050,
        confidence: 0.72,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        trend: 'down',
        trendPercent: -4.5,
    },
];

export function PredictiveBills({
    bills = defaultBills,
    className,
}: PredictiveBillsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Calculate total predicted
    const totalPredicted = bills.reduce((sum, b) => sum + b.predictedAmount, 0);

    // Get days until due
    const getDaysUntil = (dateStr: string) => {
        const today = new Date();
        const due = new Date(dateStr);
        return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };

    const trendColors = {
        up: 'text-red-600 dark:text-red-400',
        down: 'text-green-600 dark:text-green-400',
        stable: 'text-gray-500 dark:text-gray-400',
    };

    const trendIcons = {
        up: '↑',
        down: '↓',
        stable: '→',
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <LightBulbIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Predictive Bills</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">AI-estimated upcoming bills</p>
                    </div>
                </div>
            </div>

            {/* Total Prediction */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expected This Month</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalPredicted)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{bills.length} bills</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            <LightBulbIcon className="w-3 h-3" />
                            Based on history
                        </p>
                    </div>
                </div>
            </div>

            {/* Bills List */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {bills.map((bill) => {
                    const daysUntil = getDaysUntil(bill.dueDate);
                    const isExpanded = expandedId === bill.id;
                    const maxHistoryAmount = Math.max(...bill.history.map(h => h.amount));

                    return (
                        <div key={bill.id}>
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : bill.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{bill.icon}</span>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{bill.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Due in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                                            {daysUntil <= 3 && <span className="text-red-500 ml-1">⚠️</span>}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        ~{formatCurrency(bill.predictedAmount)}
                                    </p>
                                    <p className={cn('text-xs flex items-center gap-0.5 justify-end', trendColors[bill.trend])}>
                                        {trendIcons[bill.trend]} {Math.abs(bill.trendPercent).toFixed(1)}%
                                    </p>
                                </div>
                            </button>

                            {/* Expanded View */}
                            {isExpanded && (
                                <div className="px-4 pb-4 animate-fade-in">
                                    {/* Confidence */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Prediction Confidence:</span>
                                        <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    'h-full rounded-full',
                                                    bill.confidence >= 0.8 ? 'bg-green-500' : bill.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                                                )}
                                                style={{ width: `${bill.confidence * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            {(bill.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>

                                    {/* History Chart */}
                                    <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Recent History</p>
                                        <div className="flex items-end gap-2 h-16">
                                            {bill.history.map((h, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center">
                                                    <div
                                                        className="w-full bg-amber-400 dark:bg-amber-500 rounded-t"
                                                        style={{ height: `${(h.amount / maxHistoryAmount) * 100}%` }}
                                                    />
                                                    <span className="text-xs text-gray-400 mt-1">{h.month}</span>
                                                </div>
                                            ))}
                                            {/* Predicted */}
                                            <div className="flex-1 flex flex-col items-center">
                                                <div
                                                    className="w-full bg-amber-200 dark:bg-amber-900/50 border-2 border-dashed border-amber-400 rounded-t"
                                                    style={{ height: `${(bill.predictedAmount / maxHistoryAmount) * 100}%` }}
                                                />
                                                <span className="text-xs text-amber-600 dark:text-amber-400 mt-1">Est.</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tip */}
                                    {bill.trend === 'up' && (
                                        <div className="mt-3 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                                            <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            <span>
                                                {bill.name} trend is increasing. Consider reviewing your usage.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer Tip */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    💡 Predictions are based on your payment history. Actual amounts may vary.
                </p>
            </div>
        </div>
    );
}
