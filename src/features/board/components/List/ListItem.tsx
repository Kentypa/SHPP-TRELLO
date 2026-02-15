import type { FC } from "react";
import type { GetListResponse } from "../../types/get-list-response";
import { Button } from "../../../../shared/components/ui/Button";
import { Dialog } from "../../../../shared/components/dialog/Dialog";
import { useDeleteList } from "../../hooks/use-delete-list";
import { useUpdateList } from "../../hooks/use-update-list";
import Menu from "../../../../assets/icons/dots-row.svg?react";

export const ListItem: FC<GetListResponse> = ({
  cards,
  id,
  title,
  position,
}) => {
  const { mutate: deleteList } = useDeleteList();
  const { mutate: updateList } = useUpdateList();
  const 

  return (
    <li className="shrink-0 gap-3 bg-neutral-900 rounded-md p-3">
      <div className="w-68 flex justify-between text-white fill-white">
        <h3 className="font-bold text-white">{title}</h3>
        <Dialog>
          <Dialog.Trigger asChild>
            <Button>
              <Menu className="size-text" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Content className="bg-neutral-700 text-white fill-white p-4 rounded-md mt-2 flex flex-col gap-3">
            <Button
              onClick={() => deleteList(id)}
              className="p-2 bg-red-500 rounded-md"
            >
              Delete
            </Button>
            <Button
              onClick={() => updateList(id)}
              className="p-2 bg-blue-500 rounded-md"
            >
              Edit
            </Button>
          </Dialog.Content>
        </Dialog>
      </div>
    </li>
  );
};
