import { useQueryClient, useMutation } from "@tanstack/react-query";
import { boardKeys } from "../../../shared/keys/board";
import { boardService } from "../../../shared/services/board-service";
import { toast } from "react-toastify";

export const useRemoveBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.removeBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.all.queryKey });
      toast.success("Board deleted");
    },
    onError: () => {
      toast.error("Cant remove board");
    },
  });
};
