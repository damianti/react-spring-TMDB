import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { CartContext } from '../context/CartContext';

/**
 * Renders the payment form component.
 * @returns {JSX.Element} - The rendered payment form component.
 */
const PaymentForm = () => {
    const { fetchCartContents } = useContext(CartContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [message, setMessage] = useState({ content: '', isError: false });
    const navigate = useNavigate();

    /**
     * Handles input changes in the form fields.
     * @param {Object} event - The input change event.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Completes the payment process.
     * @param {Object} event - The form submission event.
     */
    const completePayment = async (event) => {
        event.preventDefault();
        const successMessage = 'Payment completed successfully';
        const errorMessage = 'Error processing payment. Please try again.';
        try {
            const response = await axios.post('/cart/complete', formData);
            if (response.status === 200) {
                setMessage({ content: successMessage, isError: false });
                fetchCartContents();
                navigate('/'); // Redirect to the home page after payment completion
            }
        } catch (error) {
            console.log('Error processing payment:', error);
            setMessage({ content: errorMessage, isError: true }); // Display an error message
        }
    };

    return (
        <form onSubmit={completePayment}>
            <InputField
                type="text"
                name="firstName"
                value={formData.firstName}
                handleInputChange={handleInputChange}
            />
            <InputField
                type="text"
                name="lastName"
                value={formData.lastName}
                handleInputChange={handleInputChange}
            />
            <InputField
                type="email"
                name="email"
                value={formData.email}
                handleInputChange={handleInputChange}
            />
            <button type="submit" className="btn btn-secondary">
                Complete Payment
            </button>
            {message.content && (
                <div className={message.isError ? 'error-message' : 'status-message'}>
                    {message.content}
                </div>
            )}
        </form>
    );
};

export default PaymentForm;
