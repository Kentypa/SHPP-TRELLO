import instance from "../../api/request";
import type { AddBoardPayload } from "../../features/board/types/add-board-payload";
import type { GetBoardResponse } from "../../features/board/types/get-board-response";
import type { UpdateBoardPayload } from "../../features/board/types/update-board-payload";

export const boardService = {
  getBoards: () => instance.get<GetBoardResponse>("board"),
  addBoard: (data: AddBoardPayload) => instance.post("board", data),
  removeBoard: (id: number) => instance.delete(`board/${id}`),
  updateBoard: (id: number, data: UpdateBoardPayload) =>
    instance.put(`board/${id}`, data),
};
