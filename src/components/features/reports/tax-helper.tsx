'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DeductibleExpense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  hasReceipt: boolean;
}

interface TaxHelperProps {
  year: number;
  grossIncome: number;
  deductibleExpenses: DeductibleExpense[];
  isFreelancer: boolean;
  onExportReport?: () => void;
  currency?: string;
  className?: string;
}

// Philippine tax brackets for 2023 onwards
const taxBrackets = [
  { min: 0, max: 250000, rate: 0, base: 0 },
  { min: 250000, max: 400000, rate: 0.15, base: 0 },
  { min: 400000, max: 800000, rate: 0.20, base: 22500 },
  { min: 800000, max: 2000000, rate: 0.25, base: 102500 },
  { min: 2000000, max: 8000000, rate: 0.30, base: 402500 },
  { min: 8000000, max: Infinity, rate: 0.35, base: 2202500 },
];

const deductibleCategories = [
  { id: 'office_supplies', name: 'Office Supplies', icon: '🖊️', description: 'Paper, pens, ink, etc.' },
  { id: 'equipment', name: 'Equipment', icon: '💻', description: 'Computer, printer, furniture' },
  { id: 'internet', name: 'Internet & Phone', icon: '📶', description: 'Business internet and phone bills' },
  { id: 'transportation', name: 'Transportation', icon: '🚗', description: 'Business travel and commute' },
  { id: 'professional_fees', name: 'Professional Fees', icon: '💼', description: 'Accountant, lawyer fees' },
  { id: 'rent', name: 'Home Office', icon: '🏠', description: 'Portion of rent/utilities for home office' },
  { id: 'education', name: 'Training & Education', icon: '📚', description: 'Courses and certifications' },
  { id: 'marketing', name: 'Marketing', icon: '📣', description: 'Advertising, website, business cards' },
  { id: 'insurance', name: 'Business Insurance', icon: '🛡️', description: 'Professional liability insurance' },
  { id: 'subscriptions', name: 'Subscriptions', icon: '📱', description: 'Software and tool subscriptions' },
];

const calculateTax = (taxableIncome: number): number => {
  for (const bracket of taxBrackets) {
    if (taxableIncome >= bracket.min && taxableIncome < bracket.max) {
      return bracket.base + (taxableIncome - bracket.min) * bracket.rate;
    }
  }
  return 0;
};

export function TaxHelper({
  year,
  grossIncome,
  deductibleExpenses,
  isFreelancer,
  onExportReport,
  currency = '₱',
  className,
}: TaxHelperProps) {
  const calculations = useMemo(() => {
    const totalDeductions = deductibleExpenses.reduce((sum, e) => sum + e.amount, 0);
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    const estimatedTax = calculateTax(taxableIncome);
    const taxWithoutDeductions = calculateTax(grossIncome);
    const taxSavings = taxWithoutDeductions - estimatedTax;
    const effectiveRate = grossIncome > 0 ? (estimatedTax / grossIncome) * 100 : 0;

    // Group by category
    const byCategory = deductibleExpenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = { amount: 0, count: 0 };
      }
      acc[exp.category].amount += exp.amount;
      acc[exp.category].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; count: number }>);

    // Expenses without receipts
    const withoutReceipts = deductibleExpenses.filter((e) => !e.hasReceipt);
    const withoutReceiptsTotal = withoutReceipts.reduce((sum, e) => sum + e.amount, 0);

    return {
      totalDeductions,
      taxableIncome,
      estimatedTax,
      taxSavings,
      effectiveRate,
      byCategory,
      withoutReceipts,
      withoutReceiptsTotal,
    };
  }, [grossIncome, deductibleExpenses]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📋</span>
            Tax Helper {year}
          </span>
          {isFreelancer && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              Freelancer
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tax Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-blue-600 mb-1">Gross Income</p>
            <p className="text-xl font-bold text-blue-700">
              {currency}{grossIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs text-green-600 mb-1">Deductions</p>
            <p className="text-xl font-bold text-green-700">
              -{currency}{calculations.totalDeductions.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-xs text-purple-600 mb-1">Taxable Income</p>
            <p className="text-xl font-bold text-purple-700">
              {currency}{calculations.taxableIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-xs text-orange-600 mb-1">Estimated Tax</p>
            <p className="text-xl font-bold text-orange-700">
              {currency}{Math.round(calculations.estimatedTax).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tax Savings */}
        {calculations.taxSavings > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">You saved on taxes</p>
                <p className="text-2xl font-bold text-green-600">
                  {currency}{Math.round(calculations.taxSavings).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Effective Rate</p>
                <p className="text-xl font-bold text-gray-900">
                  {calculations.effectiveRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deductions by Category */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Deductions by Category</h4>
          <div className="space-y-2">
            {Object.entries(calculations.byCategory)
              .sort(([, a], [, b]) => b.amount - a.amount)
              .map(([category, data]) => {
                const catInfo = deductibleCategories.find((c) => c.id === category);
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{catInfo?.icon || '📦'}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {catInfo?.name || category}
                        </p>
                        <p className="text-xs text-gray-500">{data.count} items</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {currency}{data.amount.toLocaleString()}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Missing Receipts Warning */}
        {calculations.withoutReceipts.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <span>⚠️</span>
              <span className="font-medium">Missing Receipts</span>
            </div>
            <p className="text-sm text-yellow-600 mb-2">
              {calculations.withoutReceipts.length} expenses ({currency}{calculations.withoutReceiptsTotal.toLocaleString()})
              don&apos;t have receipts attached. These may not be accepted by BIR.
            </p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {calculations.withoutReceipts.slice(0, 5).map((exp) => (
                <p key={exp.id} className="text-xs text-yellow-700">
                  • {exp.description} - {currency}{exp.amount.toLocaleString()}
                </p>
              ))}
              {calculations.withoutReceipts.length > 5 && (
                <p className="text-xs text-yellow-600">
                  +{calculations.withoutReceipts.length - 5} more...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Deductible Categories Reference */}
        <details className="mb-6">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600">
            📚 Common Deductible Expenses for Freelancers
          </summary>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {deductibleCategories.map((cat) => (
              <div key={cat.id} className="p-2 bg-gray-50 rounded-lg text-xs">
                <p className="font-medium text-gray-900">
                  {cat.icon} {cat.name}
                </p>
                <p className="text-gray-500">{cat.description}</p>
              </div>
            ))}
          </div>
        </details>

        {/* Tax Bracket Reference */}
        <details className="mb-6">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600">
            📊 Philippine Tax Brackets ({year})
          </summary>
          <div className="mt-3 space-y-2">
            {taxBrackets.slice(0, -1).map((bracket, index) => (
              <div
                key={index}
                className={cn(
                  'p-2 rounded-lg text-sm',
                  calculations.taxableIncome >= bracket.min && calculations.taxableIncome < bracket.max
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-gray-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {currency}{bracket.min.toLocaleString()} - {currency}{bracket.max.toLocaleString()}
                  </span>
                  <span className="font-medium text-gray-900">{(bracket.rate * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Export Button */}
        {onExportReport && (
          <Button onClick={onExportReport} className="w-full">
            📄 Export Tax Report
          </Button>
        )}

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          This is an estimate only. Please consult a tax professional for accurate tax filing.
        </p>
      </CardContent>
    </Card>
  );
}

export { calculateTax, taxBrackets, deductibleCategories };
export type { DeductibleExpense };
