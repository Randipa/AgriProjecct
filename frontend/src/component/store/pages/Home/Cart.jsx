import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

function Cart({ cart, setCart }) {
  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem._id !== item._id));
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      handleRemoveFromCart(item);
    } else if (newQuantity <= item.qty) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } else {
      alert(`Cannot add more than ${item.qty} of ${item.name} to the cart.`);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/store" className="flex items-center text-green-600 hover:text-green-800 mb-4">
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>

        <h2 className="text-3xl text-center font-semibold text-green-700 mb-6">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
            <h3 className="text-gray-500 mb-4">Your cart is empty</h3>
            <Link to="/store" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white shadow-lg rounded-lg mb-6">
              {cart.map((item, index) => (
                <div key={item._id} className={`p-4 ${index !== cart.length - 1 ? 'border-b border-green-300' : ''}`}>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <h5 className="text-xl font-semibold text-green-700 mb-1">{item.name}</h5>
                      <span className="bg-brown-600 text-white px-2 py-1 rounded text-sm mr-2">{item.category || 'N/A'}</span>
                      <small className="text-gray-500">Available: {item.qty}</small>
                      <p className="text-lg font-medium text-orange-600">Unit Price: LKR {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center">
                      <button className="px-3 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded" onClick={() => handleQuantityChange(item, -1)}>-</button>
                      <span className="mx-2 text-lg font-medium">{item.quantity}</span>
                      <button className="px-3 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded" onClick={() => handleQuantityChange(item, 1)}>+</button>
                    </div>

                    <div className="text-lg font-medium text-orange-600">LKR {(item.price * item.quantity).toFixed(2)}</div>

                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveFromCart(item)}>
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-100 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-medium text-gray-700">Total Amount</h4>
                <h3 className="text-2xl font-bold text-orange-600">LKR {getTotalPrice()}</h3>
              </div>
              <hr className="my-4 border-brown-600" />
              <Link to="/checkout" className="block bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;