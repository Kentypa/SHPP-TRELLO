import { CardContext, type CardContextType } from "./CardContext";
import type { ComponentWithChildren } from "../../../../shared/types/component-with-children";
import { CardCreator } from "./CardCreator";
import { CardList } from "./CardList";

const CardRoot: ComponentWithChildren<CardContextType> = ({
  children,
  ...props
}) => {
  return <CardContext.Provider value={props}>{children}</CardContext.Provider>;
};

export const Card = Object.assign(CardRoot, {
  Creator: CardCreator,
  List: CardList,
});
