import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { boardKeys } from "../../../shared/keys/board";
import { cardService } from "../../../shared/services/card-service";
import type { UpdateCardPayload } from "../types/update-card-payload";
import { useBoardId } from "./use-board-id";

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  const { id: boardId } = useBoardId();

  return useMutation({
    mutationFn: (payload: UpdateCardPayload) =>
      cardService.updateCard({ boardId, ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("Card updated");
    },
    onError: () => {
      toast.error("Card updating error");
    },
  });
};
