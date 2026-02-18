import { createContext, useContext } from "react";
import type { GetBoardDetailsResponse } from "../../types/get-board-details-response";

export type ListType = GetBoardDetailsResponse["lists"][number];

export type ListContextType = {
  lists: ListType[];
};

export const ListContext = createContext<ListContextType | null>(null);

export const useListContext = () => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("List.* components must be used within <List>");
  return ctx;
};
