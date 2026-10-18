'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PaluwaganMember {
  id: string;
  name: string;
  avatar: string;
  slot: number;
  hasPaid: boolean;
  hasReceived: boolean;
  paymentDate?: string;
}

interface Paluwagan {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  members: PaluwaganMember[];
  currentRound: number;
  totalRounds: number;
  startDate: string;
  mySlot: number;
  organizer: string;
}

interface PaluwaganManagerProps {
  paluwagans?: Paluwagan[];
  className?: string;
}

const demoPaluwagans: Paluwagan[] = [
  {
    id: 'p1',
    name: 'Office Paluwagan',
    contributionAmount: 1000,
    frequency: 'weekly',
    currentRound: 5,
    totalRounds: 10,
    startDate: '2024-01-01',
    mySlot: 7,
    organizer: 'Marie',
    members: [
      { id: 'm1', name: 'Marie', avatar: '👩', slot: 1, hasPaid: true, hasReceived: true },
      { id: 'm2', name: 'John', avatar: '👨', slot: 2, hasPaid: true, hasReceived: true },
      { id: 'm3', name: 'Anna', avatar: '👩‍🦰', slot: 3, hasPaid: true, hasReceived: true },
      { id: 'm4', name: 'Mark', avatar: '👨‍🦱', slot: 4, hasPaid: true, hasReceived: true },
      { id: 'm5', name: 'Lisa', avatar: '👩‍🦳', slot: 5, hasPaid: true, hasReceived: false },
      { id: 'm6', name: 'Paul', avatar: '👴', slot: 6, hasPaid: true, hasReceived: false },
      { id: 'm7', name: 'You', avatar: '🙂', slot: 7, hasPaid: true, hasReceived: false },
      { id: 'm8', name: 'Grace', avatar: '👧', slot: 8, hasPaid: true, hasReceived: false },
      { id: 'm9', name: 'Mike', avatar: '👦', slot: 9, hasPaid: false, hasReceived: false },
      { id: 'm10', name: 'Joy', avatar: '👶', slot: 10, hasPaid: false, hasReceived: false },
    ],
  },
  {
    id: 'p2',
    name: 'Barkada Savings',
    contributionAmount: 500,
    frequency: 'monthly',
    currentRound: 2,
    totalRounds: 6,
    startDate: '2024-01-15',
    mySlot: 3,
    organizer: 'Rico',
    members: [
      { id: 'b1', name: 'Rico', avatar: '🧑', slot: 1, hasPaid: true, hasReceived: true },
      { id: 'b2', name: 'Jen', avatar: '👩', slot: 2, hasPaid: true, hasReceived: false },
      { id: 'b3', name: 'You', avatar: '🙂', slot: 3, hasPaid: true, hasReceived: false },
      { id: 'b4', name: 'Carlo', avatar: '👨', slot: 4, hasPaid: true, hasReceived: false },
      { id: 'b5', name: 'Nina', avatar: '👧', slot: 5, hasPaid: false, hasReceived: false },
      { id: 'b6', name: 'Enzo', avatar: '👦', slot: 6, hasPaid: false, hasReceived: false },
    ],
  },
];

