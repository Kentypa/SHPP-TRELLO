import type { CreateCardPayload } from "../types/create-card-payload";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { boardKeys } from "../../../shared/keys/board";
import { cardService } from "../../../shared/services/card-service";
import { useMemo, useState } from "react";
import { useForm } from "../../../shared/hooks/use-forms";
import { calculateNewPosition } from "../../../shared/utils/calc-new-position";
import { useCardContext } from "../components/Card/CardContext";
import { useBoardId } from "./use-board-id";
import type { GetCardResponse } from "../types/get-card-response";
import { toast } from "react-toastify";

export const useCreateCard = (cards: GetCardResponse[]) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const queryClient = useQueryClient();
  const { id: boardId } = useBoardId();

  const { mutate: createCard, ...createCardProps } = useMutation({
    mutationFn: (data: CreateCardPayload) =>
      cardService.createCard({ boardId, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      setIsEditing(false);

      toast.success("Card created");
    },
    onError: () => {
      toast.error("Card not created");
    },
  });

  const { listId } = useCardContext();

  const position = calculateNewPosition(cards);

  const initialState: CreateCardPayload = useMemo(
    () => ({ title: "", description: "", list_id: listId, position }),
    [listId, position],
  );

  const { handleSubmit, handleChange, formState } = useForm(
    initialState,
    createCard,
  );

  return {
    toggleEditing,
    isEditing,
    formState,
    handleChange,
    handleSubmit,
    ...createCardProps,
  };
};
