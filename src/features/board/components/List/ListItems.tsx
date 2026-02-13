import { type FC } from "react";
import { useListContext } from "./ListContext";
import { ListItem } from "./ListItem";

export const ListItems: FC = () => {
  const { lists } = useListContext();

  return (
    <>
      {lists.map((list) => (
        <ListItem key={list.id} {...list} />
      ))}
    </>
  );
};
