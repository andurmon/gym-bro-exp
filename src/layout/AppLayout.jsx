import { AppBar, Button, Drawer, List, Toolbar } from "@mui/material";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  FitnessCenter as FitnessCenterIcon,
  LibraryBooks as LibraryBooksIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import { NavLink, Outlet, useLocation } from "react-router-dom";

import { useState } from "react";
import * as S from "./styles";
import { useTranslate } from "../hooks/useTranslate";

const drawerWidth = 240;

// -----------------------------------------------------------------------------
// Navigation items
// -----------------------------------------------------------------------------

const navigationItems = [
  {
    label: "home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    label: "workouts",
    path: "/workouts",
    icon: <FitnessCenterIcon />,
  },
  {
    label: "exercises",
    path: "/exercises",
    icon: <LibraryBooksIcon />,
  },
  {
    label: "settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

// -----------------------------------------------------------------------------
// App Layout
// -----------------------------------------------------------------------------

function AppLayout() {
  const location = useLocation();
  const { language, toggleLanguage, translate } = useTranslate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(null);

  const currentItem = navigationItems.find(
    (item) => item.path === location.pathname,
  );
  const viewLabel = currentItem
    ? translate(currentItem.label)
    : translate("home");

  const handleDrawerToggle = () => {
    setIsDrawerOpen((previous) => !previous);
  };

  const drawerContent = (
    <S.DrawerContent>
      <S.DrawerToolbar>
        {/* <img src={Logo} alt="Logo" width={32} height={32} style={{ marginRight: 8 }} /> */}
        <S.Typography variant="h6">
          Gym
          <S.BoxPrimary component="span">Bro</S.BoxPrimary>
        </S.Typography>
      </S.DrawerToolbar>

      <List sx={{ px: 1.5 }}>
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            onClick={() => {
              //! TODO The animation kind of breaks with this
              setIsDrawerOpen(false);
            }}
          >
            {({ isActive }) => (
              <S.LayoutListItemButton
                active={String(isActive)}
                open={String(isDrawerOpen)}
              >
                <S.LayoutListItemIcon
                  active={String(isActive)}
                  open={String(isDrawerOpen)}
                >
                  {item.icon}
                </S.LayoutListItemIcon>

                <S.LayoutListItemText
                  primary={translate(item.label)}
                  active={String(isActive)}
                  open={String(isDrawerOpen)}
                  // sx={{
                  //     fontWeight: isActive ? 600 : 400,
                  // }}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive ? 600 : 400,
                      },
                    },
                  }}
                />
              </S.LayoutListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </S.DrawerContent>
  );

  return (
    <S.AppLayoutContainer>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "var(--bg)" }}>
          <S.IconButtonStyled onClick={handleDrawerToggle}>
            <MenuIcon />
          </S.IconButtonStyled>

          <S.ViewTitle variant="h4" open={String(isDrawerOpen)}>
            {viewLabel}
          </S.ViewTitle>

          <Button
            color="inherit"
            onClick={() => toggleLanguage(language === "en" ? "es" : "en")}
            sx={{ ml: "auto" }}
          >
            {language === "en" ? translate("spanish") : translate("english")}
          </Button>

          <Drawer
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
                backgroundColor: "var(--surface)",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <S.MainBox component="main" open={String(isDrawerOpen)}>
        <Outlet />
      </S.MainBox>
    </S.AppLayoutContainer>
  );
}

export default AppLayout;
