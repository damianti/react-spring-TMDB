import React, { useState, useContext } from 'react';
import LoadingSpinner from '../home/LoadingSpinner';
import { CartContext } from '../context/CartContext';
import {removeMovieFromCart} from './useFetchCart';

/**
 * Renders a single item in the shopping cart.
 * @param {Object} item - The item object containing details.
 * @returns {JSX.Element} - The rendered cart item component.
 */
const CartItem = ({ item }) => {
    const { fetchCartContents } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ERROR_MESSAGES = {
        REMOVE_FAILED: 'Failed to remove item from cart. Please try again later.'
    };
    // Check if item.price exists before using toFixed
    const formattedPrice = item.price ? item.price.toFixed(2) : '';

    const handleRemove = async () => {
        setLoading(true);
        try {
            await removeMovieFromCart(item.id);
            fetchCartContents();
        } catch (error) {
            setError(ERROR_MESSAGES.REMOVE_FAILED);
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="card bg-dark border-light m-1 rounded-2">
            <div className="card-body text-light">
                <div className="row g-2">
                    <div className="col-md-4">
                        <img src={item.image} className="card-img" alt={item.title} />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between">
                        <div className="d-flex flex-column p-1">
                            <h6 className="card-text cart-text-space">{item.title}</h6>
                            <p className="card-text cart-text-space">Release date: {item.releaseDate}</p>
                            <p className="card-text">Price: ${formattedPrice}</p>
                        </div>
                        <div className="p-2 m-2">
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <button className="btn btn-secondary" onClick={handleRemove}>
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="text-danger p-2">{error}</p>}
        </div>
    );
};



export default CartItem;
