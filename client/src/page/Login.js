import { Form, Field } from 'react-final-form';
import { login } from "../store/auth/auth.slice";
import {useDispatch, useSelector} from "react-redux";
import {validateIsEmpty} from "../utils/validation";
import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {InputLabel, Select, FormControl, MenuItem, TextField, OutlinedInput, InputAdornment, IconButton, Button, Container} from '@mui/material';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PublicLayout from "../components/PublicLayout";


export default function Login(props) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    useEffect(() => {
        if(user && user.role) {
            navigate(user.role === 'seller' ? '/products' : '/vending-machine');
        }
    }, [user])

    const onSubmit = (values) => {
        dispatch(login(values));
    }

    const validate = (values) => {
        const requiredFields = ['password', 'username'];
        const errors = {};
        requiredFields.forEach(item => {
            if (validateIsEmpty(values[item])) {
                errors[item] = 'This field is required.';
            }
        });
        return errors;
    }

    return (
        <PublicLayout>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div>
                            <Field name="username">
                                {({ input, meta }) => (
                                    <FormControl sx={{ m: 1}}>
                                        <TextField id="outlined-basic" variant="outlined"  {...input} label="Username" />
                                        {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>
                        </div>
                        <div>
                            <div>
                                <Field name="password">
                                    {({ input, meta }) => (
                                        <FormControl sx={{ m: 1}}>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={isPasswordShown ? 'text' : 'password'}
                                                {...input}
                                                label="Password"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                                                            onMouseDown={() => setIsPasswordShown(!isPasswordShown)}
                                                            edge="end"
                                                        >
                                                            {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </div>
                        </div>

                        <Button variant="contained" type="submit">Login</Button>
                    </form>
                )}
            />
            <div>
                <span>Or if you do not have an account go to <Link to={'/signup'}>Sign Up</Link></span>
            </div>
        </PublicLayout>
    )
}
