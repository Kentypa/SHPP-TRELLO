import { ListContext, type ListType } from "./ListContext";
import { ListItems } from "./ListItems";
import { ListCreator } from "./ListCreator";
import type { FC, ReactNode } from "react";

type ListProps = {
  lists: ListType[];
  children: ReactNode;
};

const ListRoot: FC<ListProps> = ({ lists, children }) => {
  return (
    <ListContext.Provider value={{ lists }}>
      <ul className="flex items-start gap-4 h-full overflow-x-auto pb-4">
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export const List = Object.assign(ListRoot, {
  Items: ListItems,
  Creator: ListCreator,
});
