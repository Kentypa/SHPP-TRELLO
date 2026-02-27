import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "../../../shared/hooks/use-forms";
import { useModal } from "../../../shared/hooks/use-modal";
import { boardKeys } from "../../../shared/keys/board";
import { boardService } from "../../../shared/services/board-service";
import type { AddBoardPayload } from "../types/add-board-payload";
import type { BoardData } from "../types/board-data";
import type { UpdateBoardPayload } from "../types/update-board-payload";
import { useCustomProperties } from "./use-custom-properties";

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
      toast.success("Success");
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
    },
  });

  const {
    formState,
    handleChange,
    handleSubmit,
    handleChangeByValue,
    handleSetFormState,
  } = useForm<UpdateBoardPayload>({ title: "", custom: {} }, (payload) => {
    if (!payload?.title?.trim()) {
      toast.error("Title should be empty");
      return;
    }

    submitBoard(payload);
  });

  const { fields, add, remove, update, reset, setInitial, updateByKey } =
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
    properties: { fields, add, remove, update, updateByKey },
    isEdit: !!activeId,
  };
};
