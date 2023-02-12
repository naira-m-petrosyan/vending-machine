import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from './user.actions';
import UserService from '../../services/user';
import {login, setErrorMessage} from "../auth/auth.slice";

export const getLoggedUser = createAsyncThunk(
    "user/loggedUser",
    async (data, {dispatch}) => {
        try {
            const res = await UserService.getLoggedUser(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const resetDeposit = createAsyncThunk(
    "user/resetDeposit",
    async (data, {dispatch}) => {
        try {
            const res = await UserService.resetDeposit();
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const updateDeposit = createAsyncThunk(
    "user/updateDeposit",
    async (data, {dispatch}) => {
        try {
            const res = await UserService.updateDeposit(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        resetLoading: false,
        resetSuccess: false,
        updateLoading: false,
        updateSuccess: false,
        change: null,
    },
    reducers: userActions,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload.user,
            };
        },
        [getLoggedUser.fulfilled]: (state, action) => {
            return {
                ...state,
                user: action.payload.user,
            };
        },
        [resetDeposit.pending]: (state, action) => {
            return {
                ...state,
                resetLoading: true,
                resetSuccess: false,
            };
        },
        [resetDeposit.fulfilled]: (state, action) => {
            return {
                ...state,
                resetLoading: false,
                resetSuccess: true,
                change: action.payload.change
            };
        },
        [updateDeposit.pending]: (state, action) => {
            return {
                ...state,
                updateLoading: true,
                updateSuccess: false,
            };
        },
        [updateDeposit.fulfilled]: (state, action) => {
            return {
                ...state,
                updateLoading: false,
                updateSuccess: true,
            };
        },

    },
})

export const { removeUser } = userSlice.actions

export default userSlice.reducer