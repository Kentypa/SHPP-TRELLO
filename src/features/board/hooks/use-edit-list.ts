import { useState } from "react";
import { useForm } from "../../../shared/hooks/use-forms";
import { useUpdateList } from "./use-update-list";
import type { UpdateListPayload } from "../types/update-list-payload";

type EditListPayload = Omit<UpdateListPayload, "listid">;

export const useEditList = ({ listId, title, position }: EditListPayload) => {
  const { mutate: updateList } = useUpdateList();
  const [isEditing, setIsEditing] = useState(false);

  const formProps = useForm<EditListPayload>(
    { listId, position, title },
    (data) => {
      updateList(data, { onSuccess: () => setIsEditing(false) });
    },
  );
  return { isEditing, setIsEditing, ...formProps };
};
