"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
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
  LogoContainer,
  MobileMenuButton,
  ResponsiveTableWrapper,
} from "./styles";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {ISubmission} from "@/app/api/assessment/route"
import Logo from "../assets/logo.png";

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<ISubmission[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch("/api/assessment");
      const data = await response.json();
      setLeads(data.submissions);
    };
    fetchLeads();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <Container>
        <MobileMenuButton onClick={toggleSidebar}>
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuButton>

        <LogoContainer $isOpen={sidebarOpen}>
          <Sidebar $isOpen={sidebarOpen}>
            <Image src={Logo} alt="logo" style={{ marginBottom: "30px" }} />

            <SidebarItem $active={true}>Leads</SidebarItem>
            <SidebarItem>Settings</SidebarItem>

            <AdminFooter>
              <AdminIcon>A</AdminIcon>
              <span>Admin</span>
            </AdminFooter>
          </Sidebar>
        </LogoContainer>

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
            <ResponsiveTableWrapper>
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
                      <TableCell data-label="First Name">
                        {lead.firstName}
                      </TableCell>
                      <TableCell data-label="Last Name">
                        {lead.lastName}
                      </TableCell>
                      <TableCell data-label="Email">{lead.email}</TableCell>
                      <TableCell data-label="Status">{lead.status}</TableCell>
                      <TableCell data-label="Country">{lead.country}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </ResponsiveTableWrapper>
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
    </ProtectedRoute>
  );
};

export default AdminDashboard;
