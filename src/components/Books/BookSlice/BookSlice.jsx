import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host_url = "https://no23.lavina.tech";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    const key = JSON.parse(localStorage.getItem("user")).data.key;
    const sign = JSON.parse(localStorage.getItem("user")).data.sign;

    if (!key || !sign) {
      return rejectWithValue("Authorization key or sign is missing");
    }

    try {
      const response = await axios.get(`${host_url}/books`, {
        headers: {
          "Content-Type": "application/json",
          Key: key,
          Sign: sign,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook, { rejectWithValue }) => {
    const key = JSON.parse(localStorage.getItem("user")).data.key;
    const sign = JSON.parse(localStorage.getItem("user")).data.sign;

    if (!key || !sign) {
      return rejectWithValue("Authorization key or sign is missing");
    }
    try {
      const response = await axios.post(`${host_url}/books`, newBook, {
        headers: {
          "Content-Type": "application/json",
          Key: key,
          Sign: sign,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBooks = createAsyncThunk(
  "books/deleteBooks",
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const key = auth?.user.key;
    console.log(key);
    const sign = auth?.user.sign;
    console.log(sign);

    if (!key || !sign) {
      return rejectWithValue("Authorization key or sign is missing");
    }
    try {
      const response = await axios.delete(`${host_url}/books/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Key: key,
          Sign: sign,
        },
      });
      if (response.ok) {
        return id;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book?.id !== action.payload);
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
