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
            className={styles.list_container}
        >

            <button className={styles.header} onClick={() => setIsOpened(!isOpened)}>My upcoming events ({events.length})
                <ArrowIcon className={`${styles.arrow} ${isOpened ? styles['rotated'] : undefined}`}/>
            </button>
            {isOpened && <List events={events}/>}
        </div>
    )
};

EventsDropdown.propTypes = {
    events: PropTypes.array
};

export default EventsDropdown;