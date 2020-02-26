import React, { Fragment } from "react";
import PropTypes from "prop-types";

const PageTitle = ({ title, desc, mouseOver, mouseOut, click, withShadowContainer }) => {
    const styleCheck = mouseOver ? "main__header__link" : "main__header";
    return (
        <Fragment>
            <div className="main">
                <h1 className={styleCheck} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={click}>
                    {title}
                </h1>
                <p className="main__description">{desc}</p>
            </div>
            {withShadowContainer ? <div className="shadow_container" /> : null}
        </Fragment>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    mouseOver: PropTypes.bool,
    mouseOut: PropTypes.bool,
    click: PropTypes.func,
    withShadowContainer: PropTypes.bool
};

PageTitle.defaultProps = {
    withShadowContainer: true
};

export default PageTitle;
