import React from "react";
import StoryRouter from "storybook-react-router";

import { storiesOf } from "@storybook/react";

import TopicDescription from "../src/components/TopicDescription";
import TopicEditor from "../src/components/TopicEditor";
import WeekPicker from "../src/components/TopicEditor/WeekPicker";
import DatePicker from "../src/components/TopicEditor/DatePicker";
import Button from "../src/common/Button";
import SpinButton from "../src/common/SpinButton";
import TopicCreate from "../src/pages/HomeAdmin/Topics/topicCreate";

import "../src/assets/styles/index.scss";
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

// Buttons
storiesOf("Buttons", module)
  .add("Subscribe", () => <Button type="Subscribe" text="Subscribe" />)
  .add("Unsubscribe", () => <Button type="Unsubscribe" text="Unsubscribe" />)
  .add("primary", () => <Button type="primary" text="primary" />)
  .add("logout", () => <Button type="logout" text="logout" />)
  .add("SpinButton Subscribe", () => <SpinButton type="Subscribe" isLoading  />)
  .add("SpinButton Unsubscribe", () => <SpinButton type="Subscribe" text="Save" />);

// Topic creating page
storiesOf("Topic creating page", module)
  .addDecorator(StoryRouter())
  .add("topic create page", () => {
    return <TopicCreate />;
  });
