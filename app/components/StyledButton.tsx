"use client";

import styled from "styled-components";

const StyledButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default StyledButton;
