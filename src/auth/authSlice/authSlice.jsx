import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

const host_url = "https://no23.lavina.tech";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, key, secret }, { rejectWithValue }) => {
    try {
      const hashedSecret = await bcrypt.hash(secret, 10);

      const response = await fetch(`${host_url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          key,
          secret: hashedSecret,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // token saqlash
        localStorage.setItem("user", true)
        return data;
      }

      if (response.status === 400 && data.error === "User with this key already exists" && data.isOk === false) {
        return rejectWithValue("Key has already been used");
      }

      // Handle other types of errors
      return rejectWithValue(data.error || "An unknown error occurred");
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
