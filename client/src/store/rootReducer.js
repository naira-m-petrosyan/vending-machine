import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice';
import productReducer from './product/product.slice';
import userReducer from './user/user.slice';

export default configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        user: userReducer,
    },
})