import {Else, If, Then} from 'react-if';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, AppBar, Box, Toolbar} from "@mui/material";
import {removeUser} from "../../store/user/user.slice";

export default function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    return (
        <>
            <div className="header"></div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <If condition={localStorage.getItem('userToken')}>
                            <Then>
                                <Button color="inherit" onClick={() => {
                                    navigate(user.role === 'seller' ? '/products' : '/vending-machine');
                                }}>Dashboard</Button>
                                <Button color="inherit" onClick={() => {
                                    dispatch(removeUser());
                                    navigate('/login');
                                }}>Logout</Button>
                            </Then>
                            <Else>
                                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                                <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </Else>
                        </If>

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}