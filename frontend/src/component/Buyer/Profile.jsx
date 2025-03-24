import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuyerHeader from './BuyerHeader';
import BuyerFooter from './BuyerFooter';

function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch logged-in user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || !loggedInUser.id) {
          alert('User is not logged in. Redirecting to login page.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/buyer/profile/${loggedInUser.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/buyer/profile/${user.id}`, user);
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/buyer/profile/${user.id}`);
      alert('Your account has been deleted successfully.');
      localStorage.removeItem('user'); // Clear user data from localStorage
      navigate('/'); // Redirect to signup page
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile. Please try again.');
    }
  };

  // Custom theme styles (same as Store)
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
    input: {
      borderColor: '#FFC10730',
    },
    errorText: {
      color: '#D84315',
    },
    successText: {
      color: '#4CAF50',
    },
  };

  return (
    <div className="d-flex flex-column vh-100">
      <BuyerHeader />

      <main className="flex-grow-1" style={styles.mainContainer}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-4" style={styles.headerText}>My Profile</h1>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="bg-light p-4 rounded shadow-sm">
              {error && <p style={styles.errorText}>{error}</p>}
              {successMessage && <p style={styles.successText}>{successMessage}</p>}

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                    disabled // Email is not editable
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="form-control"
                    style={styles.input}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProfile}
                >
                  Delete Account
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleUpdateProfile}
                  style={styles.primaryBtn}
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BuyerFooter />
    </div>
  );
}

export default Profile;