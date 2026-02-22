import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "../../../shared/keys/board";
import { listService } from "../../../shared/services/list-service";
import type { UpdateListPayload } from "../types/update-list-payload";
import { useBoardId } from "./use-board-id";
import { toast } from "react-toastify";

export const useUpdateList = () => {
  const { id: boardId } = useBoardId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateListPayload) =>
      listService.updateList({ ...data, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      toast.success("List updated");
    },
    onError: () => {
      toast.error("Error at updating");
    },
  });
};
