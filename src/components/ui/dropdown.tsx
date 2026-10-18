'use client';

import { Fragment, ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  trigger?: ReactNode;
  align?: 'left' | 'right';
}

export function Dropdown({ items, trigger, align = 'right' }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {trigger || <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={cn(
            'absolute z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <MenuItem key={index} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      'flex w-full items-center px-4 py-2 text-sm',
                      item.variant === 'danger'
                        ? active
                          ? 'bg-red-50 text-red-700'
                          : 'text-red-600'
                        : active
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-700',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    disabled={item.disabled}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
