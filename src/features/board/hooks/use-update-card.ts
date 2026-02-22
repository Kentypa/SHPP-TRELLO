import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardId } from "./use-board-id";
import { cardService } from "../../../shared/services/card-service";
import { boardKeys } from "../../../shared/keys/board";
import type { UpdateCardPayload } from "../types/update-card-payload";
import { toast } from "react-toastify";

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
