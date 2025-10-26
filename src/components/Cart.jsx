import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Mock data - in real app, this would come from cart context/store
    const mockCartItems = [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        price: 5.99,
        quantity: 2,
        image: 'https://via.placeholder.com/100',
        prescription: false
      },
      {
        id: 2,
        name: 'Vitamin C 1000mg',
        price: 15.99,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
        prescription: false
      },
      {
        id: 3,
        name: 'Amoxicillin 500mg',
        price: 12.99,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
        prescription: true
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(10);
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  const handleCheckout = () => {
    // In real app, this would navigate to checkout page
    alert('Proceeding to checkout...');
  };

  return (
    <motion.div
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cart-header">
        <h1><FaShoppingCart /> Shopping Cart</h1>
        <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          className="empty-cart"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some medicines to get started!</p>
          <button className="btn btn-primary">Continue Shopping</button>
        </motion.div>
      ) : (
        <div className="cart-content">
          <motion.div
            className="cart-items"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CartItem
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cart-summary"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={applyPromoCode}>
                  Apply
                </button>
              </div>

              <motion.button
                className="btn btn-primary checkout-btn"
                onClick={handleCheckout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCreditCard /> Proceed to Checkout
              </motion.button>

              <div className="cart-notices">
                {cartItems.some(item => item.prescription) && (
                  <div className="notice prescription-notice">
                    <strong>Note:</strong> Some items require a prescription. You'll need to upload it during checkout.
                  </div>
                )}
                <div className="notice shipping-notice">
                  <strong>Free Shipping</strong> on orders over $50
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
