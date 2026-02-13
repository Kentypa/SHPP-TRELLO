import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { boardKeys } from "../../../shared/keys/board";
import { listService } from "../../../shared/services/list-service";

export const useCreateList = () => {
  const { id } = useParams({ from: "/_authenticated/board/$id" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listService.createList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(id).queryKey,
      });
    },
  });
};
