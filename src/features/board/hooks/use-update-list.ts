import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { boardKeys } from "../../../shared/keys/board";
import { listService } from "../../../shared/services/list-service";
import type { UpdateListPayload } from "../types/update-list-payload";

export const useUpdateList = () => {
  const { id: boardId } = useParams({ from: "/_authenticated/board/$id" });

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateListPayload) =>
      listService.updateList({ ...data, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
    },
  });
};
