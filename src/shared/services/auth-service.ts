import instance from "../../api/request";
import type { SignUpPayload } from "../../features/sign-up/types/sign-up-payload";

export const authService = {
  signUp: (data: SignUpPayload) => instance.post("user", data),
};
