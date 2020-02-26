import React from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../../../components/ErrorMessage";

const Topics = ({ logs, error }) => {
    return (
        <div>
            <p>Bans</p>
            {/* eslint-disable-next-line no-unused-vars */}
            {logs && logs.bans && logs.bans.length > 0 && logs.bans.map((ban, key) => <p key={key}>users ban info</p>)}
            {error ? <ErrorMessage error={error} /> : null}
        </div>
    );
};

Topics.propTypes = {
    logs: PropTypes.shape({
        bans: PropTypes.array
    }),
    error: PropTypes.string
};

export default Topics;
