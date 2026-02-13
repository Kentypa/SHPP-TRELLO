import { useQuery } from "@tanstack/react-query";
import { boardKeys } from "../../../shared/keys/board";

export const useGetBoards = () => {
  return useQuery({ ...boardKeys.all });
};
