import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authorization-slice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(() => {
    localStorage.clear();

    queryClient.clear();

    dispatch(logout());

    navigate({ to: "/sign-in", search: { redirect: "" } });
  }, [dispatch, navigate, queryClient]);

  return { handleLogout };
};
