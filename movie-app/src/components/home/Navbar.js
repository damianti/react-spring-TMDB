import React, {useEffect, useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';

import {CartContext} from '../context/CartContext';

/**
 * Renders the navigation bar component.
 * @returns {JSX.Element} - The rendered navigation bar component.
 */
function Navbar() {
    const { cartContents } = useContext(CartContext);
    const [numOfItems, setNumOfItems] = useState(0);

    useEffect(() => {
        setNumOfItems(cartContents.length);
    }, [cartContents]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href=".#"></a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/search" className="nav-link">
                                SEARCH
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">
                                CART ({numOfItems})
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/checkout" className="nav-link">
                                CHECKOUT
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;