import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState:
    localStorage.getItem("pstore") && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("pstore"))
      : null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userState = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      localStorage.setItem("pstore", JSON.stringify(action.payload.user));
      localStorage.setItem("user", JSON.stringify(action.payload.user._id));
    },
    logoutState: (state, action) => {
      state.userState = null;
      localStorage.removeItem("pstore");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logoutState } = userSlice.actions;
export default userSlice.reducer;
