import type { GetUserResponse } from "../../../shared/types/get-user-response";
import type { GetListResponse } from "./get-list-response";

export type GetBoardDetailsResponse = {
  title: string;
  custom?: Record<string, string>;
  users?: GetUserResponse[];
  lists: GetListResponse[];
};
