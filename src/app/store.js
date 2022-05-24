import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/user/userSlice";
import toolReducer from "../features/tool/toolSlice"
import orderReducer from '../features/order/orderSlice';
import reviewReducer from "../features/review/reviewSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    tool: toolReducer,
    order: orderReducer,
    review: reviewReducer
  },
});
