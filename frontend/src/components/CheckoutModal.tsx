import React, { useState } from 'react';
import { X, Sparkles, CreditCard, ShieldCheck, Truck, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types/feature';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  newCheckoutEnabled: boolean;
  discountEnabled?: boolean;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  newCheckoutEnabled,
  discountEnabled = false,
  onClearCart,
}) => {
  const [isPlaced, setIsPlaced] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = couponApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 2500);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim()) {
      setCouponApplied(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            {newCheckoutEnabled ? (
              <>
                <div className="new-checkout-pill">
                  <Sparkles size={14} /> ✨ New Checkout Experience
                </div>
                <h2>Express Checkout</h2>
              </>
            ) : (
              <>
                <div className="classic-checkout-pill">Classic Checkout</div>
                <h2>Standard Order Summary</h2>
              </>
            )}
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isPlaced ? (
          <div className="order-success-container">
            <CheckCircle2 size={64} className="success-icon" />
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for testing the DemoStore feature flags integration.</p>
            <div className="success-details">
              <span>Checkout Type Used:</span>
              <strong>{newCheckoutEnabled ? '✨ New Checkout Experience' : 'Classic Checkout'}</strong>
            </div>
            <button className="btn-primary" onClick={() => { setIsPlaced(false); onClose(); }}>
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <p>Your shopping cart is empty.</p>
            <button className="btn-secondary" onClick={onClose}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="checkout-body">
            {/* Left side: Items List */}
            <div className="checkout-items-section">
              <h4>Selected Items ({cartItems.length})</h4>
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div className="cart-item" key={`${item.id}-${index}`}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">${(discountEnabled ? item.price * 0.7 : item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Dynamic Checkout View depending on feature flag */}
            <div className="checkout-payment-section">
              {newCheckoutEnabled ? (
                /* NEW CHECKOUT EXPERIENCE (Controlled by new-checkout = true) */
                <div className="new-checkout-box">
                  <div className="express-checkout-banner">
                    <Zap size={18} />
                    <div>
                      <strong>One-Click Express Checkout Active</strong>
                      <p>Powered by Smart Feature Flag: <code>new-checkout = true</code></p>
                    </div>
                  </div>

                  {/* Express Pay Buttons */}
                  <div className="express-pay-grid">
                    <button className="express-pay-btn apple-pay" onClick={handlePlaceOrder}>
                      Pay 1-Click
                    </button>
                    <button className="express-pay-btn gpay" onClick={handlePlaceOrder}>
                      G Pay Instant
                    </button>
                  </div>

                  <div className="divider"><span>OR CUSTOMIZE</span></div>

                  {/* Coupon Feature */}
                  <form onSubmit={handleApplyCoupon} className="coupon-form">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. ROLLOUT15)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={couponApplied}
                    />
                    <button type="submit" disabled={couponApplied || !coupon}>
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </form>

                  {/* Summary */}
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="price-row discount">
                        <span>Demo Promo (15% OFF)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="price-row">
                      <span>Express Guaranteed Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total Amount</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="btn-express-submit" onClick={handlePlaceOrder}>
                    <span>Complete Express Order (${total.toFixed(2)})</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                /* CLASSIC CHECKOUT EXPERIENCE (Controlled by new-checkout = false) */
                <div className="classic-checkout-box">
                  <div className="classic-info-notice">
                    <ShieldCheck size={16} />
                    <span>Standard Checkout Flow (Feature flag <code>new-checkout = false</code>)</span>
                  </div>

                  <div className="classic-form-group">
                    <label>Shipping Address</label>
                    <input type="text" defaultValue="123 Innovation Way, Tech Park" />
                  </div>

                  <div className="classic-form-group">
                    <label>Payment Method</label>
                    <div className="classic-payment-option">
                      <CreditCard size={18} />
                      <span>Credit Card ending in •••• 4242</span>
                    </div>
                  </div>

                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Standard Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="btn-classic-submit" onClick={handlePlaceOrder}>
                    Place Order (${total.toFixed(2)})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
