import style from './Checkout.module.css';
import { useRef, useState } from 'react';


const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().lenght !== 5;

const Checkout = props => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const [formInputsValidity, setFromInputsValidity] = useState(
        {
            name: true,
            street: true,
            city: true,
            postalCode: true
        }
    );

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        const isFormValid =  
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;
            
        if(!isFormValid) {
            setFromInputsValidity({
                name: enteredNameIsValid,
                street: enteredStreetIsValid,
                city: enteredPostalCodeIsValid,
                postalCode: enteredCityIsValid
            })
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredPostalCode,
            postalCode: enteredCity
        });
    };

    return(
        <form className={style.form} onSubmit={confirmHandler}>
            <div className={style.control}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please ender valid name</p>}
            </div>
            <div className={style.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
            </div>
            <div className={style.control}>
                <label htmlFor="postal_code">Postal Code</label>
                <input type="text" id="postal_code" ref={postalCodeInputRef}/>
            </div>
            <div className={style.control}>
                <label htmlFor="street">City</label>
                <input type="text" id="street" ref={cityInputRef}/>
            </div>
            <div className={style.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit" className={style.submit}>
                    Confirm
                </button>
            </div>

        </form>
    );
}

export default Checkout;