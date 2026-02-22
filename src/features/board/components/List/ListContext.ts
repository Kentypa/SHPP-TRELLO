import { createContext, useContext } from "react";
import type { GetBoardDetailsResponse } from "../../types/get-board-details-response";
import type { useCardDrag } from "../../hooks/use-card-drag";
import type { useListDrag } from "../../hooks/use-list-drag";
import type { useCardModalRoot } from "../../hooks/use-card-modal-root";

export type ListType = GetBoardDetailsResponse["lists"][number];

export type CardModalType = ReturnType<typeof useCardModalRoot>;

export type DragActions = ReturnType<typeof useListDrag>;

export type CardDragActions = ReturnType<typeof useCardDrag>;

export type ListContextType = {
  lists: ListType[];
  dragActions: DragActions;
  cardDragActions: CardDragActions;
  cardModal?: CardModalType;
};

export const ListContext = createContext<ListContextType | null>(null);

export const useListContext = () => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("List.* components must be used within <List>");
  return ctx;
};
