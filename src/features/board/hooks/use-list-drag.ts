import { useState } from "react";
import type { ListType } from "../components/List/ListContext";
import { useSwapLists } from "./use-swap-lists";

export const useListDrag = (lists: ListType[]) => {
  const { mutate: swap } = useSwapLists();
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const reset = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const onDrop = (tgtId: number, tgtPos: number) => {
    if (!draggedId || draggedId === tgtId) return reset();
    const src = lists.find((l) => l.id === draggedId);

    if (src)
      swap([
        { id: draggedId, position: tgtPos },
        { id: tgtId, position: src.position },
      ]);
    reset();
  };

  return {
    draggedId,
    dragOverId,
    onDragStart: setDraggedId,
    onDragEnter: setDragOverId,
    onDragEnd: reset,
    onDrop,
  };
};
