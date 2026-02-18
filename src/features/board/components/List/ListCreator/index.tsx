import { useState, type FC } from "react";
import { useParams } from "@tanstack/react-router";
import { useCreateList } from "../../../hooks/use-create-list";
import { ListCreatorButton } from "./ListCreatorButton";
import { useListContext } from "../ListContext";
import { ListCreatorForm } from "./ListCreatorForm";
import { calculateNewPosition } from "../../../../../shared/utils/calc-new-position";

export const ListCreator: FC = () => {
  const { lists } = useListContext();
  const position = calculateNewPosition(lists);

  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams({ from: "/_authenticated/board/$id" });
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
