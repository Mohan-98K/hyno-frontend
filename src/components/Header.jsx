import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Hyno Pharmacy</h1>
          </Link>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medicines..."
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="header-right">
          <Link to="/user" className="header-link">
            <FaUser />
            <span>Account</span>
          </Link>
          <Link to="/cart" className="header-link">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
