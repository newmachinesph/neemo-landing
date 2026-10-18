'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    AcademicCapIcon,
    CalendarDaysIcon,
    BanknotesIcon,
    CheckCircleIcon,
    CalculatorIcon,
} from '@heroicons/react/24/outline';

interface TuitionPlan {
    id: string;
    schoolName: string;
    studentName: string;
    totalTuition: number;
    dueDate: string;
    monthsToSave: number;
    monthlySavings: number;
    currentSaved: number;
}

interface TuitionPlannerProps {
    plans?: TuitionPlan[];
    onUpdatePlans?: (plans: TuitionPlan[]) => void;
    className?: string;
}

export function TuitionPlanner({
    plans: initialPlans,
    onUpdatePlans,
    className,
}: TuitionPlannerProps) {
    const [plans, setPlans] = useState<TuitionPlan[]>(initialPlans || []);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPlan, setNewPlan] = useState({
        schoolName: '',
        studentName: '',
        totalTuition: '',
        dueDate: '',
    });

    // Calculate months until due date
    const calculateMonths = (dueDate: string): number => {
        const today = new Date();
        const due = new Date(dueDate);
        const months = (due.getFullYear() - today.getFullYear()) * 12 + (due.getMonth() - today.getMonth());
        return Math.max(1, months);
    };

    // Add new plan
    const addPlan = () => {
        if (!newPlan.schoolName || !newPlan.totalTuition || !newPlan.dueDate) return;

        const total = parseFloat(newPlan.totalTuition);
        const months = calculateMonths(newPlan.dueDate);

        const plan: TuitionPlan = {
            id: `tuition-${Date.now()}`,
            schoolName: newPlan.schoolName,
            studentName: newPlan.studentName || 'Student',
            totalTuition: total,
            dueDate: newPlan.dueDate,
            monthsToSave: months,
            monthlySavings: Math.ceil(total / months),
            currentSaved: 0,
        };

        const updated = [...plans, plan];
        setPlans(updated);
        onUpdatePlans?.(updated);
        setNewPlan({ schoolName: '', studentName: '', totalTuition: '', dueDate: '' });
        setShowAddForm(false);
    };

    // Add savings to a plan
    const addSavings = (id: string, amount: number) => {
        const updated = plans.map(p =>
            p.id === id ? { ...p, currentSaved: Math.min(p.totalTuition, p.currentSaved + amount) } : p
        );
        setPlans(updated);
        onUpdatePlans?.(updated);
    };

    // Delete plan
    const deletePlan = (id: string) => {
        const updated = plans.filter(p => p.id !== id);
        setPlans(updated);
        onUpdatePlans?.(updated);
    };

    // Calculate totals
    const totalTuition = plans.reduce((sum, p) => sum + p.totalTuition, 0);
    const totalSaved = plans.reduce((sum, p) => sum + p.currentSaved, 0);
    const totalMonthly = plans.reduce((sum, p) => sum + p.monthlySavings, 0);

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
                            <AcademicCapIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tuition Planner</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Plan semestral/yearly fees</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    >
                        + Add Plan
                    </button>
                </div>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="School Name"
                            value={newPlan.schoolName}
                            onChange={(e) => setNewPlan({ ...newPlan, schoolName: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="Student Name (optional)"
                            value={newPlan.studentName}
                            onChange={(e) => setNewPlan({ ...newPlan, studentName: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                            <input
                                type="number"
                                placeholder="Total Tuition"
                                value={newPlan.totalTuition}
                                onChange={(e) => setNewPlan({ ...newPlan, totalTuition: e.target.value })}
                                className="w-full pl-7 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                            />
                        </div>
                        <input
                            type="date"
                            value={newPlan.dueDate}
                            onChange={(e) => setNewPlan({ ...newPlan, dueDate: e.target.value })}
                            className="px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white"
                        />
                    </div>
                    {newPlan.totalTuition && newPlan.dueDate && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                💡 You need to save{' '}
                                <strong>
                                    {formatCurrency(Math.ceil(parseFloat(newPlan.totalTuition) / calculateMonths(newPlan.dueDate)))}
                                </strong>{' '}
                                per month for {calculateMonths(newPlan.dueDate)} months
                            </p>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex-1 py-2 text-sm bg-gray-200 dark:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addPlan}
                            className="flex-1 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Add Plan
                        </button>
                    </div>
                </div>
            )}

            {/* Plans List */}
            {plans.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                    {plans.map((plan) => {
                        const progress = (plan.currentSaved / plan.totalTuition) * 100;
                        const isComplete = plan.currentSaved >= plan.totalTuition;

                        return (
                            <div key={plan.id} className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">🎓</span>
                                            <p className="font-medium text-gray-900 dark:text-white">{plan.schoolName}</p>
                                            {isComplete && (
                                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {plan.studentName} • Due: {new Date(plan.dueDate).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => deletePlan(plan.id)}
                                        className="text-xs text-gray-400 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {/* Progress */}
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {formatCurrency(plan.currentSaved)} saved
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {formatCurrency(plan.totalTuition)}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all',
                                                isComplete ? 'bg-green-500' : 'bg-blue-500'
                                            )}
                                            style={{ width: `${Math.min(100, progress)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Monthly Target & Quick Add */}
                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
                                        Save {formatCurrency(plan.monthlySavings)}/mo
                                    </div>
                                    {!isComplete && (
                                        <div className="flex gap-1">
                                            {[1000, 5000, 10000].map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() => addSavings(plan.id, amount)}
                                                    className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded hover:bg-blue-100"
                                                >
                                                    +{formatCurrency(amount)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-8 text-center">
                    <AcademicCapIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No tuition plans yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add a plan to start tracking</p>
                </div>
            )}

            {/* Summary */}
            {plans.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-t border-gray-100 dark:border-slate-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalTuition)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Needed</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(totalSaved)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Saved</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{formatCurrency(totalMonthly)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
