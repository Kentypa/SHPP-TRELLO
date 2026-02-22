import { useState } from "react";
import type { UpdateCardPayload } from "../types/update-card-payload";

export const useCardModalRoot = () => {
  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState<UpdateCardPayload>({
    id: 0,
    title: "",
    position: 0,
    list_id: 0,
  });

  return { showModal, setShowModal, cardData, setCardData };
};
