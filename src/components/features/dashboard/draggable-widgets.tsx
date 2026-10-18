'use client';

import {
  useState,
  useCallback,
  ReactNode,
  DragEvent,
  createContext,
  useContext,
} from 'react';
import { cn } from '@/lib/utils';

interface Widget {
  id: string;
  title: string;
  component: ReactNode;
  size: 'small' | 'medium' | 'large' | 'full';
  visible: boolean;
}

interface WidgetContextType {
  widgets: Widget[];
  moveWidget: (fromIndex: number, toIndex: number) => void;
  toggleWidget: (id: string) => void;
  updateWidgetSize: (id: string, size: Widget['size']) => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

interface DraggableWidgetProps {
  widget: Widget;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (e: DragEvent, index: number) => void;
  onDrop: (index: number) => void;
  isDragging: boolean;
  isDropTarget: boolean;
  isEditMode: boolean;
  onRemove: (id: string) => void;
  onResize: (id: string, size: Widget['size']) => void;
}

const sizeStyles = {
  small: 'col-span-1',
  medium: 'col-span-1 md:col-span-2',
  large: 'col-span-1 md:col-span-2 lg:col-span-3',
  full: 'col-span-full',
};

function DraggableWidget({
  widget,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  isDropTarget,
  isEditMode,
  onRemove,
  onResize,
}: DraggableWidgetProps) {
  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(index);
  };

  return (
    <div
      draggable={isEditMode}
      onDragStart={handleDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e, index);
      }}
      onDrop={() => onDrop(index)}
      className={cn(
        sizeStyles[widget.size],
        'relative transition-all duration-200',
        isDragging && 'opacity-50 scale-95',
        isDropTarget && 'ring-2 ring-blue-500 ring-offset-2',
        isEditMode && 'cursor-move'
      )}
    >
      {isEditMode && (
        <div className="absolute -top-2 -right-2 z-10 flex gap-1">
          <select
            value={widget.size}
            onChange={(e) => onResize(widget.id, e.target.value as Widget['size'])}
            onClick={(e) => e.stopPropagation()}
            className="text-xs bg-white border border-gray-300 rounded px-1 py-0.5 shadow-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full</option>
          </select>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(widget.id);
            }}
            className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {isEditMode && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-gray-900/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
            Drag to reorder
          </div>
        </div>
      )}
      <div className={cn(isEditMode && 'pointer-events-none')}>{widget.component}</div>
    </div>
  );
}

interface WidgetGridProps {
  widgets: Widget[];
  onWidgetsChange: (widgets: Widget[]) => void;
  isEditMode: boolean;
}

export function WidgetGrid({ widgets, onWidgetsChange, isEditMode }: WidgetGridProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const visibleWidgets = widgets.filter((w) => w.visible);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((_e: DragEvent, index: number) => {
    setDropTargetIndex(index);
  }, []);

  const handleDrop = useCallback(
    (toIndex: number) => {
      if (draggedIndex !== null && draggedIndex !== toIndex) {
        const newWidgets = [...widgets];
        const visibleIndices = widgets
          .map((w, i) => (w.visible ? i : -1))
          .filter((i) => i !== -1);

        const fromActualIndex = visibleIndices[draggedIndex];
        const toActualIndex = visibleIndices[toIndex];

        const [removed] = newWidgets.splice(fromActualIndex, 1);
        newWidgets.splice(toActualIndex, 0, removed);

        onWidgetsChange(newWidgets);
      }
      setDraggedIndex(null);
      setDropTargetIndex(null);
    },
    [draggedIndex, widgets, onWidgetsChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const newWidgets = widgets.map((w) => (w.id === id ? { ...w, visible: false } : w));
      onWidgetsChange(newWidgets);
    },
    [widgets, onWidgetsChange]
  );

  const handleResize = useCallback(
    (id: string, size: Widget['size']) => {
      const newWidgets = widgets.map((w) => (w.id === id ? { ...w, size } : w));
      onWidgetsChange(newWidgets);
    },
    [widgets, onWidgetsChange]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {visibleWidgets.map((widget, index) => (
        <DraggableWidget
          key={widget.id}
          widget={widget}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          isDragging={draggedIndex === index}
          isDropTarget={dropTargetIndex === index && draggedIndex !== index}
          isEditMode={isEditMode}
          onRemove={handleRemove}
          onResize={handleResize}
        />
      ))}
    </div>
  );
}

interface WidgetPickerProps {
  widgets: Widget[];
  onToggle: (id: string) => void;
}

export function WidgetPicker({ widgets, onToggle }: WidgetPickerProps) {
  const hiddenWidgets = widgets.filter((w) => !w.visible);

  if (hiddenWidgets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        All widgets are currently visible on your dashboard.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {hiddenWidgets.map((widget) => (
        <button
          key={widget.id}
          onClick={() => onToggle(widget.id)}
          className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="font-medium text-gray-700">{widget.title}</span>
        </button>
      ))}
    </div>
  );
}

interface DashboardCustomizerProps {
  widgets: Widget[];
  onWidgetsChange: (widgets: Widget[]) => void;
  onClose: () => void;
}

export function DashboardCustomizer({ widgets, onWidgetsChange, onClose }: DashboardCustomizerProps) {
  const toggleWidget = useCallback(
    (id: string) => {
      const newWidgets = widgets.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w));
      onWidgetsChange(newWidgets);
    },
    [widgets, onWidgetsChange]
  );

  const resetToDefault = useCallback(() => {
    const defaultWidgets = widgets.map((w) => ({ ...w, visible: true, size: 'medium' as const }));
    onWidgetsChange(defaultWidgets);
  }, [widgets, onWidgetsChange]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Customize Dashboard</h2>
            <p className="text-sm text-gray-500">Add or remove widgets from your dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="font-medium text-gray-900 mb-4">Available Widgets</h3>
          <div className="space-y-2">
            {widgets.map((widget) => (
              <label
                key={widget.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <span className="font-medium text-gray-700">{widget.title}</span>
                <input
                  type="checkbox"
                  checked={widget.visible}
                  onChange={() => toggleWidget(widget.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={resetToDefault}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Reset to default
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for managing widget state
export function useWidgets(initialWidgets: Widget[]) {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const moveWidget = useCallback((fromIndex: number, toIndex: number) => {
    setWidgets((prev) => {
      const newWidgets = [...prev];
      const [removed] = newWidgets.splice(fromIndex, 1);
      newWidgets.splice(toIndex, 0, removed);
      return newWidgets;
    });
  }, []);

  const toggleWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)));
  }, []);

  const updateWidgetSize = useCallback((id: string, size: Widget['size']) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  }, []);

  return {
    widgets,
    setWidgets,
    isEditMode,
    setIsEditMode,
    showCustomizer,
    setShowCustomizer,
    moveWidget,
    toggleWidget,
    updateWidgetSize,
  };
}

export { WidgetContext };
export type { Widget, WidgetContextType };
