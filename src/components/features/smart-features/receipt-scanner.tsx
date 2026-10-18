'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ScannedItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ScannedReceipt {
  id: string;
  merchant: string;
  date: string;
  items: ScannedItem[];
  subtotal: number;
  tax: number;
  total: number;
  category: string;
  imageUrl?: string;
}

interface ReceiptScannerProps {
  recentReceipts?: ScannedReceipt[];
  onScanComplete?: (receipt: ScannedReceipt) => void;
  className?: string;
}

const demoReceipts: ScannedReceipt[] = [
  {
    id: 'sr1',
    merchant: 'SM Supermarket',
    date: '2024-01-15',
    items: [
      { name: 'Rice 5kg', quantity: 1, unitPrice: 350, total: 350 },
      { name: 'Cooking Oil 1L', quantity: 2, unitPrice: 85, total: 170 },
      { name: 'Eggs (12pcs)', quantity: 1, unitPrice: 210, total: 210 },
      { name: 'Milk 1L', quantity: 3, unitPrice: 95, total: 285 },
    ],
    subtotal: 1015,
    tax: 0,
    total: 1015,
    category: 'Groceries',
  },
  {
    id: 'sr2',
    merchant: 'Jollibee',
    date: '2024-01-14',
    items: [
      { name: 'Chickenjoy w/ Rice', quantity: 2, unitPrice: 115, total: 230 },
      { name: 'Jolly Spaghetti', quantity: 1, unitPrice: 75, total: 75 },
      { name: 'Pineapple Juice', quantity: 2, unitPrice: 35, total: 70 },
    ],
    subtotal: 375,
    tax: 0,
    total: 375,
    category: 'Food',
  },
  {
    id: 'sr3',
    merchant: 'Mercury Drug',
    date: '2024-01-13',
    items: [
      { name: 'Biogesic (20s)', quantity: 1, unitPrice: 85, total: 85 },
      { name: 'Vitamin C 500mg', quantity: 1, unitPrice: 350, total: 350 },
    ],
    subtotal: 435,
    tax: 0,
    total: 435,
    category: 'Health',
  },
];

export function ReceiptScanner({
  recentReceipts = demoReceipts,
  onScanComplete,
  className,
}: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ScannedReceipt | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      // In real app, would process the image and extract receipt data
    }, 2000);
  };

  const totalScanned = recentReceipts.reduce((sum, r) => sum + r.total, 0);
  const thisWeek = recentReceipts.filter((r) => {
    const receiptDate = new Date(r.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return receiptDate >= weekAgo;
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📸</span>
          Receipt Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Scan Area */}
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isScanning
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            {isScanning ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-blue-600 font-medium">Scanning receipt...</p>
                <p className="text-sm text-gray-500">Extracting items and amounts</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-5xl">📷</div>
                <p className="font-medium text-gray-900">Scan a Receipt</p>
                <p className="text-sm text-gray-500">
                  Take a photo or upload an image of your receipt
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={handleScan}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    📸 Take Photo
                  </button>
                  <button
                    onClick={handleScan}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    📁 Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Receipts Scanned</p>
            <p className="text-xl font-bold text-blue-700">{recentReceipts.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-xs text-green-600 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-green-700">₱{totalScanned.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 mb-1">This Week</p>
            <p className="text-xl font-bold text-purple-700">{thisWeek.length}</p>
          </div>
        </div>

        {/* Recent Receipts */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Receipts</h4>
          <div className="space-y-3">
            {recentReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedReceipt?.id === receipt.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedReceipt(
                  selectedReceipt?.id === receipt.id ? null : receipt
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {receipt.category === 'Groceries' ? '🛒' :
                       receipt.category === 'Food' ? '🍔' :
                       receipt.category === 'Health' ? '💊' : '🧾'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{receipt.merchant}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(receipt.date).toLocaleDateString('en-PH', {
                          month: 'short',
                          day: 'numeric',
                        })} • {receipt.items.length} items
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">₱{receipt.total.toLocaleString()}</p>
                </div>

                {/* Expanded View */}
                {selectedReceipt?.id === receipt.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500">
                          <th className="text-left pb-2">Item</th>
                          <th className="text-center pb-2">Qty</th>
                          <th className="text-right pb-2">Price</th>
                          <th className="text-right pb-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receipt.items.map((item, i) => (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="py-2 text-gray-900">{item.name}</td>
                            <td className="py-2 text-center text-gray-600">{item.quantity}</td>
                            <td className="py-2 text-right text-gray-600">₱{item.unitPrice}</td>
                            <td className="py-2 text-right font-medium text-gray-900">
                              ₱{item.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-gray-200 font-semibold">
                          <td colSpan={3} className="pt-2 text-right">Total</td>
                          <td className="pt-2 text-right text-blue-600">
                            ₱{receipt.total.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Add to Expenses
                      </button>
                      <button className="py-2 px-4 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-3">Scanner Features</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Auto-categorization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Item extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Duplicate detection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">Merchant recognition</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-amber-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-2">💡 Scanning Tips</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Ensure good lighting and flat surface</li>
            <li>• Include the entire receipt in the frame</li>
            <li>• Avoid shadows and glare</li>
            <li>• Keep receipts for warranty and returns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
