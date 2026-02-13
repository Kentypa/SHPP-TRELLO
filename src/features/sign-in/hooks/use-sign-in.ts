import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "../../../shared/hooks/use-forms";
import { authService } from "../../../shared/services/auth-service";
import { authorizationKeys } from "../../../shared/keys/authorization";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/authorization-slice";
import { Route } from "../../../routes/sign-in";

export const useSignIn = () => {
  const { redirect: redirectUrl } = Route.useSearch();
  const INITIAL_STATE = { email: "", password: "" };
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: ({ refreshToken, token }) => {
      queryClient.invalidateQueries({
        queryKey: authorizationKeys.all.queryKey,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(login());

      navigate({ to: redirectUrl });
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
