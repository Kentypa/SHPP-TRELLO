import instance from "../../api/request";
import type { SignInPayload } from "../../features/sign-in/types/sign-in-payload";
import type { SignInResponse } from "../../features/sign-in/types/sign-in-response";
import type { SignUpPayload } from "../../features/sign-up/types/sign-up-payload";
import type { RefreshTokenPayload } from "../types/refresh-token-payload";

export const authService = {
  signUp: (data: SignUpPayload) => instance.post("user", data),
  signIn: (data: SignInPayload) => instance.post<SignInResponse>("login", data),
  refresh: (data: RefreshTokenPayload) => instance.post("refresh", data),
};
