import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toolService from "./toolService";
//initial state
const initialState = {
    toolList: [],
    toolDetails: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
//get all tool list
export const getToolList = createAsyncThunk(
    "tool/getToolList",
    async (_, thunkAPI) => {
        try {
            //return tool list...
            return await toolService.getToolList();
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
//get tool details
export const getToolDetails = createAsyncThunk(
    "tool/getToolDetails",
    async (id, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            //return Tool Details...
            return await toolService.getToolDetails(id, token);
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
//add tool
export const addTool = createAsyncThunk("tool/addTool", async (tool, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        //return tool list...
        return await toolService.addTool(tool, token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//delete tool
export const deleteTool = createAsyncThunk("tool/deleteTool", async (id, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        //return tool list...
        return await toolService.deleteTool(id, token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


//export tool slice
export const toolSlice = createSlice({
    name: "tool",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToolList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getToolList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.toolList = action.payload;
            })
            .addCase(getToolList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getToolDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getToolDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.toolDetails = action.payload;
            })
            .addCase(getToolDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addTool.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTool.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addTool.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTool.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTool.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.toolList = state.toolList.filter((tool) => tool._id !== action.payload.id)
            })
            .addCase(deleteTool.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
//export reset function
export const { reset } = toolSlice.actions;
//export news reducer
export default toolSlice.reducer;