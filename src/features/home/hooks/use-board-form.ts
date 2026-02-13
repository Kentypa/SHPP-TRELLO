import type { AddBoardPayload } from "../types/add-board-payload";
import type { BoardData } from "../types/board-data";
import type { UpdateBoardPayload } from "../types/update-board-payload";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "../../../shared/hooks/use-forms";
import { useModal } from "../../../shared/hooks/use-modal";
import { boardKeys } from "../../../shared/keys/board";
import { boardService } from "../../../shared/services/board-service";
import { useCustomProperties } from "./use-custom-properties";
import { useState } from "react";

export const useBoardForm = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { showModal, toggleModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: submitBoard } = useMutation({
    mutationFn: (payload: UpdateBoardPayload | AddBoardPayload) =>
      activeId
        ? boardService.updateBoard(activeId, payload)
        : boardService.addBoard(payload as AddBoardPayload),
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
      handleClose();
    },
  });

  const {
    formState,
    handleChange,
    handleSubmit,
    handleChangeByValue,
    handleSetFormState,
  } = useForm<UpdateBoardPayload>({ title: "", custom: {} }, submitBoard);

  const { fields, add, remove, update, reset, setInitial } =
    useCustomProperties((customData) =>
      handleChangeByValue("custom", customData),
    );

  const open = (board?: BoardData) => {
    if (board) {
      setActiveId(board.id);
      handleSetFormState({ title: board.title, custom: board.custom });
      setInitial(board.custom);
    } else {
      setActiveId(null);
      reset();
      handleSetFormState({ title: "", custom: {} });
    }
    toggleModal();
  };

  const handleClose = () => {
    toggleModal();
    setTimeout(() => {
      setActiveId(null);
      handleSetFormState({ title: "", custom: {} });
      reset();
    }, 200);
  };

  return {
    modal: { showModal, open, close: handleClose },
    form: { formState, handleChange, handleSubmit },
    properties: { fields, add, remove, update },
    isEdit: !!activeId,
  };
};
