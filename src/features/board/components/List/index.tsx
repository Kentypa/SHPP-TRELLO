import type { ComponentWithChildren } from "../../../../shared/types/component-with-children";
import { useCardDrag } from "../../hooks/use-card-drag";
import { useCardModalRoot } from "../../hooks/use-card-modal-root";
import { useListDrag } from "../../hooks/use-list-drag";
import { ListCardModal } from "./ListCardModal";
import { ListContext, type ListType } from "./ListContext";
import { ListCreator } from "./ListCreator";
import { ListItems } from "./ListItems";

type ListRootProps = { lists: ListType[]; children: React.ReactNode };

const ListRoot: ComponentWithChildren<ListRootProps> = ({
  lists,
  children,
}) => {
  const cardModal = useCardModalRoot();
  const dragActions = useListDrag(lists);
  const cardDragActions = useCardDrag(lists);

  return (
    <ListContext.Provider
      value={{ lists, cardModal, dragActions, cardDragActions }}
    >
      <ul className="flex items-start gap-4 h-full overflow-x-auto pb-4">
        {children}
      </ul>
    </ListContext.Provider>
  );
};

export const List = Object.assign(ListRoot, {
  Items: ListItems,
  Creator: ListCreator,
  CardModal: ListCardModal,
});
