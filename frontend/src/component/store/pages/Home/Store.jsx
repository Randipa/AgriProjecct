import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';
import BuyerHeader from '../../../Buyer/BuyerHeader';
import BuyerFooter from '../../../Buyer/BuyerFooter';

function Store({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  // Custom theme styles
  const styles = {
    mainContainer: {
      backgroundColor: '#FFEB3B10',
      minHeight: '100vh',
    },
    headerText: {
      color: '#2E7D32',
    },
    primaryBtn: {
      backgroundColor: '#4CAF50',
      borderColor: '#2E7D32',
      color: 'white',
    },
    outlineBtn: {
      backgroundColor: 'transparent',
      borderColor: '#E65100',
      color: '#E65100',
    },
    searchInput: {
      borderColor: '#FFC10730',
    },
    searchIcon: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    card: {
      borderColor: '#8D6E6330',
      borderWidth: '0',
      borderRadius: '12px',
    },
    cardBody: {
      backgroundColor: 'white',
      borderRadius: '12px',
    },
    cardTitle: {
      color: '#2E7D32',
    },
    priceTag: {
      backgroundColor: '#FFEB3B20',
      color: '#2E7D32',
    },
    inStockBadge: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    outOfStockBadge: {
      backgroundColor: '#D84315',
      color: 'white',
    },
    categoryBadge: {
      backgroundColor: '#FFC107',
      color: '#8D6E63',
    },
    secondaryText: {
      color: '#8D6E63',
    },
    disabledBtn: {
      backgroundColor: '#8D6E6350',
      borderColor: '#8D6E6350',
      color: 'white',
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/store-items/store-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    if (item.quantity > 0) {
      const itemInCart = cart?.find((cartItem) => cartItem._id === item._id);
  
      if (itemInCart) {
        if (itemInCart.quantity < item.quantity) {
          setCart(
            cart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setNotification(`Cannot add more than ${item.quantity} of ${item.name} to the cart.`);
        }
      } else {
        setCart([...cart, { ...item, quantity: 1, qty: item.quantity }]);
      }
    } else {
      setNotification('This item is out of stock.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      <BuyerHeader />
    <div style={styles.mainContainer} className="container-fluid py-5 px-4">
      
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5">
        <h1 className="display-4 fw-bold mb-4 mb-md-0" style={styles.headerText}>Welcome to Store</h1>
        <div className="d-flex gap-3">
        <Link to="/cart" state={{ items }} className="btn btn-lg px-4" style={styles.primaryBtn}>
          <i className="bi bi-cart3 me-2 fs-6"></i> <span className="fs-6">Cart</span>
        </Link>
        <Link to="/my-orders" className="btn btn-lg px-4" style={styles.outlineBtn}>
          <i className="bi bi-list-check me-2 fs-6"></i> <span className="fs-6">My Orders</span>
        </Link>
        <Link to="/profile" className="btn btn-lg px-4" style={styles.outlineBtn}>
          <i className="bi bi-person me-2 fs-6"></i> <span className="fs-6">Profile</span>
        </Link>

        </div>
      </div>

      <div className="mb-4 col-md-6 mx-auto">
        <div className="input-group input-group-lg">
          <span className="input-group-text" style={styles.searchIcon}>
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search items by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="form-control form-control-lg shadow-sm"
            style={styles.searchInput}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={`col-md-4 col-lg-3 ${item.quantity === 0 ? 'opacity-75' : ''}`}
          >
            <div className="card h-100 shadow-lg hover-shadow transition-all" style={styles.card}>
              <div className="card-body p-4" style={styles.cardBody}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title h4 mb-0" style={styles.cardTitle}>{item.name}</h5>
                  <span className="badge" style={item.quantity > 0 ? styles.inStockBadge : styles.outOfStockBadge}>
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="mb-3 p-3 rounded-3" style={styles.priceTag}>
                  <h3 className="mb-0" style={styles.cardTitle}>RS {item.price.toFixed(2)}</h3>
                  <small style={styles.secondaryText}>Production Cost: RS {item.productionCost.toFixed(2)}</small>
                </div>

                <div className="mb-3">
                  <p className="card-text mb-2">
                    <span className="fw-bold" style={styles.secondaryText}>Available:</span>{' '}
                    <span style={item.quantity === 0 ? {color: '#D84315'} : {color: '#4CAF50'}}>
                      {item.quantity}
                    </span>
                  </p>
                  <p className="card-text mb-0">
                    <span className="fw-bold" style={styles.secondaryText}>Category:</span>{' '}
                    <span className="badge" style={styles.categoryBadge}>{item.category || 'N/A'}</span>
                  </p>
                </div>

                <button
                  className="btn btn-lg w-100 mt-3 shadow-sm"
                  style={item.quantity === 0 ? styles.disabledBtn : styles.primaryBtn}
                  onClick={() => handleAddToCart(item)}
                  disabled={item.quantity === 0}
                >
                  <i className={`bi ${item.quantity === 0 ? 'bi-x-circle' : 'bi-cart-plus'} me-2`}></i>
                  {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-5">
          <h3 style={styles.secondaryText}>No items found</h3>
        </div>
      )}
      
    </div>
    <BuyerFooter/>
    </div>
  );
}

export default Store;