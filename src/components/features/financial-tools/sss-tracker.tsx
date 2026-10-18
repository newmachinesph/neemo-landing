'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Contribution {
  id: string;
  month: string;
  employeeShare: number;
  employerShare: number;
  total: number;
  status: 'posted' | 'pending' | 'missing';
}

interface SSSTrackerProps {
  contributions?: Contribution[];
  monthlyCredit?: number;
  sssNumber?: string;
  employmentType?: 'employed' | 'self-employed' | 'voluntary';
  className?: string;
}

const demoContributions: Contribution[] = [
  { id: 'c1', month: '2024-06', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c2', month: '2024-05', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c3', month: '2024-04', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c4', month: '2024-03', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c5', month: '2024-02', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c6', month: '2024-01', employeeShare: 900, employerShare: 1900, total: 2800, status: 'posted' },
  { id: 'c7', month: '2023-12', employeeShare: 800, employerShare: 1700, total: 2500, status: 'posted' },
  { id: 'c8', month: '2023-11', employeeShare: 800, employerShare: 1700, total: 2500, status: 'posted' },
  { id: 'c9', month: '2023-10', employeeShare: 800, employerShare: 1700, total: 2500, status: 'missing' },
];

const benefitsData = [
  { name: 'Sickness Benefit', icon: '🏥', description: '90% of daily salary credit', minContributions: 3 },
  { name: 'Maternity Benefit', icon: '👶', description: '100% of daily salary credit for 105 days', minContributions: 3 },
  { name: 'Disability Benefit', icon: '♿', description: 'Monthly pension or lump sum', minContributions: 36 },
  { name: 'Retirement Benefit', icon: '👴', description: 'Monthly pension at 60+', minContributions: 120 },
  { name: 'Death Benefit', icon: '🕊️', description: 'Pension or lump sum for beneficiaries', minContributions: 36 },
  { name: 'Funeral Benefit', icon: '⚱️', description: '₱40,000 grant', minContributions: 1 },
  { name: 'Unemployment Benefit', icon: '📋', description: '50% of monthly salary credit for 2 months', minContributions: 36 },
];

export function SSSTracker({
  contributions = demoContributions,
  monthlyCredit = 25000,
  sssNumber = '34-1234567-8',
  employmentType = 'employed',
  className,
}: SSSTrackerProps) {
  const stats = useMemo(() => {
    const totalContributions = contributions.filter(c => c.status === 'posted').length;
    const totalAmount = contributions.reduce((sum, c) => c.status === 'posted' ? sum + c.total : sum, 0);
    const missingMonths = contributions.filter(c => c.status === 'missing').length;
    const thisYearContributions = contributions.filter(
      c => c.month.startsWith(new Date().getFullYear().toString()) && c.status === 'posted'
    ).length;

    return { totalContributions, totalAmount, missingMonths, thisYearContributions };
  }, [contributions]);

  // Estimate retirement benefit (simplified)
  const estimatedPension = useMemo(() => {
    const yearsOfService = Math.floor(stats.totalContributions / 12);
    // Simplified calculation - actual SSS formula is more complex
    const basePension = monthlyCredit * 0.2 * Math.min(yearsOfService, 30) / 30;
    return Math.max(basePension, 2000); // Minimum pension
  }, [stats.totalContributions, monthlyCredit]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🏛️</span>
            SSS Contribution Tracker
          </span>
          <span className="text-sm font-normal text-gray-500">
            {sssNumber}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Contributions</p>
            <p className="text-xl font-bold text-blue-700">{stats.totalContributions} months</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-green-700">₱{stats.totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Monthly Credit</p>
            <p className="text-xl font-bold text-purple-700">₱{monthlyCredit.toLocaleString()}</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${stats.missingMonths > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            <p className={`text-xs mb-1 ${stats.missingMonths > 0 ? 'text-red-600' : 'text-green-600'}`}>Missing Months</p>
            <p className={`text-xl font-bold ${stats.missingMonths > 0 ? 'text-red-700' : 'text-green-700'}`}>
              {stats.missingMonths}
            </p>
          </div>
        </div>

        {/* Retirement Projection */}
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Estimated Monthly Pension</p>
              <p className="text-xs text-orange-600">Based on current contributions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-700">₱{estimatedPension.toLocaleString()}</p>
              <p className="text-xs text-orange-600">at age 60</p>
            </div>
          </div>
          <p className="text-xs text-orange-500 mt-2">
            * Actual pension depends on total contributions and salary credits
          </p>
        </div>

        {/* Benefits Eligibility */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Benefits Eligibility</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {benefitsData.map((benefit) => {
              const isEligible = stats.totalContributions >= benefit.minContributions;
              return (
                <div
                  key={benefit.name}
                  className={`p-3 rounded-lg border ${isEligible ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{benefit.icon}</span>
                    <span className={`text-sm font-medium ${isEligible ? 'text-green-700' : 'text-gray-500'}`}>
                      {benefit.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {isEligible ? '✓ Eligible' : `Need ${benefit.minContributions - stats.totalContributions} more months`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contribution History */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Contribution History</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {contributions.map((c) => (
              <div
                key={c.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  c.status === 'posted' ? 'bg-green-50' :
                  c.status === 'missing' ? 'bg-red-50' : 'bg-yellow-50'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(c.month + '-01').toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    EE: ₱{c.employeeShare.toLocaleString()} | ER: ₱{c.employerShare.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₱{c.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === 'posted' ? 'bg-green-100 text-green-700' :
                    c.status === 'missing' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
