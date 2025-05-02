import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CowLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 100 100"
    fill="white"
  >
    <path
      d="M79.2,34.3c-2.3-8.7-10-15.1-19.2-15.1c-6.1,0-11.7,2.8-15.3,7.3c-3.7-4.5-9.2-7.3-15.3-7.3c-9.5,0-17.3,6.7-19.3,15.7
      C4.2,36.6,0,41.6,0,47.8c0,7.3,5.9,13.2,13.2,13.2c0.5,0,1.1,0,1.6-0.1c3.3,7,10.3,11.9,18.5,11.9c6.1,0,11.5-2.7,15.3-6.9
      c3.7,4.2,9.2,6.9,15.3,6.9c8.2,0,15.3-4.9,18.5-12c0.5,0.1,1,0.1,1.6,0.1c7.3,0,13.2-5.9,13.2-13.2C97.1,41.1,92.5,35.9,86.3,34.3z"
    />
  </svg>
);

const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const TrendingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7fbfc;
  font-family: "Poppins", sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;

  @media (min-width: 768px) {
    margin-left: 16rem;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #5788c1;
  color: white;

  @media (min-width: 768px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.375rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #5a87b2;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 0.75rem;
  background-color: #d6e6f2;
  color: #2c3e50;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "delivered":
        return "#d1fae5";
      case "pending":
        return "#fee2e2";
      case "processing":
        return "#fef3c7";
      default:
        return "#e5e7eb";
    }
  }};
  color: ${(props) => {
    switch (props.status?.toLowerCase()) {
      case "delivered":
        return "#065f46";
      case "pending":
        return "#991b1b";
      case "processing":
        return "#92400e";
      default:
        return "#1f2937";
    }
  }};
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 16rem;
  height: 100%;
  background-color: #5788c1;
  color: white;
  z-index: 30;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (min-width: 768px) {
    position: fixed; /* Keep it fixed on desktop */
    transform: translateX(0);
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

const SidebarLogo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: white;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.active ? "#3b6ea5" : "transparent")};
  margin-bottom: 0.25rem;

  &:hover {
    background-color: #3b6ea5;
  }

  svg {
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
  }
`;

const Overlay = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:2500/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchDate = filterDate 
      ? new Date(order.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString() 
      : true;
    
    const matchStatus = filterStatus 
      ? order.status.toLowerCase() === filterStatus.toLowerCase() 
      : true;
      
    const matchCustomer = filterCustomer
      ? order.customerName.toLowerCase().includes(filterCustomer.toLowerCase())
      : true;
      
    return matchDate && matchStatus && matchCustomer;
  });

  return (
    <AppContainer>
      <MobileHeader>
        <LogoContainer>
          <CowLogo />
          <LogoText>गौशाला दूधवाला</LogoText>
        </LogoContainer>
        <MenuButton onClick={toggleSidebar}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
      </MobileHeader>
      
      {/* Sidebar */}
      <Sidebar open={sidebarOpen}>
        <SidebarContent>
          <SidebarHeader>
            <CowLogo />
            <SidebarLogo>गौशाला दूधवाला</SidebarLogo>
          </SidebarHeader>

          <NavMenu>
            <NavItem href="/dashboard">
              <HomeIcon /> Dashboard
            </NavItem>
            <NavItem href="/total-orders">
              <CartIcon /> Today's Orders
            </NavItem>
            <NavItem href="/order-history" active={true}>
              <ListIcon /> Order History
            </NavItem>
            <NavItem href="/milk-history">
              <ListIcon /> Milk History
            </NavItem>
            <NavItem href="#">
              <TrendingIcon /> Analytics
            </NavItem>
            <NavItem href="/settings">
              <SettingsIcon /> Settings
            </NavItem>Tota
            <NavItem href="/login" style={{ marginTop: "auto" }}>
              <LogoutIcon /> Logout
            </NavItem>
          </NavMenu>
        </SidebarContent>
      </Sidebar>
      
      <MainContent>
        <PageTitle>Order History</PageTitle>
        
        <FilterContainer>
          <FilterGroup>
            <FilterLabel>Date</FilterLabel>
            <FilterInput
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Customer</FilterLabel>
            <FilterInput
              type="text"
              placeholder="Search customer"
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
            />
          </FilterGroup>
        </FilterContainer>
        
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Quantity</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <Td>{new Date(order.date).toLocaleDateString()}</Td>
                  <Td>{order.customerName}</Td>
                  <Td>{order.quantity}L</Td>
                  <Td>
                    <StatusBadge status={order.status}>
                      {order.status}
                    </StatusBadge>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="4">
                  <NoDataMessage>
                    No orders found matching your filters
                  </NoDataMessage>
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </MainContent>
      
      <Overlay show={sidebarOpen} onClick={toggleSidebar} />
    </AppContainer>
  );
};

export default OrderHistory;