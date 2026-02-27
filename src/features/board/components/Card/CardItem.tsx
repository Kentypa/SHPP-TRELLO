import type { DragEvent, FC, SyntheticEvent } from "react";
import EditIcon from "../../../../assets/icons/pencil.svg?react";
import { Dialog } from "../../../../shared/components/dialog/Dialog";
import { Button } from "../../../../shared/components/ui/Button";
import { useDeleteCard } from "../../hooks/use-delete-card";
import { useEditCard } from "../../hooks/use-edit-card";
import type { GetCardResponse } from "../../types/get-card-response";
import { useListContext } from "../List/ListContext";
import { useCardContext } from "./CardContext";

export const CardItem: FC<GetCardResponse> = (props) => {
  const { id, position, title, color } = props;
  const { listId } = useCardContext();
  const { cardDragActions: d } = useListContext();
  const { mutate: del } = useDeleteCard();
  const edit = useEditCard();

  const isDrag = d.draggedCard?.id === id;
  const isSwap = d.dropTarget?.id === id && d.dropTarget?.edge === "swap";

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDrag) return;

    const { top, height } = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - top;
    const edge =
      y < height * 0.25 ? "top" : y > height * 0.75 ? "bottom" : "swap";

    d.onDragOver({ id, list_id: listId, edge, position });
  };

  const withStop =
    <T extends SyntheticEvent>(fn: () => void) =>
    (e: T) => {
      e.stopPropagation();
      fn();
    };

  return (
    <li
      draggable
      onDragStart={withStop(() =>
        setTimeout(() => d.onDragStart({ id, position, list_id: listId }), 0),
      )}
      onDragOver={handleDragOver}
      onDrop={withStop(d.onDrop)}
      onDragEnd={withStop(d.onDragEnd)}
      className={`flex text-neutral-50 fill-neutral-50 justify-between rounded-md cursor-grab active:cursor-grabbing transition-all duration-200 
        ${isDrag ? "opacity-0 h-0 p-0 m-0 overflow-hidden border-0" : "p-3 opacity-100 border-2"} 
        ${isSwap ? "border-blue-500 bg-neutral-700 scale-[1.02]" : "border-transparent"}`}
      style={{ backgroundColor: color ?? "#262626" }}
    >
      <h4>{title}</h4>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button className="hover:fill-blue-500 relative">
            <EditIcon className="size-text" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content className="bg-neutral-700 text-white fill-white p-4 rounded-md mt-2 flex flex-col gap-3">
          <Button
            onClick={() => del({ id })}
            className="bg-red-500 p-2 rounded-md"
          >
            Delete
          </Button>
          <Dialog.Close asChild>
            <Button
              onClick={() => edit(props)}
              className="bg-blue-500 p-2 rounded-md"
            >
              Edit
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog>
    </li>
  );
};
