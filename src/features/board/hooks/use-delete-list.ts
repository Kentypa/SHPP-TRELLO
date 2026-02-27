import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { boardKeys } from "../../../shared/keys/board";
import { listService } from "../../../shared/services/list-service";
import type { DeleteListPayload } from "../types/delete-list-payload";
import { useBoardId } from "./use-board-id";

export const useDeleteList = () => {
  const { id: boardId } = useBoardId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId }: DeleteListPayload) =>
      listService.deleteList({ listId, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("List deleted");
    },
    onError: () => {
      toast.error("List not deleted");
    },
  });
};
