import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Container} from "@mui/material";
import Layout from "../Layout";


export default function PublicLayout(props) {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            navigate(user.role === 'seller' ? '/products' : '/vending-machine');
        }
    }, [user]);

    return (
        <Layout>
            <Container sx={{marginTop: 10}}>
                {props.children}
            </Container>
        </Layout>
    )
}