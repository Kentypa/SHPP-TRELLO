import type { FC } from "react";
import { Button } from "../../../../../shared/components/ui/Button";
import PlusIcon from "../../../../../assets/icons/plus.svg?react";

type ListCreatorButttonProps = {
  onClick: () => void;
};

export const ListCreatorButton: FC<ListCreatorButttonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="hover:bg-neutral-500  bg-neutral-300 text-neutral-800 fill-neutral-800 flex items-center gap-4 p-3 rounded-md"
    >
      <PlusIcon className="size-text" />
      Add new list
    </Button>
  );
};
