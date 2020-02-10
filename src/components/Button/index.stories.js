import React from "react";
import { Button } from "./index";

export default {
  title: "Components|BUTTON/default",
  component: Button,
};

export const Default = () => {
  return <Button type={"primary"} value={"Log in"} />;
};
