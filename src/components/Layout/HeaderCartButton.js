import { useContext } from "react";

import style from "./HeaderCartButton.module.css";
import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context";


const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return (
        <button className={style.button} onClick={props.onClick}>
            <span className={style.icon}>
                <CartIcon />
            </span>
            <span>Your cart </span>
            <span className={style.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;