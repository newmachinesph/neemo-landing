'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BellAlertIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface RemittanceRate {
    currency: string;
    rate: number;
    change: number; // percentage change from yesterday
    lastUpdated: string;
}

interface RemittanceAlertsProps {
    favoriteRate?: number; // User's preferred rate
    onSetAlert?: (rate: number) => void;
    className?: string;
}

// Simulated exchange rates (in production, fetch from API)
const mockRates: RemittanceRate[] = [
    { currency: 'USD', rate: 56.25, change: 0.15, lastUpdated: new Date().toISOString() },
    { currency: 'EUR', rate: 61.50, change: -0.22, lastUpdated: new Date().toISOString() },
    { currency: 'GBP', rate: 71.80, change: 0.45, lastUpdated: new Date().toISOString() },
    { currency: 'AED', rate: 15.32, change: 0.05, lastUpdated: new Date().toISOString() },
    { currency: 'SGD', rate: 42.10, change: -0.10, lastUpdated: new Date().toISOString() },
    { currency: 'HKD', rate: 7.21, change: 0.02, lastUpdated: new Date().toISOString() },
    { currency: 'JPY', rate: 0.38, change: -0.01, lastUpdated: new Date().toISOString() },
    { currency: 'KRW', rate: 0.042, change: 0.001, lastUpdated: new Date().toISOString() },
];

const currencyFlags: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    AED: '🇦🇪',
    SGD: '🇸🇬',
    HKD: '🇭🇰',
    JPY: '🇯🇵',
    KRW: '🇰🇷',
};

const currencyNames: Record<string, string> = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    AED: 'UAE Dirham',
    SGD: 'Singapore Dollar',
    HKD: 'Hong Kong Dollar',
    JPY: 'Japanese Yen',
    KRW: 'Korean Won',
};

export function RemittanceAlerts({
    favoriteRate: initialFavoriteRate,
    onSetAlert,
    className,
}: RemittanceAlertsProps) {
    const [rates] = useState<RemittanceRate[]>(mockRates);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [alertRate, setAlertRate] = useState<string>('');
    const [alertSet, setAlertSet] = useState(false);
    const [convertAmount, setConvertAmount] = useState<string>('1000');

    const selectedRate = rates.find(r => r.currency === selectedCurrency);
    const convertedAmount = selectedRate
        ? parseFloat(convertAmount || '0') * selectedRate.rate
        : 0;

    // Check if current rate is favorable (above average)
    const isFavorable = (rate: RemittanceRate) => rate.change > 0;

    // Set alert
    const handleSetAlert = () => {
        const rate = parseFloat(alertRate);
        if (isNaN(rate) || rate <= 0) return;

        onSetAlert?.(rate);
        setAlertSet(true);
        setTimeout(() => setAlertSet(false), 3000);
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <GlobeAltIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Remittance Rates</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">For OFW families</p>
                    </div>
                </div>
            </div>

            {/* Currency Selection */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex flex-wrap gap-2">
                    {rates.map((rate) => (
                        <button
                            key={rate.currency}
                            onClick={() => setSelectedCurrency(rate.currency)}
                            className={cn(
                                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                                selectedCurrency === rate.currency
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 ring-2 ring-green-500'
                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                            )}
                        >
                            <span>{currencyFlags[rate.currency]}</span>
                            <span>{rate.currency}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Rate Display */}
            {selectedRate && (
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-3xl">{currencyFlags[selectedRate.currency]}</span>
                            <span className="text-lg text-gray-600 dark:text-gray-400">
                                1 {selectedRate.currency} =
                            </span>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            ₱{selectedRate.rate.toFixed(2)}
                        </p>
                        <div className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
                            isFavorable(selectedRate)
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        )}>
                            {isFavorable(selectedRate) ? (
                                <ArrowTrendingUpIcon className="w-4 h-4" />
                            ) : (
                                <ArrowTrendingDownIcon className="w-4 h-4" />
                            )}
                            {selectedRate.change >= 0 ? '+' : ''}{selectedRate.change.toFixed(2)}%
                            <span className="text-xs opacity-75">today</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Converter */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Convert</p>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                            {currencyFlags[selectedCurrency]} {selectedCurrency}
                        </span>
                        <input
                            type="number"
                            value={convertAmount}
                            onChange={(e) => setConvertAmount(e.target.value)}
                            className="w-full pl-16 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-medium text-gray-900 dark:text-white"
                        />
                    </div>
                    <span className="text-gray-400">=</span>
                    <div className="flex-1 px-3 py-2 text-sm bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-right font-bold text-green-700 dark:text-green-400">
                        🇵🇭 {formatCurrency(convertedAmount)}
                    </div>
                </div>
            </div>

            {/* Set Alert */}
            <div className="p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Set Rate Alert for {selectedCurrency}
                </p>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                        <input
                            type="number"
                            value={alertRate}
                            onChange={(e) => setAlertRate(e.target.value)}
                            placeholder={selectedRate?.rate.toFixed(2)}
                            className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                        />
                    </div>
                    <button
                        onClick={handleSetAlert}
                        disabled={alertSet}
                        className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            alertSet
                                ? 'bg-green-500 text-white'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                        )}
                    >
                        {alertSet ? '✓ Set!' : 'Set Alert'}
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    💡 We'll notify you when 1 {selectedCurrency} reaches your target rate
                </p>
            </div>

            {/* All Rates */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">All Rates (PHP)</p>
                <div className="grid grid-cols-2 gap-2">
                    {rates.map((rate) => (
                        <div
                            key={rate.currency}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                        >
                            <div className="flex items-center gap-2">
                                <span>{currencyFlags[rate.currency]}</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rate.currency}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">₱{rate.rate.toFixed(2)}</span>
                                <span className={cn(
                                    'ml-1 text-xs',
                                    rate.change >= 0 ? 'text-green-600' : 'text-red-600'
                                )}>
                                    {rate.change >= 0 ? '↑' : '↓'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
