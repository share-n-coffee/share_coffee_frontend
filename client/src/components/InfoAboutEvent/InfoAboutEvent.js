import React, {Component} from 'react';

import './InfoAboutEvent.css';

export default class InfoAboutEvent extends Component {
  render() {
    const {adress, eventFrequency} = this.props;        
    
    return (
      <div className="infoAboutEvent">
        <div><span>Place:</span><span>{adress}</span></div>
        <div><span>Time:</span><span>{eventFrequency}</span></div>
      </div>
    )
  }
}

