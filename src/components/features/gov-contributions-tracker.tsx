'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
    BuildingLibraryIcon,
    CalculatorIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Contribution {
    type: 'sss' | 'philhealth' | 'pagibig';
    amount: number;
    employerShare?: number;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
}

interface GovContributionsTrackerProps {
    monthlySalary?: number;
    contributions?: Contribution[];
    onUpdateContributions?: (contributions: Contribution[]) => void;
    className?: string;
}

// 2024 SSS Contribution Table (simplified)
const calculateSSS = (salary: number): { employeeShare: number; employerShare: number; total: number } => {
    // Simplified SSS calculation based on salary brackets
    const brackets = [
        { min: 0, max: 4250, ee: 180, er: 390 },
        { min: 4250, max: 4750, ee: 202.5, er: 427.5 },
        { min: 4750, max: 5250, ee: 225, er: 475 },
        { min: 5250, max: 5750, ee: 247.5, er: 522.5 },
        { min: 5750, max: 6250, ee: 270, er: 570 },
        { min: 6250, max: 6750, ee: 292.5, er: 617.5 },
        { min: 6750, max: 7250, ee: 315, er: 665 },
        { min: 7250, max: 7750, ee: 337.5, er: 712.5 },
        { min: 7750, max: 8250, ee: 360, er: 760 },
        { min: 8250, max: 8750, ee: 382.5, er: 807.5 },
        { min: 8750, max: 9250, ee: 405, er: 855 },
        { min: 9250, max: 9750, ee: 427.5, er: 902.5 },
        { min: 9750, max: 10250, ee: 450, er: 950 },
        { min: 10250, max: 10750, ee: 472.5, er: 997.5 },
        { min: 10750, max: 11250, ee: 495, er: 1045 },
        { min: 11250, max: 11750, ee: 517.5, er: 1092.5 },
        { min: 11750, max: 12250, ee: 540, er: 1140 },
        { min: 12250, max: 12750, ee: 562.5, er: 1187.5 },
        { min: 12750, max: 13250, ee: 585, er: 1235 },
        { min: 13250, max: 13750, ee: 607.5, er: 1282.5 },
        { min: 13750, max: 14250, ee: 630, er: 1330 },
        { min: 14250, max: 14750, ee: 652.5, er: 1377.5 },
        { min: 14750, max: 15250, ee: 675, er: 1425 },
        { min: 15250, max: 15750, ee: 697.5, er: 1472.5 },
        { min: 15750, max: 16250, ee: 720, er: 1520 },
        { min: 16250, max: 16750, ee: 742.5, er: 1567.5 },
        { min: 16750, max: 17250, ee: 765, er: 1615 },
        { min: 17250, max: 17750, ee: 787.5, er: 1662.5 },
        { min: 17750, max: 18250, ee: 810, er: 1710 },
        { min: 18250, max: 18750, ee: 832.5, er: 1757.5 },
        { min: 18750, max: 19250, ee: 855, er: 1805 },
        { min: 19250, max: 19750, ee: 877.5, er: 1852.5 },
        { min: 19750, max: 29750, ee: 900, er: 1900 },
        { min: 29750, max: Infinity, ee: 1350, er: 2850 },
    ];

    const bracket = brackets.find(b => salary >= b.min && salary < b.max) || brackets[brackets.length - 1];
    return {
        employeeShare: bracket.ee,
        employerShare: bracket.er,
        total: bracket.ee + bracket.er,
    };
};

// PhilHealth calculation (2024)
const calculatePhilHealth = (salary: number): { employeeShare: number; employerShare: number; total: number } => {
    // 5% of monthly basic salary (split 50-50)
    const rate = 0.05;
    const minContrib = 500; // Minimum monthly contribution
    const maxContrib = 5000; // Maximum monthly contribution (for now)

    let contribution = salary * rate;
    contribution = Math.max(minContrib, Math.min(maxContrib, contribution));

    const share = contribution / 2;
    return {
        employeeShare: share,
        employerShare: share,
        total: contribution,
    };
};

