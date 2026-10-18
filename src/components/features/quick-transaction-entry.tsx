'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    PlusIcon,
    XMarkIcon,
    BanknotesIcon,
    CreditCardIcon,
    CheckIcon,
    PencilIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

// Category definitions with Filipino-friendly labels
const categories = [
    { id: 'food', name: 'Pagkain', icon: '🍔', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
    { id: 'transport', name: 'Transpo', icon: '🚗', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { id: 'groceries', name: 'Grocery', icon: '🛒', color: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
    { id: 'bills', name: 'Bills', icon: '📄', color: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' },
    { id: 'entertainment', name: 'Libangan', icon: '🎬', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
    { id: 'health', name: 'Health', icon: '💊', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' },
    { id: 'personal', name: 'Personal', icon: '👤', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' },
    { id: 'load', name: 'Load/Data', icon: '📱', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' },
    { id: 'other', name: 'Iba Pa', icon: '📦', color: 'bg-gray-100 dark:bg-gray-800 text-gray-600' },
];

// Smart categorization patterns (merchant name -> category)
const categoryPatterns: Record<string, string> = {
    // Food
    'jollibee': 'food',
    'mcdonalds': 'food',
    'mcdonald': 'food',
    'kfc': 'food',
    'greenwich': 'food',
    'chowking': 'food',
    'mang inasal': 'food',
    'samgyupsal': 'food',
    'starbucks': 'food',
    'coffee': 'food',
    'shakeys': 'food',
    'pizza': 'food',
    'resto': 'food',
    'restaurant': 'food',
    'food': 'food',
    'kain': 'food',
    'lunch': 'food',
    'dinner': 'food',
    'breakfast': 'food',
    'merienda': 'food',
    // Transport
    'grab': 'transport',
    'angkas': 'transport',
    'taxi': 'transport',
    'uber': 'transport',
    'gas': 'transport',
    'petron': 'transport',
    'shell': 'transport',
    'caltex': 'transport',
    'pamasahe': 'transport',
    'jeep': 'transport',
    'mrt': 'transport',
    'lrt': 'transport',
    'bus': 'transport',
    'parking': 'transport',
    // Groceries
    'sm supermarket': 'groceries',
    'puregold': 'groceries',
    'robinsons supermarket': 'groceries',
    'landmark': 'groceries',
    'savemore': 'groceries',
    'walter mart': 'groceries',
    'grocery': 'groceries',
    'palengke': 'groceries',
    'market': 'groceries',
    // Bills
    'meralco': 'bills',
    'maynilad': 'bills',
    'manila water': 'bills',
    'globe': 'bills',
    'smart': 'bills',
    'pldt': 'bills',
    'converge': 'bills',
    'internet': 'bills',
    'electric': 'bills',
    'water bill': 'bills',
    'rent': 'bills',
    'upa': 'bills',
    // Shopping
    'lazada': 'shopping',
    'shopee': 'shopping',
    'zalora': 'shopping',
    'uniqlo': 'shopping',
    'h&m': 'shopping',
    'sm': 'shopping',
    'mall': 'shopping',
    // Entertainment
    'netflix': 'entertainment',
    'spotify': 'entertainment',
    'youtube': 'entertainment',
    'cinema': 'entertainment',
    'movie': 'entertainment',
    'concert': 'entertainment',
    // Health
    'mercury drug': 'health',
    'watsons': 'health',
    'pharmacy': 'health',
    'hospital': 'health',
    'clinic': 'health',
    'doctor': 'health',
    'gamot': 'health',
    // Load
    'load': 'load',
    'data': 'load',
    'prepaid': 'load',
};

interface Transaction {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: 'cash' | 'card' | 'gcash' | 'maya';
    date: string;
}

interface QuickTransactionEntryProps {
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    className?: string;
}

export function QuickTransactionEntry({ onAddTransaction, className }: QuickTransactionEntryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);
    const [paymentType, setPaymentType] = useState<'cash' | 'card' | 'gcash' | 'maya'>('cash');
    const [showAllCategories, setShowAllCategories] = useState(false);

    // Smart categorization based on description
    const smartCategorize = useCallback((text: string) => {
        const lowerText = text.toLowerCase();

        for (const [pattern, category] of Object.entries(categoryPatterns)) {
            if (lowerText.includes(pattern)) {
                return category;
            }
        }

        return null;
    }, []);

    // Handle description change with smart categorization
    const handleDescriptionChange = (value: string) => {
        setDescription(value);

        if (value.length >= 3) {
            const suggested = smartCategorize(value);
            if (suggested && !selectedCategory) {
                setSuggestedCategory(suggested);
            }
        } else {
            setSuggestedCategory(null);
        }
    };

    // Accept suggested category
    const acceptSuggestion = () => {
        if (suggestedCategory) {
            setSelectedCategory(suggestedCategory);
            setSuggestedCategory(null);
        }
    };

    // Handle submit
    const handleSubmit = () => {
        if (!description || !amount || !selectedCategory) return;

        onAddTransaction({
            description,
            amount: parseFloat(amount),
            category: selectedCategory,
            type: paymentType,
            date: new Date().toISOString(),
        });

        // Reset form
        setDescription('');
        setAmount('');
        setSelectedCategory(null);
        setSuggestedCategory(null);
        setPaymentType('cash');
        setIsOpen(false);
    };

    const mainCategories = categories.slice(0, 6);
    const allCategories = showAllCategories ? categories : mainCategories;
    const currentCategory = selectedCategory || suggestedCategory;

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <PlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Add Gastos</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Smart categorization para less hassle</p>
                        </div>
                    </div>
                    {!isOpen && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all btn-press shadow-md shadow-blue-500/25"
                        >
                            + Add
                        </button>
                    )}
                </div>
            </div>

            {/* Form */}
            {isOpen && (
                <div className="p-4 space-y-4 animate-fade-in">
                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Saan ginastos?
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                                placeholder="e.g., Jollibee, Grab, Meralco..."
                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
                            />
                            {suggestedCategory && !selectedCategory && (
                                <button
                                    onClick={acceptSuggestion}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                                >
                                    <SparklesIcon className="w-3 h-3" />
                                    {categories.find(c => c.id === suggestedCategory)?.name}
                                    <CheckIcon className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Magkano?
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">₱</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-3 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Payment Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Paano binayaran?
                        </label>
                        <div className="flex gap-2">
                            {[
                                { id: 'cash', label: 'Cash', icon: '💵' },
                                { id: 'card', label: 'Card', icon: '💳' },
                                { id: 'gcash', label: 'GCash', icon: '📱' },
                                { id: 'maya', label: 'Maya', icon: '📲' },
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setPaymentType(type.id as typeof paymentType)}
                                    className={cn(
                                        'flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
                                        paymentType === type.id
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                                            : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    )}
                                >
                                    <span>{type.icon}</span>
                                    <span className="hidden sm:inline">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Category
                            </label>
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {showAllCategories ? 'Show less' : 'Show all'}
                            </button>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {allCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setSuggestedCategory(null);
                                    }}
                                    className={cn(
                                        'flex flex-col items-center gap-1 p-3 rounded-lg transition-all text-center',
                                        selectedCategory === category.id
                                            ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : suggestedCategory === category.id
                                                ? 'ring-2 ring-purple-400 ring-dashed bg-purple-50 dark:bg-purple-900/20'
                                                : 'bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    )}
                                >
                                    <span className="text-xl">{category.icon}</span>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                                </button>
                            ))}
                        </div>
                        {suggestedCategory && !selectedCategory && (
                            <p className="mt-2 text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                <SparklesIcon className="w-3 h-3" />
                                AI suggestion: {categories.find(c => c.id === suggestedCategory)?.name}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!description || !amount || !selectedCategory}
                            className={cn(
                                'flex-1 py-3 px-4 text-sm font-medium text-white rounded-lg transition-all btn-press',
                                description && amount && selectedCategory
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md shadow-green-500/25'
                                    : 'bg-gray-300 dark:bg-slate-600 cursor-not-allowed'
                            )}
                        >
                            ✓ Save
                        </button>
                    </div>
                </div>
            )}

            {/* Quick Stats when closed */}
            {!isOpen && (
                <div className="px-4 py-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        💡 Tip: Type kung saan ka bumili at mag-suggest ang AI ng category!
                    </p>
                </div>
            )}
        </div>
    );
}
