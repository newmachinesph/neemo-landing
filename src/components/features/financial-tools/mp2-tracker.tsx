'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MP2Contribution {
  id: string;
  date: string;
  amount: number;
  type: 'regular' | 'voluntary';
}

interface MP2TrackerProps {
  contributions?: MP2Contribution[];
  currentDividendRate?: number;
  memberSince?: string;
  onAddContribution?: (contribution: Omit<MP2Contribution, 'id'>) => void;
  currency?: string;
  className?: string;
}

const demoContributions: MP2Contribution[] = [
  { id: 'c1', date: '2024-01-15', amount: 5000, type: 'voluntary' },
  { id: 'c2', date: '2024-02-15', amount: 5000, type: 'voluntary' },
  { id: 'c3', date: '2024-03-15', amount: 5000, type: 'voluntary' },
  { id: 'c4', date: '2024-04-15', amount: 5000, type: 'voluntary' },
  { id: 'c5', date: '2024-05-15', amount: 10000, type: 'voluntary' },
  { id: 'c6', date: '2024-06-15', amount: 5000, type: 'voluntary' },
  { id: 'c7', date: '2023-01-15', amount: 5000, type: 'voluntary' },
  { id: 'c8', date: '2023-06-15', amount: 5000, type: 'voluntary' },
  { id: 'c9', date: '2023-12-15', amount: 5000, type: 'voluntary' },
];

export function MP2Tracker({
  contributions = demoContributions,
  currentDividendRate = 7.03,
  memberSince = '2023-01-01',
  onAddContribution,
  currency = '₱',
  className,
}: MP2TrackerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [projectionYears, setProjectionYears] = useState(5);

  const stats = useMemo(() => {
    const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
    const yearlyContributions = contributions
      .filter(c => new Date(c.date).getFullYear() === new Date().getFullYear())
      .reduce((sum, c) => sum + c.amount, 0);

    // Simple dividend calculation (actual MP2 calculation is more complex)
    const estimatedDividends = totalContributions * (currentDividendRate / 100);
    const totalValue = totalContributions + estimatedDividends;

    return { totalContributions, yearlyContributions, estimatedDividends, totalValue };
  }, [contributions, currentDividendRate]);

  const projections = useMemo(() => {
    const monthlyContribution = 5000; // Assumed monthly
    const results = [];
    let balance = stats.totalContributions;

    for (let year = 1; year <= projectionYears; year++) {
      const yearlyAddition = monthlyContribution * 12;
      const startBalance = balance + yearlyAddition;
      const dividends = startBalance * (currentDividendRate / 100);
      balance = startBalance + dividends;
      results.push({
        year,
        contributions: yearlyAddition,
        dividends,
        balance,
      });
    }

    return results;
  }, [stats.totalContributions, currentDividendRate, projectionYears]);

  const membershipYears = Math.floor(
    (new Date().getTime() - new Date(memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
  const canWithdraw = membershipYears >= 5;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🏦</span>
            MP2 Pag-IBIG Tracker
          </span>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            + Add Contribution
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Total Contributions</p>
            <p className="text-xl font-bold text-green-700">
              {currency}{stats.totalContributions.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Est. Dividends</p>
            <p className="text-xl font-bold text-blue-700">
              {currency}{stats.estimatedDividends.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Total Value</p>
            <p className="text-xl font-bold text-purple-700">
              {currency}{stats.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <p className="text-xs text-yellow-600 mb-1">Dividend Rate</p>
            <p className="text-xl font-bold text-yellow-700">
              {currentDividendRate}%
            </p>
          </div>
        </div>

        {/* Membership Status */}
        <div className={`p-4 rounded-xl mb-6 ${canWithdraw ? 'bg-green-50' : 'bg-orange-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${canWithdraw ? 'text-green-700' : 'text-orange-700'}`}>
                {canWithdraw ? '✓ Eligible for Withdrawal' : '⏳ Maturity in Progress'}
              </p>
              <p className={`text-sm ${canWithdraw ? 'text-green-600' : 'text-orange-600'}`}>
                Member since {new Date(memberSince).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                {' '}({membershipYears} year{membershipYears !== 1 ? 's' : ''})
              </p>
            </div>
            {!canWithdraw && (
              <div className="text-right">
                <p className="text-sm text-orange-600">{5 - membershipYears} years to go</p>
                <p className="text-xs text-orange-500">5-year lock-in period</p>
              </div>
            )}
          </div>
        </div>

        {/* This Year's Contributions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">This Year&apos;s Progress</h4>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Contributed this year</span>
              <span className="font-semibold text-gray-900">{currency}{stats.yearlyContributions.toLocaleString()}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, (stats.yearlyContributions / 60000) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {currency}60,000 annual limit • {currency}{(60000 - stats.yearlyContributions).toLocaleString()} remaining
            </p>
          </div>
        </div>

        {/* Projection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Future Projection</h4>
            <select
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value={5}>5 years</option>
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
            </select>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">
              If you continue contributing {currency}5,000/month at {currentDividendRate}% rate:
            </p>
            <p className="text-3xl font-bold text-purple-700">
              {currency}{projections[projections.length - 1]?.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-sm text-gray-500">
              in {projectionYears} years
            </p>
          </div>
          <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
            {projections.map((p) => (
              <div key={p.year} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Year {p.year}</span>
                <span className="text-green-600">+{currency}{p.dividends.toLocaleString(undefined, { maximumFractionDigits: 0 })} dividends</span>
                <span className="font-medium text-gray-900">{currency}{p.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contributions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Contributions</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {contributions.slice(0, 10).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{currency}{c.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  c.type === 'voluntary' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
