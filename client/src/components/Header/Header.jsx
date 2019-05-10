import React, {Component} from 'react'
import logo from "./logo-coffee.png";
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='wrapper header'>
        <img src={logo} className='logo-header' alt='coffee'/>
      </div>
    );
  }
}

export default Header;
