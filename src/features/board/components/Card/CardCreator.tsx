import { type FC } from "react";
import { Button } from "../../../../shared/components/ui/Button";
import { useCreateCard } from "../../hooks/use-create-card";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import CloseIcon from "../../../../assets/icons/cross.svg?react";

export const CardCreator: FC = () => {
  const { isEditing, handleSubmit, handleChange, formState, toggleEditing } =
    useCreateCard();

  return isEditing ? (
    <form
      onSubmit={handleSubmit}
      className="text-white fill-neutral-50 flex flex-col gap-3"
    >
      <input
        className="p-1 rounded-md border-2 border-neutral-400 focus:border-blue-500 focus:outline-0"
        name="title"
        placeholder="Enter card title"
        value={formState.title}
        onChange={handleChange}
      />
      <div className="flex gap-3">
        <Button className="rounded-md bg-green-500 p-2">Add a card</Button>
        <Button
          onClick={toggleEditing}
          type="button"
          className="p-2 bg-neutral-700 rounded-md"
        >
          <CloseIcon className="size-text" />
        </Button>
      </div>
    </form>
  ) : (
    <Button
      onClick={toggleEditing}
      className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-neutral-700 text-neutral-100 fill-neutral-100"
    >
      <PlusIcon className="size-text" />
      Add a card
    </Button>
  );
};
