import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // import CSS 
function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
  <div className="nav-left">
    <h2>🍲 PK's Recipe Platform</h2>
    <div
      className={`menu-toggle ${menuActive ? "active" : ""}`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <ul className={menuActive ? "active" : ""}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/category/Breakfast">Breakfast</Link></li>
    <li><Link to="/category/Lunch">Lunch</Link></li>
    <li><Link to="/category/Dinner">Dinner</Link></li>
    <li><Link to="/category/Dessert">Dessert</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/add">Add Recipe</Link></li>
  </ul>
</nav>

  );
}

export default Navbar;
