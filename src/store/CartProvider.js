import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
    let existingCartItemIndex; 
    let existingCartItem;
    let updatedItems;
    switch(action.type) {
        case "ADD":
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            existingCartItemIndex = state.items.findIndex( item => item.id === action.item.id);
            existingCartItem = state.items[existingCartItemIndex];
            if(existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
            };
            
        case "REMOVE":
            existingCartItemIndex = state.items.findIndex( item => item.id === action.id);
            existingCartItem = state.items[existingCartItemIndex];
            const reducedTotalAmount = state.totalAmount - existingCartItem.price;

            if(existingCartItem.amount === 1) {
                updatedItems = state.items.filter( item => item.id !== action.id );
            } else {
                const updated = {...existingCartItem, amount: existingCartItem.amount - 1};
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updated;
            }
            return {
                items: updatedItems,
                totalAmount: reducedTotalAmount,
            }
        case "CLEAR":
            return defaultCartState;
        default :
            return defaultCartState;
    }

}

const CartProvider = props => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatch({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({type: 'REMOVE', id: id});
  };

  const clearCartHandler = () => {
    dispatch({type: "CLEAR"})
  }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCartHandler: clearCartHandler
    }

    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;