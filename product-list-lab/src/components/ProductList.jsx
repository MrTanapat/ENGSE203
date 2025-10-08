import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return product.price >= min && product.price <= max;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy, minPrice, maxPrice]);

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="header">
        <h1>🛍️ ร้านค้าออนไลน์</h1>
        <p>Lab 3.2 - การสร้าง Components และ Props</p>
      </div>

      {/* Simple Category Filter */}
      <div className="controls">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="ค้นหาสินค้า..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="ราคาต่ำสุด"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="ราคาสูงสุด"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">เรียงตามชื่อ</option>
          <option value="price-asc">ราคาต่ำ → สูง</option>
          <option value="price-desc">ราคาสูง → ต่ำ</option>
          <option value="rating">คะแนนสูง → ต่ำ</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <p className="no-products">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        )}
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
