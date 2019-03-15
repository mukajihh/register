import React, { Component } from 'react';
import '../../assets/styles/header.scss';
import logo from '../../assets/images/logobanky.svg';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-content">
          <img src={logo} className="logo"></img>
          <ul className="action-menu">
            <li className="menu-itens">
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
