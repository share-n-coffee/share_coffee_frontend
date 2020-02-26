import React from "react";

function BanMsg() {
    const msg = "Sorry, you banned(((";
    return (
        <div className="form__error-wrapper js-form__err-animation">
            <p className="form__ban">{msg}</p>
        </div>
    );
}

export default BanMsg;
