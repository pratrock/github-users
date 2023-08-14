import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: `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`,
});

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  /*  async () => {
    const response = await octokit.request("GET /users", {
         headers: {
        "X-GitHub-Api-Version": "2020-11-28",
      }, 
    });
    return response;
  } */

  async () => {
    const res = await axios(`https://api.github.com/users`);
    const data = await res.data;
    return data;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice.reducer;
