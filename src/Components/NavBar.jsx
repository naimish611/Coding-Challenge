import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
       
        <div className="nav-logo">
          <Link to="/" className="logo-link">
           
            <span className="logo-text">Book Finder</span>
          </Link>
        </div>

     
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

       
        <nav className="nav-links-desktop">
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>

      
      {menuOpen && (
        <div className="nav-modal">
          <div className="nav-modal-content">
            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <ul>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Search
                </Link>
              </li>
              <li>
                <Link to="/favorites" onClick={() => setMenuOpen(false)}>
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
