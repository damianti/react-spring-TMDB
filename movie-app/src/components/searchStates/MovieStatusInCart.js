import React, { useState, useEffect, useContext } from 'react';
import * as useFetchCart from '../cart/useFetchCart';
import '../../css/MovieStatusInCart.css';
import LoadingSpinner from '../home/LoadingSpinner';
import {CartContext} from "../context/CartContext";


/**
 * Component to display the status of a movie in the cart and handle adding it to the cart.
 * @param {Object} props - Component props.
 * @param {Object} props.movie - The movie object.
 * @returns {JSX.Element} - MovieStatusInCart component.
 */
function MovieStatusInCart({ movie }) {
    const STATUS_MESSAGES = {
        ALREADY_IN_CART: 'Movie already in cart',
        ERROR_CHECKING_STATUS: 'Error checking movie status',
        ERROR_ADDING_TO_CART: 'Error adding movie to cart.',
        MOVIE_ADDED: 'Movie added',
        ADD_TO_CARD: 'Add to cart',
    };

    const { cartContents, fetchCartContents } = useContext(CartContext);
    const [isInCart, setIsInCart] = useState(false);
    const [status, setStatus] = useState(STATUS_MESSAGES.ADD_TO_CARD);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const movieIsInCart = cartContents.some(content => content.id === movie.id);
        setIsInCart(movieIsInCart);

        if (movieIsInCart) {
            setStatus(STATUS_MESSAGES.ALREADY_IN_CART);
        }
    }, [movie, cartContents]);

    const handleAddToCart = async () => {
        try {
            console.log(movie)
            setLoading(true);
            await useFetchCart.addToCart(movie);
            fetchCartContents();
            setStatus(STATUS_MESSAGES.MOVIE_ADDED);
            setIsInCart(true);

        } catch (error) {
            setStatus(STATUS_MESSAGES.ERROR_ADDING_TO_CART);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                    <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={isInCart}>
                        {status}
                    </button>
                  )}
        </div>
    );
}

export default MovieStatusInCart;
