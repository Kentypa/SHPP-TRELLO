import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "../../../shared/hooks/use-forms";
import { authService } from "../../../shared/services/auth-service";

export const useSignUp = () => {
  const INITIAL_STATE = { email: "", password: "" };

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      navigate({ to: "/sign-in" });
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
