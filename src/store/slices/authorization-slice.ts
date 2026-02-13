import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthorizationState = {
  isAuthorized: boolean;
};

const initialState: AuthorizationState = {
  isAuthorized: !!localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.isAuthorized = false;
    },
    setAuthorization: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
});

export const { login, logout, setAuthorization } = authSlice.actions;
export default authSlice.reducer;
