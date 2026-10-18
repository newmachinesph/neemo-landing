'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CreditCard {
  id: string;
  name: string;
  bank: string;
  logo: string;
  creditLimit: number;
  currentBalance: number;
  interestRate: number;
  annualFee: number;
  statementDate: number;
  dueDate: number;
  rewards: {
    type: 'cashback' | 'points' | 'miles';
    rate: number;
    categories?: { name: string; rate: number }[];
  };
  promos: string[];
}

interface CreditCardOptimizerProps {
  creditCards?: CreditCard[];
  monthlySpending?: { category: string; amount: number }[];
  className?: string;
}

const demoCreditCards: CreditCard[] = [
  {
    id: 'cc1',
    name: 'Cashback Card',
    bank: 'BPI',
    logo: '💳',
    creditLimit: 100000,
    currentBalance: 25000,
    interestRate: 3.5,
    annualFee: 2500,
    statementDate: 15,
    dueDate: 5,
    rewards: {
      type: 'cashback',
      rate: 1,
      categories: [
        { name: 'Groceries', rate: 5 },
        { name: 'Gas', rate: 3 },
        { name: 'Dining', rate: 2 },
      ],
    },
    promos: ['5% cashback on groceries until Dec', 'Free movie tickets every 10K spend'],
  },
  {
    id: 'cc2',
    name: 'Rewards Card',
    bank: 'BDO',
    logo: '🎁',
    creditLimit: 150000,
    currentBalance: 45000,
    interestRate: 3.25,
    annualFee: 3000,
    statementDate: 20,
    dueDate: 10,
    rewards: {
      type: 'points',
      rate: 1,
      categories: [
        { name: 'Shopping', rate: 3 },
        { name: 'Online', rate: 2 },
      ],
    },
    promos: ['3x points on weekends', '0% installment on partner merchants'],
  },
  {
    id: 'cc3',
    name: 'Travel Card',
    bank: 'Metrobank',
    logo: '✈️',
    creditLimit: 200000,
    currentBalance: 60000,
    interestRate: 3.0,
    annualFee: 5000,
    statementDate: 25,
    dueDate: 15,
    rewards: {
      type: 'miles',
      rate: 1.5,
      categories: [
        { name: 'Travel', rate: 5 },
        { name: 'Hotels', rate: 3 },
        { name: 'Airlines', rate: 4 },
      ],
    },
    promos: ['Free lounge access', 'Complimentary travel insurance'],
  },
];

const demoSpending = [
  { category: 'Groceries', amount: 15000 },
  { category: 'Dining', amount: 8000 },
  { category: 'Gas', amount: 5000 },
  { category: 'Shopping', amount: 10000 },
  { category: 'Online', amount: 7000 },
  { category: 'Travel', amount: 3000 },
  { category: 'Bills', amount: 12000 },
];

