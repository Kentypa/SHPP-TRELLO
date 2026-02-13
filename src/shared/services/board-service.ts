import instance from "../../api/request";
import type { GetBoardDetailsResponse } from "../../features/board/types/get-board-details-response";
import type { AddBoardPayload } from "../../features/home/types/add-board-payload";
import type { GetBoardResponse } from "../../features/home/types/get-board-response";
import type { UpdateBoardPayload } from "../../features/home/types/update-board-payload";

export const boardService = {
  getBoards: () => instance.get<GetBoardResponse>("board"),
  addBoard: (data: AddBoardPayload) => instance.post("board", data),
  removeBoard: (id: number) => instance.delete(`board/${id}`),
  updateBoard: (id: number, data: UpdateBoardPayload) =>
    instance.put(`board/${id}`, data),
  getBoardById: (id: number) =>
    instance.get<GetBoardDetailsResponse>(`board/${id}`),
};
