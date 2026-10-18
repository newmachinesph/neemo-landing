import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = 'PHP'): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((current / total) * 100, 100);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Budget status
    on_track: 'text-green-600 bg-green-50',
    warning: 'text-yellow-600 bg-yellow-50',
    over_budget: 'text-red-600 bg-red-50',
    under_budget: 'text-blue-600 bg-blue-50',
    // Goal status
    active: 'text-blue-600 bg-blue-50',
    completed: 'text-green-600 bg-green-50',
    paused: 'text-yellow-600 bg-yellow-50',
    cancelled: 'text-gray-600 bg-gray-50',
    // Loan status
    paid_off: 'text-green-600 bg-green-50',
    defaulted: 'text-red-600 bg-red-50',
    // Investment status
    sold: 'text-gray-600 bg-gray-50',
    matured: 'text-purple-600 bg-purple-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };
  return colors[priority] || 'text-gray-600 bg-gray-50';
}

export function getRiskColor(risk: string): string {
  const colors: Record<string, string> = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50',
  };
  return colors[risk] || 'text-gray-600 bg-gray-50';
}

export function getBudgetStatus(spent: number, budget: number): 'on_track' | 'warning' | 'over_budget' | 'under_budget' {
  const percentage = calculatePercentage(spent, budget);
  if (percentage > 100) return 'over_budget';
  if (percentage >= 80) return 'warning';
  if (percentage < 50) return 'under_budget';
  return 'on_track';
}

export function getDaysRemaining(targetDate: string): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getMonthsRemaining(targetDate: string): number {
  const target = new Date(targetDate);
  const now = new Date();
  const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  return Math.max(0, months);
}

export const CATEGORY_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
  '#6366F1', // indigo
  '#84CC16', // lime
];

export function getCategoryColor(index: number): string {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}
