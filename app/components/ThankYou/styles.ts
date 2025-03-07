"use client";

import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export const Icon = styled.div`
  margin-bottom: 2rem;
`;

export const Message = styled.p`
  margin-bottom: 2rem;
  color: #333;
`;

export const BackButton = styled.button`
  padding: 1rem 2rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
