import { List, ListItemText } from "@mui/material";
import { BoxPrimary, DrawerBox, LayoutListItemButton, LayoutListItemIcon, Toolbar, Typography } from "./styles";
import { NavLink } from "react-router-dom";

import { 
    Home as HomeIcon,
    FitnessCenter as FitnessCenterIcon,
    LibraryBooks as LibraryBooksIcon,
} from "@mui/icons-material";

const LayoutMenu = ({ setMobileOpen }) => {

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
    

    return <DrawerBox>
            <Toolbar>
                {/* <img src={Logo} alt="Logo" width={32} height={32} style={{ marginRight: 8 }} /> */}
                 
                <Typography variant="h6">
                    Gym
                    <BoxPrimary component="span">Bro</BoxPrimary>
                </Typography>
            </Toolbar>

            <List sx={{ px: 1.5 }}>
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        {({ isActive }) => (
                            <LayoutListItemButton active={String(isActive)}>
                                <LayoutListItemIcon active={String(isActive)}
                                >
                                    {item.icon}
                                </LayoutListItemIcon>

                                <ListItemText
                                    primary={item.label}
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
        </DrawerBox>
}

export default LayoutMenu;
