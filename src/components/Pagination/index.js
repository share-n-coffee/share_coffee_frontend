import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    const startingPage = this.props.startingPage ? this.props.startingPage : 1;
    this.setState({
      currentPage: startingPage,
    });
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
    this.props.change(num);
  }

  createControls() {
    let controls = [];
    const { currentPage } = this.state;
    const { pageCount } = this.props;
    for (let i = 1; i <= pageCount; i++) {
      controls.push(
        <div
          key={i}
          className={`pagin-btn ${i === currentPage ? `pagin-active` : ""}`}
          onClick={() => this.setCurrentPage(i)}
        >
          {i}
        </div>,
      );
    }
    return controls;
  }

  render() {
    return <div className="pagination">{this.createControls()}</div>;
  }
}

Pagination.propTypes = {
  startingPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  startingPage: 1,
};

export default Pagination;
