import React from "react";
import PropTypes from "prop-types";

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x300/cccccc/666666?text=No+Image";
          }}
        />
        {hasDiscount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* TODO: นักศึกษาจะเพิ่ม rating stars ในส่วน Challenge */}
        <div className="product-price">
          {hasDiscount && (
            <span className="original-price">
              ฿{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="current-price">
            ฿{product.price.toLocaleString()}
          </span>
        </div>

        <div className="product-price">฿{product.price.toLocaleString()}</div>

        <div className="product-actions">
          <button
            className="btn btn-secondary"
            onClick={() => onViewDetails(product)}
          >
            ดูรายละเอียด
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? "ใส่ตะกร้า" : "หมดสินค้า"}
          </button>
        </div>
      </div>
    </div>
  );
}

// TODO: นักศึกษาจะเพิ่ม PropTypes validation ในส่วน Challenge
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    inStock: PropTypes.bool,
    rating: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
