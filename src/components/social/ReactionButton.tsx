'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface ReactionButtonProps {
  reactions?: Reaction[];
  onReact?: (emoji: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
}

const defaultReactions: Reaction[] = [
  { emoji: '💪', label: "You've got this!", count: 12 },
  { emoji: '🌟', label: 'Proud of you!', count: 8 },
  { emoji: '🎉', label: 'Celebrate!', count: 5 },
  { emoji: '🔥', label: 'On fire!', count: 15 },
  { emoji: '❤️', label: 'Love it!', count: 20 },
];

export function ReactionButton({
  reactions = defaultReactions,
  onReact,
  size = 'md',
  showCounts = true,
}: ReactionButtonProps) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [localReactions, setLocalReactions] = useState(reactions);

  const handleReact = (emoji: string) => {
    if (selectedReaction === emoji) {
      // Remove reaction
      setSelectedReaction(null);
      setLocalReactions(
        localReactions.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count - 1 } : r
        )
      );
    } else {
      // Add/change reaction
      if (selectedReaction) {
        // Remove old reaction
        setLocalReactions((prev) =>
          prev.map((r) =>
            r.emoji === selectedReaction ? { ...r, count: r.count - 1 } : r
          )
        );
      }
      setSelectedReaction(emoji);
      setLocalReactions((prev) =>
        prev.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count + 1 } : r
        )
      );
    }
    onReact?.(emoji);
    setShowReactions(false);
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const totalReactions = localReactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
        onClick={() => setShowReactions(!showReactions)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
          selectedReaction
            ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${sizeClasses[size]}`}
      >
        {selectedReaction ? (
          <span className="text-lg">{selectedReaction}</span>
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
        {showCounts && <span className="font-medium">{totalReactions}</span>}
      </button>

      {/* Reaction Picker */}
      {showReactions && (
        <div
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
          className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1.5 flex gap-1 z-10"
        >
          {localReactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => handleReact(reaction.emoji)}
              className={`relative p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-125 ${
                selectedReaction === reaction.emoji ? 'bg-pink-100 scale-110' : ''
              }`}
              title={reaction.label}
            >
              <span className="text-xl">{reaction.emoji}</span>
              {showCounts && reaction.count > 0 && (
                <span className="absolute -bottom-1 -right-1 text-xs bg-gray-200 text-gray-600 rounded-full px-1 min-w-[16px] text-center">
                  {reaction.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
