import BuyerWrapper from "../components/Wrapper/BuyerWrapper";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {buyProduct, getAll} from "../store/product/product.slice";
import {
    Button,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Paper,
    Table,
    TableHead,
    TableRow, TableCell, TableBody, IconButton, TableContainer, ButtonGroup, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    SvgIcon, Avatar,
} from "@mui/material";
import {getLoggedUser, resetDeposit, updateDeposit} from "../store/user/user.slice";
import {setSuccessMessage} from "../store/auth/auth.slice";
import PrivateLayout from "../components/PrivateLayout";

export default function BuyerDashboard() {
    const dispatch = useDispatch();
    const {products, boughtProduct, changeFromTransaction, total, amount, buyLoading, buySuccess} = useSelector(state => state.product);
    const {user, resetLoading, updateLoading, resetSuccess, updateSuccess, change} = useSelector(state => state.user);
    const [cart, setCart] = useState({});
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
    const defaultCoins = {
        '5': 0,
        '10': 0,
        '20': 0,
        '50': 0,
        '100': 0,
    };
    const images = {
        '5': '/static/images/5.jpeg',
        '10': '/static/images/10.jpeg',
        '20': '/static/images/20.jpeg',
        '50': '/static/images/50.jpeg',
        '100': '/static/images/100.webp',
    }

    const [coins, setCoins] = useState(defaultCoins);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    useEffect(() => {
        if(resetSuccess && !resetLoading) {
            if(change && change.length) {
                dispatch(setSuccessMessage({message: `Here is your change in cent coins: ${change.join(', ')}.`}))
            }
            dispatch(getLoggedUser());
            setIsResetDialogOpen(false);
        }
    }, [resetLoading, resetSuccess]);

    useEffect(() => {
        if(updateSuccess && !updateLoading) {
            dispatch(getLoggedUser());
            setIsDepositDialogOpen(false);
            setCoins(defaultCoins);
        }
    }, [updateLoading, updateSuccess]);

    useEffect(() => {
        if(buySuccess && !buyLoading) {
            dispatch(getLoggedUser());
            dispatch(getAll());
            const totalInDollars = ((total || 0) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
            let message = `You have bought ${boughtProduct.productName} with amount of ${amount}. Total cost was ${totalInDollars}.`;
            if(changeFromTransaction && changeFromTransaction.length) {
                message = message.concat(` Here is your change in cent coins: ${changeFromTransaction.join(', ')}.`)
            }
            dispatch(setSuccessMessage({message}));
        }
    }, [buyLoading, buySuccess]);

    const dollars = ((user.deposit || 0) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
    return (
        <PrivateLayout>
            <BuyerWrapper>
                <Card sx={{ maxWidth: 360 }}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Your account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You currently have {dollars} on your account
                    </Typography>
                        <CardActions sx={{}}>
                            <Button variant='contained' size="small" onClick={() => setIsDepositDialogOpen(true)}>Deposit</Button>
                            <Button size="small" onClick={() => setIsResetDialogOpen(true)}>Reset account</Button>
                        </CardActions>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 1000, marginTop: 5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Vending Machine
                        </Typography>
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Cost</TableCell>
                                        <TableCell>Available</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map(product => <TableRow id={product.id}>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{((product.cost || 0) / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</TableCell>
                                        <TableCell>{product.amountAvailable}</TableCell>
                                        <TableCell>
                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                <Button disabled={!(cart[product.id])} onClick={() => {
                                                    if(cart[product.id] === 1) {
                                                        setCart({});
                                                    } else {
                                                        setCart({[product.id]: cart[product.id] - 1});
                                                    }
                                                }}>-</Button>
                                                <Button>{cart[product.id] ? cart[product.id] : 0}</Button>
                                                <Button onClick={() => {
                                                    if (cart[product.id]) {
                                                        setCart({[product.id]: cart[product.id] + 1});
                                                    } else {
                                                        setCart({[product.id]: 1});
                                                    }
                                                }}>+</Button>
                                            </ButtonGroup>
                                            <Button disabled={!cart[product.id]} onClick={() => dispatch(buyProduct({
                                                id: product.id,
                                                amount: cart[product.id]
                                            }))}>Buy</Button>
                                        </TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                <Dialog
                    fullScreen={false}
                    open={isResetDialogOpen}
                    onClose={() => setIsResetDialogOpen(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Reset Account Deposit
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to reset your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => setIsResetDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => dispatch(resetDeposit())} autoFocus>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    fullScreen={false}
                    fullWidth={true}
                    maxWidth='md'
                    open={isDepositDialogOpen}
                    onClose={() => {
                        setIsDepositDialogOpen(false);
                        setCoins(defaultCoins);
                    }}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Add Coins
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can deposit only 5, 10, 20, 50 and 100 cent coins.
                            <Grid container >
                                {Object.keys(coins).map(coin => <Grid item xs>
                                    <div>
                                        <Avatar alt={`${coin} cents`} src={images[coin]} />
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button disabled={!coins[coin]} onClick={() => {
                                                const count = coins[coin] - 1
                                                const newCoins = {...coins};
                                                delete newCoins[coin];
                                                newCoins[coin] = count;
                                                setCoins(newCoins);
                                            }}>-</Button>
                                            <Button>{coins[coin]}</Button>
                                            <Button onClick={() => {
                                                const count = coins[coin] + 1
                                                const newCoins = {...coins};
                                                delete newCoins[coin];
                                                newCoins[coin] = count;
                                                setCoins(newCoins);
                                            }}>+</Button>
                                        </ButtonGroup>
                                    </div>
                                </Grid>)}
                            </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            setIsDepositDialogOpen(false);
                            setCoins(defaultCoins);
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            const data = Object.keys(coins).reduce((acc, coin) => {
                                if(coins[coin] > 0) {
                                    Array.from(Array(coins[coin]).keys()).forEach(item => {
                                        acc.push(parseInt(coin));
                                    })
                                }
                                return acc;
                            }, []);
                            dispatch(updateDeposit({coins: data}));
                        }} autoFocus>
                            Deposit
                        </Button>
                    </DialogActions>
                </Dialog>
            </BuyerWrapper>
        </PrivateLayout>
    )
}