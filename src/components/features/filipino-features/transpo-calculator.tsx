'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TranspoOption {
  id: string;
  name: string;
  icon: string;
  baseFare: number;
  perKmRate: number;
  flagDown?: number;
  surcharges?: { name: string; amount: number }[];
}

interface SavedRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: number;
  recommendedMode: string;
  frequency: 'daily' | 'weekly' | 'occasional';
}

interface TranspoCalculatorProps {
  transpoOptions?: TranspoOption[];
  savedRoutes?: SavedRoute[];
  monthlyBudget?: number;
  className?: string;
}

const defaultTranspoOptions: TranspoOption[] = [
  {
    id: 't1',
    name: 'Jeepney',
    icon: '🚐',
    baseFare: 13,
    perKmRate: 1.80,
    surcharges: [{ name: 'Student/Senior/PWD', amount: -2 }],
  },
  {
    id: 't2',
    name: 'Bus (Ordinary)',
    icon: '🚌',
    baseFare: 13,
    perKmRate: 2.20,
    surcharges: [{ name: 'Aircon', amount: 2 }],
  },
  {
    id: 't3',
    name: 'MRT/LRT',
    icon: '🚇',
    baseFare: 13,
    perKmRate: 1.50,
    surcharges: [{ name: 'Beep Card Discount', amount: -1 }],
  },
  {
    id: 't4',
    name: 'UV Express',
    icon: '🚙',
    baseFare: 30,
    perKmRate: 2.50,
  },
  {
    id: 't5',
    name: 'Tricycle',
    icon: '🛺',
    baseFare: 15,
    perKmRate: 5.00,
    flagDown: 10,
  },
  {
    id: 't6',
    name: 'Grab Car',
    icon: '🚗',
    baseFare: 45,
    perKmRate: 15.00,
    flagDown: 45,
    surcharges: [
      { name: 'Rush Hour', amount: 30 },
      { name: 'Late Night', amount: 20 },
    ],
  },
  {
    id: 't7',
    name: 'Grab Bike',
    icon: '🏍️',
    baseFare: 30,
    perKmRate: 8.00,
    flagDown: 30,
  },
  {
    id: 't8',
    name: 'Angkas',
    icon: '🛵',
    baseFare: 29,
    perKmRate: 7.50,
    flagDown: 29,
  },
];

const defaultSavedRoutes: SavedRoute[] = [
  { id: 'r1', name: 'Home to Office', from: 'Quezon City', to: 'Makati', distance: 15, recommendedMode: 'MRT/LRT', frequency: 'daily' },
  { id: 'r2', name: 'Office to Gym', from: 'Makati', to: 'BGC', distance: 3, recommendedMode: 'Jeepney', frequency: 'weekly' },
  { id: 'r3', name: 'Weekend Mall Trip', from: 'Home', to: 'SM North', distance: 5, recommendedMode: 'Grab Car', frequency: 'occasional' },
];

