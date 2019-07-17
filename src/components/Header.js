import React from 'react';
import logo from '../logo.svg';

function Header() {
  return <header className="app-header">
    <a href="/">
      <img src={logo} className="app-logo" alt="logo" />
      <span className="app-name">Forms</span>
    </a>
  </header>;
}

export default Header;
