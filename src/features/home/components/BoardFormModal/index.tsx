import type { FC } from "react";
import type { useBoardForm } from "../../hooks/use-board-form";
import { Modal } from "../../../../shared/components/dialog/Modal";
import { Button } from "../../../../shared/components/ui/Button";
import { CustomPropertyItem } from "../CustomPropertyItem";

export const BoardFormModal: FC<{
  controller: ReturnType<typeof useBoardForm>;
}> = ({ controller: { form, isEdit, modal, properties } }) => {
  return (
    <Modal
      visible={modal.showModal}
      toggleModal={modal.close}
      className={
        "bg-[#000000aa] fixed inset-0 flex items-center justify-center"
      }
    >
      <form
        onSubmit={form.handleSubmit}
        className="border-2 z-10 rounded-md p-4 bg-white flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">
          {isEdit ? "Edit Board" : "Add Board"}
        </h2>
        <label>Title</label>
        <input
          name="title"
          value={form.formState.title}
          onChange={form.handleChange}
          className="border-2 p-1 rounded-md"
        />

        <ul className="flex flex-col gap-2">
          {properties.fields.map((field) => (
            <CustomPropertyItem
              key={field.id}
              field={field}
              onUpdate={properties.update}
              onRemove={properties.remove}
            />
          ))}
        </ul>

        <Button
          type="button"
          onClick={properties.add}
          className="bg-indigo-500 p-2 rounded-md"
        >
          Add Property
        </Button>
        <Button className="bg-green-500 p-2 rounded-md">
          {isEdit ? "Save Changes" : "Create Board"}
        </Button>
      </form>
    </Modal>
  );
};
