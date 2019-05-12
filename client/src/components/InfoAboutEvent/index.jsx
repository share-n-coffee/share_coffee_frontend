import React, {Component} from 'react';

import styles from './styles.module.scss';


class InfoAboutEvent extends Component {
    render() {
        const {adress, eventFrequency} = this.props;
        
        return (
            <div className={styles.infoAboutEvent}>
                <div><span>Place:</span><span>{adress}</span></div>
                <div><span>Time:</span><span>{eventFrequency}</span></div>
            </div>
        )
    }
}

export default InfoAboutEvent;
