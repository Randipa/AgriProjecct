import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BuyerSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value; // Store the processed value
  
    if (name === "phoneNumber") {
      updatedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (updatedValue.length > 10) {
        return; // Stop user input after 10 digits
      }
    } else if (name === "firstName" || name === "lastName") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
    } else if (name === "email") {
      updatedValue = value.replace(/[^a-zA-Z0-9@.]/g, ""); // Allow only letters, numbers, '@', and '.'
    }
  
    // Update state only once
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/buyer/signup', formData);
      setLoading(false);
      setSuccess(response.data.message);
      setTimeout(() => navigate('/'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  // Custom theme styles
  const styles = {
    mainContainer: {
      backgroundColor: '#FFEB3B10',
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px',
    },
    card: {
      borderColor: '#8D6E6330',
      borderWidth: '2px',
      borderRadius: '12px',
    },
    cardHeader: {
      backgroundColor: '#4CAF5010',
      borderBottom: '1px solid #8D6E6330',
      padding: '20px',
    },
    primaryBtn: {
      backgroundColor: '#4CAF50',
      borderColor: '#2E7D32',
      color: 'white',
    },
    linkText: {
      color: '#E65100',
    },
    inputFocus: {
      borderColor: '#FFC107',
      boxShadow: '0 0 0 0.25rem rgba(255, 193, 7, 0.25)',
    },
    formLabel: {
      color: '#2E7D32',
      fontWeight: '500',
    },
    alertSuccess: {
      backgroundColor: '#4CAF5010',
      borderColor: '#4CAF50',
      color: '#2E7D32',
    },
    alertDanger: {
      backgroundColor: '#D8431510',
      borderColor: '#D84315',
      color: '#D84315',
    }
  };

  return (
    <div style={styles.mainContainer} className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow" style={styles.card}>
            <div style={styles.cardHeader} className="text-center">
              <h3 style={{color: '#2E7D32'}} className="fw-bold mb-1">Create An Account</h3>
              <p style={{color: '#8D6E63'}} className="mb-0">Please fill in your details to sign up</p>
            </div>
            
            <div className="card-body p-4">
              {error && <div className="alert" style={styles.alertDanger} role="alert">{error}</div>}
              {success && <div className="alert" style={styles.alertSuccess} role="alert">{success}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={styles.formLabel}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC10730' }}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={styles.formLabel}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      style={{ borderColor: '#FFC10730' }}
                      onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={styles.formLabel}>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{borderColor: '#FFC10730'}}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC10730' }}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={styles.formLabel}>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC10730' }}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={styles.formLabel}>Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="2"
                    style={{borderColor: '#FFC10730'}}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" style={styles.formLabel}>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{borderColor: '#FFC10730'}}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-lg w-100 mb-3"
                  style={styles.primaryBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : 'Sign Up'}
                </button>
                
                <div className="text-center mt-3">
                  <p style={{color: '#8D6E63'}} className="mb-0">
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => navigate('/')}
                      style={styles.linkText}
                    >
                      Log in here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerSignup;