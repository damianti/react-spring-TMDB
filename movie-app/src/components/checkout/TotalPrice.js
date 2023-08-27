import React, {useState, useEffect, useContext} from 'react';
import LoadingSpinner from '../home/LoadingSpinner';
import {CartContext} from "../context/CartContext";
/**
 * Renders the total price component.
 * @returns {JSX.Element} - The rendered total price component.
 */
const TotalPrice = () => {
    const { cartContents } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let totalSum = 0;
        for (let i = 0; i < cartContents.length; i++) {
            const { price } = cartContents[i];

            // Check if price is indeed a number
            if (typeof price === 'number') {
                totalSum += price;
            }
        }
        setTotal(totalSum);
        setLoading(false);
    }, [cartContents]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (total === 0) {
        return <p>Your cart is empty.</p>;
    }

    return <h4 className="text-warning">Total Price: ${total.toFixed(2)}</h4>;
};

export default TotalPrice;