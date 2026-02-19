import type { FC } from "react";
import { useCardContext } from "./CardContext";
import { CardItem } from "./CardItem";

export const CardList: FC = () => {
  const { cards } = useCardContext();

  return (
    <ul className="flex flex-col gap-3 text-neutral-50 fill-neutral-50">
      {cards
        .sort((a, b) => b.position - a.position)
        .map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
    </ul>
  );
};
