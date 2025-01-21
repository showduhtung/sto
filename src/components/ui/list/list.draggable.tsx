import { type CSSProperties, type PropsWithChildren, useEffect } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/lib/tailwind";
import { SubscriptionProvider, useSubscription, useSubscriptionProvider } from "@/hooks";

type DraggableProps = PropsWithChildren<{ onChange: (items: string[]) => void }>;

function DraggableProvider({ onChange, children }: DraggableProps) {
  const { values, subscribe, unsubscribe, update } = useSubscription();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function handleDragEnd({ active, over }: DragEndEvent) {
    const isOverNewItem = over && active.id !== over?.id;
    if (!isOverNewItem) return;

    const activeIndex = values.findIndex((id) => id === active.id);
    const overIndex = values.findIndex((id) => id === over.id);

    const newIds = arrayMove(values, activeIndex, overIndex);
    update(newIds);

    onChange?.(arrayMove(values, activeIndex, overIndex));
  }

  return (
    <SubscriptionProvider value={{ subscribe, unsubscribe }}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={values}>{children}</SortableContext>
      </DndContext>
    </SubscriptionProvider>
  );
}

type DraggableItemProps = PropsWithChildren<{ id: string }>;

function DraggableItem({ children, id }: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });
  const { subscribe, unsubscribe } = useSubscriptionProvider();

  useEffect(() => {
    subscribe(String(id));
    return () => {
      unsubscribe(String(id));
    };
  }, [subscribe, unsubscribe, id]);

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(isDragging ? "cursor-grabbing" : "cursor-default")}
    >
      {children}
    </div>
  );
}

export type { DraggableProps, DraggableItemProps };
export { DraggableProvider, DraggableItem };
