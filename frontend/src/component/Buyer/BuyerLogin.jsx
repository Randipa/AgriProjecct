import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/buyer/login', formData);
      
      // Store user ID in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show success message
      setLoading(false);
      navigate('/store'); // Redirect to the store page
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  // Custom theme styles
  const styles = {
    mainContainer: {
      backgroundColor: '#FFEB3B10',
      minHeight: '100vh',
      paddingTop: '60px',
      paddingBottom: '60px',
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
    alertBox: {
      backgroundColor: '#D8431510',
      borderColor: '#D84315',
      color: '#D84315',
    }
  };

  return (
    <div style={styles.mainContainer} className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow" style={styles.card}>
            <div style={styles.cardHeader} className="text-center">
              <h3 style={{color: '#2E7D32'}} className="fw-bold mb-1">Welcome Back</h3>
              <p style={{color: '#8D6E63'}} className="mb-0">Please enter your credentials to login</p>
            </div>
            
            <div className="card-body p-4">
              {error && (
                <div className="alert" style={styles.alertBox} role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={styles.formLabel}>
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{borderColor: '#FFC10730'}}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password" className="form-label" style={styles.formLabel}>
                      Password
                    </label>
                    <a href="#" style={styles.linkText} className="text-decoration-none small">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{borderColor: '#FFC10730'}}
                    onFocus={(e) => e.target.style.boxShadow = styles.inputFocus.boxShadow}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                </div>
                
                <div className="mb-4 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="rememberMe" 
                    style={{borderColor: '#8D6E63'}}
                  />
                  <label className="form-check-label" htmlFor="rememberMe" style={{color: '#8D6E63'}}>
                    Remember me
                  </label>
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
                      Logging in...
                    </>
                  ) : 'Login'}
                </button>
                
                <div className="text-center mt-3">
                  <p style={{color: '#8D6E63'}} className="mb-0">
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => navigate('/buyersignup')}
                      style={styles.linkText}
                    >
                      Sign up here
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

export default Login;