import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productActions } from './product.actions';
import ProductService from '../../services/product';
import {setErrorMessage} from "../auth/auth.slice";

export const getAll = createAsyncThunk(
    "product/all",
    async (data, {dispatch}) => {
        try {
            const res = await ProductService.getProducts();
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const createProduct = createAsyncThunk(
    "product/create",
    async (data, {dispatch}) => {
        try {
            const res = await ProductService.createProduct(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async (data, {dispatch}) => {
        try {
            const res = await ProductService.updateProduct(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (data, {dispatch}) => {
        try {
            const res = await ProductService.deleteProduct(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const buyProduct = createAsyncThunk(
    "product/buy",
    async (data, {dispatch}) => {
        try {
            const res = await ProductService.buyProduct(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        added: false,
        updated: false,
        deleted: false,
        buyLoading: false,
        buySuccess: false,
        boughtProduct: null,
        changeFromTransaction: null,
        total: null,
        amount: null,
    },
    reducers: productActions,
    extraReducers: {
        [getAll.pending]: (state, action) => {
            return {
                ...state,
                loading: false,
                added: false,
                updated: false,
                deleted: false,
                buyLoading: false,
                buySuccess: false,
                boughtProduct: null,
                changeFromTransaction: null,
                total: null,
                amount: null,
            };
        },
        [getAll.fulfilled]: (state, action) => {
            return {
                ...state,
                products: action.payload.products,
            };
        },
        [createProduct.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
                added: false
            };
        },
        [createProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                added: true,
            };
        },
        [createProduct.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                added: false,
            };
        },
        [updateProduct.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
                updated: false
            };
        },
        [updateProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                updated: true,
            };
        },
        [updateProduct.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                updated: false,
            };
        },
        [deleteProduct.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
                deleted: false
            };
        },
        [deleteProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                deleted: true,
            };
        },
        [deleteProduct.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                deleted: false,
            };
        },
        [buyProduct.pending]: (state, action) => {
            return {
                ...state,
                buyLoading: true,
                buySuccess: false,
                boughtProduct: null,
                change: null,
                total: null,
                amount: null,
            };
        },
        [buyProduct.fulfilled]: (state, action) => {
            return {
                ...state,
                buyLoading: false,
                buySuccess: true,
                boughtProduct: action.payload.product,
                changeFromTransaction: action.payload.change,
                total: action.payload.total,
                amount: action.payload.amount,
            };
        },
        [buyProduct.rejected]: (state, action) => {
            return {
                ...state,
                buyLoading: false,
                buySuccess: false,
            };
        },

    },
})

export default productSlice.reducer