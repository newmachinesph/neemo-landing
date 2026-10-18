'use client';

import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LoanOption {
  id: string;
  bank: string;
  logo: string;
  loanType: 'personal' | 'housing' | 'car' | 'business';
  interestRate: number;
  interestType: 'fixed' | 'variable';
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  processingFee: number;
  monthlyFee: number;
  features: string[];
}

interface LoanComparisonProps {
  loanOptions?: LoanOption[];
  className?: string;
}

const demoLoanOptions: LoanOption[] = [
  {
    id: 'l1',
    bank: 'BDO',
    logo: '🏦',
    loanType: 'personal',
    interestRate: 1.2,
    interestType: 'fixed',
    minAmount: 10000,
    maxAmount: 2000000,
    minTerm: 6,
    maxTerm: 36,
    processingFee: 1.5,
    monthlyFee: 0,
    features: ['Quick approval', 'No collateral needed', 'Flexible terms'],
  },
  {
    id: 'l2',
    bank: 'BPI',
    logo: '🏛️',
    loanType: 'personal',
    interestRate: 1.1,
    interestType: 'fixed',
    minAmount: 20000,
    maxAmount: 3000000,
    minTerm: 12,
    maxTerm: 60,
    processingFee: 2.0,
    monthlyFee: 0,
    features: ['Lower rates for depositors', 'Online application', 'Auto-debit payment'],
  },
  {
    id: 'l3',
    bank: 'Metrobank',
    logo: '🏢',
    loanType: 'personal',
    interestRate: 1.3,
    interestType: 'fixed',
    minAmount: 15000,
    maxAmount: 1500000,
    minTerm: 6,
    maxTerm: 48,
    processingFee: 1.0,
    monthlyFee: 250,
    features: ['Fast processing', 'Salary deduction option', 'Insurance included'],
  },
  {
    id: 'l4',
    bank: 'Security Bank',
    logo: '🔐',
    loanType: 'personal',
    interestRate: 1.25,
    interestType: 'fixed',
    minAmount: 30000,
    maxAmount: 2500000,
    minTerm: 12,
    maxTerm: 36,
    processingFee: 1.5,
    monthlyFee: 0,
    features: ['Competitive rates', 'Quick disbursement', 'Flexible payment dates'],
  },
];

export function LoanComparison({
  loanOptions = demoLoanOptions,
  className,
}: LoanComparisonProps) {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [selectedType, setSelectedType] = useState<'personal' | 'housing' | 'car' | 'business'>('personal');

  const filteredOptions = useMemo(() => {
    return loanOptions.filter(
      (loan) =>
        loan.loanType === selectedType &&
        loan.minAmount <= loanAmount &&
        loan.maxAmount >= loanAmount &&
        loan.minTerm <= loanTerm &&
        loan.maxTerm >= loanTerm
    );
  }, [loanOptions, selectedType, loanAmount, loanTerm]);

  const calculations = useMemo(() => {
    return filteredOptions.map((loan) => {
      const monthlyRate = loan.interestRate / 100;
      const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
      const totalPayment = monthlyPayment * loanTerm;
      const totalInterest = totalPayment - loanAmount;
      const processingFeeAmount = (loanAmount * loan.processingFee) / 100;
      const totalMonthlyFees = loan.monthlyFee * loanTerm;
      const totalCost = totalPayment + processingFeeAmount + totalMonthlyFees;

      return {
        ...loan,
        monthlyPayment,
        totalPayment,
        totalInterest,
        processingFeeAmount,
        totalMonthlyFees,
        totalCost,
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  }, [filteredOptions, loanAmount, loanTerm]);

  const bestOption = calculations[0];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊</span>
          Loan Comparison Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Loan Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="personal">Personal Loan</option>
              <option value="housing">Housing Loan</option>
              <option value="car">Car Loan</option>
              <option value="business">Business Loan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount: ₱{loanAmount.toLocaleString()}
            </label>
            <input
              type="range"
              min={10000}
              max={3000000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₱10K</span>
              <span>₱3M</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Term: {loanTerm} months
            </label>
            <input
              type="range"
              min={6}
              max={60}
              step={6}
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 mo</span>
              <span>60 mo</span>
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        {calculations.length > 0 ? (
          <div className="space-y-4">
            {calculations.map((loan, index) => (
              <div
                key={loan.id}
                className={`p-4 rounded-xl border-2 ${
                  index === 0
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{loan.logo}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{loan.bank}</h4>
                      <p className="text-xs text-gray-500">
                        {loan.interestRate}% monthly ({loan.interestType})
                      </p>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Best Deal
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Payment</p>
                    <p className="font-semibold text-gray-900">
                      ₱{loan.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Interest</p>
                    <p className="font-semibold text-orange-600">
                      ₱{loan.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Processing Fee</p>
                    <p className="font-semibold text-gray-700">
                      ₱{loan.processingFeeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Cost</p>
                    <p className="font-bold text-blue-700">
                      ₱{loan.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {loan.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {index > 0 && bestOption && (
                  <p className="text-xs text-red-600 mt-2">
                    ₱{(loan.totalCost - bestOption.totalCost).toLocaleString(undefined, { maximumFractionDigits: 0 })} more than best option
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No loan options available for the selected criteria.</p>
            <p className="text-sm mt-2">Try adjusting the amount or term.</p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">💡 Loan Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Compare total cost, not just monthly payments</li>
            <li>• Check for hidden fees and charges</li>
            <li>• Consider your debt-to-income ratio (should be below 35%)</li>
            <li>• Read the fine print for prepayment penalties</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
