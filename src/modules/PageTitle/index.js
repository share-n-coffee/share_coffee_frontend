import React, { Component } from "react";

class PageTitle extends Component {
  render() {
    const { title, desc, mouseOver, mouseOut, click, withShadowContainer } = this.props;
    let styleCheck = mouseOver ? "main__header__link" : "main__header";
    return (
      <>
        <div className="main">
          <h1 className={styleCheck} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={click}>
            {title}
          </h1>
          <p className="main__description">{desc}</p>
        </div>
        {withShadowContainer ? <div className="shadow_container" /> : null}
      </>
    );
  }
}

PageTitle.defaultProps = {
  withShadowContainer: true,
};

export default PageTitle;
