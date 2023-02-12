export const authActions = {
    setSuccessMessage: (state, action) => {
        return {
            ...state,
            successIsOpen: true,
            successMessage: action.payload.message,
        };
    },
    resetSuccessMessage: (state, action) => {
        return {
            ...state,
            successIsOpen: false,
            successMessage: null,
        };
    },
    setErrorMessage: (state, action) => {
        return {
            ...state,
            errorIsOpen: true,
            errorMessage: action.payload.message,
            errorCode: action.payload.code,
        };
    },
    resetErrorMessage: (state, action) => {
        return {
            ...state,
            errorIsOpen: false,
            errorMessage: null,
            errorCode: null,
        };
    },
    resetState: (state, action) => {
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
    }
};