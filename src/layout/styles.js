import styled from '@emotion/styled';
import {
    Drawer,
    IconButton,
    Box as MuiBox, 
    ListItemButton as MuiListItemButton,
    ListItemIcon as MuiListItemIcon,
    ListItemText as MuiListItemText,
    Toolbar as MuiToolbar,
    Typography as MuiTypography,
} from "@mui/material";


export const AppLayoutContainer = styled(MuiBox)`
    display: flex;
    // min-height: 100vh;
    // background-color: var(--bg);
`;
export const DrawerContent = styled(MuiBox)`
    height: 100%;
    color: var(--text);
    background-color: var(--code-bg);

`;

export const DrawerToolbar = styled(MuiToolbar)`
    min-height: 72px !important;
    px: 2.5;
`;

export const Typography = styled(MuiTypography)`
    color: var(--text);
    font-weight: 700;
    letter-spacing: -0.5px;
`;

export const BoxPrimary = styled(MuiBox)`
    color: var(--primary);
`;

export const LayoutListItemButton = styled(MuiListItemButton)`
    border-radius: 2;
    mb: 0.5;
    color: ${(props) => props.active === "true" ? 'var(--text)' : 'var(--secondary)'};
    background-color: ${(props) => props.active === "true" ? 'var(--accent-bg)' : 'transparent'};
    &:hover {
        background-color: var(--accent-bg);
        color: var(--text);
    }
    justify-content: ${(props) => props.open === "true" ? 'initial' : 'center'};
     
`;

export const LayoutListItemIcon = styled(MuiListItemIcon)`
    min-width: 42;
    color: ${(props) => props.active === "true" ? 'var(--primary)' : 'var(--secondary)'}; 
    margin-right: ${(props) => props.open === "true" ? '16px' : 'auto'};                                 
`;

export const LayoutListItemText = styled(MuiListItemText)`
    font-weight: ${(props) => props.active === "true" ? 600 : 400};
    opacity: ${(props) => props.open === "true" ? 1 : 0};                              
`;

export const IconButtonStyled = styled(IconButton)`
    position: fixed;
    top: 16;
    left: 16;
     
    color: var(--text);
    background-color: var(--bg);

    &:hover {
        background-color: var(--surface);
    }
`;

export const ViewTitle = styled(MuiTypography)(({ theme, open }) => ({
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
    transition: 'margin-left 0.3s', 

    [theme.breakpoints.down('md')]: {
        marginLeft: '50px',
        // backgroundColor: 'red',
    },

    [theme.breakpoints.up('md')]: {
        marginLeft: open ==="true" ? 'var(--drawer-width)' : '50px',
        // backgroundColor: 'blue',
    },
}));


export const DrawerStyled = styled(Drawer)`
    & .MuiDrawer-paper {
        width: var(--drawer-width);
        boxSizing: "border-box",
        border: "none",
        backgroundColor: COLORS.surface,
    }
`
// export const MainBox = styled(MuiBox)`
//     flex-grow: 1,
//                     width: {
//                         xs: "100%",
//                         md: `calc(100% - ${drawerWidth}px)`,
//                     },
//                     marginTop: "64px",
//                     marginLeft: {
//                         xs: 0,
//                         md: isDrawerOpen ? `${drawerWidth}px` : 0,
//                     },
//                     minWidth: 0,
//                     transition: "margin-left 0.3s",
// `;