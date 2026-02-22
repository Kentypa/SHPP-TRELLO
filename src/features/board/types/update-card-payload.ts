import type { GetCardResponse } from "./get-card-response";

export type UpdateCardPayload = Omit<GetCardResponse, "created_at"> & {
  list_id: number;
};
