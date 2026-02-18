import instance from "../../api/request";
import type { CreateCardPayload } from "../../features/board/types/create-card-payload";
import type { BoardId } from "../types/board-id";
import type { ResultResponse } from "../types/result-response";

type CreateCardParams = CreateCardPayload & BoardId;

export const cardService = {
  createCard: ({ boardId, ...data }: CreateCardParams) =>
    instance.post<ResultResponse>(`board/${boardId}/card`, data),
};
