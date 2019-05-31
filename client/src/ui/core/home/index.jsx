import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  border-top: 1px solid #e6e6e6;
  margin-bottom: 20px;
`;

export const Tab = styled.div`
  flex: 1;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #0064ff;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "1px solid #0064FF;" : "1px solid #e6e6e6;")};

  &:hover {
    background-color: #f5f5f5;
    border-bottom: 1px solid #0064ff;
  }
`;
