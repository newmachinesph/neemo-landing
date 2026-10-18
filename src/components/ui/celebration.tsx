'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

interface CelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  message?: string;
  className?: string;
}

// Celebration messages for goal achievements
const celebrationMessages = [
  { text: 'You\'re amazing!' },
  { text: 'You made it!' },
  { text: 'Congratulations!' },
  { text: 'Awesome!' },
  { text: 'Goal achieved!' },
  { text: 'Perfect!' },
  { text: 'You\'re incredible!' },
  { text: 'What a milestone!' },
  { text: 'Excellent!' },
  { text: 'Hooray!' },
  { text: 'Keep going!' },
  { text: 'Right on target!' },
];

const colors = [
  '#FFD700', // Gold
  '#FF6B6B', // Coral
  '#4ECDC4', // Teal
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage
  '#FFEAA7', // Pale Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
];

const getRandomMessage = () => {
  return celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
};

const Celebration = ({
  isActive,
  onComplete,
  duration = 3000,
  message,
  className,
}: CelebrationProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [celebrationMessage, setCelebrationMessage] = useState(getRandomMessage());
  const [isVisible, setIsVisible] = useState(false);

  const createConfetti = useCallback(() => {
    const pieces: ConfettiPiece[] = [];
    const pieceCount = 100;

    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2,
        },
      });
    }

    return pieces;
  }, []);

  useEffect(() => {
    if (isActive) {
      setCelebrationMessage(getRandomMessage());
      setConfetti(createConfetti());
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setConfetti([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete, createConfetti]);

  if (!isActive && !isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-50 overflow-hidden',
        className
      )}
    >
      {/* Confetti pieces */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall ${2 + Math.random()}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}

      {/* Celebration message */}
      <div
        className={cn(
          'absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-white rounded-2xl shadow-2xl p-8 text-center',
          'transform transition-all duration-500',
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        )}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {message || celebrationMessage.text}
        </h2>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hook for triggering celebrations
const useCelebration = () => {
  const [isActive, setIsActive] = useState(false);

  const celebrate = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    isActive,
    celebrate,
    stop,
    CelebrationComponent: (props: Omit<CelebrationProps, 'isActive'>) => (
      <Celebration {...props} isActive={isActive} onComplete={stop} />
    ),
  };
};

// Export messages for use elsewhere
export { Celebration, useCelebration, celebrationMessages, getRandomMessage };
export type { CelebrationProps };
