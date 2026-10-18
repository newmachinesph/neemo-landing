'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
}

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

export interface OnboardingData {
  name: string;
  currency: string;
  monthlyIncome: number;
  firstGoal: {
    title: string;
    targetAmount: number;
    targetDate: string;
  } | null;
  accounts: {
    name: string;
    type: string;
    balance: number;
  }[];
}

const steps: OnboardingStep[] = [
  { id: 'welcome', title: 'Mabuhay!', description: 'Welcome to Phinance' },
  { id: 'profile', title: 'About You', description: 'Let\'s personalize your experience' },
  { id: 'currency', title: 'Currency', description: 'Choose your primary currency' },
  { id: 'accounts', title: 'Accounts', description: 'Add your first account' },
  { id: 'goal', title: 'Your First Goal', description: 'Start saving for something special' },
  { id: 'complete', title: 'All Set!', description: 'You\'re ready to go' },
];

const currencies = [
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦' },
];

const accountTypes = [
  { id: 'cash', name: 'Cash / Wallet', icon: '💵' },
  { id: 'checking', name: 'Bank Account', icon: '🏦' },
  { id: 'savings', name: 'Savings Account', icon: '🐷' },
  { id: 'digital_wallet', name: 'GCash / Maya', icon: '📱' },
  { id: 'credit_card', name: 'Credit Card', icon: '💳' },
];

const goalSuggestions = [
  { title: 'Emergency Fund', icon: '🛡️', amount: 50000 },
  { title: 'Dream Vacation', icon: '✈️', amount: 30000 },
  { title: 'New Gadget', icon: '📱', amount: 25000 },
  { title: 'Car Down Payment', icon: '🚗', amount: 100000 },
  { title: 'Wedding Fund', icon: '💒', amount: 200000 },
  { title: 'House Down Payment', icon: '🏠', amount: 500000 },
];

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    currency: 'PHP',
    monthlyIncome: 0,
    firstGoal: null,
    accounts: [],
  });

  const [newAccount, setNewAccount] = useState({ name: '', type: 'cash', balance: 0 });
  const [newGoal, setNewGoal] = useState({ title: '', targetAmount: 0, targetDate: '' });

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(() => {
    onComplete(data);
  }, [data, onComplete]);

  const addAccount = useCallback(() => {
    if (newAccount.name) {
      setData((prev) => ({
        ...prev,
        accounts: [...prev.accounts, { ...newAccount }],
      }));
      setNewAccount({ name: '', type: 'cash', balance: 0 });
    }
  }, [newAccount]);

  const removeAccount = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      accounts: prev.accounts.filter((_, i) => i !== index),
    }));
  }, []);

  const selectGoalSuggestion = useCallback((suggestion: typeof goalSuggestions[0]) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 12);
    setNewGoal({
      title: suggestion.title,
      targetAmount: suggestion.amount,
      targetDate: targetDate.toISOString().split('T')[0],
    });
  }, []);

  const saveGoal = useCallback(() => {
    if (newGoal.title && newGoal.targetAmount > 0) {
      setData((prev) => ({
        ...prev,
        firstGoal: { ...newGoal },
      }));
    }
  }, [newGoal]);

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl">🇵🇭</div>
            <h2 className="text-3xl font-bold text-gray-900">Mabuhay!</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Welcome to Phinance - your personal finance companion designed for Filipinos,
              by Filipinos. Let&apos;s set up your account in just a few steps.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>🔒</span>
              <span>Your data stays on your device</span>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-gray-900">Kumusta!</h2>
              <p className="text-gray-600">What should we call you?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Juan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (Optional)
                </label>
                <input
                  type="number"
                  value={data.monthlyIncome || ''}
                  onChange={(e) => setData((prev) => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">This helps us give better budget suggestions</p>
              </div>
            </div>
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💱</div>
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Currency</h2>
              <p className="text-gray-600">Select your primary currency</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setData((prev) => ({ ...prev, currency: currency.code }))}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                    data.currency === currency.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className="text-2xl">{currency.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{currency.code}</div>
                    <div className="text-xs text-gray-500">{currency.symbol}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'accounts':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🏦</div>
              <h2 className="text-2xl font-bold text-gray-900">Add Your Accounts</h2>
              <p className="text-gray-600">Where do you keep your money?</p>
            </div>

            {/* Existing accounts */}
            {data.accounts.length > 0 && (
              <div className="space-y-2">
                {data.accounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {accountTypes.find((t) => t.id === account.type)?.icon || '💰'}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">
                          {currencies.find((c) => c.code === data.currency)?.symbol}
                          {account.balance.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAccount(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new account form */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-2 gap-2">
                {accountTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setNewAccount((prev) => ({ ...prev, type: type.id }))}
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-sm',
                      newAccount.type === type.id
                        ? 'border-blue-500 bg-white'
                        : 'border-transparent bg-white/50 hover:bg-white'
                    )}
                  >
                    <span>{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={newAccount.name}
                onChange={(e) => setNewAccount((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Account name (e.g., BDO Savings)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={newAccount.balance || ''}
                onChange={(e) => setNewAccount((prev) => ({ ...prev, balance: Number(e.target.value) }))}
                placeholder="Current balance"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button onClick={addAccount} variant="outline" className="w-full">
                Add Account
              </Button>
            </div>
          </div>
        );

      case 'goal':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900">Set Your First Goal</h2>
              <p className="text-gray-600">What are you saving for?</p>
            </div>

            {/* Goal suggestions */}
            <div className="grid grid-cols-2 gap-3">
              {goalSuggestions.map((suggestion) => (
                <button
                  key={suggestion.title}
                  onClick={() => selectGoalSuggestion(suggestion)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    newGoal.title === suggestion.title
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className="text-3xl">{suggestion.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{suggestion.title}</span>
                  <span className="text-xs text-gray-500">
                    ₱{suggestion.amount.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom goal */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700">Or create your own:</p>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Goal name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={newGoal.targetAmount || ''}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, targetAmount: Number(e.target.value) }))}
                placeholder="Target amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, targetDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button onClick={saveGoal} variant="outline" className="w-full">
                {data.firstGoal ? 'Update Goal' : 'Save Goal'}
              </Button>
            </div>

            {data.firstGoal && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Goal set: {data.firstGoal.title}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="text-8xl">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900">Ayos na!</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              You&apos;re all set, {data.name || 'friend'}! Start tracking your finances
              and achieve your goals.
            </p>
            <div className="space-y-2 text-left max-w-sm mx-auto p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Currency</span>
                <span className="font-medium">{data.currency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Accounts</span>
                <span className="font-medium">{data.accounts.length} added</span>
              </div>
              {data.firstGoal && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">First Goal</span>
                  <span className="font-medium">{data.firstGoal.title}</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            {onSkip && currentStep > 0 && currentStep < steps.length - 1 && (
              <button
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </button>
            )}
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{renderStep()}</div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} className="flex-1">
              {currentStep === 0 ? 'Get Started' : 'Continue'}
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex-1">
              Start Using Phinance
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
