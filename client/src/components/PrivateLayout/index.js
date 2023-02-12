import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getLoggedUser, removeUser} from "../../store/user/user.slice";
import {Container} from "@mui/material";
import Layout from "../Layout";

export default function PrivateLayout(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {errorCode} = useSelector(state => state.auth);
    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            dispatch(removeUser());
            navigate('/login');
        } else {
            dispatch(getLoggedUser());
        }
    }, []);
    useEffect(() => {
        if(errorCode === 401) {
            dispatch(removeUser());
            navigate('/login');
        }
    }, [errorCode])
    return (
        <Layout>
            <Container sx={{marginTop: 10}}>
                {props.children}
            </Container>
        </Layout>
    )
}