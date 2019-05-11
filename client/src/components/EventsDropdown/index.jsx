import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import List from './List';
import { ReactComponent as ArrowIcon } from '../../icons/Arrow.svg'

const EventsDropdown = ({events}) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div
            onMouseLeave={() => {
                setIsOpened(false);
            }}
        >

            <button onClick={() => setIsOpened(!isOpened)}>My upcoming events({events.length})
                <ArrowIcon className={isOpened ? styles['rotated'] : undefined}/>
            </button>
            {isOpened && <List events={events}/>}
        </div>
    )
};

EventsDropdown.propTypes = {
    events: PropTypes.array
};

export default EventsDropdown;