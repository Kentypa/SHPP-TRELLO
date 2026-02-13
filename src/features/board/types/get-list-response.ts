import type { GetCardResponse } from "./get-card-response";

export type GetListResponse = {
  id: number;
  title: string;
  cards: GetCardResponse[];
};
