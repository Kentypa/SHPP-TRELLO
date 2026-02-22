import { type FC } from "react";
import type { GetListResponse } from "../../types/get-list-response";
import { useDeleteList } from "../../hooks/use-delete-list";
import { useEditList } from "../../hooks/use-edit-list";
import { ListTitle } from "./ListTitle";
import { ListActions } from "./ListActions";
import { Card } from "../Card";
import { useListContext } from "./ListContext";

export const ListItem: FC<GetListResponse> = ({
  cards,
  id,
  title,
  position,
}) => {
  const { mutate: deleteList } = useDeleteList();
  const { handleSubmit, formState, setIsEditing, handleChange, isEditing } =
    useEditList({ listId: id, position, title });

  const {
    dragActions: {
      onDrop,
      onDragStart,
      onDragEnter,
      onDragEnd,
      dragOverId,
      draggedId,
    },
  } = useListContext();

  const isDragging = draggedId === id;

  const isAnyListDragging = draggedId !== null;
  const isOver = isAnyListDragging && dragOverId === id && !isDragging;

  const dragStyles = isDragging ? "opacity-30" : "opacity-100";
  const dropStyles = isOver
    ? "border-3 border-blue-500 bg-neutral-800"
    : "border-2";

  return (
    <li
      draggable
      onDragStart={() => onDragStart(id)}
      onDragEnter={() => onDragEnter(id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(id, position)}
      onDragEnd={onDragEnd}
      className={`shrink-0 flex flex-col gap-6 bg-neutral-900 rounded-md p-3 transition-all cursor-grab active:cursor-grabbing ${dragStyles} ${dropStyles}`}
    >
      <div className="w-68 flex gap-3 justify-between text-white fill-white">
        <ListTitle
          formState={formState}
          isEditing={isEditing}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setIsEditing={setIsEditing}
          title={title}
        />
        <ListActions
          handleDelete={() => deleteList({ listId: id })}
          handleEdit={() => setIsEditing(!isEditing)}
        />
      </div>
      <Card listId={id} cards={cards}>
        <Card.List />
        <Card.Creator />
      </Card>
    </li>
  );
};
