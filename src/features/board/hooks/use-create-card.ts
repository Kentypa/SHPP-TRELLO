import type { CreateCardPayload } from "../types/create-card-payload";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { boardKeys } from "../../../shared/keys/board";
import { cardService } from "../../../shared/services/card-service";
import { useMemo, useState } from "react";
import { useForm } from "../../../shared/hooks/use-forms";
import { calculateNewPosition } from "../../../shared/utils/calc-new-position";
import { useCardContext } from "../components/Card/CardContext";

export const useCreateCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const queryClient = useQueryClient();
  const { id: boardId } = useParams({ from: "/_authenticated/board/$id" });

  const { mutate: createCard, ...createCardProps } = useMutation({
    mutationFn: (data: CreateCardPayload) =>
      cardService.createCard({ boardId, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(boardId).queryKey,
      });
      setIsEditing(false);
    },
  });

  const { listId, cards } = useCardContext();

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
