import type { FC } from "react";
import type { useEditList } from "../../../hooks/use-edit-list";

export const ListTitle: FC<
  Omit<
    ReturnType<typeof useEditList>,
    "handleChangeByValue" | "handleSetFormState"
  > & {
    title: string;
  }
> = ({
  formState,
  handleChange,
  handleSubmit,
  isEditing,
  setIsEditing,
  title,
}) => {
  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="p-1 border-2 rounded-md w-full"
            name="title"
            value={formState.title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsEditing(false);
            }}
          />
        </form>
      ) : (
        <h3 className="font-bold text-white">{title}</h3>
      )}
    </>
  );
};
