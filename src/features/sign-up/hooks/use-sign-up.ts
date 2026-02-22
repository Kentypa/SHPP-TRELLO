import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "../../../shared/hooks/use-forms";
import { authService } from "../../../shared/services/auth-service";
import { toast } from "react-toastify";

export const useSignUp = () => {
  const INITIAL_STATE = { email: "", password: "" };

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      navigate({ to: "/sign-in", search: { redirect: "" } });
      toast.success("Sign up success");
    },
    onError: () => {
      toast.error("Sign up error");
    },
  });

  const { handleChange, handleSubmit } = useForm(INITIAL_STATE, mutate);

  return { handleChange, handleSubmit, isPending };
};
