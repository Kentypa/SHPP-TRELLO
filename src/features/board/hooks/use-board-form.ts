import type { AddBoardPayload } from "../types/add-board-payload";
import type { BoardData } from "../types/board-data";
import type { UpdateBoardPayload } from "../types/update-board-payload";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "../../../shared/hooks/use-forms";
import { useModal } from "../../../shared/hooks/use-modal";
import { boardKeys } from "../../../shared/keys/board";
import { boardService } from "../../../shared/services/board-service";
import { useCustomProperties } from "./use-custom-properties";

export const useBoardForm = (initialData?: BoardData) => {
  const isEdit = !!initialData;
  const { showModal, toggleModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: submitBoard } = useMutation({
    mutationFn: (payload: UpdateBoardPayload | AddBoardPayload) =>
      isEdit
        ? boardService.updateBoard(initialData.id, payload)
        : boardService.addBoard(payload as AddBoardPayload),
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
      handleClose();
    },
  });

  const { formState, handleChange, handleSubmit, handleChangeByValue } =
    useForm<UpdateBoardPayload>(
      { title: initialData?.title || "", custom: initialData?.custom },
      submitBoard,
    );

  const { fields, add, remove, update, reset, setInitial } =
    useCustomProperties((customData) => {
      handleChangeByValue("custom", customData);
    });

  const handleOpen = () => {
    if (isEdit) setInitial(initialData.custom);
    toggleModal();
  };

  const handleClose = () => {
    if (!isEdit) {
      reset();
      handleChangeByValue("title", "");
    }
    toggleModal();
  };

  return {
    modal: {
      showModal,
      toggleModal: isEdit ? handleOpen : handleClose,
      close: handleClose,
    },
    form: { formState, handleChange, handleSubmit },
    properties: { fields, add, remove, update },
    isEdit,
  };
};
