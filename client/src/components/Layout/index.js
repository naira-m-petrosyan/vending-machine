import {useDispatch, useSelector} from "react-redux";
import Header from "../Header";
import {Alert, Snackbar} from "@mui/material";
import {resetErrorMessage, resetSuccessMessage} from "../../store/auth/auth.slice";

export default function Layout(props) {
    const dispatch = useDispatch();
    const {successIsOpen, errorIsOpen, successMessage, errorMessage} = useSelector(state => state.auth);

    return (
        <>
            <Header/>
            <div className={`container`}>
                {props.children}
            </div>
            <Snackbar open={successIsOpen} autoHideDuration={6000} onClose={() => dispatch(resetSuccessMessage())}>
                <Alert onClose={() => dispatch(resetSuccessMessage())} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorIsOpen} autoHideDuration={6000} onClose={() => dispatch(resetErrorMessage())}>
                <Alert onClose={() => dispatch(resetErrorMessage())} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    )
}