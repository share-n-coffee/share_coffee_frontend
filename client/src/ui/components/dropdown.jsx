import styled from "styled-components";

export const Dropdown = styled.div`
  font-family: "Roboto Regular", "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: ${({ length }) => (length > 0 ? "#0064FF" : "#C8C8C8")} !important;
  cursor: ${({ length }) => (length > 0 ? "pointer" : "default")};
  transition: 0.5s all ease-out;
  position: relative;
  &::after {
    content: "↓";
    content: ${({ length }) => length <= 0 && "none"};
    content: ${({ open }) => open && "'↑'"};
    position: absolute;
    margin-left: 10px;
  }
  &:hover {
    color: ${({ length }) => (length > 0 ? "#288eff" : "#C8C8C8")};
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 33px;
  z-index: 3;
  background: #f0f0f0;
  min-width: 140px;
  padding: 10px;
  display: ${({ open }) => (open ? "block" : "none")};
  transition: 0.5s all ease-out;
  border: 1px solid #dfdfdf;

  &::after {
    position: absolute;
    top: -7px;
    content: "";
    width: 15px;
    height: 15px;
    background-color: #f0f0f0;
    z-index: 0;
    transform: rotate(45deg);
    pointer-events: none;
    border-left: 1px solid #dfdfdf;
    border-top: 1px solid #dfdfdf;
  }
`;

export const DropdownItem = styled.div`
  font-family: "Roboto Regular", "Roboto", sans-serif;
  color: black;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  transition: 0.5s all ease-out;
`;
