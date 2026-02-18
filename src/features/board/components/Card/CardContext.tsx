import { createContext, useContext } from "react";
import type { GetCardResponse } from "../../types/get-card-response";

export type CardContextType = {
  cards: GetCardResponse[];
  listId: number;
};

export const CardContext = createContext<CardContextType | null>(null);

export const useCardContext = () => {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("Card.* components must be used within <Card>");
  return ctx;
};
