export type MoveCardPayload = {
  id: number;
  position: number;
  list_id: number;
};

export type MoveCardsPayload = MoveCardPayload[];
