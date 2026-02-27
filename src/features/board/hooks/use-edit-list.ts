import { useState } from "react";
import { useForm } from "../../../shared/hooks/use-forms";
import type { UpdateListPayload } from "../types/update-list-payload";
import { useUpdateList } from "./use-update-list";

export const useEditList = ({ listId, title, position }: UpdateListPayload) => {
  const { mutate: updateList } = useUpdateList();

  const [isEditing, setIsEditing] = useState(false);

  const formProps = useForm<UpdateListPayload>(
    { listId, position, title },
    (data) => {
      updateList(data, { onSuccess: () => setIsEditing(false) });
    },
  );
  return { isEditing, setIsEditing, ...formProps };
};
