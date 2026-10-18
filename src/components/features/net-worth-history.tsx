'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    ChartBarSquareIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

interface NetWorthSnapshot {
    date: string;
    assets: number;
    liabilities: number;
    netWorth: number;
}

interface Asset {
    id: string;
    name: string;
    type: 'cash' | 'investment' | 'property' | 'vehicle' | 'other';
    value: number;
}

interface Liability {
    id: string;
    name: string;
    type: 'credit_card' | 'loan' | 'mortgage' | 'other';
    balance: number;
}

interface NetWorthHistoryProps {
    snapshots?: NetWorthSnapshot[];
    currentAssets?: Asset[];
    currentLiabilities?: Liability[];
    className?: string;
}

// Generate sample historical data
const generateSampleSnapshots = (): NetWorthSnapshot[] => {
    const snapshots: NetWorthSnapshot[] = [];
    const today = new Date();

    let assets = 850000;
    let liabilities = 380000;

    for (let i = 11; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

        // Simulate some growth
        assets += (Math.random() - 0.3) * 50000;
        liabilities -= (Math.random() - 0.4) * 10000;
        liabilities = Math.max(0, liabilities);

        snapshots.push({
            date: date.toISOString(),
            assets: Math.round(assets),
            liabilities: Math.round(liabilities),
            netWorth: Math.round(assets - liabilities),
        });
    }

    return snapshots;
};

const defaultSnapshots = generateSampleSnapshots();

const assetTypeColors: Record<string, string> = {
    cash: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    investment: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    property: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    vehicle: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    other: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
};

const assetTypeEmojis: Record<string, string> = {
    cash: '💵',
    investment: '📈',
    property: '🏠',
    vehicle: '🚗',
    other: '📦',
};

export function NetWorthHistory({
    snapshots = defaultSnapshots,
    currentAssets = [
        { id: '1', name: 'BDO Savings', type: 'cash', value: 150000 },
        { id: '2', name: 'GCash', type: 'cash', value: 25000 },
        { id: '3', name: 'MP2 Fund', type: 'investment', value: 200000 },
        { id: '4', name: 'Stocks (COL)', type: 'investment', value: 180000 },
        { id: '5', name: 'House & Lot', type: 'property', value: 2500000 },
        { id: '6', name: 'Car', type: 'vehicle', value: 450000 },
    ],
    currentLiabilities = [
        { id: '1', name: 'Housing Loan', type: 'mortgage', balance: 1800000 },
        { id: '2', name: 'Car Loan', type: 'loan', balance: 280000 },
        { id: '3', name: 'Credit Card', type: 'credit_card', balance: 45000 },
    ],
    className,
}: NetWorthHistoryProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '1y' | 'all'>('1y');

    // Calculate current totals
    const totalAssets = currentAssets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = currentLiabilities.reduce((sum, l) => sum + l.balance, 0);
    const currentNetWorth = totalAssets - totalLiabilities;

    // Filter snapshots based on period
    const filteredSnapshots = useMemo(() => {
        const cutoffMonths = selectedPeriod === '6m' ? 6 : selectedPeriod === '1y' ? 12 : 999;
        return snapshots.slice(-cutoffMonths);
    }, [snapshots, selectedPeriod]);

    // Calculate changes
    const firstSnapshot = filteredSnapshots[0];
    const lastSnapshot = filteredSnapshots[filteredSnapshots.length - 1];
    const netWorthChange = lastSnapshot ? lastSnapshot.netWorth - firstSnapshot.netWorth : 0;
    const netWorthChangePercent = firstSnapshot?.netWorth
        ? ((lastSnapshot.netWorth - firstSnapshot.netWorth) / firstSnapshot.netWorth) * 100
        : 0;

    // Find max/min for chart scaling
    const maxNetWorth = Math.max(...filteredSnapshots.map(s => s.netWorth));
    const minNetWorth = Math.min(...filteredSnapshots.map(s => s.netWorth));
    const range = maxNetWorth - minNetWorth || 1;

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <ChartBarSquareIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Net Worth History</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Track your wealth over time</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {(['6m', '1y', 'all'] as const).map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={cn(
                                    'px-2 py-1 text-xs font-medium rounded transition-colors',
                                    selectedPeriod === period
                                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'
                                )}
                            >
                                {period === 'all' ? 'All' : period.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Net Worth Display */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Net Worth</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {formatCurrency(currentNetWorth)}
                    </p>
                    <div className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
                        netWorthChange >= 0
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    )}>
                        {netWorthChange >= 0 ? (
                            <ArrowTrendingUpIcon className="w-4 h-4" />
                        ) : (
                            <ArrowTrendingDownIcon className="w-4 h-4" />
                        )}
                        {netWorthChange >= 0 ? '+' : ''}{formatCurrency(netWorthChange)} ({netWorthChangePercent.toFixed(1)}%)
                    </div>
                </div>
            </div>

            {/* Simple Chart */}
            <div className="p-4">
                <div className="h-32 flex items-end gap-1">
                    {filteredSnapshots.map((snapshot, index) => {
                        const height = ((snapshot.netWorth - minNetWorth) / range) * 100;
                        const isPositive = snapshot.netWorth >= 0;

                        return (
                            <div
                                key={index}
                                className="flex-1 flex flex-col items-center"
                                title={`${new Date(snapshot.date).toLocaleDateString('en-PH', { month: 'short', year: '2-digit' })}: ${formatCurrency(snapshot.netWorth)}`}
                            >
                                <div
                                    className={cn(
                                        'w-full rounded-t transition-all hover:opacity-80',
                                        isPositive ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-red-500 dark:bg-red-400'
                                    )}
                                    style={{ height: `${Math.max(5, height)}%` }}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{new Date(filteredSnapshots[0]?.date).toLocaleDateString('en-PH', { month: 'short', year: '2-digit' })}</span>
                    <span>{new Date(filteredSnapshots[filteredSnapshots.length - 1]?.date).toLocaleDateString('en-PH', { month: 'short', year: '2-digit' })}</span>
                </div>
            </div>

            {/* Assets & Liabilities Summary */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                    {/* Assets */}
                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Assets</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                            {formatCurrency(totalAssets)}
                        </p>
                        <div className="space-y-1">
                            {currentAssets.slice(0, 3).map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        {assetTypeEmojis[asset.type]} {asset.name}
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(asset.value)}
                                    </span>
                                </div>
                            ))}
                            {currentAssets.length > 3 && (
                                <p className="text-xs text-gray-400">+{currentAssets.length - 3} more</p>
                            )}
                        </div>
                    </div>

                    {/* Liabilities */}
                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Liabilities</p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                            {formatCurrency(totalLiabilities)}
                        </p>
                        <div className="space-y-1">
                            {currentLiabilities.slice(0, 3).map((liability) => (
                                <div key={liability.id} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600 dark:text-gray-400">{liability.name}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatCurrency(liability.balance)}
                                    </span>
                                </div>
                            ))}
                            {currentLiabilities.length > 3 && (
                                <p className="text-xs text-gray-400">+{currentLiabilities.length - 3} more</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
