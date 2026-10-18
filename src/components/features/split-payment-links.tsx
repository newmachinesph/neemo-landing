'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    UserGroupIcon,
    LinkIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon,
    ShareIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';

interface SplitParticipant {
    id: string;
    name: string;
    amount: number;
    isPaid: boolean;
    paymentMethod?: 'gcash' | 'maya' | 'bank';
}

interface SplitExpense {
    id: string;
    description: string;
    totalAmount: number;
    participants: SplitParticipant[];
    createdAt: string;
}

interface SplitPaymentLinksProps {
    expense?: SplitExpense;
    gcashNumber?: string;
    mayaNumber?: string;
    onMarkPaid?: (participantId: string) => void;
    className?: string;
}

// GCash/Maya deep link generators
const generateGCashLink = (amount: number, message: string, mobileNumber?: string): string => {
    // GCash doesn't have official deep links, but we can create a shareable message
    const text = encodeURIComponent(
        `💚 GCash Payment Request\n` +
        `Amount: ₱${amount.toLocaleString()}\n` +
        `For: ${message}\n` +
        (mobileNumber ? `Send to: ${mobileNumber}` : '') +
        `\n\nOpen GCash app to pay!`
    );
    return `https://wa.me/?text=${text}`; // Share via WhatsApp/messaging
};

const generateMayaLink = (amount: number, message: string, mobileNumber?: string): string => {
    const text = encodeURIComponent(
        `💜 Maya Payment Request\n` +
        `Amount: ₱${amount.toLocaleString()}\n` +
        `For: ${message}\n` +
        (mobileNumber ? `Send to: ${mobileNumber}` : '') +
        `\n\nOpen Maya app to pay!`
    );
    return `https://wa.me/?text=${text}`;
};

const defaultExpense: SplitExpense = {
    id: '1',
    description: 'Dinner at Samgyupsal',
    totalAmount: 4500,
    participants: [
        { id: '1', name: 'You', amount: 1125, isPaid: true },
        { id: '2', name: 'Maria', amount: 1125, isPaid: false, paymentMethod: 'gcash' },
        { id: '3', name: 'Juan', amount: 1125, isPaid: false, paymentMethod: 'maya' },
        { id: '4', name: 'Pedro', amount: 1125, isPaid: false },
    ],
    createdAt: new Date().toISOString(),
};

export function SplitPaymentLinks({
    expense = defaultExpense,
    gcashNumber = '09XX XXX XXXX',
    mayaNumber = '09XX XXX XXXX',
    onMarkPaid,
    className,
}: SplitPaymentLinksProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showQR, setShowQR] = useState<string | null>(null);

    const unpaidAmount = expense.participants
        .filter(p => !p.isPaid && p.name !== 'You')
        .reduce((sum, p) => sum + p.amount, 0);

    const paidCount = expense.participants.filter(p => p.isPaid).length;

    // Copy payment details to clipboard
    const copyPaymentDetails = async (participant: SplitParticipant, method: 'gcash' | 'maya') => {
        const details = method === 'gcash'
            ? `💚 GCash Payment\nTo: ${gcashNumber}\nAmount: ₱${participant.amount.toLocaleString()}\nFor: ${expense.description} (${participant.name}'s share)`
            : `💜 Maya Payment\nTo: ${mayaNumber}\nAmount: ₱${participant.amount.toLocaleString()}\nFor: ${expense.description} (${participant.name}'s share)`;

        await navigator.clipboard.writeText(details);
        setCopiedId(`${participant.id}-${method}`);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Share via messaging
    const sharePaymentRequest = (participant: SplitParticipant) => {
        const text = `Hi ${participant.name}! 👋\n\n` +
            `Your share for "${expense.description}" is ₱${participant.amount.toLocaleString()}\n\n` +
            `💚 GCash: ${gcashNumber}\n` +
            `💜 Maya: ${mayaNumber}\n\n` +
            `Thanks! 🙏`;

        if (navigator.share) {
            navigator.share({
                title: 'Payment Request',
                text: text,
            });
        } else {
            navigator.clipboard.writeText(text);
            setCopiedId(`share-${participant.id}`);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                        <UserGroupIcon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Split with Payment Links</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Send GCash/Maya payment requests</p>
                    </div>
                </div>
            </div>

            {/* Expense Summary */}
            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.description}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(expense.totalAmount)}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{paidCount}/{expense.participants.length} paid</span>
                    <span className="text-pink-600 dark:text-pink-400 font-medium">
                        {formatCurrency(unpaidAmount)} pending
                    </span>
                </div>
            </div>

            {/* Participants */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {expense.participants.map((participant) => {
                    const isYou = participant.name === 'You';

                    return (
                        <div key={participant.id} className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center text-white font-medium',
                                        isYou
                                            ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                                            : 'bg-gray-400 dark:bg-slate-600'
                                    )}>
                                        {participant.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {participant.name} {isYou && '(You)'}
                                        </p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(participant.amount)}
                                        </p>
                                    </div>
                                </div>
                                {participant.isPaid ? (
                                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
                                        <CheckCircleIcon className="w-4 h-4" />
                                        Paid
                                    </span>
                                ) : !isYou && (
                                    <button
                                        onClick={() => onMarkPaid?.(participant.id)}
                                        className="text-xs text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                                    >
                                        Mark as paid
                                    </button>
                                )}
                            </div>

                            {/* Payment Actions (for unpaid, non-you participants) */}
                            {!participant.isPaid && !isYou && (
                                <div className="flex gap-2 mt-2">
                                    {/* GCash */}
                                    <button
                                        onClick={() => copyPaymentDetails(participant, 'gcash')}
                                        className={cn(
                                            'flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all',
                                            copiedId === `${participant.id}-gcash`
                                                ? 'bg-green-500 text-white'
                                                : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50'
                                        )}
                                    >
                                        {copiedId === `${participant.id}-gcash` ? (
                                            <>
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <span>💚</span>
                                                GCash
                                            </>
                                        )}
                                    </button>

                                    {/* Maya */}
                                    <button
                                        onClick={() => copyPaymentDetails(participant, 'maya')}
                                        className={cn(
                                            'flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all',
                                            copiedId === `${participant.id}-maya`
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                                        )}
                                    >
                                        {copiedId === `${participant.id}-maya` ? (
                                            <>
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <span>💜</span>
                                                Maya
                                            </>
                                        )}
                                    </button>

                                    {/* Share */}
                                    <button
                                        onClick={() => sharePaymentRequest(participant)}
                                        className={cn(
                                            'flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                                            copiedId === `share-${participant.id}`
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                                        )}
                                    >
                                        {copiedId === `share-${participant.id}` ? (
                                            <CheckCircleIcon className="w-4 h-4" />
                                        ) : (
                                            <ShareIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Your Payment Info */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Your Payment Details</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-center">
                        <span className="text-lg">💚</span>
                        <p className="text-xs text-gray-600 dark:text-gray-300">GCash</p>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{gcashNumber}</p>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-center">
                        <span className="text-lg">💜</span>
                        <p className="text-xs text-gray-600 dark:text-gray-300">Maya</p>
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{mayaNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
