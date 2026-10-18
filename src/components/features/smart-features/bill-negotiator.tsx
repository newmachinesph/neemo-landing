'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Bill {
  id: string;
  name: string;
  provider: string;
  category: 'utilities' | 'subscriptions' | 'insurance' | 'loans' | 'other';
  monthlyAmount: number;
  lastYearAvg: number;
  marketAvg: number;
  potentialSavings: number;
  lastNegotiated?: string;
  tips: string[];
}

interface BillNegotiatorProps {
  bills?: Bill[];
  className?: string;
}

const demoBills: Bill[] = [
  {
    id: 'b1',
    name: 'Internet',
    provider: 'PLDT',
    category: 'utilities',
    monthlyAmount: 2899,
    lastYearAvg: 2899,
    marketAvg: 1899,
    potentialSavings: 1000,
    tips: [
      'Ask about loyalty discounts for long-term customers',
      'Mention competitor rates (Converge: ₱1,500 for 35mbps)',
      'Bundle with landline for lower rates',
      'Threaten to cancel - retention offers are often better',
    ],
  },
  {
    id: 'b2',
    name: 'Mobile Plan',
    provider: 'Globe',
    category: 'utilities',
    monthlyAmount: 1499,
    lastYearAvg: 1499,
    marketAvg: 999,
    potentialSavings: 500,
    tips: [
      'Compare with SIM-only plans',
      'Check if you actually use all your data allocation',
      'Ask about corporate/group discounts',
      'Consider prepaid if usage is light',
    ],
  },
  {
    id: 'b3',
    name: 'Netflix',
    provider: 'Netflix',
    category: 'subscriptions',
    monthlyAmount: 549,
    lastYearAvg: 449,
    marketAvg: 549,
    potentialSavings: 200,
    lastNegotiated: '2023-06-01',
    tips: [
      'Share with family (up to 4 profiles)',
      'Consider downgrading to Basic plan (₱149)',
      'Watch for annual subscription deals',
      'Use Netflix Party for shared viewing',
    ],
  },
  {
    id: 'b4',
    name: 'Spotify',
    provider: 'Spotify',
    category: 'subscriptions',
    monthlyAmount: 149,
    lastYearAvg: 129,
    marketAvg: 149,
    potentialSavings: 60,
    tips: [
      'Get Family plan and split with friends (₱194/6 = ₱32 each)',
      'Use Student discount if eligible (50% off)',
      'Check for yearly subscription deals',
    ],
  },
  {
    id: 'b5',
    name: 'Car Insurance',
    provider: 'Standard Insurance',
    category: 'insurance',
    monthlyAmount: 2500,
    lastYearAvg: 2300,
    marketAvg: 2000,
    potentialSavings: 500,
    tips: [
      'Get quotes from multiple insurers annually',
      'Increase deductible for lower premium',
      'Ask about safe driver discounts',
      'Bundle home and auto for savings',
    ],
  },
  {
    id: 'b6',
    name: 'Credit Card Annual Fee',
    provider: 'BDO',
    category: 'other',
    monthlyAmount: 208, // 2500/12
    lastYearAvg: 208,
    marketAvg: 0,
    potentialSavings: 208,
    tips: [
      'Call and ask for fee waiver (high success rate!)',
      'Mention you\'ll cancel if fee isn\'t waived',
      'Point out your good payment history',
      'Ask about cards with no annual fee',
    ],
  },
];

export function BillNegotiator({
  bills = demoBills,
  className,
}: BillNegotiatorProps) {
  const stats = useMemo(() => {
    const totalMonthly = bills.reduce((sum, b) => sum + b.monthlyAmount, 0);
    const totalPotentialSavings = bills.reduce((sum, b) => sum + b.potentialSavings, 0);
    const annualSavings = totalPotentialSavings * 12;
    const highestSaving = bills.reduce((max, b) =>
      b.potentialSavings > max.potentialSavings ? b : max, bills[0]);

    return { totalMonthly, totalPotentialSavings, annualSavings, highestSaving };
  }, [bills]);

  const sortedBills = useMemo(() => {
    return [...bills].sort((a, b) => b.potentialSavings - a.potentialSavings);
  }, [bills]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'utilities': return '💡';
      case 'subscriptions': return '📺';
      case 'insurance': return '🛡️';
      case 'loans': return '🏦';
      default: return '📋';
    }
  };

  const getSavingsColor = (savings: number) => {
    if (savings >= 500) return 'bg-green-100 text-green-700 border-green-300';
    if (savings >= 200) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💰</span>
          Bill Negotiator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Savings Overview */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-green-600 mb-1">Monthly Bills</p>
              <p className="text-xl font-bold text-green-800">₱{stats.totalMonthly.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Can Save/Month</p>
              <p className="text-xl font-bold text-green-800">₱{stats.totalPotentialSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Annual Savings</p>
              <p className="text-xl font-bold text-green-800">₱{stats.annualSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 mb-1">Best Target</p>
              <p className="text-xl font-bold text-green-800">{stats.highestSaving.name}</p>
            </div>
          </div>
        </div>

        {/* Priority List */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Bills to Negotiate (by savings potential)</h4>
          <div className="space-y-4">
            {sortedBills.map((bill, index) => (
              <div
                key={bill.id}
                className={`p-4 rounded-xl border-2 ${
                  index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCategoryIcon(bill.category)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{bill.name}</p>
                        {index === 0 && (
                          <span className="px-2 py-0.5 text-xs bg-green-200 text-green-800 rounded-full">
                            Top Priority
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{bill.provider}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border ${getSavingsColor(bill.potentialSavings)}`}>
                    <p className="text-sm font-bold">
                      Save ₱{bill.potentialSavings.toLocaleString()}/mo
                    </p>
                  </div>
                </div>

                {/* Comparison */}
                <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-500">You Pay</p>
                    <p className="font-semibold text-gray-900">₱{bill.monthlyAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600">Market Avg</p>
                    <p className="font-semibold text-blue-700">₱{bill.marketAvg.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600">Target</p>
                    <p className="font-semibold text-green-700">
                      ₱{(bill.monthlyAmount - bill.potentialSavings).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">💡 Negotiation Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {bill.tips.slice(0, 2).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    View All Tips
                  </button>
                  <button className="py-2 px-4 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    Call Now
                  </button>
                  <button className="py-2 px-4 bg-green-100 text-green-700 text-sm rounded-lg font-medium hover:bg-green-200 transition-colors">
                    ✓ Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiation Scripts */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-3">📞 Sample Negotiation Script</h4>
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 italic">
              &quot;Hi, I&apos;ve been a loyal customer for [X years] and I noticed my bill is higher than
              what competitors are offering. I&apos;d like to discuss getting a better rate, or I may
              need to consider switching providers. Can you help me with any loyalty discounts or
              promotions?&quot;
            </p>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 Be polite but firm. If the first rep can&apos;t help, ask for the retention department.
          </p>
        </div>

        {/* Success Stories */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-3">⭐ Success Stories</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">PLDT Internet fee waiver</span>
              <span className="font-semibold text-green-600">Saved ₱600/mo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">BDO credit card annual fee waived</span>
              <span className="font-semibold text-green-600">Saved ₱2,500/yr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Globe plan downgrade</span>
              <span className="font-semibold text-green-600">Saved ₱400/mo</span>
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-3">
            Average user saves ₱15,000/year by negotiating bills!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
