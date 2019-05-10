import React, { Component } from 'react'
import './Header.css'
import logo from "./logo-coffee.png";

class Header extends Component {
  render() {
    return (
        <div className='header'>
            <img src={logo} className='logo-header' alt='coffee'/>
      </div>
    );
  }
}

export default Header;
