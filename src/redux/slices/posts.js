import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchDelete = createAsyncThunk("posts/fetchDelete", async (id) => {
  const { gg } = await axios.delete(`/posts/${id}`);
  window.location.reload();
});

export const sortPosts = createAsyncThunk("postsSorted", async () => {
  const { data } = await axios.get("/postsSorted");
  return data;
});

export const fetchOneTag = createAsyncThunk("fetchTag", async (tag) => {
  const { data } = await axios.get(`/tags/${tag}`);
  return data;
});

// export const addComment = createAsyncThunk(
//   "createComments",
//   async (id, comment) => {
//     await axios.patch(`/addComment/${id}`, {
//       comment: comment,
//     });
//     window.location.reload();
//   }
// );

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    [fetchDelete.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchDelete.fulfilled]: (state) => {
      state.tags.status = "loaded";
    },
    [fetchDelete.rejected]: (state) => {
      state.tags.status = "error";
    },

    [sortPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [sortPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [sortPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchOneTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchOneTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchOneTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postsReducer = postSlice.reducer;
