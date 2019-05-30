import React from "react";
import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  border-top: 1px solid #e6e6e6;
`;

export const Tab = styled.div`
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: ${({ active }) => (active ? "#0064FF;" : "#323232;")};
  text-align: center;
  padding: 30px 60px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "1px solid #0064FF;" : "1px solid #e6e6e6;")};

  &:hover {
    opacity: 0.6;
  }
`;
