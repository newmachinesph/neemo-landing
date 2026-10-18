'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Investment {
  id: string;
  date: string;
  shares: number;
  pricePerShare: number;
  totalCost: number;
  platform: string;
}

interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  investments: Investment[];
}

interface PCACalculatorProps {
  stocks?: Stock[];
  onAddInvestment?: (stockId: string, investment: Omit<Investment, 'id'>) => void;
  onAddStock?: (stock: Omit<Stock, 'id' | 'investments'>) => void;
  currency?: string;
  className?: string;
}

const demoStocks: Stock[] = [
  {
    id: 's1',
    symbol: 'JFC',
    name: 'Jollibee Foods Corporation',
    currentPrice: 216.40,
    investments: [
      { id: 'i1', date: '2024-01-15', shares: 100, pricePerShare: 220.00, totalCost: 22000, platform: 'COL Financial' },
      { id: 'i2', date: '2024-02-15', shares: 100, pricePerShare: 210.00, totalCost: 21000, platform: 'COL Financial' },
      { id: 'i3', date: '2024-03-15', shares: 100, pricePerShare: 205.00, totalCost: 20500, platform: 'COL Financial' },
    ],
  },
  {
    id: 's2',
    symbol: 'BDO',
    name: 'BDO Unibank Inc.',
    currentPrice: 148.50,
    investments: [
      { id: 'i4', date: '2024-01-20', shares: 50, pricePerShare: 140.00, totalCost: 7000, platform: 'GInvest' },
      { id: 'i5', date: '2024-02-20', shares: 50, pricePerShare: 145.00, totalCost: 7250, platform: 'GInvest' },
    ],
  },
  {
    id: 's3',
    symbol: 'ALI',
    name: 'Ayala Land Inc.',
    currentPrice: 32.85,
    investments: [
      { id: 'i6', date: '2024-01-10', shares: 500, pricePerShare: 30.00, totalCost: 15000, platform: 'COL Financial' },
      { id: 'i7', date: '2024-03-10', shares: 500, pricePerShare: 32.00, totalCost: 16000, platform: 'COL Financial' },
    ],
  },
];

function StockCard({ stock, currency = '₱' }: { stock: Stock; currency?: string }) {
  const [showHistory, setShowHistory] = useState(false);

  const stats = useMemo(() => {
    const totalShares = stock.investments.reduce((sum, inv) => sum + inv.shares, 0);
    const totalCost = stock.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
    const averagePrice = totalCost / totalShares;
    const currentValue = totalShares * stock.currentPrice;
    const gainLoss = currentValue - totalCost;
    const gainLossPercent = (gainLoss / totalCost) * 100;

    return { totalShares, totalCost, averagePrice, currentValue, gainLoss, gainLossPercent };
  }, [stock]);

  const isProfit = stats.gainLoss >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{stock.symbol}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${isProfit ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isProfit ? '+' : ''}{stats.gainLossPercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-lg font-bold text-gray-900">{currency}{stock.currentPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg mb-3">
          <div>
            <p className="text-xs text-gray-500">Total Shares</p>
            <p className="font-semibold text-gray-900">{stats.totalShares.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg. Cost</p>
            <p className="font-semibold text-gray-900">{currency}{stats.averagePrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Cost</p>
            <p className="font-semibold text-gray-900">{currency}{stats.totalCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Market Value</p>
            <p className="font-semibold text-gray-900">{currency}{stats.currentValue.toLocaleString()}</p>
          </div>
        </div>

        <div className={`p-3 rounded-lg ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
              Unrealized {isProfit ? 'Gain' : 'Loss'}
            </span>
            <span className={`text-lg font-bold ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
              {isProfit ? '+' : ''}{currency}{stats.gainLoss.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showHistory ? 'Hide' : 'Show'} Purchase History
        </button>

        {showHistory && (
          <div className="mt-3 space-y-2">
            {stock.investments.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                <div>
                  <p className="font-medium text-gray-900">{inv.shares} shares @ {currency}{inv.pricePerShare}</p>
                  <p className="text-xs text-gray-500">{new Date(inv.date).toLocaleDateString('en-PH')} • {inv.platform}</p>
                </div>
                <span className="font-semibold text-gray-900">{currency}{inv.totalCost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PCACalculator({
  stocks = demoStocks,
  currency = '₱',
  className,
}: PCACalculatorProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const portfolioStats = useMemo(() => {
    let totalCost = 0;
    let totalValue = 0;

    stocks.forEach((stock) => {
      const shares = stock.investments.reduce((sum, inv) => sum + inv.shares, 0);
      const cost = stock.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
      totalCost += cost;
      totalValue += shares * stock.currentPrice;
    });

    const gainLoss = totalValue - totalCost;
    const gainLossPercent = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

    return { totalCost, totalValue, gainLoss, gainLossPercent };
  }, [stocks]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📈</span>
            Peso Cost Averaging
          </span>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            + Add Investment
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Invested</p>
            <p className="text-xl font-bold text-blue-700">
              {currency}{portfolioStats.totalCost.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Market Value</p>
            <p className="text-xl font-bold text-purple-700">
              {currency}{portfolioStats.totalValue.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-xl p-4 text-center ${portfolioStats.gainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`text-xs mb-1 ${portfolioStats.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Total {portfolioStats.gainLoss >= 0 ? 'Gain' : 'Loss'}
            </p>
            <p className={`text-xl font-bold ${portfolioStats.gainLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {portfolioStats.gainLoss >= 0 ? '+' : ''}{currency}{portfolioStats.gainLoss.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-xl p-4 text-center ${portfolioStats.gainLoss >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`text-xs mb-1 ${portfolioStats.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Return
            </p>
            <p className={`text-xl font-bold ${portfolioStats.gainLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {portfolioStats.gainLoss >= 0 ? '+' : ''}{portfolioStats.gainLossPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Stock List */}
        <div className="space-y-4">
          {stocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} currency={currency} />
          ))}
        </div>

        {stocks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No investments tracked yet</p>
            <p className="text-sm">Start tracking your stock investments</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
