import { useCardContext } from "../components/Card/CardContext";
import { useListContext } from "../components/List/ListContext";
import type { GetCardResponse } from "../types/get-card-response";

export const useEditCard = () => {
  const { cardModal } = useListContext();
  const { listId: list_id } = useCardContext();

  return (props: GetCardResponse) => {
    if (!cardModal) return;
    const { ...rest } = props;
    cardModal.setCardData({ ...rest, list_id });
    cardModal.setShowModal(true);
  };
};
