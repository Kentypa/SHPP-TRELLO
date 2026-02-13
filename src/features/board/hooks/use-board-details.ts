import { useQuery } from "@tanstack/react-query";
import { boardKeys } from "../../../shared/keys/board";

export const useBoardDetails = (id: number) => {
  return useQuery({ ...boardKeys.detail(id) });
};
