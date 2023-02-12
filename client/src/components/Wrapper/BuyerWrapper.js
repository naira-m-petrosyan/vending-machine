import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function BuyerWrapper(props) {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    useEffect(() => {
        if (user.role === 'seller') {
            navigate('/products');
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