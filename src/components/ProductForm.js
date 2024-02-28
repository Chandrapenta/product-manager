import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onCreate }) => {
    const [description, setDescription] = useState('');
    const [canExpire, setCanExpire] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [isSpecial, setIsSpecial] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        const validationMessage = validateForm();
        if (validationMessage) {
            setErrorMessage(validationMessage);
            setShowError(true);
            return;
        }

        // All validations passed, clear error message
        setErrorMessage('');
        setShowError(false);

        const newProduct = {
            id: Date.now(),
            description,
            canExpire,
            expiryDate: canExpire ? expiryDate : null,
            category,
            price: parseFloat(price),
            isSpecial
        };
        onCreate(newProduct);
        // Reset form fields
        setDescription('');
        setCanExpire(false);
        setExpiryDate('');
        setCategory('');
        setPrice('');
        setIsSpecial(false);
    };

    const validateForm = () => {
        // Description validation
        if (!description.trim()) {
            return 'Description cannot be blank';
        }
        if (/\d/.test(description)) {
            return 'Description cannot contain numbers';
        }

        // Category validation
        if (!category.trim()) {
            return 'Category cannot be blank';
        }
        if (/[^a-zA-Z\s]/.test(category)) {
            return 'Category cannot contain numbers or special characters';
        }

        // Price validation
        const parsedPrice = parseFloat(price);
        if (parsedPrice < 0 || isNaN(parsedPrice)) {
            return 'Price cannot be negative';
        }

        return ''; // All validations passed
    };


    // Get current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Description:</td>
                        <td><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Can Expire:</td>
                        <td><input type="checkbox" checked={canExpire} onChange={(e) => setCanExpire(e.target.checked)} /></td>
                    </tr>
                    {canExpire && (
                        <tr>
                            <td>Expiry Date:</td>
                            <td><input type="date" value={expiryDate} min={currentDate} onChange={(e) => setExpiryDate(e.target.value)} /></td>
                        </tr>
                    )}
                    <tr>
                        <td>Category:</td>
                        <td><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
                    </tr>
                    <tr >
                        <td>Special:</td>
                        <td><input type="checkbox" checked={isSpecial} onChange={(e) => setIsSpecial(e.target.checked)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            {showError && <div className="error-message">{errorMessage}</div>}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
