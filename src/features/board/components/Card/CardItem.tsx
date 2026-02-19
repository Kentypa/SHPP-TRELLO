import type { FC } from "react";
import type { GetCardResponse } from "../../types/get-card-response";
import { Button } from "../../../../shared/components/ui/Button";
import EditIcon from "../../../../assets/icons/pencil.svg?react";

export const CardItem: FC<GetCardResponse> = ({
  id,
  position,
  title,
  color,
  description,
}) => {
  return (
    <li className="flex justify-between p-3 bg-neutral-800 rounded-md fill-neutral-50">
      {title}
      <Button className="hover:fill-blue-500">
        <EditIcon className="size-text" />
      </Button>
    </li>
  );
};
