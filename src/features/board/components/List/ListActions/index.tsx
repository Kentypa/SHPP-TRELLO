import type { FC } from "react";
import { Dialog } from "../../../../../shared/components/dialog/Dialog";
import { Button } from "../../../../../shared/components/ui/Button";
import Menu from "../../../../../assets/icons/dots-row.svg?react";

type ListActionsProps = {
  handleDelete: () => void;
  handleEdit: () => void;
};

export const ListActions: FC<ListActionsProps> = ({
  handleDelete,
  handleEdit,
}) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className="hover:fill-blue-500">
          <Menu className="size-text" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="bg-neutral-700 text-white fill-white p-4 rounded-md mt-2 flex flex-col gap-3">
        <Button onClick={handleDelete} className="p-2 bg-red-500 rounded-md">
          Delete
        </Button>
        <Button onClick={handleEdit} className="p-2 bg-blue-500 rounded-md">
          Edit
        </Button>
      </Dialog.Content>
    </Dialog>
  );
};
