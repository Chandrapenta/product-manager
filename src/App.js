import React, { useState } from 'react';
import './App.css';

import initialProducts from './components/productsData';
import ProductForm from './components/ProductForm';
import ProductEditForm from './components/ProductEditForm';

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filterCategory, setFilterCategory] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredProducts = filterCategory
    ? products.filter(product => product.category === filterCategory)
    : products;

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleCreate = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleEdit = (editedProduct) => {
    setProducts(products.map(product => {
      if (product.id === editedProduct.id) {
        return editedProduct;
      }
      return product;
    }));
    setEditingProductId(null);
  };

  const handleEditClick = (productId) => {
    setEditingProductId(productId);
  };

  return (
    <>
      <h1>Product List</h1>
      <div>
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Can Expire</th>
            <th>Expiry Date</th>
            <th>Category</th>
            <th>Price</th>
            <th>Special</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <React.Fragment key={product.id}>
              <tr className={product.isSpecial ? 'special-item' : ''}>
                <td>{product.description}</td>
                <td>{product.canExpire ? 'Yes' : 'No'}</td>
                <td>{product.canExpire ? product.expiryDate : ''}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td><input type='checkbox' checked={product.isSpecial} disabled></input></td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <button onClick={() => handleEditClick(product.id)}>Edit</button>
                </td>
              </tr>
              {editingProductId === product.id && (
                <tr>
                  <td colSpan="7">
                    <ProductEditForm product={product} onEdit={handleEdit} onCancel={() => setEditingProductId(null)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ProductForm onCreate={handleCreate} />
    </>
  );
};

export default App;