export function TranspoCalculator({
  transpoOptions = defaultTranspoOptions,
  savedRoutes = defaultSavedRoutes,
  monthlyBudget = 5000,
  className,
}: TranspoCalculatorProps) {
  const [distance, setDistance] = useState(10);
  const [selectedSurcharges, setSelectedSurcharges] = useState<Record<string, string[]>>({});

  const fareCalculations = useMemo(() => {
    return transpoOptions.map((option) => {
      let fare = option.baseFare;

      // Add per km rate (after first 4km for most public transport)
      const chargeableKm = Math.max(0, distance - 4);
      fare += chargeableKm * option.perKmRate;

      // Add flag down if applicable
      if (option.flagDown) {
        fare = option.flagDown + (distance * option.perKmRate);
      }

      // Add selected surcharges
      const optionSurcharges = selectedSurcharges[option.id] || [];
      option.surcharges?.forEach((surcharge) => {
        if (optionSurcharges.includes(surcharge.name)) {
          fare += surcharge.amount;
        }
      });

      return {
        ...option,
        totalFare: Math.max(fare, option.baseFare),
        roundTripFare: Math.max(fare, option.baseFare) * 2,
      };
    }).sort((a, b) => a.totalFare - b.totalFare);
  }, [transpoOptions, distance, selectedSurcharges]);

  const cheapestOption = fareCalculations[0];

  const monthlyEstimate = useMemo(() => {
    // Assume 22 working days, round trip
    return {
      cheapest: cheapestOption.totalFare * 2 * 22,
      budget: monthlyBudget,
      remaining: monthlyBudget - (cheapestOption.totalFare * 2 * 22),
    };
  }, [cheapestOption, monthlyBudget]);

  const toggleSurcharge = (optionId: string, surchargeName: string) => {
    setSelectedSurcharges((prev) => {
      const current = prev[optionId] || [];
      if (current.includes(surchargeName)) {
        return { ...prev, [optionId]: current.filter((s) => s !== surchargeName) };
      } else {
        return { ...prev, [optionId]: [...current, surchargeName] };
      }
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🚌</span>
          Transpo Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Distance Input */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl">
          <label className="block text-sm font-medium text-blue-900 mb-2">
            Distance: {distance} km
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-blue-600 mt-1">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Fare Comparison */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Fare Comparison</h4>
          <div className="space-y-3">
            {fareCalculations.map((option, index) => (
              <div
                key={option.id}
                className={`p-4 rounded-xl border-2 ${
                  index === 0
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{option.name}</p>
                      <p className="text-xs text-gray-500">
                        Base: ₱{option.baseFare} + ₱{option.perKmRate}/km
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${index === 0 ? 'text-green-700' : 'text-gray-900'}`}>
                      ₱{option.totalFare.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Round trip: ₱{option.roundTripFare.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Surcharges */}
                {option.surcharges && option.surcharges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {option.surcharges.map((surcharge) => {
                      const isSelected = (selectedSurcharges[option.id] || []).includes(surcharge.name);
                      return (
                        <button
                          key={surcharge.name}
                          onClick={() => toggleSurcharge(option.id, surcharge.name)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            isSelected
                              ? surcharge.amount < 0
                                ? 'bg-green-200 text-green-800'
                                : 'bg-red-200 text-red-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {surcharge.name} ({surcharge.amount > 0 ? '+' : ''}₱{surcharge.amount})
                        </button>
                      );
                    })}
                  </div>
                )}

                {index === 0 && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    Cheapest Option ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Estimate */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
          <h4 className="font-medium text-purple-900 mb-3">Monthly Estimate (using {cheapestOption.name})</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-purple-600">Monthly Cost</p>
              <p className="text-lg font-bold text-purple-700">
                ₱{monthlyEstimate.cheapest.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-purple-600">Budget</p>
              <p className="text-lg font-bold text-purple-700">
                ₱{monthlyEstimate.budget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-purple-600">
                {monthlyEstimate.remaining >= 0 ? 'Savings' : 'Over Budget'}
              </p>
              <p className={`text-lg font-bold ${
                monthlyEstimate.remaining >= 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {monthlyEstimate.remaining >= 0 ? '' : '-'}₱{Math.abs(monthlyEstimate.remaining).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Saved Routes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Saved Routes</h4>
          <div className="space-y-2">
            {savedRoutes.map((route) => {
              const option = transpoOptions.find((t) => t.name === route.recommendedMode) || transpoOptions[0];
              const fare = option.baseFare + Math.max(0, route.distance - 4) * option.perKmRate;

              return (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setDistance(route.distance)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{route.name}</p>
                      <p className="text-xs text-gray-500">
                        {route.from} → {route.to} • {route.distance}km
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₱{fare.toFixed(0)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      route.frequency === 'daily' ? 'bg-red-100 text-red-700' :
                      route.frequency === 'weekly' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {route.frequency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fuel Price Reference */}
        <div className="mb-6 p-4 bg-amber-50 rounded-xl">
          <h4 className="font-medium text-amber-900 mb-2">⛽ If Driving</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-amber-600">Gasoline (per liter)</p>
              <p className="font-semibold text-amber-900">₱65.00</p>
            </div>
            <div>
              <p className="text-xs text-amber-600">Diesel (per liter)</p>
              <p className="font-semibold text-amber-900">₱58.00</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-amber-600">Est. fuel cost ({distance}km @ 10km/L)</p>
              <p className="font-semibold text-amber-900">
                ₱{((distance / 10) * 65).toFixed(2)} (gas) / ₱{((distance / 10) * 58).toFixed(2)} (diesel)
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-blue-50 rounded-xl">
          <h4 className="font-medium text-blue-900 mb-2">💡 Commute Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use Beep cards for MRT/LRT discounts</li>
            <li>• Grab is cheaper during off-peak hours</li>
            <li>• P2P buses are worth it for long distances</li>
            <li>• Consider monthly transpo passes if available</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
