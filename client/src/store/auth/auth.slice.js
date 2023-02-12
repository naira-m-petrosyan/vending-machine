import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from './auth.actions';
import AuthService from '../../services/auth';
import UserService from '../../services/user';


export const signup = createAsyncThunk(
    "user/create",
    async (data, {dispatch}) => {
        try {
            const res = await UserService.createUser(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data, {dispatch}) => {
        try {
            const res = await AuthService.login(data);
            return res.data;
        } catch (err) {
            dispatch(setErrorMessage(err.response.data));
            throw err;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signupSuccess: false,
        signupLoading: false,
        successIsOpen: false,
        successMessage: null,
        errorIsOpen: false,
        errorMessage: null,
        errorCode: null,
    },
    reducers: authActions,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            return {
                ...state,
                signupSuccess: true,
                signupLoading: false,
            };
        },
        [signup.pending]: (state, action) => {
            return {
                ...state,
                signupSuccess: false,
                signupLoading: true,
            };
        },
        [signup.rejected]: (state, action) => {
            return {
                ...state,
                signupSuccess: false,
                signupLoading: false,
            };
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('userToken', action.payload.token);
            return {
                ...state,
                signupSuccess: false,
                signupLoading: false,
                successIsOpen: false,
                successMessage: null,
                errorIsOpen: false,
                errorMessage: null,
                errorCode: null,
            };
        },
    },
})

export const { resetSuccessMessage, resetErrorMessage, setSuccessMessage, setErrorMessage, resetState } = authSlice.actions

export default authSlice.reducer