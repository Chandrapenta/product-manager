import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Description:</label>
                        <input type="text" className="form-control" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label">Can Expire:</label>
                        <input type="checkbox" className="form-check-input" checked={editedCanExpire} onChange={(e) => setEditedCanExpire(e.target.checked)} />
                    </div>
                </div>
                {editedCanExpire && (
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Expiry Date:</label>
                            <input type="date" className="form-control" value={editedExpiryDate} min={currentDate} onChange={(e) => setEditedExpiryDate(e.target.value)} />
                        </div>
                    </div>
                )}
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Category:</label>
                        <input type="text" className="form-control" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label">Price:</label>
                        <input type="number" className="form-control" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Special:</label>
                        <input type="checkbox" className="form-check-input" checked={editedIsSpecial} onChange={(e) => setEditedIsSpecial(e.target.checked)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        {showError && <div className="text-danger">{errorMessage}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductEditForm;
