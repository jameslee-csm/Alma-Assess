import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #fffae0;
  padding: 2rem 1.5rem;
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

export const SidebarItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: white;
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
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: #2d3748;
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
