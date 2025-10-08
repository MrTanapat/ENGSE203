import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // กรองสินค้าตามหมวดหมู่
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="header">
        <h1>🛍️ ร้านค้าออนไลน์</h1>
        <p>Lab 3.2 - การสร้าง Components และ Props</p>
      </div>

      {/* Simple Category Filter */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label htmlFor="category-select">หมวดหมู่: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "5px", fontSize: "16px" }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Display */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* TODO: นักศึกษาจะเพิ่ม:
                - Advanced filters (ราคา, rating)
                - Search functionality  
                - Sorting options
                - Empty state handling
                - Loading states
            */}
    </div>
  );
}

// TODO: นักศึกษาจะปรับปรุง PropTypes ให้ละเอียดมากขึ้น
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ProductList;
