import instance from "../../api/request";
import type { CreateCardPayload } from "../../features/board/types/create-card-payload";
import type { DeleteCardPayload } from "../../features/board/types/delete-card-payload";
import type { MoveCardsPayload } from "../../features/board/types/move-cards-payload";
import type { UpdateCardPayload } from "../../features/board/types/update-card-payload";
import type { BoardId } from "../types/board-id";
import type { ResultResponse } from "../types/result-response";

type CreateCardParams = CreateCardPayload & BoardId;
type DeleteCardParams = DeleteCardPayload & BoardId;
type UpdateCardParams = UpdateCardPayload & BoardId;
type MoveCardsParams = { payload: MoveCardsPayload } & BoardId;

export const cardService = {
  createCard: ({ boardId, ...data }: CreateCardParams) =>
    instance.post<ResultResponse>(`board/${boardId}/card`, data),
  deleteCard: ({ id, boardId }: DeleteCardParams) =>
    instance.delete<ResultResponse>(`board/${boardId}/card/${id}`),
  updateCard: ({ boardId, id, ...data }: UpdateCardParams) =>
    instance.put(`board/${boardId}/card/${id}`, data),
  moveCards: ({ boardId, payload }: MoveCardsParams) =>
    instance.put(`board/${boardId}/card`, payload),
};
