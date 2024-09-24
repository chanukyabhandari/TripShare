import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseURL";

export const loginAPI = createAsyncThunk(
    "login/authlogin",
    async (userDetails) => {
      try {
        const response = await baseURL.post("/auth/sign-in", userDetails);
        return response.data;
      } catch (error) {
        alert(`${error.response.data.message}`);
        throw error;
      }
    }
  );
  export const loginSlice = createSlice({
    name: "login",
    initialState: {
      loading: false,
      error: null,
    },
    reducers: {},
  });
  export default loginSlice.reducer;