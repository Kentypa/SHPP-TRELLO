import { createQueryKeys } from "@lukemorales/query-key-factory";
import { boardService } from "../services/board-service";

export const boardKeys = createQueryKeys("boards", {
  all: { queryKey: null, queryFn: () => boardService.getBoards() },
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => boardService.getBoardById(id),
  }),
});
