import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "../../../shared/hooks/use-forms";
import { authService } from "../../../shared/services/auth-service";
import { authorizationKeys } from "../../../shared/keys/authorization";

export const useSignIn = () => {
  const INITIAL_STATE = { email: "", password: "" };
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: ({ refreshToken, token }) => {
      queryClient.invalidateQueries({
        queryKey: authorizationKeys.all.queryKey,
      });

      navigate({ to: "/" });

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
