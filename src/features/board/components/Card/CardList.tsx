import type { FC } from "react";
import { useCardContext } from "./CardContext";
import { CardItem } from "./CardItem";

export const CardList: FC = () => {
  const { cards } = useCardContext();

  return (
    <ul className="flex flex-col gap-3 text-neutral-50 fill-neutral-50">
      {cards.map((card) => (
        <CardItem {...card} />
      ))}
    </ul>
  );
};
