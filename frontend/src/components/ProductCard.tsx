import React from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types/feature';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
  discountEnabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInCart, discountEnabled }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        <div className="product-footer">
          <div className="product-price-box">
            {discountEnabled ? (
              <>
                <span className="original-price" style={{ textDecoration: 'line-through', opacity: 0.6 }}>${product.price.toFixed(2)}</span>
                <span className="discounted-price" style={{ marginLeft: '8px', fontWeight: 'bold', color: '#e53935' }}>${(product.price * 0.7).toFixed(2)}</span>
                <span className="discount-label" style={{ marginLeft: '8px', backgroundColor: '#ffeb3b', padding: '2px 4px', borderRadius: '4px', fontSize: '0.8rem' }}>30% OFF</span>
              </>
            ) : (
              <span className="current-price">${product.price.toFixed(2)}</span>
            )}
            {product.originalPrice && !discountEnabled && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
