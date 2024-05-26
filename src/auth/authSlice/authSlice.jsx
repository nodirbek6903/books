import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

const host_url = "https://no23.lavina.tech";

export const signup = createAsyncThunk(
  "auth,signup",
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
      if (response.isOk) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const signin = createAsyncThunk(
//     "auth/signin",
//     async (_, {rejectWithValue}) => {
//         try {
//             const response = await fetch(`${host_url}/myself`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             })
//             if(response.ok){
//                 const data = await response.json()
//                 return data
//                 // console.log(data)
//             }
//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
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
      })
    //   .addCase(signin.pending, (state) => {
    //         state.loading = true
    //         state.error = null
    //   })
    //   .addCase(signin.fulfilled, (state,action) => {
    //         state.loading = false
    //         state.user = action.payload
    //   })
    //   .addCase(signin.rejected, (state,action) => {
    //         state.loading = false
    //         state.error = action.payload
    //   })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
