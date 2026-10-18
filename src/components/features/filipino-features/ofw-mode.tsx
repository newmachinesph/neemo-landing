'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Remittance {
  id: string;
  date: string;
  amount: number;
  amountPHP: number;
  exchangeRate: number;
  recipient: string;
  channel: string;
  fee: number;
  status: 'completed' | 'pending' | 'failed';
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  monthlyAllowance: number;
  lastSent: string;
}

interface OFWModeProps {
  baseCurrency?: string;
  currentExchangeRate?: number;
  remittances?: Remittance[];
  familyMembers?: FamilyMember[];
  monthlyBudgetPHP?: number;
  className?: string;
}

const demoRemittances: Remittance[] = [
  { id: 'r1', date: '2024-01-15', amount: 500, amountPHP: 27500, exchangeRate: 55.0, recipient: 'Mama', channel: 'Wise', fee: 5, status: 'completed' },
  { id: 'r2', date: '2024-01-10', amount: 300, amountPHP: 16650, exchangeRate: 55.5, recipient: 'Spouse', channel: 'Remitly', fee: 3.99, status: 'completed' },
  { id: 'r3', date: '2024-01-05', amount: 200, amountPHP: 11000, exchangeRate: 55.0, recipient: 'Sister', channel: 'GCash', fee: 0, status: 'completed' },
  { id: 'r4', date: '2024-01-20', amount: 400, amountPHP: 22000, exchangeRate: 55.0, recipient: 'Mama', channel: 'Wise', fee: 5, status: 'pending' },
];

const demoFamily: FamilyMember[] = [
  { id: 'f1', name: 'Mama', relationship: 'Mother', avatar: '👵', monthlyAllowance: 15000, lastSent: '2024-01-15' },
  { id: 'f2', name: 'Spouse', relationship: 'Spouse', avatar: '👩', monthlyAllowance: 20000, lastSent: '2024-01-10' },
  { id: 'f3', name: 'Ate', relationship: 'Sister', avatar: '👧', monthlyAllowance: 8000, lastSent: '2024-01-05' },
  { id: 'f4', name: 'Bunso', relationship: 'Youngest', avatar: '👦', monthlyAllowance: 5000, lastSent: '2024-01-01' },
];

const remittanceChannels = [
  { name: 'Wise', fee: '0.5-1%', speed: '1-2 days', rating: 4.8 },
  { name: 'Remitly', fee: '$3.99 flat', speed: 'Minutes', rating: 4.7 },
  { name: 'Western Union', fee: '2-5%', speed: 'Minutes', rating: 4.3 },
  { name: 'GCash', fee: 'Free', speed: 'Instant', rating: 4.6 },
  { name: 'Xoom', fee: '$0-4.99', speed: 'Minutes', rating: 4.5 },
];

export function OFWMode({
  baseCurrency = 'USD',
  currentExchangeRate = 55.50,
  remittances = demoRemittances,
  familyMembers = demoFamily,
  monthlyBudgetPHP = 50000,
  className,
}: OFWModeProps) {
  const stats = useMemo(() => {
    const thisMonth = remittances.filter(
      (r) => r.date.startsWith('2024-01') && r.status === 'completed'
    );
    const totalSentPHP = thisMonth.reduce((sum, r) => sum + r.amountPHP, 0);
    const totalFees = thisMonth.reduce((sum, r) => sum + r.fee, 0);
    const avgExchangeRate =
      thisMonth.reduce((sum, r) => sum + r.exchangeRate, 0) / thisMonth.length || 0;

    return { totalSentPHP, totalFees, avgExchangeRate, count: thisMonth.length };
  }, [remittances]);

  const familyStats = useMemo(() => {
    return familyMembers.map((member) => {
      const memberRemittances = remittances.filter(
        (r) => r.recipient === member.name && r.status === 'completed'
      );
      const totalReceived = memberRemittances.reduce((sum, r) => sum + r.amountPHP, 0);
      const percentOfAllowance = (totalReceived / member.monthlyAllowance) * 100;

      return {
        ...member,
        totalReceived,
        percentOfAllowance,
        remaining: member.monthlyAllowance - totalReceived,
      };
    });
  }, [familyMembers, remittances]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🌏</span>
            OFW Mode
          </span>
          <span className="text-sm font-normal bg-green-100 text-green-700 px-3 py-1 rounded-full">
            1 {baseCurrency} = ₱{currentExchangeRate.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Monthly Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Sent This Month</p>
            <p className="text-xl font-bold text-blue-700">₱{stats.totalSentPHP.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Monthly Budget</p>
            <p className="text-xl font-bold text-green-700">₱{monthlyBudgetPHP.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Avg Rate</p>
            <p className="text-xl font-bold text-purple-700">₱{stats.avgExchangeRate.toFixed(2)}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Total Fees</p>
            <p className="text-xl font-bold text-orange-700">${stats.totalFees.toFixed(2)}</p>
          </div>
        </div>

        {/* Family Allowance Tracker */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Family Allowance Tracker</h4>
          <div className="space-y-3">
            {familyStats.map((member) => (
              <div key={member.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.relationship}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₱{member.totalReceived.toLocaleString()} / ₱{member.monthlyAllowance.toLocaleString()}
                    </p>
                    <p className={`text-xs ${member.remaining > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {member.remaining > 0 ? `₱${member.remaining.toLocaleString()} remaining` : 'Complete ✓'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      member.percentOfAllowance >= 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(member.percentOfAllowance, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Remittances */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Remittances</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {remittances.map((r) => (
              <div
                key={r.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  r.status === 'completed' ? 'bg-green-50' :
                  r.status === 'pending' ? 'bg-yellow-50' : 'bg-red-50'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">To {r.recipient}</p>
                  <p className="text-xs text-gray-500">
                    {r.channel} • {new Date(r.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${r.amount}</p>
                  <p className="text-xs text-gray-500">₱{r.amountPHP.toLocaleString()} @ {r.exchangeRate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remittance Channels Comparison */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Compare Remittance Channels</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 rounded-tl-lg">Channel</th>
                  <th className="text-left p-2">Fee</th>
                  <th className="text-left p-2">Speed</th>
                  <th className="text-left p-2 rounded-tr-lg">Rating</th>
                </tr>
              </thead>
              <tbody>
                {remittanceChannels.map((channel) => (
                  <tr key={channel.name} className="border-b border-gray-100">
                    <td className="p-2 font-medium">{channel.name}</td>
                    <td className="p-2 text-gray-600">{channel.fee}</td>
                    <td className="p-2 text-gray-600">{channel.speed}</td>
                    <td className="p-2">
                      <span className="text-yellow-500">★</span> {channel.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Send */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-3">Quick Send Calculator</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">You Send ({baseCurrency})</label>
              <input
                type="number"
                defaultValue={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">They Receive (PHP)</label>
              <input
                type="text"
                value={`₱${(100 * currentExchangeRate).toLocaleString()}`}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Send Money
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h4 className="font-medium text-yellow-900 mb-2">💡 OFW Tips</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Compare rates before sending - a ₱0.50 difference on $500 = ₱250 extra</li>
            <li>• Use GCash for small, urgent amounts (instant & free)</li>
            <li>• Schedule transfers during peso weakness for better rates</li>
            <li>• Keep records for tax purposes and remittance proofs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
