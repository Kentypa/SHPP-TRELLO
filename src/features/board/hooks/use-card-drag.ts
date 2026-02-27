import { useState } from "react";
import type { GetCardResponse } from "../types/get-card-response";
import type { GetListResponse } from "../types/get-list-response";
import type {
  MoveCardPayload,
  MoveCardsPayload,
} from "../types/move-cards-payload";
import { useMoveCards } from "./use-move-cards";

export type DropEdge = "top" | "bottom" | "empty" | "swap";
export type DropTarget = {
  id: number;
  list_id: number;
  edge: DropEdge;
  position: number;
};

const buildPayload = (
  dragged: MoveCardPayload,
  target: DropTarget,
  src: GetListResponse,
  tgt: GetListResponse,
): MoveCardsPayload => {
  if (target.edge === "swap") {
    const tCard = tgt.cards.find((c) => c.id === target.id);
    if (!tCard) return [];
    return [
      { id: dragged.id, list_id: tgt.id, position: tCard.position },
      { id: tCard.id, list_id: src.id, position: dragged.position },
    ];
  }

  const isSame = src.id === tgt.id;
  const sCards = [...src.cards].sort((a, b) => a.position - b.position);
  const [card] = sCards.splice(
    sCards.findIndex((c) => c.id === dragged.id),
    1,
  );

  const tCards = isSame
    ? sCards
    : [...tgt.cards].sort((a, b) => a.position - b.position);
  let newIdx = tCards.findIndex((c) => c.id === target.id);

  if (target.edge === "bottom") newIdx++;
  if (target.edge === "empty") newIdx = 0;
  if (newIdx === -1) newIdx = tCards.length;

  tCards.splice(newIdx, 0, card);

  const toPayload = (listId: number) => (c: GetCardResponse, i: number) => ({
    id: c.id,
    list_id: listId,
    position: i,
  });

  const res = isSame
    ? sCards.map(toPayload(tgt.id))
    : [...sCards.map(toPayload(src.id)), ...tCards.map(toPayload(tgt.id))];

  return res.filter((c) => {
    if (c.id === dragged.id) return true;
    const orig =
      src.cards.find((o) => o.id === c.id) ||
      tgt.cards.find((o) => o.id === c.id);
    return orig?.position !== c.position;
  });
};

export const useCardDrag = (lists: GetListResponse[]) => {
  const { mutate: move } = useMoveCards();
  const [draggedCard, setDragged] = useState<MoveCardPayload | null>(null);
  const [dropTarget, setTarget] = useState<DropTarget | null>(null);

  const reset = () => {
    setDragged(null);
    setTarget(null);
  };

  const onDrop = () => {
    if (!draggedCard || !dropTarget) return reset();
    const src = lists.find((l) => l.id === draggedCard.list_id);
    const tgt = lists.find((l) => l.id === dropTarget.list_id);

    if (src && tgt) {
      const payload = buildPayload(draggedCard, dropTarget, src, tgt);
      if (payload.length) move(payload);
    }
    reset();
  };

  return {
    draggedCard,
    dropTarget,
    onDragStart: setDragged,
    onDragOver: setTarget,
    onDrop,
    onDragEnd: reset,
  };
};
