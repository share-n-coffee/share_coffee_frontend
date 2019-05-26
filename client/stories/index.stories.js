import React from "react";

import { storiesOf } from "@storybook/react";

import TopicDescription from "../src/TopicDescription";
import TopicEditor from "../src/TopicEditor";
import WeekPicker from "../src/TopicEditor/WeekPicker";
import DatePicker from "../src/TopicEditor/DatePicker";

import * as data from "./data/";

// Topic editor
storiesOf("Topic editor", module)
  .add("default", () => <TopicEditor />)
  .add("regular with data", () => (
    <TopicEditor topicData={data.topicEditor.regular} />
  ))
  .add("single with data", () => (
    <TopicEditor topicData={data.topicEditor.single} />
  ));

// Topic description
const onChangeCallback = renderedHtml => console.log(renderedHtml);
storiesOf("Topic description", module)
  .add("read-only with text", () => (
    <TopicDescription data={data.topicDescription.data} />
  ))
  .add("read-only without text", () => <TopicDescription />)
  .add("editable with text", () => (
    <TopicDescription
      data={data.topicDescription.data}
      editable={true}
      onChange={onChangeCallback}
    />
  ))
  .add("editable without text", () => (
    <TopicDescription editable={true} onChange={onChangeCallback} />
  ));

// Date picker
storiesOf("Date picker", module)
  .add("default", () => {
    const onChange = e => console.log(e);
    const date = new Date();
    return <DatePicker onChange={onChange} />;
  })
  .add("with start date", () => {
    const date = new Date(0);
    return <DatePicker activeStartDate={date} />;
  });

// Date picker
storiesOf("Week picker", module).add("week picker", () => {
  const onChange = e => console.log(e.target.value);
  return <WeekPicker onChange={onChange} />;
});
