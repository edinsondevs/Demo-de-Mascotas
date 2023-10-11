import { createSlice } from "@reduxjs/toolkit";
import { ValidUserStore } from "../../../interfaces/interfacesUsers";

const initialState: ValidUserStore = {
  email: "",
};

export const validUserStore = createSlice({
  name: "isValidUser",
  initialState,
  reducers: {
    isValidUser: (state, action) => {
      state.email = action.payload.email;
    },
  },
});
export const { isValidUser } = validUserStore.actions;
export default validUserStore.reducer;
