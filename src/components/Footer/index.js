import React from "react";
import { FOOTER_TITLE } from "../../constants";

const Footer = () => {
    return (
        <div className="footer-wrapper footer">
            <span className="footer__title">{FOOTER_TITLE}</span>
        </div>
    );
};

export default Footer;