// Pag-IBIG calculation
const calculatePagIBIG = (salary: number): { employeeShare: number; employerShare: number; total: number } => {
    // Employee: 1% if salary <= 1500, 2% if > 1500 (max ₱100)
    // Employer: 2% (max ₱100)
    const employeeRate = salary <= 1500 ? 0.01 : 0.02;
    const employerRate = 0.02;

    const employeeShare = Math.min(salary * employeeRate, 100);
    const employerShare = Math.min(salary * employerRate, 100);

    return {
        employeeShare,
        employerShare,
        total: employeeShare + employerShare,
    };
};

export function GovContributionsTracker({
    monthlySalary: initialSalary = 25000,
    contributions: initialContributions,
    onUpdateContributions,
    className,
}: GovContributionsTrackerProps) {
    const [monthlySalary, setMonthlySalary] = useState(initialSalary);
    const [contributions, setContributions] = useState<Contribution[]>(initialContributions || []);

    // Calculate contributions based on salary
    const calculatedContributions = useMemo(() => {
        return {
            sss: calculateSSS(monthlySalary),
            philhealth: calculatePhilHealth(monthlySalary),
            pagibig: calculatePagIBIG(monthlySalary),
        };
    }, [monthlySalary]);

    const totalMonthlyEmployee =
        calculatedContributions.sss.employeeShare +
        calculatedContributions.philhealth.employeeShare +
        calculatedContributions.pagibig.employeeShare;

    const totalMonthlyEmployer =
        calculatedContributions.sss.employerShare +
        calculatedContributions.philhealth.employerShare +
        calculatedContributions.pagibig.employerShare;

    const totalYearlyEmployee = totalMonthlyEmployee * 12;

    const contributionTypes = [
        {
            id: 'sss',
            name: 'SSS',
            icon: '🏛️',
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
            borderColor: 'border-blue-200 dark:border-blue-800',
            ...calculatedContributions.sss,
        },
        {
            id: 'philhealth',
            name: 'PhilHealth',
            icon: '🏥',
            color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            borderColor: 'border-green-200 dark:border-green-800',
            ...calculatedContributions.philhealth,
        },
        {
            id: 'pagibig',
            name: 'Pag-IBIG',
            icon: '🏠',
            color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
            borderColor: 'border-orange-200 dark:border-orange-800',
            ...calculatedContributions.pagibig,
        },
    ];

    return (
        <div className={cn(
            'bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden',
            className
        )}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <BuildingLibraryIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gov Contributions</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SSS, PhilHealth, Pag-IBIG Calculator</p>
                    </div>
                </div>
            </div>

            {/* Salary Input */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Basic Salary
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₱</span>
                    <input
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(parseInt(e.target.value) || 0)}
                        className="w-full pl-7 pr-3 py-2 text-lg font-medium bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Contribution Breakdown */}
            <div className="p-4 space-y-3">
                {contributionTypes.map((contrib) => (
                    <div
                        key={contrib.id}
                        className={cn(
                            'p-4 rounded-lg border',
                            contrib.color,
                            contrib.borderColor
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{contrib.icon}</span>
                                <span className="font-semibold">{contrib.name}</span>
                            </div>
                            <span className="text-lg font-bold">{formatCurrency(contrib.employeeShare)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="opacity-75">Your Share:</span>
                                <span className="ml-1 font-medium">{formatCurrency(contrib.employeeShare)}</span>
                            </div>
                            <div>
                                <span className="opacity-75">Employer Share:</span>
                                <span className="ml-1 font-medium">{formatCurrency(contrib.employerShare)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-t border-gray-100 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatCurrency(totalMonthlyEmployee)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your Monthly Total</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {formatCurrency(totalYearlyEmployee)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Yearly Total</p>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Employer Total Contribution:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalMonthlyEmployer)}/mo</span>
                    </div>
                </div>
            </div>

            {/* Tip */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                        Tip: Check your SSS, PhilHealth, and Pag-IBIG online portals to verify your employer is remitting correctly.
                    </p>
                </div>
            </div>
        </div>
    );
}
