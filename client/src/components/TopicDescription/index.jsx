import React from "react";
import PropTypes from "prop-types";

import { Editor, createEditorState } from "medium-draft";
import { exportToHtml, importFromHtml } from "./helpers";
import { EDITOR_PLACEHOLDER } from "./constants";

import "medium-draft/lib/index.css"; // default medium-draft's styles
import "./medium-draft.scss"; // override some default medium-draft's styles

import styles from "./styles.module.scss";

class TopicDescription extends React.Component {
  constructor(props) {
    super(props);

    const data = props.data;
    const editorState = data ? importFromHtml(data) : createEditorState();
    this.state = { editorState };

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState }, () => {
      if (this.props.onChange) {
        const renderedHTML = exportToHtml(this.state.editorState);
        this.props.onChange(renderedHTML);
      }
    });
  }

  render() {
    const editable = this.props.editable === true || false;
    const editableClass = editable ? styles.desc_editor__editable : "";
    const placeholder = editable ? EDITOR_PLACEHOLDER : "";

    return (
      <div className={`${styles.desc_editor} ${editableClass}`}>
        <Editor
          editorEnabled={editable}
          editorState={this.state.editorState}
          placeholder={placeholder}
          sideButtons={[]}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

TopicDescription.propTypes = {
  data: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TopicDescription;
