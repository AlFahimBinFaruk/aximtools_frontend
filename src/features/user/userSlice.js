import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

//get user from localstorage if it exits.
const user = JSON.parse(localStorage.getItem("user"));

//initial state
const initialState = {
    userList: [],
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//get user list=>only admin can access it
export const getUserList = createAsyncThunk(
    "user/getUserList",
    async (_, thunkAPI) => {
        try {
            //get the token for user ..
            const token = thunkAPI.getState().user.user.token
            //..
            return await userService.getUserList(token);
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
//register user
export const register = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            //pass user to register function from userService..
            return await userService.register(user);
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

//login user
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
    try {
        //pass user to login function from userService..
        return await userService.login(user);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

//login with google
export const loginWithGoogle = createAsyncThunk(
    "user/loginWithGoogle",
    async (user, thunkAPI) => {
        try {
            //pass user to login function from userService..
            return await userService.loginWithGoogle(user);
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

//make admin
export const makeAdmin = createAsyncThunk("user/makeAdmin", async (id, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        return await userService.makeAdmin(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

//update account
export const updateAccount = createAsyncThunk("user/updateAccount", async (data, thunkAPI) => {
    try {
        //get the token for user ..
        const token = thunkAPI.getState().user.user.token
        return await userService.updateAccount(data, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

//logout user
export const logout = createAsyncThunk("user/logout", async () => {
    //call logout function from userService
    userService.logout();
});

//user slice

export const userSlice = createSlice({
    name: "user",
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
            .addCase(getUserList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userList = action.payload;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(makeAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userList = state.userList.map((user) => {
                    if (user._id == action.payload.id) {
                        return action.payload.data
                    }
                    return user
                });
            })
            .addCase(makeAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

//export auth slice reset function
export const { reset } = userSlice.actions;

//export the auth slice
export default userSlice.reducer;