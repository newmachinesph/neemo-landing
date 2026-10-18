'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    TruckIcon,
    PlusIcon,
    MinusIcon,
    MapPinIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

// Common Philippine commute fares
const commonFares = [
    { id: 'jeep', label: 'Jeepney', icon: '🚐', amounts: [13, 14, 15, 16] },
    { id: 'tricycle', label: 'Tricycle', icon: '🛺', amounts: [10, 15, 20, 30] },
    { id: 'bus', label: 'Bus', icon: '🚌', amounts: [15, 20, 25, 30, 40] },
    { id: 'mrt', label: 'MRT/LRT', icon: '🚇', amounts: [13, 16, 20, 28, 35] },
    { id: 'uv', label: 'UV Express', icon: '🚙', amounts: [20, 25, 30, 40] },
    { id: 'grab', label: 'Grab/Angkas', icon: '📱', amounts: [50, 75, 100, 150, 200] },
];

interface CommuteEntry {
    id: string;
    type: string;
    amount: number;
    route?: string;
    timestamp: string;
}

interface CommuteFareTrackerProps {
    onAddFare: (fare: Omit<CommuteEntry, 'id' | 'timestamp'>) => void;
    todayTotal?: number;
    monthlyTotal?: number;
    className?: string;
}

export function CommuteFareTracker({
    onAddFare,
    todayTotal = 0,
    monthlyTotal = 0,
    className,
}: CommuteFareTrackerProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [showCustom, setShowCustom] = useState(false);
    const [recentFares, setRecentFares] = useState<CommuteEntry[]>([]);

    // Quick add fare
    const addFare = (type: string, amount: number) => {
        const entry: CommuteEntry = {
            id: `fare-${Date.now()}`,
            type,
            amount,
            timestamp: new Date().toISOString(),
        };

        setRecentFares(prev => [entry, ...prev.slice(0, 9)]);
        onAddFare({ type, amount });
        setSelectedType(null);
        setCustomAmount('');
        setShowCustom(false);
    };

    // Handle custom amount
    const handleCustomAdd = () => {
        if (!selectedType || !customAmount) return;
        const amount = parseInt(customAmount);
        if (isNaN(amount) || amount <= 0) return;
        addFare(selectedType, amount);
    };

    const selectedFare = commonFares.find(f => f.id === selectedType);

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <TruckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Commute Tracker</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Quick-add pamasahe</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Today</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(todayTotal)}</p>
                    </div>
                </div>
            </div>

            {/* Quick Select Transport Type */}
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    {commonFares.map((fare) => (
                        <button
                            key={fare.id}
                            onClick={() => {
                                setSelectedType(fare.id);
                                setShowCustom(false);
                            }}
                            className={cn(
                                'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                                selectedType === fare.id
                                    ? 'bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-500'
                                    : 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600'
                            )}
                        >
                            <span className="text-2xl">{fare.icon}</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{fare.label}</span>
                        </button>
                    ))}
                </div>

                {/* Amount Selection */}
                {selectedFare && !showCustom && (
                    <div className="space-y-3 animate-fade-in">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Select {selectedFare.label} fare:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {selectedFare.amounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => addFare(selectedFare.id, amount)}
                                    className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                                >
                                    ₱{amount}
                                </button>
                            ))}
                            <button
                                onClick={() => setShowCustom(true)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Iba pa...
                            </button>
                        </div>
                    </div>
                )}

                {/* Custom Amount */}
                {selectedFare && showCustom && (
                    <div className="space-y-3 animate-fade-in">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enter custom {selectedFare.label} fare:
                        </p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-7 pr-3 py-3 text-lg font-medium bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleCustomAdd}
                                disabled={!customAmount}
                                className="px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-slate-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        <button
                            onClick={() => setShowCustom(false)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            ← Back to preset amounts
                        </button>
                    </div>
                )}

                {/* Recent Fares */}
                {recentFares.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Recent:</p>
                        <div className="flex flex-wrap gap-2">
                            {recentFares.slice(0, 5).map((fare) => {
                                const fareType = commonFares.find(f => f.id === fare.type);
                                return (
                                    <div
                                        key={fare.id}
                                        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded-lg"
                                    >
                                        <span>{fareType?.icon}</span>
                                        <span className="text-gray-700 dark:text-gray-300">{formatCurrency(fare.amount)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Footer */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">This Month's Commute</span>
                    <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(monthlyTotal)}</span>
                </div>
            </div>
        </div>
    );
}
