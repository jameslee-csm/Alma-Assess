"use client";

import styled, { css } from "styled-components";
import { FiChevronDown } from "react-icons/fi";

export const LogoContainer = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  padding: 15px;
  background: linear-gradient(
    135deg,
    #fffae0 0%,
    #ffffff 50%,
    rgba(255, 252, 222, 0) 100%
  );
  border-radius: 0 0 30px 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div<{ $isOpen?: boolean }>`
  width: 250px;
  background-color: #ffffff;
  padding: 2rem 1.5rem;
  background: transparent;
  border-right: 1px solid #e2e8f0;
  height: 100%;

  @media (max-width: 768px) {
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  }
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

export const SidebarItem = styled.div<{ $active?: boolean }>`
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  padding: 10px 0px;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: white;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin-top: 50px;
  }
`;

export const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.9rem;
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
  }
`;

export const StatusFilter = styled.div`
  position: relative;

  select {
    appearance: none;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.9rem;
    background-color: white;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const TableContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 576px) {
    display: block;

    thead {
      display: none;
    }

    tbody {
      display: block;
    }
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 500;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  cursor: pointer;
`;

export const SortIcon = styled(FiChevronDown)`
  margin-left: 0.25rem;
  opacity: 0.5;
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }

  @media (max-width: 576px) {
    display: block;
    padding: 10px 0;
    border-bottom: 2px solid #e2e8f0;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: #2d3748;

  @media (max-width: 576px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #f0f0f0;

    &:before {
      content: attr(data-label);
      font-weight: 600;
      width: 40%;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

interface PaginationButtonProps {
  $isActivate?: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.$isActivate ? "#2d3748" : "#e2e8f0")};
  border-radius: 0.25rem;
  background-color: ${(props) => (props.$isActivate ? "#2d3748" : "white")};
  color: ${(props) => (props.$isActivate ? "white" : "#2d3748")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isActivate ? "#2d3748" : "#f7fafc")};
  }
`;

export const AdminIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #f1f1f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const AdminFooter = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2rem;
  left: 2rem;
`;

export const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 4px;
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 101;
  background: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
