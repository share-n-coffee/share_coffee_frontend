import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = () => {
  return (
    <UILoading>
      <Dot />
      <Dot />
      <Dot />
    </UILoading>
  );
};

export const UILoading = styled.div`
  color: #0064ff;
  text-align: center;
`;

export const Dot = styled.div`
  animation: dots 1.5s infinite ease-in-out;
  background-color: #0064ff;
  border-radius: 10px;
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 0 4px;
  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes dots {
    0% {
      opacity: 0.4;
      transform: scale(1.1, 1.1);
    }

    50% {
      opacity: 0.4;
      transform: scale(1, 1);
    }

    100% {
      opacity: 1;
      transform: scale(1.2, 1.2);
    }
  }
`;
