import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { boardKeys } from "../../../shared/keys/board";
import { cardService } from "../../../shared/services/card-service";
import type { MoveCardsPayload } from "../types/move-cards-payload";
import { useBoardId } from "./use-board-id";

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
