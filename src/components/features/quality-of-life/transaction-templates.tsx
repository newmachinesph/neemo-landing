'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Template {
  id: string;
  name: string;
  icon: string;
  amount: number;
  category: string;
  categoryIcon: string;
  merchant?: string;
  note?: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  usageCount: number;
  lastUsed?: string;
  isPinned: boolean;
}

interface TransactionTemplatesProps {
  templates?: Template[];
  onUseTemplate?: (template: Template) => void;
  className?: string;
}

const demoTemplates: Template[] = [
  {
    id: 't1',
    name: 'Morning Coffee',
    icon: '☕',
    amount: 180,
    category: 'Food',
    categoryIcon: '🍔',
    merchant: 'Starbucks',
    frequency: 'daily',
    usageCount: 45,
    lastUsed: '2024-01-15',
    isPinned: true,
  },
  {
    id: 't2',
    name: 'Jeep to Work',
    icon: '🚐',
    amount: 13,
    category: 'Transport',
    categoryIcon: '🚌',
    frequency: 'daily',
    usageCount: 88,
    lastUsed: '2024-01-15',
    isPinned: true,
  },
  {
    id: 't3',
    name: 'Grab Home',
    icon: '🚗',
    amount: 250,
    category: 'Transport',
    categoryIcon: '🚌',
    merchant: 'Grab',
    frequency: 'weekly',
    usageCount: 12,
    lastUsed: '2024-01-14',
    isPinned: true,
  },
  {
    id: 't4',
    name: 'Weekly Groceries',
    icon: '🛒',
    amount: 2500,
    category: 'Groceries',
    categoryIcon: '🛒',
    merchant: 'SM Supermarket',
    frequency: 'weekly',
    usageCount: 8,
    lastUsed: '2024-01-13',
    isPinned: false,
  },
  {
    id: 't5',
    name: 'Lunch (Office)',
    icon: '🍱',
    amount: 150,
    category: 'Food',
    categoryIcon: '🍔',
    frequency: 'daily',
    usageCount: 65,
    lastUsed: '2024-01-15',
    isPinned: false,
  },
  {
    id: 't6',
    name: 'Netflix',
    icon: '📺',
    amount: 549,
    category: 'Subscriptions',
    categoryIcon: '📺',
    merchant: 'Netflix',
    frequency: 'monthly',
    usageCount: 6,
    lastUsed: '2024-01-01',
    isPinned: false,
  },
  {
    id: 't7',
    name: 'Gym Membership',
    icon: '🏋️',
    amount: 2000,
    category: 'Health',
    categoryIcon: '💊',
    merchant: 'Anytime Fitness',
    frequency: 'monthly',
    usageCount: 6,
    isPinned: false,
  },
  {
    id: 't8',
    name: 'Gas Full Tank',
    icon: '⛽',
    amount: 3000,
    category: 'Transport',
    categoryIcon: '🚌',
    merchant: 'Shell',
    frequency: 'weekly',
    usageCount: 20,
    lastUsed: '2024-01-12',
    isPinned: false,
  },
];

export function TransactionTemplates({
  templates = demoTemplates,
  onUseTemplate,
  className,
}: TransactionTemplatesProps) {
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const pinnedTemplates = templates.filter((t) => t.isPinned);
  const recentTemplates = templates
    .filter((t) => !t.isPinned)
    .sort((a, b) => (b.lastUsed || '').localeCompare(a.lastUsed || ''))
    .slice(0, 4);
  const frequentTemplates = templates
    .filter((t) => !t.isPinned)
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 4);

  const filteredTemplates = searchTerm
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleUse = (template: Template) => {
    onUseTemplate?.(template);
    setShowSuccess(template.id);
    setTimeout(() => setShowSuccess(null), 1500);
  };

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case 'daily': return '📅 Daily';
      case 'weekly': return '📆 Weekly';
      case 'monthly': return '🗓️ Monthly';
      default: return '⚡ Once';
    }
  };

  const TemplateCard = ({ template }: { template: Template }) => (
    <button
      onClick={() => handleUse(template)}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:scale-102 active:scale-98 ${
        showSuccess === template.id
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{template.icon}</span>
          <div>
            <p className="font-semibold text-gray-900">{template.name}</p>
            <p className="text-xs text-gray-500">
              {template.merchant || template.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">₱{template.amount.toLocaleString()}</p>
          {showSuccess === template.id ? (
            <span className="text-xs text-green-600">✓ Added!</span>
          ) : (
            <span className="text-xs text-gray-400">{getFrequencyLabel(template.frequency)}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Used {template.usageCount} times</span>
        {template.isPinned && <span>📌 Pinned</span>}
      </div>
    </button>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          Transaction Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Search Results ({filteredTemplates.length})
            </h4>
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No templates found</p>
            )}
          </div>
        )}

        {/* Pinned Templates */}
        {!searchTerm && pinnedTemplates.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <span>📌</span> Pinned
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pinnedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Templates */}
        {!searchTerm && recentTemplates.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <span>🕐</span> Recently Used
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Frequent Templates */}
        {!searchTerm && frequentTemplates.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <span>🔥</span> Most Used
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {frequentTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Create New Template */}
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
          <button className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-2xl mb-2 block">➕</span>
            <span className="font-medium">Create New Template</span>
            <p className="text-xs text-gray-400 mt-1">
              Save frequent transactions for quick entry
            </p>
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">💡 Template Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Pin your most frequent expenses for quick access</li>
            <li>• Templates auto-suggest based on time of day</li>
            <li>• Long press any transaction to save as template</li>
            <li>• Tap to use, long press to edit or delete</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
