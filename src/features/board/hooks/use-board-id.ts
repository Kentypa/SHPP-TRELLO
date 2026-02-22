import { useParams } from "@tanstack/react-router";

export const useBoardId = () => {
  return useParams({ from: "/_authenticated/board/$id" });
};
