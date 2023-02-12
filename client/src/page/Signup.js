import PublicLayout  from "../components/PublicLayout";
import { Form, Field } from 'react-final-form';
import {useDispatch, useSelector} from "react-redux";
import {resetState, signup} from "../store/auth/auth.slice";
import {useEffect, useState} from "react";
import {validateIsEmpty, validatePassword, validatePasswordMatch} from "../utils/validation";
import {Link, useNavigate} from "react-router-dom";
import {InputLabel, Select, FormControl, MenuItem, TextField, OutlinedInput, InputAdornment, IconButton, Button, Container} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Signup() {
    const {signupSuccess, signupLoading} = useSelector(state => state.auth);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(signup(values));
    }
    useEffect(() => {
        if(signupSuccess && !signupLoading) {
            dispatch(resetState());
            navigate('/login');
        }
    }, [signupSuccess])
    const validate = (values) => {
        const requiredFields = ['password', 'repeatPassword', 'username', 'role'];
        const errors = {};
        requiredFields.forEach(item => {
            if (validateIsEmpty(values[item])) {
                errors[item] = 'This field is required.';
            }
        });
        if (values.password && validatePassword(values.password)) {
            errors.password = 'Password should be min 6 characters long.';
        } else if (values.password && values.repeatPassword && validatePasswordMatch(values.password, values.repeatPassword)) {
            errors.repeatPassword = "Passwords do not match.";
        }
        return errors;
    }

    return (
        <PublicLayout>
            <Container>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                initialValues={{
                    username: '',
                    password: '',
                    repeatPassword: '',
                    role: ''
                }}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        <div >
                            <Field name="username">
                                {({ input, meta }) => (
                                    <FormControl sx={{ m: 1}}>
                                        <TextField id="outlined-basic" variant="outlined"  {...input} label="Username" />
                                        {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>
                        </div >
                        <div>
                            <Field name="role">
                                {({ input, meta }) => (
                                    <FormControl sx={{ m: 1, minWidth: 195}}>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        autoWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Role"
                                        value={input.value}
                                        onChange={input.onChange}
                                    >
                                        <MenuItem value={'seller'}>Seller</MenuItem>
                                        <MenuItem value={'buyer'}>Buyer</MenuItem>
                                    </Select>
                                    {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                </FormControl>)}
                            </Field>
                        </div>
                        <div>
                            <Field name="password">
                                {({ input, meta }) => (
                                    <FormControl sx={{ m: 1}}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={isPasswordShown ? 'text' : 'password'}
                                            {...input} label="Password"
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
                        <div>
                            <Field name="repeatPassword">
                                {({ input, meta }) => (
                                    <FormControl sx={{ m: 1}}>
                                        <TextField id="outlined-basic" variant="outlined"  type={isPasswordShown ? 'text' : 'password'} {...input} label="Repeat Password" />
                                        {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>
                        </div>


                        <Button disabled={signupLoading} variant="contained" type="submit">Sign Up</Button>
                    </form>
                )}
            />
                <div>
                    <span>Or if you already have an account go to <Link to={'/login'}>Login</Link></span>
                </div>
            </Container>
        </PublicLayout>
    )
}