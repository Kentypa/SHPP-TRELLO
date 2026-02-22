import type { FC, MouseEvent } from "react";
import type { BoardData } from "../../types/board-data";
import { Button } from "../../../../shared/components/ui/Button";
import { useRemoveBoard } from "../../hooks/use-remove-board";
import { Link } from "@tanstack/react-router";
import MenuIcon from "../../../../assets/icons/dots-row.svg?react";

export const Board: FC<BoardData & { onEdit: () => void }> = ({
  id,
  title,
  custom,
  onEdit,
}) => {
  const { mutate: removeBoard } = useRemoveBoard();

  const handleAction = (e: MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <li>
      <Link
        to="/board/$id"
        params={{ id }}
        className="rounded-md p-3 flex flex-col gap-12 bg-neutral-500"
        style={{ background: custom?.background }}
      >
        <div className="flex gap-6 justify-between items-center">
          <h3>{title}</h3>
          <Button
            onClick={(e) => handleAction(e, onEdit)}
            className="text-xs p-1 rounded-md"
          >
            <MenuIcon className="size-text" />
          </Button>
        </div>

        <Button
          className="bg-red-500 rounded-md p-2"
          onClick={(e) => handleAction(e, () => removeBoard(id))}
        >
          Remove
        </Button>
      </Link>
    </li>
  );
};
