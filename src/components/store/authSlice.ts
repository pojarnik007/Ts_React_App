import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.loading = false;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
    finishLoading(state) {
      state.loading = false;
    },
  },
});

export const { login, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;
