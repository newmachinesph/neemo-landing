'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    DevicePhoneMobileIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    XMarkIcon,
    ExclamationTriangleIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';

// SMS Parser patterns for Philippine banks and e-wallets
const smsPatterns = {
    // BDO
    bdo: {
        credit: /BDO: .* credited (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* (\d{2}\/\d{2}\/\d{2,4})/i,
        debit: /BDO: .* debited (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* (\d{2}\/\d{2}\/\d{2,4})/i,
        purchase: /BDO .* purchase (?:of\s)?(?:Php|PHP|P)?\s?([\d,]+\.?\d*) at (.+?) on/i,
        atm: /BDO .* withdrawal (?:of\s)?(?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
    },
    // BPI
    bpi: {
        credit: /BPI: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) (?:was\s)?credited/i,
        debit: /BPI: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) (?:was\s)?debited/i,
        purchase: /BPI .* (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* at (.+)/i,
        transfer: /BPI .* transfer .* (?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
    },
    // Metrobank
    metrobank: {
        debit: /Metrobank: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* debit/i,
        credit: /Metrobank: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* credit/i,
    },
    // GCash
    gcash: {
        received: /GCash: You (?:have\s)?received (?:Php|PHP|P)?\s?([\d,]+\.?\d*) from (.+)/i,
        sent: /GCash: You (?:have\s)?sent (?:Php|PHP|P)?\s?([\d,]+\.?\d*) to (.+)/i,
        payment: /GCash: You (?:have\s)?paid (?:Php|PHP|P)?\s?([\d,]+\.?\d*) (?:to\s)?(.+)/i,
        cashin: /GCash: Cash.?in (?:of\s)?(?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
        cashout: /GCash: Cash.?out (?:of\s)?(?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
        purchase: /GCash: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* purchase .* (.+)/i,
    },
    // Maya (PayMaya)
    maya: {
        received: /Maya: You (?:have\s)?received (?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
        sent: /Maya: You (?:have\s)?sent (?:Php|PHP|P)?\s?([\d,]+\.?\d*) to (.+)/i,
        payment: /Maya: You (?:have\s)?paid (?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
        cashin: /Maya: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* added/i,
    },
    // UnionBank
    unionbank: {
        debit: /UnionBank: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* debited/i,
        credit: /UnionBank: (?:Php|PHP|P)?\s?([\d,]+\.?\d*) .* credited/i,
    },
    // Security Bank
    securitybank: {
        transaction: /Security Bank: (?:Php|PHP|P)?\s?([\d,]+\.?\d*)/i,
    },
};

// Category mapping based on merchant/description
const merchantCategories: Record<string, string> = {
    'jollibee': 'food',
    'mcdonalds': 'food',
    'kfc': 'food',
    'starbucks': 'food',
    'grab': 'transport',
    'angkas': 'transport',
    'shell': 'transport',
    'petron': 'transport',
    'lazada': 'shopping',
    'shopee': 'shopping',
    'sm ': 'shopping',
    'puregold': 'groceries',
    'robinsons': 'groceries',
    'meralco': 'bills',
    'maynilad': 'bills',
    'pldt': 'bills',
    'globe': 'bills',
    'smart': 'bills',
    'netflix': 'entertainment',
    'spotify': 'entertainment',
    'mercury drug': 'health',
    'watsons': 'health',
};

interface ParsedTransaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    category: string;
    source: string;
    date: string;
    rawSms: string;
    confidence: number;
}

interface SMSImportProps {
    onImport: (transactions: Omit<ParsedTransaction, 'id' | 'rawSms' | 'confidence'>[]) => void;
    className?: string;
}

export function SMSImport({ onImport, className }: SMSImportProps) {
    const [smsText, setSmsText] = useState('');
    const [parsedTransactions, setParsedTransactions] = useState<ParsedTransaction[]>([]);
    const [parseError, setParseError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Parse SMS text to extract transaction
    const parseSMS = useCallback((text: string): ParsedTransaction | null => {
        const trimmedText = text.trim();
        if (!trimmedText) return null;

        // Try each bank/wallet pattern
        for (const [source, patterns] of Object.entries(smsPatterns)) {
            for (const [transactionType, pattern] of Object.entries(patterns)) {
                const match = trimmedText.match(pattern);
                if (match) {
                    const amountStr = match[1].replace(/,/g, '');
                    const amount = parseFloat(amountStr);

                    if (isNaN(amount) || amount <= 0) continue;

                    const description = match[2] || transactionType;

                    // Determine if income or expense
                    const isIncome = ['credit', 'received', 'cashin'].includes(transactionType);

                    // Try to auto-categorize
                    let category = 'other';
                    const lowerDesc = description.toLowerCase();
                    for (const [merchant, cat] of Object.entries(merchantCategories)) {
                        if (lowerDesc.includes(merchant)) {
                            category = cat;
                            break;
                        }
                    }

                    return {
                        id: `sms-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        amount,
                        type: isIncome ? 'income' : 'expense',
                        description: description.trim(),
                        category,
                        source: source.toUpperCase(),
                        date: new Date().toISOString(),
                        rawSms: trimmedText,
                        confidence: 0.85,
                    };
                }
            }
        }

        return null;
    }, []);

    // Handle paste from clipboard
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setSmsText(text);
            processMessages(text);
        } catch (err) {
            setParseError('Hindi ma-access ang clipboard. I-paste mo manually ang SMS.');
        }
    };

    // Process multiple SMS messages
    const processMessages = (text: string) => {
        setIsProcessing(true);
        setParseError(null);

        // Split by common SMS delimiters
        const messages = text.split(/\n{2,}|(?=(?:BDO|BPI|GCash|Maya|Metrobank|UnionBank|Security Bank):)/i)
            .filter(m => m.trim().length > 0);

        const parsed: ParsedTransaction[] = [];
        let failed = 0;

        for (const msg of messages) {
            const result = parseSMS(msg);
            if (result) {
                parsed.push(result);
            } else if (msg.trim().length > 20) {
                failed++;
            }
        }

        setParsedTransactions(parsed);
        setIsProcessing(false);

        if (parsed.length === 0 && failed > 0) {
            setParseError(`Hindi ma-parse ang ${failed} message(s). Siguraduhing bank/GCash/Maya SMS ang pinaste mo.`);
        }
    };

    // Handle text input change
    const handleTextChange = (value: string) => {
        setSmsText(value);
        if (value.length > 20) {
            processMessages(value);
        } else {
            setParsedTransactions([]);
            setParseError(null);
        }
    };

    // Remove a parsed transaction
    const removeTransaction = (id: string) => {
        setParsedTransactions(prev => prev.filter(t => t.id !== id));
    };

    // Import all transactions
    const handleImport = () => {
        const toImport = parsedTransactions.map(({ id, rawSms, confidence, ...rest }) => rest);
        onImport(toImport);
        setSmsText('');
        setParsedTransactions([]);
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <DevicePhoneMobileIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SMS Auto-Import</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">I-paste ang bank/GCash/Maya SMS, auto namin i-parse</p>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 space-y-4">
                <div className="relative">
                    <textarea
                        value={smsText}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder="I-paste dito ang SMS mula sa BDO, BPI, GCash, Maya, etc...

Example:
GCash: You have sent Php 500.00 to Juan Dela Cruz.

BDO: Php 1,500.00 was debited from your account for purchase at Jollibee SM Mall."
                        className="w-full h-32 px-4 py-3 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"
                    />
                    <button
                        onClick={handlePaste}
                        className="absolute right-2 top-2 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                    >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                        Paste
                    </button>
                </div>

                {/* Processing indicator */}
                {isProcessing && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Processing...
                    </div>
                )}

                {/* Error message */}
                {parseError && (
                    <div className="flex items-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                        {parseError}
                    </div>
                )}

                {/* Parsed Transactions */}
                {parsedTransactions.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Na-detect na Transactions ({parsedTransactions.length})
                            </p>
                            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                <CheckCircleIcon className="w-4 h-4" />
                                Ready to import
                            </span>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {parsedTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'px-2 py-1 text-xs font-medium rounded',
                                            transaction.type === 'income'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                        )}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {transaction.description}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {transaction.source} • {transaction.category}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeTransaction(transaction.id)}
                                        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                    >
                                        <XMarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Import Button */}
                        <button
                            onClick={handleImport}
                            className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md shadow-purple-500/25 btn-press"
                        >
                            Import {parsedTransactions.length} Transaction{parsedTransactions.length > 1 ? 's' : ''}
                        </button>
                    </div>
                )}

                {/* Supported Banks */}
                <div className="pt-3 border-t border-gray-100 dark:border-slate-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Supported:</p>
                    <div className="flex flex-wrap gap-2">
                        {['BDO', 'BPI', 'Metrobank', 'GCash', 'Maya', 'UnionBank'].map((bank) => (
                            <span
                                key={bank}
                                className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded"
                            >
                                {bank}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
