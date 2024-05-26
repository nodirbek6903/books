import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host_url = "https://no23.lavina.tech";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host_url}/books`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBooks = createAsyncThunk(
  "books/deleteBooks",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host_url}/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return id;
      }
      const data = await response.json();
      return rejectWithValue(data);
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
      .addCase(deleteBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
