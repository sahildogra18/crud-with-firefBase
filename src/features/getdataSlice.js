import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getAllData = createAsyncThunk("players", async () => {
  let response = await fetch(
    `https://futball-records-default-rtdb.firebaseio.com/footballData.json`
  );
  let result = await response.json(); // API ton data fetch ho rahi hai
  console.log(result);
  return result; // Payload nu Redux store ch dispatch karna
});

export let playersData = createSlice({
  name: "players",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Make sure reducers are empty or defined
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default playersData.reducer;
