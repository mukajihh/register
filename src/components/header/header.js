import React, { Component } from 'react';
import '../../assets/styles/header.scss'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-content">
          <div className="logo">BANKY</div>
          <ul className="action-menu">
            <li className="menu-itens">
              DUVIDAS?
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
