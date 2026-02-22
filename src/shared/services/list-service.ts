import instance from "../../api/request";
import type { AddListPayload } from "../../features/board/types/add-list-payload";
import type { DeleteListPayload } from "../../features/board/types/delete-list-payload";
import type { UpdateListPayload } from "../../features/board/types/update-list-payload";
import type { ResultResponse } from "../types/result-response";
import type { BoardId } from "../types/board-id";
import type { SwapListPayload } from "../../features/board/types/swap-lists-payload";

type CreateListParams = AddListPayload & BoardId;
type DeleteListParams = DeleteListPayload & BoardId;
type UpdateListParams = UpdateListPayload & BoardId;
type SwapListsParams = { payload: SwapListPayload } & BoardId;

export const listService = {
  createList: ({ boardId, ...data }: CreateListParams) =>
    instance.post<ResultResponse>(`board/${boardId}/list`, data),
  deleteList: ({ boardId, listId }: DeleteListParams) =>
    instance.delete<ResultResponse>(`board/${boardId}/list/${listId}`),
  updateList: ({ boardId, listId, ...data }: UpdateListParams) =>
    instance.put<ResultResponse>(`board/${boardId}/list/${listId}`, data),
  swapLists: ({ boardId, payload }: SwapListsParams) =>
    instance.put(`board/${boardId}/list`, payload),
};
