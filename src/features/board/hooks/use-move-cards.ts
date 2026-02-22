import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardId } from "./use-board-id";
import { cardService } from "../../../shared/services/card-service";
import { boardKeys } from "../../../shared/keys/board";
import type { MoveCardsPayload } from "../types/move-cards-payload";
import { toast } from "react-toastify";

export const useMoveCards = () => {
  const queryClient = useQueryClient();
  const { id: boardId } = useBoardId();
  return useMutation({
    mutationFn: (payload: MoveCardsPayload) =>
      cardService.moveCards({ boardId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("Moved");
    },
    onError: () => {
      toast.error("Error at move");
    },
  });
};
