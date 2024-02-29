import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Description:</label>
                        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label">Can Expire:</label>
                        <input type="checkbox" className="form-check-input" checked={canExpire} onChange={(e) => setCanExpire(e.target.checked)} />
                    </div>
                </div>
                {canExpire && (
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Expiry Date:</label>
                            <input type="date" className="form-control" value={expiryDate} min={currentDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                    </div>
                )}
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Category:</label>
                        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="col">
                        <label className="form-label">Price:</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Special:</label>
                        <input type="checkbox" className="form-check-input" checked={isSpecial} onChange={(e) => setIsSpecial(e.target.checked)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        {showError && <div className="text-danger">{errorMessage}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;
