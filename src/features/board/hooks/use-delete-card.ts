import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { boardKeys } from "../../../shared/keys/board";
import { cardService } from "../../../shared/services/card-service";
import type { DeleteCardPayload } from "../types/delete-card-payload";
import { useBoardId } from "./use-board-id";

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  const { id: boardId } = useBoardId();

  return useMutation({
    mutationFn: ({ id }: DeleteCardPayload) =>
      cardService.deleteCard({ id, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("Card deleted");
    },
    onError: () => {
      toast.error("Card not deleted");
    },
  });
};
