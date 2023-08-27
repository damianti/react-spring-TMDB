import React, { useState, useEffect, useContext } from 'react';
import CartList from '../cart/CartList';
import CartFooter from '../cart/CartFooter';
import '../../css/CartPage.css';
import LoadingSpinner from '../home/LoadingSpinner';
import { CartContext } from '../context/CartContext';
import * as useFetchCart from "../cart/useFetchCart";

/**
 * Component for the cart page.
 * @returns {JSX.Element} - CartPage component.
 */
function CartPage() {
    const { cartContents, fetchCartContents } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const MESSAGES = {
        ERROR_EMPTYING_CART: 'Failed to clean the items from cart. Please try again later.',
        CART_IS_EMPTY: 'Your cart is empty.'
    };
    useEffect(() => {
        const totalCost = calculateTotal(cartContents);
        setTotal(totalCost);
    }, [cartContents]);

    /**
     * Calculates the total price of the cart items.
     * @param {Array} items - The cart items.
     * @returns {number} - The total price.
     */
    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    };

    /**
     * Empties the cart.
     */
    const emptyCart = async () => {
        setLoading(true);
        try {
            await useFetchCart.emptyCart();
            //update cart context
            fetchCartContents();
            setTotal(0);
        } catch (error) {
            setError(MESSAGES.ERROR_EMPTYING_CART);
        } finally {
            setLoading(false);
        }
    };
    /**
     * Renders the content based on the cart state.
     * @returns {JSX.Element} - The rendered content.
     */
    const renderContent = () => {
        if (loading) {
            return <LoadingSpinner />;
        }
        if (!cartContents || cartContents.length === 0) {
            return <h4 className="text-center  p-2">{MESSAGES.CART_IS_EMPTY}</h4>;
        }
        return (
            <>
                <CartList cartItems={cartContents} />
                <div className="row p-2 m-2">
                    <CartFooter total={total} onEmptyCart={emptyCart} />
                    {error && <p className="text-danger p-2">{error}</p>}
                </div>
            </>
        );
    };

    return (
        <div className="container">
            <h2>My Cart</h2>
            {renderContent()}
        </div>
    );
}

export default CartPage;
