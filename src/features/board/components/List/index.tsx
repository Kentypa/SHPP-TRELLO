import { ListContext, type ListContextType } from "./ListContext";
import { ListItems } from "./ListItems";
import { ListCreator } from "./ListCreator";

import type { ComponentWithChildren } from "../../../../shared/types/component-with-children";

const ListRoot: ComponentWithChildren<ListContextType> = ({
  lists,
  children,
}) => {
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
