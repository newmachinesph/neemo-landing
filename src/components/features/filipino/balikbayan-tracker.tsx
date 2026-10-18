'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BoxItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  forWhom?: string;
}

interface BalikbayanBox {
  id: string;
  name: string;
  recipient: string;
  destination: string;
  status: 'packing' | 'shipped' | 'in-transit' | 'delivered';
  shippingCost?: number;
  trackingNumber?: string;
  items: BoxItem[];
  createdAt: string;
  shippedAt?: string;
  estimatedArrival?: string;
}

interface BalikbayanTrackerProps {
  boxes: BalikbayanBox[];
  onAddItem?: (boxId: string, item: Omit<BoxItem, 'id'>) => void;
  onUpdateStatus?: (boxId: string, status: BalikbayanBox['status']) => void;
  currency?: string;
  className?: string;
}

const statusConfig = {
  packing: { label: 'Packing', color: 'bg-yellow-100 text-yellow-700', icon: '📦' },
  shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-700', icon: '✈️' },
  'in-transit': { label: 'In Transit', color: 'bg-purple-100 text-purple-700', icon: '🚢' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: '🎉' },
};

const itemCategories = [
  { id: 'food', name: 'Food & Snacks', icon: '🍫' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'toiletries', name: 'Toiletries', icon: '🧴' },
  { id: 'medicine', name: 'Medicine', icon: '💊' },
  { id: 'toys', name: 'Toys', icon: '🧸' },
  { id: 'household', name: 'Household', icon: '🏠' },
  { id: 'other', name: 'Other', icon: '📦' },
];

function BoxCard({
  box,
  currency = '₱',
  onAddItem,
  onUpdateStatus,
}: {
  box: BalikbayanBox;
  currency?: string;
  onAddItem?: (item: Omit<BoxItem, 'id'>) => void;
  onUpdateStatus?: (status: BalikbayanBox['status']) => void;
}) {
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: 0, category: 'other', forWhom: '' });

  const totalValue = box.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = box.items.reduce((sum, item) => sum + item.quantity, 0);
  const status = statusConfig[box.status];

  const handleAddItem = () => {
    if (newItem.name && onAddItem) {
      onAddItem(newItem);
      setNewItem({ name: '', quantity: 1, price: 0, category: 'other', forWhom: '' });
      setShowAddItem(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
              📦
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{box.name}</h3>
              <p className="text-sm text-gray-500">To: {box.recipient}</p>
            </div>
          </div>
          <span className={cn('px-3 py-1 rounded-full text-sm font-medium', status.color)}>
            {status.icon} {status.label}
          </span>
        </div>
        <p className="text-sm text-gray-500">📍 {box.destination}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 p-4 border-b border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500">Items</p>
          <p className="text-lg font-bold text-gray-900">{totalItems}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Value</p>
          <p className="text-lg font-bold text-blue-600">{currency}{totalValue.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Shipping</p>
          <p className="text-lg font-bold text-gray-900">
            {box.shippingCost ? `${currency}${box.shippingCost.toLocaleString()}` : '—'}
          </p>
        </div>
      </div>

      {/* Tracking */}
      {box.trackingNumber && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <p className="text-xs text-gray-500">Tracking Number</p>
          <p className="font-mono text-sm text-gray-900">{box.trackingNumber}</p>
        </div>
      )}

      {/* Items by Category */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Items in Box</h4>
          {box.status === 'packing' && onAddItem && (
            <button
              onClick={() => setShowAddItem(!showAddItem)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add Item
            </button>
          )}
        </div>

        {showAddItem && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Item name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                placeholder="Qty"
                min="1"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="number"
                value={newItem.price || ''}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                placeholder="Price"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {itemCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={newItem.forWhom}
              onChange={(e) => setNewItem({ ...newItem, forWhom: e.target.value })}
              placeholder="For whom? (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <Button onClick={handleAddItem} size="sm" className="w-full">
              Add to Box
            </Button>
          </div>
        )}

        {box.items.length === 0 ? (
          <p className="text-center py-4 text-gray-500 text-sm">No items added yet</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {box.items.map((item) => {
              const category = itemCategories.find((c) => c.id === item.category);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{category?.icon || '📦'}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      {item.forWhom && (
                        <p className="text-xs text-gray-500">For: {item.forWhom}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">×{item.quantity}</p>
                    <p className="text-xs text-gray-500">{currency}{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Update */}
      {onUpdateStatus && box.status !== 'delivered' && (
        <div className="px-4 pb-4">
          <select
            value={box.status}
            onChange={(e) => onUpdateStatus(e.target.value as BalikbayanBox['status'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="packing">📦 Packing</option>
            <option value="shipped">✈️ Shipped</option>
            <option value="in-transit">🚢 In Transit</option>
            <option value="delivered">🎉 Delivered</option>
          </select>
        </div>
      )}
    </div>
  );
}

export function BalikbayanTracker({
  boxes,
  onAddItem,
  onUpdateStatus,
  currency = '₱',
  className,
}: BalikbayanTrackerProps) {
  const stats = useMemo(() => {
    const totalValue = boxes.reduce(
      (sum, box) => sum + box.items.reduce((s, item) => s + item.price * item.quantity, 0),
      0
    );
    const totalShipping = boxes.reduce((sum, box) => sum + (box.shippingCost || 0), 0);
    const activeBoxes = boxes.filter((b) => b.status !== 'delivered').length;
    return { totalValue, totalShipping, activeBoxes };
  }, [boxes]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📦</span>
          Balikbayan Box Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-600 mb-1">Active Boxes</p>
            <p className="text-xl font-bold text-blue-700">{stats.activeBoxes}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-green-600 mb-1">Total Value</p>
            <p className="text-lg font-bold text-green-700">
              {currency}{stats.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-xs text-purple-600 mb-1">Shipping Costs</p>
            <p className="text-lg font-bold text-purple-700">
              {currency}{stats.totalShipping.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Box Cards */}
        {boxes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📦</div>
            <p>No balikbayan boxes tracked</p>
            <p className="text-sm">Start a new box for your loved ones back home</p>
          </div>
        ) : (
          <div className="space-y-4">
            {boxes.map((box) => (
              <BoxCard
                key={box.id}
                box={box}
                currency={currency}
                onAddItem={onAddItem ? (item) => onAddItem(box.id, item) : undefined}
                onUpdateStatus={onUpdateStatus ? (status) => onUpdateStatus(box.id, status) : undefined}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export type { BalikbayanBox, BoxItem };
