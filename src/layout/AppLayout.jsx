
import { AppBar, Drawer, List, Toolbar } from "@mui/material";

import {
    Menu as MenuIcon,
    Home as HomeIcon,
    FitnessCenter as FitnessCenterIcon,
    LibraryBooks as LibraryBooksIcon,
} from "@mui/icons-material";

import {
    NavLink,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useState } from "react";
import { AppLayoutContainer, BoxPrimary, DrawerContent, LayoutListItemButton, LayoutListItemIcon, DrawerToolbar, Typography, LayoutListItemText, IconButtonStyled, ViewTitle, MainBox } from "./styles";

// import Logo from "../assets/react.svg";

// -----------------------------------------------------------------------------
// Colors
// -----------------------------------------------------------------------------

const COLORS = {
    background: "#0B1E2E",
    surface: "#13324A",
    primary: "#FF6B4A",
    secondary: "#3E5A72",
    text: "#EAF2F5",
};

const drawerWidth = 240;

// -----------------------------------------------------------------------------
// Navigation items
// -----------------------------------------------------------------------------

const navigationItems = [
    {
        label: "Home",
        path: "/home",
        icon: <HomeIcon />,
    },
    {
        label: "Workouts",
        path: "/workouts",
        icon: <FitnessCenterIcon />,
    },
    {
        label: "Exercises",
        path: "/exercises",
        icon: <LibraryBooksIcon />,
    },
];

// -----------------------------------------------------------------------------
// App Layout
// -----------------------------------------------------------------------------

function AppLayout() {
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(null);

    const currentItem = navigationItems.find((item) => item.path === location.pathname);
    const viewLabel = currentItem ? currentItem.label : "Home";

    const handleDrawerToggle = () => {
        setIsDrawerOpen((previous) => !previous);
    };

    const drawerContent = (
        <DrawerContent>
            <DrawerToolbar>
                {/* <img src={Logo} alt="Logo" width={32} height={32} style={{ marginRight: 8 }} /> */}     
                <Typography variant="h6">
                    Gym
                    <BoxPrimary component="span">Bro</BoxPrimary>
                </Typography>
            </DrawerToolbar>

            <List sx={{ px: 1.5 }}>
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path} 
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        {({ isActive }) => (
                            <LayoutListItemButton active={String(isActive)} open={String(isDrawerOpen)}>
                                <LayoutListItemIcon active={String(isActive)} open={String(isDrawerOpen)}>
                                    {item.icon}
                                </LayoutListItemIcon>

                                <LayoutListItemText
                                    primary={item.label}
                                    active={String(isActive)}
                                    open={String(isDrawerOpen)}
                                    // sx={{
                                    //     fontWeight: isActive ? 600 : 400,
                                    // }}
                                    slotProps={{
                                        primary: {
                                            sx: {
                                                fontWeight: isActive
                                                    ? 600
                                                    : 400,
                                            },
                                        },
                                    }}
                                />
                            </LayoutListItemButton>
                        )}
                    </NavLink>
                ))}
            </List>
        </DrawerContent>
    );

    return (
        <AppLayoutContainer> 
            <AppBar position="fixed"> 
                {/* Mobile hamburger */}
                <Toolbar sx={{ backgroundColor: "var(--bg)" }}>
                    <IconButtonStyled
                        onClick={handleDrawerToggle}
                        // sx={{
                        //     zIndex: (theme) =>
                        //         theme.zIndex.drawer + 1
                        // }}
                    >
                        <MenuIcon />
                    </IconButtonStyled>
                    <ViewTitle variant="h4" open={String(isDrawerOpen)}>                        
                       {viewLabel}
                    </ViewTitle>

                    <Drawer
                        // variant="permanent"
                        open={isDrawerOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                                border: "none",
                                backgroundColor: COLORS.surface,
                            },
                        }}
                    >
                        {/* <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader> */}
                        {drawerContent}
                    </Drawer>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <MainBox component="main" open={String(isDrawerOpen)}>
                <Outlet />
            </MainBox>
        </AppLayoutContainer>
    );
}

export default AppLayout;