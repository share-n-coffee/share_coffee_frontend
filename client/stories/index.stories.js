import React from "react";

import { storiesOf } from "@storybook/react";

import TopicDescription from "../src/TopicDescription";

// Topic description
const onChangeCallback = renderedHtml => console.log(renderedHtml);
const data = `<h3 class="md-block-header-three">Hello! This is header!</h3><p class="md-block-unstyled">This is a <strong class="md-inline-bold">bold</strong> text.</p><p class="md-block-unstyled">This is a <span class="md-inline-highlight">highlighted</span> text.</p><p class="md-block-unstyled">This is a <u class="md-inline-underline">underline</u> text and <a class="md-inline-link" href="http://wg.net" target="_blank" rel="noopener noreferrer">link</a>.</p>`;
storiesOf("Topic description", module)
  .add("read-only with text", () => <TopicDescription data={data} />)
  .add("read-only without text", () => <TopicDescription />)
  .add("editable with text", () => (
    <TopicDescription data={data} editable={true} onChange={onChangeCallback} />
  ))
  .add("editable without text", () => (
    <TopicDescription editable={true} onChange={onChangeCallback} />
  ));
