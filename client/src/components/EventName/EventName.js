import React, {Component} from 'react';

import './EventName.css';

export default class EventName extends Component {
  render() {
    const { eventName } = this.props;        
    
    return (
      <div className="eventName">{eventName}</div>
    )
  }
}

