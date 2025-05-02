import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// SVG Icons as components
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

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const UserIcon = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Custom SVG Logo
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

// Styled Components
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

const SidebarFooter = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-x: hidden;
`;

const TopNavbar = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    display: flex;
  }
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 9999px;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f7fbfc;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  background-color: #769fcd;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #769fcd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Username = styled.span`
  font-weight: 500;
`;

const DashboardContent = styled.div`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: 1.5rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 0.25rem 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WelcomeText = styled.p`
  color: #6b7280;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #769fcd;
`;

const StatCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatCardContent = styled.div``;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6e6f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #769fcd;
`;

const SupplyStatusCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const SupplyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SupplyItem = styled.div`
  background-color: #d6e6f2;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const SupplyLabel = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
`;

const SupplyValue = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const SupplyNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const SupplyUnit = styled.span`
  margin-left: 0.25rem;
  color: #6b7280;
`;

const OrdersCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ViewAllButton = styled.button`
  font-size: 0.875rem;
  color: #3b82f6;
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #d6e6f2;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  border-top-left-radius: ${(props) => (props.first ? "0.5rem" : "0")};
  border-top-right-radius: ${(props) => (props.last ? "0.5rem" : "0")};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  font-size: 0.875rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#D6E6F2";
      case "delivered":
        return "#F7FBFC";
      case "success":
        return "#dcfce7";
      case "warning":
        return "#fef3c7";
      default:
        return "#D6E6F2";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#769FCD";
      case "delivered":
        return "#5a87b2";
      case "success":
        return "#166534";
      case "warning":
        return "#92400e";
      default:
        return "#769FCD";
    }
  }};
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: ${(props) => (props.show ? "block" : "none")};

  @media (min-width: 768px) {
    display: none;
  }
