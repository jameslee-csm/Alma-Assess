"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  Container,
  Sidebar,
  SidebarItem,
  MainContent,
  Header,
  SearchContainer,
  SearchBar,
  StatusFilter,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Pagination,
  PaginationButton,
  AdminFooter,
  AdminIcon,
  SortIcon,
} from "./styles";
import { FormData } from "@/app/api/assessment/route";
import Logo from "../assets/logo.png";

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [leads, setLeads] = useState<FormData[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch("/api/assessment");
      const data = await response.json();
      setLeads(data.submissions);
    };
    fetchLeads();
  }, []);

  return (
    <Container>
      <Sidebar>
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "20px 0px",
          }}
        >
          <Image src={Logo} alt="logo" />
        </div>

        <SidebarItem>Leads</SidebarItem>
        <SidebarItem>Settings</SidebarItem>

        <AdminFooter>
          <AdminIcon>A</AdminIcon>
          <span>Admin</span>
        </AdminFooter>
      </Sidebar>

      <MainContent>
        <Header>Leads</Header>

        <SearchContainer>
          <SearchBar>
            <FiSearch />
            <input type="text" placeholder="Search" />
          </SearchBar>

          <StatusFilter>
            <select>
              <option>Status</option>
              <option>Pending</option>
              <option>Reached Out</option>
            </select>
            <FiChevronDown />
          </StatusFilter>
        </SearchContainer>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>
                  First Name <SortIcon />
                </TableHeader>
                <TableHeader>
                  Last Name <SortIcon />
                </TableHeader>
                <TableHeader>
                  Email <SortIcon />
                </TableHeader>
                <TableHeader>
                  Status <SortIcon />
                </TableHeader>
                <TableHeader>
                  Country <SortIcon />
                </TableHeader>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell>{lead.firstName}</TableCell>
                  <TableCell>{lead.lastName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.country}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <Pagination>
          <PaginationButton>
            <FiChevronLeft size={16} />
          </PaginationButton>
          <PaginationButton $isActivate>1</PaginationButton>
          <PaginationButton>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton>
            <FiChevronRight size={16} />
          </PaginationButton>
        </Pagination>
      </MainContent>
    </Container>
  );
};

export default AdminDashboard;
