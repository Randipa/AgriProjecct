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
    <div className="container py-5">
      <style jsx>{`
        /* Custom color definitions using your color palette */
        :root {
          --primary: #4CAF50;        /* Green */
          --secondary: #8D6E63;      /* Earthy Brown */
          --info: #2E7D32;           /* Deep Blue/Green */
          --warning: #FFC107;        /* Golden Yellow */
          --danger: #D84315;         /* Tomato Red */
          --light-accent: #FFEB3B;   /* Sunshine Yellow */
          --warm-accent: #E65100;    /* Rust Orange */
        }
        
        .btn-outline-nature {
          color: #4CAF50;
          border-color: #4CAF50;
        }
        .btn-outline-nature:hover {
          background-color: #4CAF50;
          color: white;
        }
        .btn-nature {
          background-color: #4CAF50;
          border-color: #4CAF50;
          color: white;
        }
        .btn-nature:hover {
          background-color: #2E7D32;
          border-color: #2E7D32;
        }
        .bg-nature {
          background-color: #4CAF50;
          color: white;
        }
        .bg-nature-light {
          background-color: #FFEB3B;
          color: #212529;
        }
        .text-nature {
          color: #4CAF50;
        }
        .text-warm {
          color: #E65100;
        }
        .border-nature {
          border-color: #4CAF50 !important;
        }
        .badge-earth {
          background-color: #8D6E63;
          color: white;
        }
        .btn-danger-custom {
          color: white;
          background-color: #D84315;
          border-color: #D84315;
        }
        .btn-outline-danger-custom {
          color: #D84315;
          border-color: #D84315;
        }
        .btn-outline-danger-custom:hover {
          color: white;
          background-color: #D84315;
        }
      `}</style>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Back Button */}
          <Link to="/store" className="btn btn-outline-nature mb-4">
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </Link>

          {/* Title */}
          <h2 className="display-6 text-center mb-4 text-nature">Shopping Cart</h2>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <FaShoppingCart className="display-1 text-secondary mb-4" />
              <h3 className="text-secondary mb-4">Your cart is empty</h3>
              <Link to="/store" className="btn btn-nature btn-lg px-5">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div>
              {/* Cart Items */}
              <div className="card shadow-sm border-0 mb-4">
                {cart.map((item, index) => (
                  <div 
                    key={item._id} 
                    className={`p-4 ${index !== cart.length - 1 ? 'border-bottom border-nature' : ''}`}
                  >
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="mb-2 text-nature">{item.name}</h5>
                        <div className="mb-2">
                          <span className="badge badge-earth me-2">{item.category || 'N/A'}</span>
                          <small className="text-secondary">Available: {item.qty}</small>
                        </div>
                        <p className="mb-0">
                          <strong>Unit Price: </strong>
                          <span className="text-warm">LKR {item.price.toFixed(2)}</span>
                        </p>
                      </div>

                      <div className="col-md-3">
                        <div className="input-group input-group-sm justify-content-center">
                          <button
                            className="btn btn-outline-nature"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            -
                          </button>
                          <span className="input-group-text bg-white border-nature px-3">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-nature"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-md-2 text-end">
                        <p className="h5 mb-0 text-warm">
                          LKR {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="col-md-1 text-end">
                        <button
                          className="btn btn-outline-danger-custom btn-sm rounded-circle"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="card shadow-sm border-0" style={{ backgroundColor: '#F9FBE7' }}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h4 className="mb-0 text-secondary">Total Amount</h4>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <h3 className="text-warm mb-0">LKR {getTotalPrice()}</h3>
                    </div>
                  </div>
                  <hr className="my-4" style={{ borderColor: '#8D6E63' }} />
                  <Link 
                    to="/checkout" 
                    className="btn btn-lg w-100"
                    style={{ backgroundColor: '#4CAF50', color: 'white' }}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;