import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { boardKeys } from "../../../shared/keys/board";
import { listService } from "../../../shared/services/list-service";
import type { SwapListPayload } from "../types/swap-lists-payload";
import { useBoardId } from "./use-board-id";

export const useSwapLists = () => {
  const queryClient = useQueryClient();
  const { id: boardId } = useBoardId();

  return useMutation({
    mutationFn: (payload: SwapListPayload) =>
      listService.swapLists({ boardId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("Swapping success");
    },
    onError: () => {
      toast.error("Error at swap");
    },
  });
};
