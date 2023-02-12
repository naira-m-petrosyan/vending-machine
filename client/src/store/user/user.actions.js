export const userActions = {
    removeUser: state => {
        localStorage.removeItem('userToken');
        return {
            ...state,
            user: {}
        };
    }
};