`;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const totalOrders = orders.length;
  const ordersToday = orders.filter((order) => {
    const orderDate = new Date(order.date).toISOString().split("T")[0];
    return orderDate === getTodayDateString();
  }).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:2500/api/gaushalas/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data));

    axios
      .get("http://localhost:2500/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, []);
  const handleApprove = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:2500/api/orders/${orderId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh orders
      const res = await axios.get("http://localhost:2500/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert("Failed to approve order");
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:2500/api/gaushalas/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (!profile) {
    return <div style={{ padding: "2rem" }}>Loading dashboard...</div>;
  }

  return (
    <AppContainer>
      {/* Mobile Header */}
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
            <NavItem href="/dashboard" active={true}>
              <HomeIcon /> Dashboard
            </NavItem>
            <NavItem href="/total-orders">
              <CartIcon /> Today's Orders
            </NavItem>
            <NavItem href="/order-history">
              <ListIcon /> Order History
            </NavItem>
            <NavItem href="/milk-history">
              <ListIcon /> Milk History
            </NavItem>
            <NavItem href="#">
              <TrendingIcon /> Analytics
            </NavItem>
            <NavItem href="#">
              <SettingsIcon /> Settings
            </NavItem>
            <NavItem href="/login" style={{ marginTop: "auto" }}>
              <LogoutIcon /> Logout
            </NavItem>
          </NavMenu>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Top Navbar */}
        <TopNavbar>
          <PageTitle>Dashboard</PageTitle>
          <NavActions>
            <NotificationButton>
              <BellIcon />
              <NotificationBadge>3</NotificationBadge>
            </NotificationButton>
            <UserProfile>
              <UserAvatar>
                <UserIcon />
              </UserAvatar>
              <Username>Admin</Username>
            </UserProfile>
          </NavActions>
        </TopNavbar>

        {/* Dashboard Content */}
        <DashboardContent>
          <WelcomeSection>
            <WelcomeTitle>Welcome, Gaushala Admin!</WelcomeTitle>
            <WelcomeText>
              Here's what's happening with your milk delivery business today.
            </WelcomeText>
          </WelcomeSection>

          {/* Stat Cards */}
          <StatsGrid>
            <StatCard>
              <StatCardHeader>
                <StatCardContent>
                  <StatLabel>Total Orders</StatLabel>
                  <StatValue>{totalOrders}</StatValue>
                  </StatCardContent>
                <StatIcon>
                  <CartIcon />
                </StatIcon>
              </StatCardHeader>
            </StatCard>

            <StatCard>
              <StatCardHeader>
                <StatCardContent>
                  <StatLabel>Orders Today</StatLabel>
                  <StatValue>{ordersToday}</StatValue>
                </StatCardContent>
                <StatIcon>
                  <CartIcon />
                </StatIcon>
              </StatCardHeader>
            </StatCard>

            <StatCard>
              <StatCardHeader>
                <StatCardContent>
                  <StatLabel>Pending Orders</StatLabel>
                  <StatValue>{pendingOrders}</StatValue>
                </StatCardContent>
                <StatIcon>
                  <ListIcon />
                </StatIcon>
              </StatCardHeader>
            </StatCard>

            <StatCard>
              <StatCardHeader>
                <StatCardContent>
                  <StatLabel>Delivered Orders</StatLabel>
                  <StatValue>{deliveredOrders}</StatValue>
                </StatCardContent>
                <StatIcon>
                  <ListIcon />
                </StatIcon>
              </StatCardHeader>
            </StatCard>
          </StatsGrid>

          {/* Milk Supply Status */}
          <SupplyStatusCard>
            <CardTitle>Today's Milk Supply Status</CardTitle>
            <SupplyGrid>
              <SupplyItem>
                <SupplyLabel>Available Fresh Milk</SupplyLabel>
                <SupplyValue>
                  <SupplyNumber>85</SupplyNumber>
                  <SupplyUnit>Litres</SupplyUnit>
                </SupplyValue>
              </SupplyItem>
              <SupplyItem>
                <SupplyLabel>Milk Sold Today</SupplyLabel>
                <SupplyValue>
                  <SupplyNumber>35</SupplyNumber>
                  <SupplyUnit>Litres</SupplyUnit>
                </SupplyValue>
              </SupplyItem>
              <SupplyItem>
                <SupplyLabel>Cows Milked Today</SupplyLabel>
                <SupplyValue>
                  <SupplyNumber>12</SupplyNumber>
                  <SupplyUnit>Cows</SupplyUnit>
                </SupplyValue>
              </SupplyItem>
            </SupplyGrid>
          </SupplyStatusCard>

          {/* Recent Orders Table */}
          <OrdersCard>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <ViewAllButton>View All</ViewAllButton>
            </CardHeader>
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell first>Order ID</TableHeaderCell>
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell>Quantity</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell last>Status</TableHeaderCell>
                  </tr>
                </TableHead>
                <tbody>
                  <TableRow>
                    <TableCell>#ORD001</TableCell>
                    <TableCell>Ramesh Kumar</TableCell>
                    <TableCell>2 Litres</TableCell>
                    <TableCell>2 May, 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="pending">Pending</StatusBadge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#ORD002</TableCell>
                    <TableCell>Priya Sharma</TableCell>
                    <TableCell>1 Litre</TableCell>
                    <TableCell>2 May, 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="delivered">Delivered</StatusBadge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#ORD003</TableCell>
                    <TableCell>Anil Verma</TableCell>
                    <TableCell>3 Litres</TableCell>
                    <TableCell>1 May, 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="success">Delivered</StatusBadge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#ORD004</TableCell>
                    <TableCell>Neha Mehta</TableCell>
                    <TableCell>1.5 Litres</TableCell>
                    <TableCell>1 May, 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="warning">Pending</StatusBadge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#ORD005</TableCell>
                    <TableCell>Suresh Patel</TableCell>
                    <TableCell>2.5 Litres</TableCell>
                    <TableCell>1 May, 2025</TableCell>
                    <TableCell>
                      <StatusBadge status="success">Delivered</StatusBadge>
                    </TableCell>
                  </TableRow>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        #{order._id.slice(-6).toUpperCase()}
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.quantity} Litres</TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status}>
                          {order.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        {order.status === "pending" && (
                          <button
                            style={{
                              padding: "6px 12px",
                              background: "#769FCD",
                              color: "white",
                              borderRadius: "6px",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleApprove(order._id)}
                          >
                            Approve
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </OrdersCard>

          {/* Overlay to close sidebar on mobile */}
          <Overlay show={sidebarOpen} onClick={toggleSidebar} />
        </DashboardContent>
      </MainContent>
    </AppContainer>
  );
};

export default Dashboard;
