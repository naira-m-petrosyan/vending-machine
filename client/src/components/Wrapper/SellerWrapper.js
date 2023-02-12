import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function SellerWrapper(props) {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    useEffect(() => {
        if (user.role === 'buyer') {
            navigate('/vending-machine')
        }
    }, [user.role]);
    return (
        <>
            <div className={`container`}>
                {props.children}
            </div>
        </>
    )
}