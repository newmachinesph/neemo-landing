'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface DeleteButtonProps {
  id: number;
  action: (id: number) => Promise<{ success: boolean }>;
  label?: string;
}

export function DeleteButton({ id, action, label = 'Delete' }: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    startTransition(async () => {
      await action(id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
    >
      {isPending ? '...' : label}
    </button>
  );
}
