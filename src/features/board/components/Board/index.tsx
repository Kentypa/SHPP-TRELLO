import type { FC } from "react";
import { Button } from "../../../../shared/components/ui/Button";
import type { BoardData } from "../../types/board-data";
import { BoardFormModal } from "../BoardFormModal";
import { useBoardForm } from "../../hooks/use-board-form";

export const Board: FC<BoardData & { removeBoard: (id: number) => void }> = (
  props,
) => {
  const editController = useBoardForm(props);

  return (
    <li className="border-2 rounded-md p-3 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3>{props.title}</h3>
        <Button
          onClick={editController.modal.toggleModal}
          className="bg-blue-500 text-xs p-1 rounded-md"
        >
          Edit
        </Button>
      </div>

      <Button
        className="bg-red-500 rounded-md p-2"
        onClick={() => props.removeBoard(props.id)}
      >
        Remove
      </Button>

      <BoardFormModal controller={editController} />
    </li>
  );
};
