'use client';

import { useState } from 'react';
import { HandRaisedIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface CheerButtonProps {
  username: string;
  displayName: string;
  onCheer?: () => void;
  cheerCount?: number;
  hasCheered?: boolean;
}

export function CheerButton({
  username,
  displayName,
  onCheer,
  cheerCount = 0,
  hasCheered = false,
}: CheerButtonProps) {
  const [cheered, setCheered] = useState(hasCheered);
  const [count, setCount] = useState(cheerCount);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleCheer = () => {
    if (!cheered) {
      setCheered(true);
      setCount(count + 1);
      setShowAnimation(true);
      onCheer?.();
      setTimeout(() => setShowAnimation(false), 1000);
    }
  };

  return (
    <button
      onClick={handleCheer}
      disabled={cheered}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        cheered
          ? 'bg-yellow-100 text-yellow-700 cursor-default'
          : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105'
      }`}
    >
      {showAnimation && (
        <span className="absolute inset-0 flex items-center justify-center">
          <SparklesIcon className="w-6 h-6 text-yellow-300 animate-ping" />
        </span>
      )}
      <HandRaisedIcon className="w-5 h-5" />
      {cheered ? (
        <span>Cheered! ({count})</span>
      ) : (
        <span>Cheer for {displayName}</span>
      )}
    </button>
  );
}
