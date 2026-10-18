'use client';

import { useState, useEffect, useRef } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { Alert, AlertType, AlertPriority } from '@/types';
import { cn } from '@/lib/utils';

// Mock notifications for demo - in production this would come from a store
const generateMockNotifications = (): Alert[] => {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'budget_warning',
      priority: 'high',
      title: 'Budget Warning',
      message: 'Food & Dining is at 85% of monthly budget',
      isRead: false,
      isDismissed: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '2',
      type: 'bill_due',
      priority: 'urgent',
      title: 'Bill Due Tomorrow',
      message: 'Meralco Electric Bill - ₱3,500 due tomorrow',
      isRead: false,
      isDismissed: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: '3',
      type: 'goal_milestone',
      priority: 'medium',
      title: 'Goal Progress',
      message: 'Emergency Fund reached 50% of target!',
      isRead: false,
      isDismissed: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: '4',
      type: 'savings_tip',
      priority: 'low',
      title: 'Savings Tip',
      message: 'You spent 20% less on Transportation this month. Great job!',
      isRead: true,
      isDismissed: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: '5',
      type: 'budget_exceeded',
      priority: 'high',
      title: 'Budget Exceeded',
      message: 'Entertainment budget exceeded by ₱500',
      isRead: true,
      isDismissed: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
    },
  ];
};

const getPriorityColor = (priority: AlertPriority) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const getTypeIcon = (type: AlertType) => {
  switch (type) {
    case 'budget_warning':
    case 'budget_exceeded':
      return '💰';
    case 'bill_due':
    case 'bill_overdue':
      return '📄';
    case 'goal_milestone':
      return '🎯';
    case 'savings_tip':
      return '💡';
    default:
      return '📢';
  }
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Alert[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(generateMockNotifications());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead && !n.isDismissed).length;
  const visibleNotifications = notifications.filter(n => !n.isDismissed);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isDismissed: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isDismissed: true })));
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        {unreadCount > 0 ? (
          <BellAlertIcon className="w-6 h-6 text-blue-600" />
        ) : (
          <BellIcon className="w-6 h-6" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="notification-dropdown absolute right-0 mt-2 w-96 max-h-[80vh] rounded-xl shadow-xl overflow-hidden z-50"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              backgroundColor: 'var(--muted-bg)',
              borderBottom: '1px solid var(--card-border)',
            }}
          >
            <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal" style={{ color: 'var(--muted)' }}>
                  ({unreadCount} new)
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all read
                </button>
              )}
              {visibleNotifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs hover:opacity-80"
                  style={{ color: 'var(--muted)' }}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto max-h-96">
            {visibleNotifications.length === 0 ? (
              <div className="py-12 text-center">
                <BellIcon className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted)' }} />
                <p style={{ color: 'var(--muted)' }}>No notifications</p>
              </div>
            ) : (
              <div>
                {visibleNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className="notification-item px-4 py-3 cursor-pointer transition-colors"
                    style={{
                      backgroundColor: !notification.isRead ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      borderBottom: index < visibleNotifications.length - 1 ? '1px solid var(--card-border)' : 'none',
                    }}
                    onClick={() => markAsRead(notification.id)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted-bg)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = !notification.isRead ? 'rgba(59, 130, 246, 0.1)' : 'transparent';
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Priority indicator */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={cn('w-2 h-2 rounded-full', getPriorityColor(notification.priority))} />
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0 text-xl">
                        {getTypeIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className="text-sm font-medium truncate"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(notification.id);
                            }}
                            className="flex-shrink-0 p-1 rounded hover:opacity-80"
                            style={{ color: 'var(--muted)' }}
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: 'var(--muted)' }}
                        >
                          {notification.message}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: 'var(--muted)', opacity: 0.7 }}
                        >
                          {getTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {visibleNotifications.length > 0 && (
            <div
              className="px-4 py-3"
              style={{
                backgroundColor: 'var(--muted-bg)',
                borderTop: '1px solid var(--card-border)',
              }}
            >
              <a
                href="/settings"
                className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Notification Settings
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
