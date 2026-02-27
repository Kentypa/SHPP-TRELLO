import type { ChangeEvent, FC } from "react";
import { Modal } from "../../../../shared/components/dialog/Modal";
import { useUpdateCard } from "../../hooks/use-update-card";
import { useListContext } from "./ListContext";

export const ListCardModal: FC = () => {
  const { cardModal } = useListContext();
  const { mutate: updateCard } = useUpdateCard();

  if (!cardModal) return null;
  const { showModal, setShowModal, cardData, setCardData } = cardModal;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateCard(cardData);
    setShowModal(false);
  };

  return (
    <Modal
      className="bg-[#000000aa] fixed inset-0 flex items-center justify-center"
      visible={showModal}
      toggleModal={() => setShowModal((prev) => !prev)}
    >
      <div className="p-4 bg-neutral-800 flex flex-col gap-4 text-white rounded-md w-96">
        <input
          name="title"
          value={cardData.title}
          onChange={handleChange}
          className="p-2 bg-neutral-700 rounded-md outline-none"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={cardData.description ?? ""}
          onChange={handleChange}
          className="p-2 bg-neutral-700 rounded-md outline-none resize-none h-24"
          placeholder="Description"
        />
        <div className="flex items-center gap-3">
          <label htmlFor="card-color">Color:</label>
          <input
            id="card-color"
            name="color"
            type="color"
            value={cardData.color ?? "#ffffff"}
            onChange={handleChange}
            className="size-8 cursor-pointer bg-transparent rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-green-500 p-2 rounded-md hover:bg-green-600 font-bold"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
