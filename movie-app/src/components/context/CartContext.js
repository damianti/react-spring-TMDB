import React, { createContext, useState, useEffect } from 'react';
import * as useFetchCart from '../cart/useFetchCart';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartContents, setCartContents] = useState([]);

    const fetchCartContents = async () => {
        try {
            const response = await useFetchCart.getCartContents();
            if (response.status === 200) {
                setCartContents(response.data);
            }
        } catch (error) {
            console.log('Error fetching cart contents:', error);
        }
    };

    useEffect(() => {
        fetchCartContents();
    }, []);

    return (
        <CartContext.Provider value={{ cartContents, fetchCartContents }}>
            {children}
        </CartContext.Provider>
    );
}
