import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <div className="wrapper section">
        <button className="section__btn">{this.props.text}</button>
      </div>
    )
  }
}
export default Button;