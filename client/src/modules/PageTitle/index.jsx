import React, { Component } from "react";

class PageTitle extends Component {
  render() {
    const { title, desc, mouseOver, mouseOut, click } = this.props;
    let styleCheck = mouseOver ? "main__header__link" : "main__header";
    return (
      <>
        <div className="main">
          <h1 className={styleCheck} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={click}>
            {title}
          </h1>
          <p className="main__description">{desc}</p>
        </div>
        <div className="shadow_container" />
      </>
    );
  }
}

export default PageTitle;
