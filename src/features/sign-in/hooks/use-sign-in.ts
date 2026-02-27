import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Route } from "../../../routes/sign-in";
import { useForm } from "../../../shared/hooks/use-forms";
import { authorizationKeys } from "../../../shared/keys/authorization";
import { authService } from "../../../shared/services/auth-service";
import { login } from "../../../store/slices/authorization-slice";

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

      toast.success("Sign in success");

      navigate({ to: redirectUrl });
    },
    onError: () => {
      toast.error("Sign in error");
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
