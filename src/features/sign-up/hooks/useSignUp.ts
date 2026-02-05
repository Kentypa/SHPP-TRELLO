import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "../../../shared/hooks/use-forms";
import { signUpKeys } from "../../../shared/keys/sign-up";
import { authService } from "../../../shared/services/auth-service";

export const useSignUp = () => {
  const INITIAL_STATE = { email: "", password: "" };
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: signUpKeys.all });
      navigate({ to: "/sign-in" });
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
