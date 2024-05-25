import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.styles.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const title = "FESTFY ADMIN";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='Header'>
      <div className='title'>{title}</div>
      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="white" d="M3 18h18v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/>
        </svg>
        )}
      </button>
      <div className={`nav-container ${menuOpen ? 'open' : ''}`}>
        
        <NavLink className='nav' to='/adm' onClick={closeMenu}>Adm</NavLink>
        <NavLink className='nav' to='/aprovar' onClick={closeMenu}>Aprovar</NavLink>
        <NavLink className='nav' to='/aprovados' onClick={closeMenu}>Pagos</NavLink>
      </div>
    </div>
  );
}

export default Header;
