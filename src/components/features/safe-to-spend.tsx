'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    CalendarDaysIcon,
    BanknotesIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    isPaid: boolean;
}

interface SafeToSpendProps {
    currentBalance: number;
    upcomingBills: Bill[];
    nextPayday: string; // ISO date string
    monthlyIncome: number;
    className?: string;
}

export function SafeToSpendWidget({
    currentBalance,
    upcomingBills,
    nextPayday,
    monthlyIncome,
    className,
}: SafeToSpendProps) {
    const [showDetails, setShowDetails] = useState(false);

    const calculations = useMemo(() => {
        const today = new Date();
        const payday = new Date(nextPayday);

        // Days until payday
        const diffTime = payday.getTime() - today.getTime();
        const daysUntilPayday = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        // Unpaid bills before payday
        const unpaidBillsBeforePayday = upcomingBills.filter(bill => {
            const billDate = new Date(bill.dueDate);
            return !bill.isPaid && billDate <= payday;
        });

        const totalUpcomingBills = unpaidBillsBeforePayday.reduce((sum, bill) => sum + bill.amount, 0);

        // Safe to spend
        const safeToSpend = Math.max(0, currentBalance - totalUpcomingBills);

        // Daily budget
        const dailyBudget = daysUntilPayday > 0 ? safeToSpend / daysUntilPayday : safeToSpend;

        // Status
        let status: 'healthy' | 'warning' | 'danger' = 'healthy';
        if (safeToSpend < dailyBudget * 3) {
            status = 'danger';
        } else if (safeToSpend < dailyBudget * 7) {
            status = 'warning';
        }

        return {
            daysUntilPayday,
            totalUpcomingBills,
            safeToSpend,
            dailyBudget,
            status,
            unpaidBillsBeforePayday,
        };
    }, [currentBalance, upcomingBills, nextPayday]);

    const statusConfig = {
        healthy: {
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-50 dark:bg-green-900/30',
            border: 'border-green-200 dark:border-green-800',
            icon: CheckCircleIcon,
            message: 'Looking good! You\'re on track.',
        },
        warning: {
            color: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-50 dark:bg-yellow-900/30',
            border: 'border-yellow-200 dark:border-yellow-800',
            icon: ExclamationTriangleIcon,
            message: 'Careful! Try to limit extra spending.',
        },
        danger: {
            color: 'text-red-600 dark:text-red-400',
            bg: 'bg-red-50 dark:bg-red-900/30',
            border: 'border-red-200 dark:border-red-800',
            icon: ExclamationTriangleIcon,
            message: 'Mababa na! Consider cutting back.',
        },
    };

    const config = statusConfig[calculations.status];
    const StatusIcon = config.icon;

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6',
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <BanknotesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Safe to Spend</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Until next payday</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <InformationCircleIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Main Amount */}
            <div className="text-center py-4">
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {formatCurrency(calculations.safeToSpend)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(calculations.dailyBudget)}/day • {calculations.daysUntilPayday} days left
                </p>
            </div>

            {/* Status Badge */}
            <div className={cn(
                'flex items-center gap-2 p-3 rounded-lg mb-4',
                config.bg,
                config.border,
                'border'
            )}>
                <StatusIcon className={cn('w-5 h-5', config.color)} />
                <p className={cn('text-sm font-medium', config.color)}>
                    {config.message}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Budget used</span>
                    <span>{Math.round((1 - calculations.safeToSpend / currentBalance) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            'h-full rounded-full transition-all duration-500',
                            calculations.status === 'healthy' && 'bg-green-500',
                            calculations.status === 'warning' && 'bg-yellow-500',
                            calculations.status === 'danger' && 'bg-red-500'
                        )}
                        style={{ width: `${Math.min(100, (1 - calculations.safeToSpend / currentBalance) * 100)}%` }}
                    />
                </div>
            </div>

            {/* Details Section */}
            {showDetails && (
                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-700 animate-fade-in">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Current Balance</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(currentBalance)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Upcoming Bills ({calculations.unpaidBillsBeforePayday.length})</span>
                        <span className="font-medium text-red-600 dark:text-red-400">-{formatCurrency(calculations.totalUpcomingBills)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-slate-700">
                        <span className="font-medium text-gray-900 dark:text-white">Safe to Spend</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(calculations.safeToSpend)}</span>
                    </div>

                    {/* Bill List */}
                    {calculations.unpaidBillsBeforePayday.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Bills before payday:</p>
                            <div className="space-y-2">
                                {calculations.unpaidBillsBeforePayday.slice(0, 3).map(bill => (
                                    <div
                                        key={bill.id}
                                        className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                                    >
                                        <span className="text-gray-700 dark:text-gray-300">{bill.name}</span>
                                        <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(bill.amount)}</span>
                                    </div>
                                ))}
                                {calculations.unpaidBillsBeforePayday.length > 3 && (
                                    <p className="text-xs text-gray-400 text-center">
                                        +{calculations.unpaidBillsBeforePayday.length - 3} more bills
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Next Payday */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>
                    Next payday: {new Date(nextPayday).toLocaleDateString('en-PH', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            </div>
        </div>
    );
}
