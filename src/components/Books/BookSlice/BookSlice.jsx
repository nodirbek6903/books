// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import CryptoJS from "crypto-js";

// const host_url = "https://no23.lavina.tech";

// const key = localStorage.getItem("Key");
// const secret = localStorage.getItem("Secret");

// const generateSignature = (method, url, body, secret) => {
//   const body_string = JSON.stringify(body);
//   const stringToSign = `${method}${url}${body_string}${secret}`;
//   const signature = CryptoJS.MD5(stringToSign).toString();
//   return signature;
// };

// export const fetchBooks = createAsyncThunk(
//   "books/fetchBooks",
//   async (_, { rejectWithValue }) => {
//     const method = "GET";
//     const url = "/books";
//     const body = {};
//     const sign = generateSignature(method, url, body, secret);

//     try {
//       const response = await axios({
//         method: 'get',
//         url: `${host_url}${url}`,
//         headers: {
//           Key: key,
//           Sign: sign,
//         },
//         data:body
//       });

//       console.log(response.data, "bookslice data");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const addBook = createAsyncThunk(
//   "books/addBook",
//   async (newBook, { rejectWithValue }) => {
//     const url = "/books";
//     const method = "POST";
//     const sign = generateSignature(method, url, newBook, secret);

//     try {
//       const response = await axios.post(`${host_url}${url}`, newBook, {
//         headers: {
//           "Content-Type": "application/json",
//           Key: key,
//           Sign: sign,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error adding book:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteBooks = createAsyncThunk(
//   "books/deleteBooks",
//   async (id, { rejectWithValue }) => {
//     const method = "DELETE";
//     const url = `/books/${id}`;
//     const body = {};
//     const sign = generateSignature(method, url, body, secret);

//     try {
//       const response = await axios.delete(`${host_url}${url}`, {
//         headers: {
//           Key: key,
//           Sign: sign,
//         },
//         data: body // Add body here if needed
//       });
//       if (response.status === 200) {
//         return id;
//       } else {
//         throw new Error("Failed to delete the book");
//       }
//     } catch (error) {
//       console.error("Error deleting book:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const booksSlice = createSlice({
//   name: "books",
//   initialState: {
//     books: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBooks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.books = action.payload;
//       })
//       .addCase(fetchBooks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addBook.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addBook.fulfilled, (state, action) => {
//         state.loading = false;
//         state.books.push(action.payload);
//       })
//       .addCase(addBook.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteBooks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteBooks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.books = state.books.filter((book) => book?.id !== action.payload);
//       })
//       .addCase(deleteBooks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default booksSlice.reducer;