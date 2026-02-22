import { type FC, type DragEvent, Fragment } from "react";
import { useCardContext } from "./CardContext";
import { useListContext } from "../List/ListContext";
import { CardItem } from "./CardItem";
import { CardPlaceholder } from "./CardPlaceholder";

export const CardList: FC = () => {
  const { cards, listId } = useCardContext();
  const { cardDragActions: d } = useListContext();

  const isTarget = d.dropTarget?.list_id === listId;
  const isEmpty = isTarget && d.dropTarget?.edge === "empty";

  const handleDragOver = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (!cards.length && d.draggedCard)
      d.onDragOver({ id: 0, list_id: listId, edge: "empty", position: 1 });
  };

  return (
    <ul
      onDragOver={handleDragOver}
      onDrop={(e) => {
        e.preventDefault();
        d.onDrop();
      }}
      className={`flex flex-col gap-2 p-1 rounded-md`}
    >
      {isEmpty && !cards.length && <CardPlaceholder />}
      {cards.map((card) => {
        const isDrop = isTarget && d.dropTarget?.id === card.id;
        return (
          <Fragment key={card.id}>
            {isDrop && d.dropTarget?.edge === "top" && <CardPlaceholder />}
            <CardItem {...card} />
            {isDrop && d.dropTarget?.edge === "bottom" && <CardPlaceholder />}
          </Fragment>
        );
      })}
    </ul>
  );
};
