import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
//initial state
const initialState = {
    orderList: [],
    redirectURL: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
//get all order list =>only admin can do it
export const getAllOrderList = createAsyncThunk(
    "order/getAllOrderList",
    async (_, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            //return.
            return await orderService.getAllOrderList(token);
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
//get my order list =>logged in user can access this
export const getMyOrderList = createAsyncThunk(
    "order/getMyOrderList",
    async (_, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            //return.
            return await orderService.getMyOrderList(token);
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
//add new order
export const addNewOrder = createAsyncThunk("order/addNewOrder", async (orderDetails, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        //return
        return await orderService.addNewOrder(orderDetails, token);
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
//checkout
export const checkout = createAsyncThunk("order/checkout", async (checkoutDetails, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        //return
        return await orderService.checkout(checkoutDetails, token);
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
//delete order
export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (id, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            //return
            return await orderService.deleteOrder(id, token);
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

//ship order
export const shipOrder = createAsyncThunk(
    "order/shipOrder",
    async (id, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            // //return
            return await orderService.shipOrder(id, token);

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

//export order slice
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrderList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrderList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyOrderList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyOrderList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderList = action.payload;
            })
            .addCase(getMyOrderList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(checkout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.redirectURL = action.payload.url;
            })
            .addCase(checkout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderList = state.orderList.filter((order) => order._id !== action.payload.id)
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(shipOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(shipOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderList = state.orderList.map((order) => {
                    if (order._id == action.payload.id) {
                        return action.payload.data
                    }
                    return order
                })
            })
            .addCase(shipOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
//export reset function
export const { reset } = orderSlice.actions;
//export order reducer
export default orderSlice.reducer;