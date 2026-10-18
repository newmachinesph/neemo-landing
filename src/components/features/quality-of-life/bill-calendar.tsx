'use client';

import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  category: 'utilities' | 'subscriptions' | 'loans' | 'insurance' | 'other';
  icon: string;
  isAutoPay: boolean;
  isPaid?: boolean;
  paidDate?: string;
}

interface BillCalendarProps {
  bills?: Bill[];
  currentMonth?: number;
  currentYear?: number;
  className?: string;
}

const demoBills: Bill[] = [
  { id: 'b1', name: 'Meralco', amount: 3500, dueDay: 5, category: 'utilities', icon: '💡', isAutoPay: false },
  { id: 'b2', name: 'Manila Water', amount: 800, dueDay: 10, category: 'utilities', icon: '💧', isAutoPay: true },
  { id: 'b3', name: 'PLDT Internet', amount: 2899, dueDay: 15, category: 'utilities', icon: '📶', isAutoPay: true },
  { id: 'b4', name: 'Netflix', amount: 549, dueDay: 18, category: 'subscriptions', icon: '📺', isAutoPay: true },
  { id: 'b5', name: 'Spotify', amount: 149, dueDay: 18, category: 'subscriptions', icon: '🎵', isAutoPay: true },
  { id: 'b6', name: 'Credit Card', amount: 15000, dueDay: 20, category: 'loans', icon: '💳', isAutoPay: false },
  { id: 'b7', name: 'Car Loan', amount: 12000, dueDay: 25, category: 'loans', icon: '🚗', isAutoPay: true },
  { id: 'b8', name: 'Health Insurance', amount: 2500, dueDay: 28, category: 'insurance', icon: '🏥', isAutoPay: false },
];

export function BillCalendar({
  bills = demoBills,
  currentMonth = new Date().getMonth(),
  currentYear = new Date().getFullYear(),
  className,
}: BillCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const today = new Date().getDate();

  const monthData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-PH', { month: 'long' });

    return { firstDay, daysInMonth, monthName };
  }, [currentMonth, currentYear]);

  const billsByDay = useMemo(() => {
    const map: { [day: number]: Bill[] } = {};
    bills.forEach((bill) => {
      if (!map[bill.dueDay]) map[bill.dueDay] = [];
      map[bill.dueDay].push(bill);
    });
    return map;
  }, [bills]);

  const stats = useMemo(() => {
    const totalDue = bills.reduce((sum, b) => sum + b.amount, 0);
    const autoPay = bills.filter((b) => b.isAutoPay).reduce((sum, b) => sum + b.amount, 0);
    const manual = totalDue - autoPay;
    const upcoming = bills.filter((b) => b.dueDay >= today && b.dueDay <= today + 7);

    return { totalDue, autoPay, manual, upcoming };
  }, [bills, today]);

  const selectedDayBills = selectedDay ? billsByDay[selectedDay] || [] : [];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'utilities': return 'bg-yellow-100 text-yellow-700';
      case 'subscriptions': return 'bg-purple-100 text-purple-700';
      case 'loans': return 'bg-red-100 text-red-700';
      case 'insurance': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>📅</span>
            Bill Calendar
          </span>
          <span className="text-sm font-normal text-gray-500">
            {monthData.monthName} {currentYear}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Total Due</p>
            <p className="text-xl font-bold text-blue-700">₱{stats.totalDue.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Auto-Pay</p>
            <p className="text-xl font-bold text-green-700">₱{stats.autoPay.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <p className="text-xs text-orange-600 mb-1">Manual Pay</p>
            <p className="text-xl font-bold text-orange-700">₱{stats.manual.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">Due in 7 Days</p>
            <p className="text-xl font-bold text-purple-700">{stats.upcoming.length}</p>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the 1st */}
            {Array.from({ length: monthData.firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayBills = billsByDay[day] || [];
              const hasBills = dayBills.length > 0;
              const isToday = day === today;
              const isPast = day < today;
              const isSelected = day === selectedDay;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(hasBills ? day : null)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isToday
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : isPast
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-white hover:bg-gray-100'
                  } ${hasBills ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="text-sm">{day}</span>
                  {hasBills && (
                    <div className="flex gap-0.5 mt-1">
                      {dayBills.slice(0, 3).map((bill) => (
                        <span
                          key={bill.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-red-500'
                          }`}
                        />
                      ))}
                      {dayBills.length > 3 && (
                        <span className="text-xs">+{dayBills.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Bills */}
        {selectedDay && selectedDayBills.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">
              Bills due on {monthData.monthName} {selectedDay}
            </h4>
            <div className="space-y-2">
              {selectedDayBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{bill.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{bill.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(bill.category)}`}>
                        {bill.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₱{bill.amount.toLocaleString()}</p>
                    {bill.isAutoPay ? (
                      <span className="text-xs text-green-600">🔄 Auto-pay</span>
                    ) : (
                      <button className="text-xs text-blue-600 hover:underline">Mark Paid</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Bills List */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming This Week</h4>
          {stats.upcoming.length > 0 ? (
            <div className="space-y-2">
              {stats.upcoming.map((bill) => {
                const daysUntil = bill.dueDay - today;
                return (
                  <div
                    key={bill.id}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      daysUntil <= 2 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{bill.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{bill.name}</p>
                        <p className={`text-xs ${daysUntil <= 2 ? 'text-red-600' : 'text-gray-500'}`}>
                          {daysUntil === 0 ? 'Due today!' :
                           daysUntil === 1 ? 'Due tomorrow' :
                           `Due in ${daysUntil} days`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₱{bill.amount.toLocaleString()}</p>
                      {bill.isAutoPay && (
                        <span className="text-xs text-green-600">🔄 Auto</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No bills due in the next 7 days 🎉</p>
          )}
        </div>

        {/* All Bills Summary */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-700 mb-3">All Monthly Bills</h4>
          <div className="space-y-2">
            {bills
              .sort((a, b) => a.dueDay - b.dueDay)
              .map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>{bill.icon}</span>
                    <span className="text-gray-900">{bill.name}</span>
                    <span className="text-xs text-gray-400">Day {bill.dueDay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">₱{bill.amount.toLocaleString()}</span>
                    {bill.isAutoPay && <span className="text-green-500">🔄</span>}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Add Bill Button */}
        <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
          + Add New Bill
        </button>
      </CardContent>
    </Card>
  );
}
