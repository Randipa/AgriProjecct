import React from 'react';
import { Link } from 'react-router-dom';

function BuyerFooter() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto position-relative">
      {/* Wave Separator */}
      <div className="position-absolute top-0 start-0 w-100 overflow-hidden" style={{ height: "40px", transform: "translateY(-100%)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="position-absolute w-100 h-100">
          <path fill="#212529" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container">
        {/* Newsletter Subscription */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card bg-success bg-opacity-25 border-0 rounded-3 p-4">
              <div className="card-body text-center">
                <h4 className="text-success fw-bold mb-3">Subscribe to Our Newsletter</h4>
                <p className="text-light mb-3">Get updates on market prices, farming tips, and exclusive offers</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Your email address" aria-label="Email" />
                  <button className="btn btn-success px-4" type="button">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* About Column */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h5 className="text-success fw-bold mb-3 border-start border-success border-4 ps-3">About Us</h5>
              <p className="text-muted">
                Agri-Support connects farmers and buyers through innovative technology for sustainable agriculture and efficient market integration across Sri Lanka.
              </p>
              <div className="d-flex align-items-center mt-4">
                <div className="me-3">
                  <i className="bi bi-geo-alt-fill text-success fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-light">Visit Our Office</h6>
                  <p className="text-muted mb-0 small">123 Agriculture Road, Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-success fw-bold mb-3 border-start border-success border-4 ps-3">Navigate</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/store" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-shop me-2"></i>
                  <span>Marketplace</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-orders" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-list-check me-2"></i>
                  <span>My Orders</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-speedometer2 me-2"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-question-circle me-2"></i>
                  <span>Help Center</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-success fw-bold mb-3 border-start border-success border-4 ps-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/market-insights" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-graph-up me-2"></i>
                  <span>Market Insights</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/logistics" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-truck me-2"></i>
                  <span>Logistics</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/quality-check" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-patch-check me-2"></i>
                  <span>Quality Assurance</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/bulk-orders" className="text-muted text-decoration-none d-flex align-items-center hover-success">
                  <i className="bi bi-box-seam me-2"></i>
                  <span>Bulk Orders</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-success fw-bold mb-3 border-start border-success border-4 ps-3">Contact Us</h5>
            <div className="d-flex mb-3">
              <div className="bg-success bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                <i className="bi bi-envelope text-success"></i>
              </div>
              <div>
                <h6 className="text-light mb-1">Email Us</h6>
                <a href="mailto:support@agri-support.com" className="text-muted text-decoration-none">support@agri-support.com</a>
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="bg-success bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                <i className="bi bi-telephone text-success"></i>
              </div>
              <div>
                <h6 className="text-light mb-1">Call Us</h6>
                <a href="tel:+94112345678" className="text-muted text-decoration-none">+94 11 234 5678</a>
              </div>
            </div>
            <div className="d-flex">
              <div className="bg-success bg-opacity-25 rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                <i className="bi bi-whatsapp text-success"></i>
              </div>
              <div>
                <h6 className="text-light mb-1">WhatsApp</h6>
                <a href="https://wa.me/94112345678" className="text-muted text-decoration-none">+94 11 234 5678</a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Bottom Bar */}
        <hr className="my-4 bg-secondary" />

        <div className="row align-items-center">
          <div className="col-lg-4 text-center text-lg-start mb-3 mb-lg-0">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Agri-Support. All rights reserved.
            </p>
          </div>
          <div className="col-lg-4 text-center mb-3 mb-lg-0">
            <div className="d-flex justify-content-center">
              <a href="#" className="me-3 btn btn-outline-secondary btn-sm rounded-circle" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="me-3 btn btn-outline-secondary btn-sm rounded-circle" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="me-3 btn btn-outline-secondary btn-sm rounded-circle" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="me-3 btn btn-outline-secondary btn-sm rounded-circle" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-flex justify-content-center justify-content-lg-end">
              <Link to="/privacy-policy" className="text-muted small me-3">Privacy Policy</Link>
              <Link to="/terms" className="text-muted small me-3">Terms of Service</Link>
              <Link to="/sitemap" className="text-muted small">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default BuyerFooter;