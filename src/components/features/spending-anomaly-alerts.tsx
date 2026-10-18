'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    ExclamationTriangleIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CheckCircleIcon,
    LightBulbIcon,
} from '@heroicons/react/24/outline';

interface SpendingData {
    category: string;
    currentWeek: number;
    lastWeek: number;
    monthlyAverage: number;
}

interface Anomaly {
    id: string;
    category: string;
    type: 'spike' | 'unusual' | 'new';
    severity: 'low' | 'medium' | 'high';
    message: string;
    amount: number;
    percentageChange: number;
    suggestion?: string;
}

interface SpendingAnomalyAlertsProps {
    spendingData?: SpendingData[];
    className?: string;
}

// Simulated spending data
const defaultSpendingData: SpendingData[] = [
    { category: 'Food', currentWeek: 4500, lastWeek: 3200, monthlyAverage: 3000 },
    { category: 'Transport', currentWeek: 1800, lastWeek: 1500, monthlyAverage: 1400 },
    { category: 'Shopping', currentWeek: 8500, lastWeek: 2000, monthlyAverage: 2500 },
    { category: 'Entertainment', currentWeek: 1200, lastWeek: 800, monthlyAverage: 900 },
    { category: 'Bills', currentWeek: 3500, lastWeek: 3500, monthlyAverage: 3500 },
    { category: 'Groceries', currentWeek: 2800, lastWeek: 2500, monthlyAverage: 2600 },
];

const categoryEmojis: Record<string, string> = {
    Food: '🍔',
    Transport: '🚗',
    Shopping: '🛍️',
    Entertainment: '🎬',
    Bills: '📄',
    Groceries: '🛒',
    Health: '💊',
    Personal: '👤',
};

export function SpendingAnomalyAlerts({
    spendingData = defaultSpendingData,
    className,
}: SpendingAnomalyAlertsProps) {
    const [dismissedIds, setDismissedIds] = useState<string[]>([]);

    // Detect anomalies
    const anomalies = useMemo(() => {
        const detected: Anomaly[] = [];

        for (const data of spendingData) {
            const weekOverWeekChange = ((data.currentWeek - data.lastWeek) / data.lastWeek) * 100;
            const vsAverageChange = ((data.currentWeek - data.monthlyAverage) / data.monthlyAverage) * 100;

            // Spike detection (>50% increase from last week)
            if (weekOverWeekChange > 50) {
                detected.push({
                    id: `spike-${data.category}`,
                    category: data.category,
                    type: 'spike',
                    severity: weekOverWeekChange > 100 ? 'high' : weekOverWeekChange > 75 ? 'medium' : 'low',
                    message: `${data.category} spending jumped ${weekOverWeekChange.toFixed(0)}% from last week`,
                    amount: data.currentWeek - data.lastWeek,
                    percentageChange: weekOverWeekChange,
                    suggestion: getSuggestion(data.category, 'spike'),
                });
            }

            // Above average detection (>30% above monthly average)
            if (vsAverageChange > 30 && weekOverWeekChange <= 50) {
                detected.push({
                    id: `unusual-${data.category}`,
                    category: data.category,
                    type: 'unusual',
                    severity: vsAverageChange > 50 ? 'medium' : 'low',
                    message: `${data.category} is ${vsAverageChange.toFixed(0)}% above your usual spending`,
                    amount: data.currentWeek - data.monthlyAverage,
                    percentageChange: vsAverageChange,
                    suggestion: getSuggestion(data.category, 'unusual'),
                });
            }
        }

        // Sort by severity
        const severityOrder = { high: 0, medium: 1, low: 2 };
        return detected.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    }, [spendingData]);

    const visibleAnomalies = anomalies.filter(a => !dismissedIds.includes(a.id));

    // Dismiss an alert
    const dismissAlert = (id: string) => {
        setDismissedIds(prev => [...prev, id]);
    };

    // Get suggestion based on category and type
    function getSuggestion(category: string, type: string): string {
        const suggestions: Record<string, Record<string, string>> = {
            Food: {
                spike: 'Try meal prepping to reduce dining out expenses',
                unusual: 'Check if there are special occasions causing extra food spending',
            },
            Shopping: {
                spike: 'Consider a 48-hour rule before making purchases',
                unusual: 'Review if these are needs or wants',
            },
            Transport: {
                spike: 'Consider carpooling or using public transport more',
                unusual: 'Check for unusual trips or high gas prices',
            },
            Entertainment: {
                spike: 'Look for free or low-cost entertainment alternatives',
                unusual: 'Set a weekly entertainment budget',
            },
        };

        return suggestions[category]?.[type] || 'Review your spending in this category';
    }

    const severityColors = {
        high: {
            bg: 'bg-red-50 dark:bg-red-900/20',
            border: 'border-red-200 dark:border-red-800',
            text: 'text-red-700 dark:text-red-400',
            icon: 'text-red-500',
        },
        medium: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            border: 'border-yellow-200 dark:border-yellow-800',
            text: 'text-yellow-700 dark:text-yellow-400',
            icon: 'text-yellow-500',
        },
        low: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-800',
            text: 'text-blue-700 dark:text-blue-400',
            icon: 'text-blue-500',
        },
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Spending Alerts</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {visibleAnomalies.length === 0 ? 'No unusual spending detected' : `${visibleAnomalies.length} alert${visibleAnomalies.length > 1 ? 's' : ''} this week`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Alerts */}
            {visibleAnomalies.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                    {visibleAnomalies.map((anomaly) => {
                        const colors = severityColors[anomaly.severity];

                        return (
                            <div key={anomaly.id} className={cn('p-4', colors.bg)}>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">{categoryEmojis[anomaly.category] || '📊'}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn('text-sm font-medium', colors.text)}>
                                                {anomaly.category}
                                            </span>
                                            <span className={cn(
                                                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                                                colors.bg,
                                                colors.text
                                            )}>
                                                <ArrowTrendingUpIcon className="w-3 h-3" />
                                                +{anomaly.percentageChange.toFixed(0)}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            {anomaly.message}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Extra: +{formatCurrency(anomaly.amount)}
                                        </p>
                                        {anomaly.suggestion && (
                                            <div className="mt-2 flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <LightBulbIcon className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                                                <span>{anomaly.suggestion}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => dismissAlert(anomaly.id)}
                                        className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-8 text-center">
                    <CheckCircleIcon className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Looking good!</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Your spending is within normal patterns
                    </p>
                </div>
            )}

            {/* Weekly Comparison */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">This Week vs Last Week</p>
                <div className="grid grid-cols-3 gap-2">
                    {spendingData.slice(0, 6).map((data) => {
                        const change = ((data.currentWeek - data.lastWeek) / data.lastWeek) * 100;
                        const isUp = change > 0;

                        return (
                            <div key={data.category} className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                                <span className="text-lg">{categoryEmojis[data.category] || '📊'}</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{data.category}</p>
                                <p className={cn(
                                    'text-xs font-medium mt-0.5',
                                    isUp ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                                )}>
                                    {isUp ? '↑' : '↓'} {Math.abs(change).toFixed(0)}%
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
