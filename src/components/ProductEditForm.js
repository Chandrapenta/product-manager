import React, { useState } from 'react';

const ProductEditForm = ({ product, onEdit, onCancel }) => {
    const [editedDescription, setEditedDescription] = useState(product.description);
    const [editedCanExpire, setEditedCanExpire] = useState(product.canExpire);
    const [editedExpiryDate, setEditedExpiryDate] = useState(product.expiryDate);
    const [editedCategory, setEditedCategory] = useState(product.category);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedIsSpecial, setEditedIsSpecial] = useState(product.isSpecial);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setErrorMessage(validationMessage);
            setShowError(true);
            return;
        }

        // All validations passed, clear error message
        setErrorMessage('');
        setShowError(false);

        const editedProduct = {
            ...product,
            description: editedDescription,
            canExpire: editedCanExpire,
            expiryDate: editedCanExpire ? editedExpiryDate : null,
            category: editedCategory,
            price: parseFloat(editedPrice),
            isSpecial: editedIsSpecial
        };
        onEdit(editedProduct);
    };

    const validateForm = () => {
        // Description validation
        if (!editedDescription.trim()) {
            return 'Description cannot be blank';
        }
        if (/\d/.test(editedDescription)) {
            return 'Description cannot contain numbers';
        }

        // Category validation
        if (!editedCategory.trim()) {
            return 'Category cannot be blank';
        }
        if (/[^a-zA-Z\s]/.test(editedCategory)) {
            return 'Category cannot contain numbers or special characters';
        }

        // Price validation
        const parsedPrice = parseFloat(editedPrice);
        if (parsedPrice < 0 || isNaN(parsedPrice)) {
            return 'Price cannot be negative';
        }

        return ''; // All validations passed
    };

    // Get current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit}>
            {/* <h2>Edit {editedDescription}</h2> */}
            <h2>Edit Product</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Description:</td>
                        <td><input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Can Expire:</td>
                        <td><input type="checkbox" checked={editedCanExpire} onChange={(e) => setEditedCanExpire(e.target.checked)} /></td>
                    </tr>
                    {editedCanExpire && (
                        <tr>
                            <td>Expiry Date:</td>
                            <td><input type="date" value={editedExpiryDate} min={currentDate} onChange={(e) => setEditedExpiryDate(e.target.value)} /></td>
                        </tr>
                    )}
                    <tr>
                        <td>Category:</td>
                        <td><input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Special:</td>
                        <td><input type="checkbox" checked={editedIsSpecial} onChange={(e) => setEditedIsSpecial(e.target.checked)} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            {showError && <div className="error-message">{errorMessage}</div>}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ProductEditForm;
