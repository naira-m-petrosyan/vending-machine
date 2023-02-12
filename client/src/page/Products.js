import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteProduct, getAll, updateProduct} from "../store/product/product.slice";
import SellerWrapper from "../components/Wrapper/SellerWrapper";
import {
    Modal,
    Box,
    FormControl,
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    Paper,
    IconButton,
    Container,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    CardContent,
    Typography,
    CardActions,
    Card,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Dialog,
} from '@mui/material';
import {Field, Form} from "react-final-form";
import {createProduct} from "../store/product/product.slice";
import {validateIsEmpty} from "../utils/validation";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import PrivateLayout from "../components/PrivateLayout";
import {resetDeposit} from "../store/user/user.slice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Products() {
    const dispatch = useDispatch();
    const {products, loading, added, updated, deleted} = useSelector(state => state.product);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [mode, setMode] = useState(null);
    const [product, setProduct] = useState(null);
    const onSubmit = (values) => {
        const data = {...values, cost: Math.round(values.cost * 100)};
        if(mode === 'Create') {
            dispatch(createProduct(data));
        } else {
            dispatch(updateProduct({...data, id: product.id}));
        }
    }

    const validate = (values) => {
        const requiredFields = ['productName', 'amountAvailable', 'cost'];
        const errors = {};
        requiredFields.forEach(item => {
            if (validateIsEmpty(values[item])) {
                errors[item] = 'This field is required.';
            }
        });
        if(isNaN(+(values.amountAvailable))) {
            errors.amountAvailable = 'The field needs to be a valid number.'
        } else if(!Number.isInteger(+(values.amountAvailable)) || +(values.amountAvailable) <= 0) {
            errors.amountAvailable = 'This field can only be a positive integer.'
        }
        return errors;
    }
    useEffect(() => {
        dispatch(getAll());
    }, [])

    useEffect(() => {
        if(added && !loading) {
            dispatch(getAll());
            setIsOpenModal(false);
            setMode(null);
            setProduct(null);
        }
    }, [added])

    useEffect(() => {
        if(updated && !loading) {
            dispatch(getAll());
            setIsOpenModal(false);
            setMode(null);
            setProduct(null);
        }
    }, [updated])

    useEffect(() => {
        if(deleted && !loading) {
            dispatch(getAll());
            setIsOpenDeleteModal(false);
            setProduct(null);
        }
    }, [deleted])

    return (
        <PrivateLayout>
            <SellerWrapper>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            My Products
                        </Typography>
                        <CardActions sx={{}}>
                            <Button variant='contained' size="small" onClick={() => {
                                setIsOpenModal(true);
                                setMode('Create');
                            }}>Create New Product</Button>
                        </CardActions>
                        <div>
                            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Cost</TableCell>
                                            <TableCell>Amount Available</TableCell>
                                            <TableCell>Actions</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map(product => <TableRow key={product.id}>
                                            <TableCell>{product.productName}</TableCell>
                                            <TableCell>{((product.cost || 0) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</TableCell>
                                            <TableCell>{product.amountAvailable}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => {
                                                        setIsOpenModal(true);
                                                        setMode('Update');
                                                        setProduct(product);
                                                    }}
                                                    onMouseDown={() => {
                                                        setIsOpenModal(true);
                                                        setMode('Update');
                                                        setProduct(product);
                                                    }}
                                                    edge="end"
                                                >
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        setIsOpenDeleteModal(true);
                                                        setProduct(product);
                                                    }}
                                                    onMouseDown={() => {
                                                        setIsOpenDeleteModal(true);
                                                        setProduct(product);
                                                    }}
                                                    edge="end"
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table></TableContainer></div>
                    </CardContent>
                </Card>
            </SellerWrapper>
            <Modal
                open={isOpenModal}
                onClose={() => {
                    setIsOpenModal(false);
                    setMode(null);
                    setProduct(null);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        initialValues={mode === 'Update' ? {
                            productName: product.productName,
                            amountAvailable: product.amountAvailable,
                            cost: product.cost,
                        } : {
                            productName: '',
                            amountAvailable: 0,
                            cost: 0,
                        }}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <h2>{mode} product</h2>
                                <div >
                                    <Field name="productName">
                                        {({ input, meta }) => (
                                            <FormControl sx={{ m: 1}}>
                                                <TextField id="outlined-basic" variant="outlined"  {...input} label="Name" />
                                                {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="cost">
                                        {({ input, meta }) => (
                                            <FormControl sx={{ m: 1}}>
                                                <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
                                                <OutlinedInput
                                                    {...input}
                                                    id="outlined-adornment-amount"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    label="Cost"
                                                />
                                                {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="amountAvailable">
                                        {({ input, meta }) => (
                                            <FormControl sx={{ m: 1}}>
                                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" variant="outlined"  {...input} label="Amount Available" />
                                                {meta.touched && meta.error && <span className='error-message'>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>
                                </div >
                                <Button variant="contained" type="submit" disabled={loading}>{mode}</Button>
                                <Button variant="outlined" disabled={loading} onClick={() => {
                                    setIsOpenModal(false);
                                    setMode(null);
                                    setProduct(null);
                                }}>Cancel</Button>
                            </form>
                        )}
                    />
                </Box>
            </Modal>
            <Dialog
                fullScreen={false}
                open={isOpenDeleteModal}
                onClose={() => {
                    setIsOpenDeleteModal(false);
                    setProduct(null);
                }}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} autoFocus onClick={() => {
                        setIsOpenDeleteModal(false);
                        setProduct(null);
                    }}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={() => dispatch(deleteProduct({id: product.id}))} autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </PrivateLayout>
    )
}