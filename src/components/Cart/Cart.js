import style from './Cart.module.css';
import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItems = ( 
        <ul className={style['cart-items']}> 
            {cartCtx.items.map((item) => {
              return  <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}/>
            })}
        </ul>
    ); 

    const orderHandler = () => { setIsCheckout(true); }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch("https://meals-exercise-react-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCartHandler();
    }
        const modalActions = (
        <div className={style.actions}>
                <button 
                    className={style["button--alt"]} 
                    onClick={props.onClose}>
                        Close
                    </button>
                {hasItems && <button className={style.button} onClick={orderHandler}>Order</button>}
            </div>
    ); 

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={style.total}>
                <div>Total amount</div>
                <div>{totalAmount}</div>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending data</p>;

    const didSubmitModalContent = <p>Sucessfully submited</p>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;