import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      pageCount: null,
    };
  }

  componentDidMount() {
    const startingPage = this.props.startingPage ? this.props.startingPage : 1;
    const length = this.props.length;
    const pageSize = this.props.pageSize;
    let pageCount = parseInt(length / pageSize);

    if (length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount,
    });
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
    this.props.change(this.props.pageSize, num);
  }

  createControls() {
    let controls = [];
    const { pageCount, currentPage } = this.state;
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
  pageSize: PropTypes.number.isRequired,
  startingPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  pageSize: 10,
  startingPage: 1,
};

export default Pagination;
