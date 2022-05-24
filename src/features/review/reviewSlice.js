import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "./reviewService";
//initial state
const initialState = {
    reviewList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
//get review list
export const getReviews = createAsyncThunk(
    "review/getReviews",
    async (_, thunkAPI) => {
        try {
            //get latest 6 reviews..
            return await reviewService.getReviews();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);
//add new review
export const addReview = createAsyncThunk("review/addReivew", async (review, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        //give new review details(ratings and desc)..
        return await reviewService.addReview(review, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});
//review slice
export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.reviewList = action.payload;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.reviewList = [];
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});
//export reset function
export const { reset } = reviewSlice.actions;
//export the review slice
export default reviewSlice.reducer;