export function PaluwaganManager({
  paluwagans = demoPaluwagans,
  className,
}: PaluwaganManagerProps) {
  const stats = useMemo((): {
    totalContributed: number;
    totalToReceive: number;
    upcomingPayout: { paluwagan: string; amount: number; roundsUntil: number } | null;
  } => {
    let totalContributed = 0;
    let totalToReceive = 0;
    let upcomingPayout: { paluwagan: string; amount: number; roundsUntil: number } | null = null;

    paluwagans.forEach((p) => {
      const myMember = p.members.find((m) => m.slot === p.mySlot);
      const contributionsSoFar = p.currentRound * p.contributionAmount;
      const potAmount = p.members.length * p.contributionAmount;

      totalContributed += contributionsSoFar;
      totalToReceive += potAmount;

      if (myMember && !myMember.hasReceived && p.mySlot > p.currentRound) {
        const roundsUntil = p.mySlot - p.currentRound;
        if (!upcomingPayout || roundsUntil < upcomingPayout.roundsUntil) {
          upcomingPayout = {
            paluwagan: p.name,
            amount: potAmount,
            roundsUntil,
          };
        }
      }
    });

    return { totalContributed, totalToReceive, upcomingPayout };
  }, [paluwagans]);

  const frequencyLabel = (freq: string) => {
    switch (freq) {
      case 'weekly': return 'Weekly';
      case 'biweekly': return 'Every 2 Weeks';
      case 'monthly': return 'Monthly';
      default: return freq;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🤝</span>
          Paluwagan Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Contributed</p>
            <p className="text-xl font-bold text-blue-700">₱{stats.totalContributed.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Expected Payout</p>
            <p className="text-xl font-bold text-green-700">₱{stats.totalToReceive.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <p className="text-xs text-purple-600 mb-1">Next Payout</p>
            {stats.upcomingPayout ? (
              <>
                <p className="text-xl font-bold text-purple-700">
                  ₱{stats.upcomingPayout.amount.toLocaleString()}
                </p>
                <p className="text-xs text-purple-500">
                  {stats.upcomingPayout.roundsUntil} round(s) away
                </p>
              </>
            ) : (
              <p className="text-lg font-bold text-purple-700">-</p>
            )}
          </div>
        </div>

        {/* Active Paluwagans */}
        <div className="space-y-6">
          {paluwagans.map((p) => {
            const potAmount = p.members.length * p.contributionAmount;
            const currentReceiver = p.members.find((m) => m.slot === p.currentRound);
            const nextReceiver = p.members.find((m) => m.slot === p.currentRound + 1);
            const myTurn = p.mySlot === p.currentRound + 1;
            const alreadyReceived = p.members.find((m) => m.slot === p.mySlot)?.hasReceived;

            return (
              <div
                key={p.id}
                className={`p-4 rounded-xl border-2 ${
                  myTurn ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{p.name}</h4>
                    <p className="text-xs text-gray-500">
                      {frequencyLabel(p.frequency)} • ₱{p.contributionAmount.toLocaleString()}/round • Organized by {p.organizer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      Round {p.currentRound}/{p.totalRounds}
                    </p>
                    <p className="text-xs text-gray-500">Pot: ₱{potAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{((p.currentRound / p.totalRounds) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(p.currentRound / p.totalRounds) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Members Visual */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Members & Status</p>
                  <div className="flex flex-wrap gap-2">
                    {p.members.map((member) => (
                      <div
                        key={member.id}
                        className={`relative p-2 rounded-lg text-center min-w-[60px] ${
                          member.hasReceived
                            ? 'bg-green-100 border border-green-300'
                            : member.slot === p.currentRound + 1
                            ? 'bg-yellow-100 border-2 border-yellow-400'
                            : member.hasPaid
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{member.avatar}</span>
                        <p className="text-xs font-medium truncate">{member.name}</p>
                        <p className="text-xs text-gray-500">#{member.slot}</p>
                        {member.hasReceived && (
                          <span className="absolute -top-1 -right-1 text-green-500">✓</span>
                        )}
                        {member.slot === p.mySlot && (
                          <span className="absolute -top-1 -left-1 text-blue-500 text-xs">You</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Current Receiver</p>
                    <p className="font-medium text-gray-900">
                      {currentReceiver ? `${currentReceiver.avatar} ${currentReceiver.name}` : 'Round complete'}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Next Receiver</p>
                    <p className="font-medium text-gray-900">
                      {nextReceiver ? `${nextReceiver.avatar} ${nextReceiver.name}` : 'Final round'}
                    </p>
                  </div>
                </div>

                {/* My Status */}
                <div className={`p-3 rounded-lg ${
                  alreadyReceived ? 'bg-green-100' : myTurn ? 'bg-yellow-100' : 'bg-blue-50'
                }`}>
                  <p className="text-sm font-medium">
                    {alreadyReceived
                      ? '✅ You already received your payout!'
                      : myTurn
                      ? `🎉 Your turn is next! You will receive ₱${potAmount.toLocaleString()}`
                      : `📅 Your slot is #${p.mySlot} (${p.mySlot - p.currentRound} rounds away)`}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    Payment History
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create New */}
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
          <button className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-medium">Start New Paluwagan</span>
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-2">💡 Paluwagan Tips</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Only join with trusted friends/colleagues</li>
            <li>• Keep records of all payments and receipts</li>
            <li>• Choose a slot based on when you need the money</li>
            <li>• Set reminders for payment due dates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
