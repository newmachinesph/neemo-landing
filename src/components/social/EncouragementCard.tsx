'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ReactionButton } from './ReactionButton';

interface EncouragementCardProps {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
  };
  type: 'milestone' | 'goal' | 'streak' | 'challenge' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  reactions?: { emoji: string; label: string; count: number }[];
  comments?: number;
  isLiked?: boolean;
}

const typeConfig = {
  milestone: { icon: '🌟', color: 'bg-yellow-100 text-yellow-700', label: 'Milestone' },
  goal: { icon: '🎯', color: 'bg-green-100 text-green-700', label: 'Goal Progress' },
  streak: { icon: '🔥', color: 'bg-orange-100 text-orange-700', label: 'Streak' },
  challenge: { icon: '🏆', color: 'bg-purple-100 text-purple-700', label: 'Challenge' },
  achievement: { icon: '🏅', color: 'bg-blue-100 text-blue-700', label: 'Achievement' },
};

const quickEncouragements = [
  { emoji: '💪', text: "You've got this!" },
  { emoji: '🌟', text: 'Proud of you!' },
  { emoji: '🎉', text: 'Amazing work!' },
  { emoji: '👏', text: 'Keep it up!' },
  { emoji: '🙌', text: 'Inspiring!' },
];

export function EncouragementCard({
  id,
  user,
  type,
  title,
  description,
  timestamp,
  reactions,
  comments = 0,
  isLiked = false,
}: EncouragementCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [showQuickSend, setShowQuickSend] = useState(false);
  const [sentEncouragement, setSentEncouragement] = useState<string | null>(null);
  const config = typeConfig[type];

  const handleSendEncouragement = (text: string) => {
    setSentEncouragement(text);
    setShowQuickSend(false);
    setTimeout(() => setSentEncouragement(null), 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Link
          href={`/u/${user.username}`}
          className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full text-xl hover:bg-green-200 transition-colors"
        >
          {user.avatar}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link href={`/u/${user.username}`} className="font-medium text-gray-900 hover:text-green-600">
              {user.displayName}
            </Link>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.color}`}>
              {config.icon} {config.label}
            </span>
          </div>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Sent Encouragement Confirmation */}
      {sentEncouragement && (
        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-pulse">
          <SparklesIcon className="w-5 h-5 text-green-600" />
          <span className="text-green-700">Encouragement sent: "{sentEncouragement}"</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <ReactionButton reactions={reactions} />
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="font-medium">{comments}</span>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowQuickSend(!showQuickSend)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors font-medium"
          >
            <HeartIcon className="w-5 h-5" />
            Send Encouragement
          </button>

          {/* Quick Encouragement Picker */}
          {showQuickSend && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-10 w-64">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Encouragement</p>
              <div className="space-y-1">
                {quickEncouragements.map((enc) => (
                  <button
                    key={enc.text}
                    onClick={() => handleSendEncouragement(enc.text)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <span className="text-lg">{enc.emoji}</span>
                    <span className="text-gray-700">{enc.text}</span>
                  </button>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <input
                  type="text"
                  placeholder="Write custom message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleSendEncouragement(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
