import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export default class TelegramLoginButton extends Component {
  componentDidMount() {
    const {
      botName,
      buttonSize,
      cornerRadius,
      requestAccess,
      usePic,
      dataOnauth,
    } = this.props;
    window.TelegramLoginWidget = {
      dataOnauth: user => {
        dataOnauth(user);
      },
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?5";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius);
    }
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-userpic", usePic);
    script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
    script.async = true;
    this.instance.appendChild(script);
  }

  render() {
    return (
      <div
        className={styles.telegram__iframe__block}
        ref={component => {
          this.instance = component;
        }}
      />
    );
  }
}

TelegramLoginButton.propTypes = {
  botName: PropTypes.string.isRequired,
  dataOnauth: PropTypes.func,
  buttonSize: PropTypes.oneOf(["large", "medium", "small"]),
  cornerRadius: PropTypes.number,
  requestAccess: PropTypes.string,
  usePic: PropTypes.bool,
};
