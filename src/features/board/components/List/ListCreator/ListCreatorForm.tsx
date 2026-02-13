import { useMemo, type FC } from "react";
import { Button } from "../../../../../shared/components/ui/Button";
import { useForm } from "../../../../../shared/hooks/use-forms";
import type { AddListPayload } from "../../../types/add-list-payload";
import CrossIcon from "../../../../../assets/icons/cross.svg?react";

type ListCreatorFormProps = {
  position: number;
  boardId: number;
  onSubmit: (data: AddListPayload & { boardId: number }) => void;
  onCancel: () => void;
};

export const ListCreatorForm: FC<ListCreatorFormProps> = ({
  boardId,
  onCancel,
  onSubmit,
  position,
}) => {
  const initialState = useMemo(() => ({ title: "", position }), [position]);

  const { handleChange, handleSubmit } = useForm(initialState, (data) => {
    onSubmit({ ...data, boardId });
    onCancel();
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 text-neutral-300 fill-neutral-300 p-2 rounded-md flex flex-col gap-2"
    >
      <input
        autoFocus
        type="text"
        name="title"
        required
        onChange={handleChange}
        className="focus:border-blue-500 focus:outline-0 border-2 rounded-md p-1"
        placeholder="Enter list title..."
      />
      <div className="flex items-center gap-6">
        <Button className="hover:text-blue-500">Add List</Button>
        <Button
          type="button"
          onClick={onCancel}
          className="hover:fill-blue-500"
        >
          <CrossIcon className="size-text" />
        </Button>
      </div>
    </form>
  );
};
