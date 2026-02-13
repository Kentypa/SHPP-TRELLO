import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listService } from "../../../shared/services/list-service";
import { boardKeys } from "../../../shared/keys/board";
import { useParams } from "@tanstack/react-router";

export const useDeleteList = () => {
  const { id: boardId } = useParams({ from: "/_authenticated/board/$id" });

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listId: number) => listService.deleteList({ listId, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
    },
  });
};