export function CreditCardOptimizer({
  creditCards = demoCreditCards,
  monthlySpending = demoSpending,
  className,
}: CreditCardOptimizerProps) {
  const totalCreditLimit = creditCards.reduce((sum, card) => sum + card.creditLimit, 0);
  const totalBalance = creditCards.reduce((sum, card) => sum + card.currentBalance, 0);
  const utilizationRate = (totalBalance / totalCreditLimit) * 100;

  const cardAnalysis = useMemo(() => {
    return creditCards.map((card) => {
      const utilization = (card.currentBalance / card.creditLimit) * 100;
      const status = utilization < 30 ? 'good' : utilization < 50 ? 'moderate' : 'high';

      return {
        ...card,
        utilization,
        status,
        availableCredit: card.creditLimit - card.currentBalance,
      };
    });
  }, [creditCards]);

  const spendingOptimization = useMemo(() => {
    return monthlySpending.map((spending) => {
      let bestCard = creditCards[0];
      let bestRate = 0;

      creditCards.forEach((card) => {
        const categoryMatch = card.rewards.categories?.find(
          (c) => c.name.toLowerCase() === spending.category.toLowerCase()
        );
        const rate = categoryMatch ? categoryMatch.rate : card.rewards.rate;
        if (rate > bestRate) {
          bestRate = rate;
          bestCard = card;
        }
      });

      const earnedReward = (spending.amount * bestRate) / 100;

      return {
        ...spending,
        bestCard,
        rewardRate: bestRate,
        earnedReward,
        rewardType: bestCard.rewards.type,
      };
    });
  }, [monthlySpending, creditCards]);

  const totalMonthlyRewards = spendingOptimization.reduce(
    (sum, s) => sum + s.earnedReward,
    0
  );

  const upcomingDueDates = useMemo(() => {
    const today = new Date().getDate();
    return cardAnalysis
      .filter((card) => card.currentBalance > 0)
      .map((card) => {
        const daysUntilDue = card.dueDate >= today
          ? card.dueDate - today
          : 30 - today + card.dueDate;
        return { ...card, daysUntilDue };
      })
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  }, [cardAnalysis]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💳</span>
          Credit Card Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Credit</p>
            <p className="text-lg font-bold text-blue-700">
              ₱{totalCreditLimit.toLocaleString()}
            </p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Total Balance</p>
            <p className="text-lg font-bold text-orange-700">
              ₱{totalBalance.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-xl p-4 text-center ${
            utilizationRate < 30 ? 'bg-green-50' : utilizationRate < 50 ? 'bg-yellow-50' : 'bg-red-50'
          }`}>
            <p className={`text-xs mb-1 ${
              utilizationRate < 30 ? 'text-green-600' : utilizationRate < 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>Utilization</p>
            <p className={`text-lg font-bold ${
              utilizationRate < 30 ? 'text-green-700' : utilizationRate < 50 ? 'text-yellow-700' : 'text-red-700'
            }`}>
              {utilizationRate.toFixed(1)}%
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Monthly Rewards</p>
            <p className="text-lg font-bold text-purple-700">
              ₱{totalMonthlyRewards.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Card Health */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Card Health</h4>
          <div className="space-y-3">
            {cardAnalysis.map((card) => (
              <div key={card.id} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{card.logo}</span>
                    <div>
                      <p className="font-medium text-gray-900">{card.name}</p>
                      <p className="text-xs text-gray-500">{card.bank}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    card.status === 'good' ? 'bg-green-100 text-green-700' :
                    card.status === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {card.utilization.toFixed(0)}% used
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      card.status === 'good' ? 'bg-green-500' :
                      card.status === 'moderate' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(card.utilization, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₱{card.currentBalance.toLocaleString()} used</span>
                  <span>₱{card.availableCredit.toLocaleString()} available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Optimization */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Best Card per Category</h4>
          <div className="space-y-2">
            {spendingOptimization.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.bestCard.logo}</span>
                  <div>
                    <p className="font-medium text-gray-900">{item.category}</p>
                    <p className="text-xs text-gray-500">
                      Use {item.bestCard.name} for {item.rewardRate}% {item.rewardType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₱{item.amount.toLocaleString()}</p>
                  <p className="text-xs text-green-600">
                    +₱{item.earnedReward.toLocaleString(undefined, { maximumFractionDigits: 0 })} reward
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Due Dates */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming Due Dates</h4>
          <div className="space-y-2">
            {upcomingDueDates.map((card) => (
              <div
                key={card.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  card.daysUntilDue <= 3 ? 'bg-red-50' :
                  card.daysUntilDue <= 7 ? 'bg-yellow-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{card.logo}</span>
                  <div>
                    <p className="font-medium text-gray-900">{card.name}</p>
                    <p className="text-xs text-gray-500">Due on day {card.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₱{card.currentBalance.toLocaleString()}</p>
                  <p className={`text-xs ${
                    card.daysUntilDue <= 3 ? 'text-red-600' :
                    card.daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    {card.daysUntilDue === 0 ? 'Due today!' :
                     card.daysUntilDue === 1 ? 'Due tomorrow' :
                     `${card.daysUntilDue} days left`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Promos */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Active Promos</h4>
          <div className="space-y-2">
            {creditCards.map((card) =>
              card.promos.map((promo, i) => (
                <div
                  key={`${card.id}-${i}`}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                >
                  <span className="text-lg">{card.logo}</span>
                  <div>
                    <p className="text-sm text-purple-900">{promo}</p>
                    <p className="text-xs text-purple-600">{card.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">💡 Credit Card Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Keep utilization below 30% for a healthy credit score</li>
            <li>• Always pay the full balance to avoid interest charges</li>
            <li>• Use the right card for each spending category</li>
            <li>• Set up auto-pay to never miss a due date</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
