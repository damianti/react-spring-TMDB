import React, {useContext, useState} from 'react';
import '../../css/CartPage.css';
import PaymentForm from '../checkout/PaymentForm';
import TotalPrice from '../checkout/TotalPrice';
import {CartContext} from "../context/CartContext";

/**
 * Component for the checkout page.
 * @returns {JSX.Element} - CheckoutPage component.
 */
function CheckoutPage() {
    const [error, setError] = useState(null);
    const { cartContents } = useContext(CartContext);
    return (
        <div className="container justify-content-center text-center">
            <h1>Checkout</h1>
            <TotalPrice setError={setError} />
            {cartContents.length > 0 && !error && <PaymentForm />}
        </div>
    );
}

export default CheckoutPage;
