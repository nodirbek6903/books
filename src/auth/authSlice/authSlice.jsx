import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

const host_url = "https://no23.lavina.tech";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const hashedSecret = CryptoJS.MD5(userData.secret).toString(
        CryptoJS.enc.Hex
      );
      const response = await axios.post(
        `${host_url}/signup`,
        {
          name: userData.name,
          email: userData.email,
          key: userData.key,
          secret: hashedSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Key: userData.key,
            Sign: hashedSecret,
          },
        }
      );      
      localStorage.setItem("Key", userData.key);
      localStorage.setItem("Secret", userData.secret);
      localStorage.setItem("Sign", hashedSecret);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
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
  reducers: {
    logout: (state) => {
      localStorage.removeItem("Key");
      localStorage.removeItem("Secret");
      localStorage.removeItem("Sign");
      state.user = null;
    }
  },
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

export const { logout } = authSlice.actions; 

export default authSlice.reducer;
