'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    ArrowPathIcon,
    PlusIcon,
    TrashIcon,
    PencilIcon,
    CheckIcon,
    CalendarDaysIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';

type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';

interface RecurringTemplate {
    id: string;
    name: string;
    amount: number;
    category: string;
    frequency: Frequency;
    nextDue: string;
    isActive: boolean;
    notes?: string;
}

// Common Filipino recurring expenses
const defaultTemplates: RecurringTemplate[] = [
    { id: '1', name: 'Netflix', amount: 549, category: 'entertainment', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '2', name: 'Spotify', amount: 129, category: 'entertainment', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '3', name: 'Gym Membership', amount: 2500, category: 'health', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '4', name: 'Rent/Upa', amount: 15000, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '5', name: 'Yaya Salary', amount: 8000, category: 'personal', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '6', name: 'SSS Contribution', amount: 1400, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '7', name: 'PhilHealth', amount: 400, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '8', name: 'Pag-IBIG', amount: 200, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '9', name: 'Internet (PLDT/Globe)', amount: 1899, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
    { id: '10', name: 'Prepaid Load', amount: 300, category: 'bills', frequency: 'monthly', nextDue: '', isActive: false },
];

const frequencyLabels: Record<Frequency, string> = {
    daily: 'Araw-araw',
    weekly: 'Lingguhan',
    biweekly: 'Every 2 Weeks',
    monthly: 'Buwan-buwan',
    quarterly: 'Every 3 Months',
    yearly: 'Taon-taon',
};

const categoryColors: Record<string, string> = {
    entertainment: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    health: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    bills: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    personal: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    food: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    transport: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    other: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
};

interface RecurringTemplatesProps {
    templates?: RecurringTemplate[];
    onSave?: (templates: RecurringTemplate[]) => void;
    className?: string;
}

export function RecurringTemplates({
    templates: initialTemplates,
    onSave,
    className
}: RecurringTemplatesProps) {
    const [templates, setTemplates] = useState<RecurringTemplate[]>(initialTemplates || defaultTemplates);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTemplate, setNewTemplate] = useState<Partial<RecurringTemplate>>({
        name: '',
        amount: 0,
        category: 'bills',
        frequency: 'monthly',
    });

    // Toggle template active state
    const toggleActive = (id: string) => {
        const updated = templates.map(t =>
            t.id === id ? { ...t, isActive: !t.isActive, nextDue: t.nextDue || new Date().toISOString() } : t
        );
        setTemplates(updated);
        onSave?.(updated);
    };

    // Delete template
    const deleteTemplate = (id: string) => {
        const updated = templates.filter(t => t.id !== id);
        setTemplates(updated);
        onSave?.(updated);
    };

    // Add new template
    const addTemplate = () => {
        if (!newTemplate.name || !newTemplate.amount) return;

        const template: RecurringTemplate = {
            id: `custom-${Date.now()}`,
            name: newTemplate.name,
            amount: newTemplate.amount,
            category: newTemplate.category || 'other',
            frequency: newTemplate.frequency || 'monthly',
            nextDue: new Date().toISOString(),
            isActive: true,
        };

        const updated = [...templates, template];
        setTemplates(updated);
        onSave?.(updated);
        setNewTemplate({ name: '', amount: 0, category: 'bills', frequency: 'monthly' });
        setShowAddForm(false);
    };

    // Calculate total monthly recurring
    const totalMonthly = templates
        .filter(t => t.isActive)
        .reduce((sum, t) => {
            const multiplier = {
                daily: 30,
                weekly: 4.33,
                biweekly: 2.17,
                monthly: 1,
                quarterly: 0.33,
                yearly: 0.083,
            }[t.frequency];
            return sum + (t.amount * multiplier);
        }, 0);

    const activeCount = templates.filter(t => t.isActive).length;

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <ArrowPathIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recurring Expenses</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activeCount} active • {formatCurrency(totalMonthly)}/month
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Name (e.g., Netflix)"
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                        />
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newTemplate.amount || ''}
                                onChange={(e) => setNewTemplate({ ...newTemplate, amount: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-7 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={newTemplate.category}
                            onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                        >
                            <option value="bills">Bills</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="health">Health</option>
                            <option value="personal">Personal</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="other">Other</option>
                        </select>
                        <select
                            value={newTemplate.frequency}
                            onChange={(e) => setNewTemplate({ ...newTemplate, frequency: e.target.value as Frequency })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                        >
                            {Object.entries(frequencyLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addTemplate}
                            disabled={!newTemplate.name || !newTemplate.amount}
                            className="flex-1 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-slate-600"
                        >
                            Add Template
                        </button>
                    </div>
                </div>
            )}

            {/* Templates List */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={cn(
                            'flex items-center justify-between p-4 transition-colors',
                            template.isActive ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-800/50'
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {/* Toggle */}
                            <button
                                onClick={() => toggleActive(template.id)}
                                className={cn(
                                    'w-10 h-6 rounded-full transition-colors relative',
                                    template.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'
                                )}
                            >
                                <div
                                    className={cn(
                                        'absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform shadow',
                                        template.isActive ? 'translate-x-4.5 left-0.5' : 'left-0.5'
                                    )}
                                    style={{ transform: template.isActive ? 'translateX(18px)' : 'translateX(0)' }}
                                />
                            </button>

                            <div>
                                <p className={cn(
                                    'text-sm font-medium',
                                    template.isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                                )}>
                                    {template.name}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={cn('px-1.5 py-0.5 text-xs rounded', categoryColors[template.category] || categoryColors.other)}>
                                        {template.category}
                                    </span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                        {frequencyLabels[template.frequency]}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={cn(
                                'text-sm font-semibold',
                                template.isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                            )}>
                                {formatCurrency(template.amount)}
                            </span>
                            <button
                                onClick={() => deleteTemplate(template.id)}
                                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Footer */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalMonthly)}</span>
                </div>
            </div>
        </div>
    );
}
