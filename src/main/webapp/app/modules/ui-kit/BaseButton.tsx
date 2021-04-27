import styled from "styled-components";

const BaseButton = styled.button`
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:link, &:active, &:hover, &:visited, &:focus {
    text-decoration: none;
    color: inherit;
    outline: none;
  }
  
  &:disabled {
    cursor: auto;
  }
`;

export default BaseButton;