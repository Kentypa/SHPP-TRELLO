import { useState, type FC } from "react";
import { useCreateList } from "../../../hooks/use-create-list";
import { ListCreatorButton } from "./ListCreatorButton";
import { useListContext } from "../ListContext";
import { ListCreatorForm } from "./ListCreatorForm";
import { calculateNewPosition } from "../../../../../shared/utils/calc-new-position";
import { useBoardId } from "../../../hooks/use-board-id";

export const ListCreator: FC = () => {
  const { lists } = useListContext();
  const position = calculateNewPosition(lists);

  const [isOpen, setIsOpen] = useState(false);
  const { id } = useBoardId();
  const { mutate: createList } = useCreateList();

  return (
    <li className="shrink-0">
      {isOpen ? (
        <ListCreatorForm
          position={position}
          boardId={Number(id)}
          onSubmit={createList}
          onCancel={() => setIsOpen(false)}
        />
      ) : (
        <ListCreatorButton onClick={() => setIsOpen(true)} />
      )}
    </li>
  );
};
