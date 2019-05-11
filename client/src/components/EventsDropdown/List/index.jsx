import React from 'react';
import PropTypes from 'prop-types';

const List = ({events}) => {
    return (
        <ul>
            {events.map(({name, place, time}) =>
                <li key = {name}>
                    <p>{name}</p>
                    <p>{place}</p>
                    <p>{time}</p>
                </li>
            )}
        </ul>
    )
};

List.propTypes = {
    events: PropTypes.array
};

List.defaultProps = {
    events: []
};

export default List;