import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

const host_url = " https://no23.lavina.tech";

const loadUser = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (error) {
    return null;
  }
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const hashedSecret = CryptoJS.SHA256(userData.secret).toString(
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
      //user malumotlarini saqlash
      const userToSave = {
        key: userData.key,
        sign: hashedSecret,
      };
      localStorage.setItem("user", JSON.stringify(userToSave));
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
    user: loadUser(),
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
