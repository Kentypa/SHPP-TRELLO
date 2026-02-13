import type { FC } from "react";
import type { useGetBoards } from "../../hooks/use-get-boards";
import { Board } from "../Board";
import type { BoardData } from "../../types/board-data";

type BoardListProps = NonNullable<ReturnType<typeof useGetBoards>["data"]>;

export const BoardList: FC<
  BoardListProps & { onEdit: (b: BoardData) => void }
> = ({ boards, onEdit }) => {
  return (
    <ul className="flex gap-12">
      {boards?.map((board) => (
        <Board onEdit={() => onEdit(board)} key={board.id} {...board} />
      ))}
    </ul>
  );
};
