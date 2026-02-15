import { useState } from "react";
import type { UpdateListPayload } from "../types/update-list-payload";

export const useEditList = ({ listId, position, title }: UpdateListPayload) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
};
