import React from "react";
import PropTypes from "prop-types";

const SectionInfo = ({ infoText }) => {
    return (
        <div className="section__info">
            <span>{infoText}</span>
        </div>
    );
};

SectionInfo.propTypes = {
    infoText: PropTypes.string.isRequired
};

export default SectionInfo;
